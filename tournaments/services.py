import random
from math import ceil
from django.db import transaction
from .models import Team, Tournament
from matches.models import Match      # Lấy Match từ app matches
import string
from django.contrib.auth.models import User


class TournamentOrganizer:
    def __init__(self, tournament_id):
        self.tournament = Tournament.objects.get(id=tournament_id)

    @transaction.atomic
    def start_group_stage(self):
        """
        Quy trình: Chia bảng -> Tạo lịch thi đấu vòng tròn -> Cập nhật trạng thái
        """
        teams = list(self.tournament.teams.all())
        if not teams:
            return False, "Không có đội nào tham gia."

        # 1. Chia bảng ngẫu nhiên
        random.shuffle(teams)
        num_teams = len(teams)
        
        # Tính số bảng (mục tiêu 4 đội/bảng, chia đều số dư)
        num_groups = round(num_teams / 4) or 1
        group_labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        
        # Xóa các bảng cũ và trận cũ nếu có (để tránh tạo trùng khi bấm lại)
        Match.objects.filter(tournament=self.tournament, stage='group').delete()

        for i, team in enumerate(teams):
            group_index = i % num_groups
            team.group = group_labels[group_index]
            team.save()

        # 2. Tạo lịch thi đấu cho từng bảng
        active_groups = group_labels[:num_groups]
        for label in active_groups:
            self._generate_round_robin(label)

        # 3. Cập nhật trạng thái giải
        self.tournament.status = 'group_stage'
        self.tournament.save()
        
        return True, f"Đã chia thành {num_groups} bảng và tạo lịch thi đấu."

    def _generate_round_robin(self, group_label):
        """
        Thuật toán Circle Selection cho 1 bảng cụ thể
        """
        teams = list(Team.objects.filter(tournament=self.tournament, group=group_label))
        
        # Nếu số đội lẻ, thêm "None" (đội ảo - Bye)
        if len(teams) % 2 != 0:
            teams.append(None)

        num_teams = len(teams)
        num_rounds = num_teams - 1
        half = num_teams // 2

        for r in range(num_rounds):
            # Tạo các cặp đấu cho vòng này
            for i in range(half):
                team_a = teams[i]
                team_b = teams[num_teams - 1 - i]

                # Bỏ qua nếu là trận đấu với đội ảo
                if team_a and team_b:
                    Match.objects.create(
                        tournament=self.tournament,
                        team_a=team_a,
                        team_b=team_b,
                        stage='group',
                        round_number=r + 1
                    )
            
            # Xoay vòng: Giữ đội đầu tiên, đẩy các đội khác theo chiều kim đồng hồ
            # [1, 2, 3, 4] -> [1, 4, 2, 3]
            teams = [teams[0]] + [teams[-1]] + teams[1:-1]


class StandingService:
    @staticmethod
    def get_group_standings(tournament, group_label):
        """
        Tính toán bảng xếp hạng cho một bảng cụ thể
        """
        teams = Team.objects.filter(tournament=tournament, group=group_label)
        standings = []

        for team in teams:
            # Lấy tất cả trận đấu đã kết thúc của đội này (cả vai trò team_a và team_b)
            matches_a = Match.objects.filter(team_a=team, is_finished=True, stage='group')
            matches_b = Match.objects.filter(team_b=team, is_finished=True, stage='group')

            stats = {
                'team': team,
                'played': 0,
                'won': 0,
                'drawn': 0,
                'lost': 0,
                'gf': 0, # Bàn thắng (Goals For)
                'ga': 0, # Bàn thua (Goals Against)
                'gd': 0, # Hiệu số (Goal Difference)
                'points': 0
            }

            # Xử lý trận đấu khi đội là Team A
            for m in matches_a:
                stats['played'] += 1
                stats['gf'] += m.score_a
                stats['ga'] += m.score_b
                if m.score_a > m.score_b:
                    stats['won'] += 1
                    stats['points'] += 3
                elif m.score_a == m.score_b:
                    stats['drawn'] += 1
                    stats['points'] += 1
                else:
                    stats['lost'] += 1

            # Xử lý trận đấu khi đội là Team B
            for m in matches_b:
                stats['played'] += 1
                stats['gf'] += m.score_b
                stats['ga'] += m.score_a
                if m.score_b > m.score_a:
                    stats['won'] += 1
                    stats['points'] += 3
                elif m.score_b == m.score_a:
                    stats['drawn'] += 1
                    stats['points'] += 1
                else:
                    stats['lost'] += 1

            stats['gd'] = stats['gf'] - stats['ga']
            standings.append(stats)

        # Sắp xếp theo: Điểm số -> Hiệu số -> Số bàn thắng
        standings.sort(key=lambda x: (x['points'], x['gd'], x['gf']), reverse=True)
        return standings

    def generate_random_password(length=8):
        characters = string.ascii_letters + string.digits
        return ''.join(random.choice(characters) for i in range(length))

    def bulk_create_leaders(self, tournament, data_list):
        """
        data_list: Danh sách các dict [{'team_name': '...', 'leader_email': '...'}]
        """
        import random # Đảm bảo đã import random
        created_accounts = []

        for item in data_list:
            email = item['leader_email']
            team_name = item['team_name']
        
            # 1. Tạo User
            username = email.split('@')[0] + "_" + str(random.randint(10, 99))
            # Giả sử bạn đã có hàm generate_random_password() ở trên
            password = self.generate_random_password() 
        
            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(
                    username=username, 
                    email=email, 
                    password=password
                )
            
                # 2. Tạo Đội và gán Đội trưởng
                Team.objects.create(
                    tournament=tournament,
                    leader=user,
                    name=team_name
                )
            
                created_accounts.append({
                    'team': team_name,
                    'username': username,
                    'password': password
                })
            
        return created_accounts