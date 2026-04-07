from django.contrib.auth.decorators import user_passes_test
from .services import TournamentOrganizer
from django.shortcuts import render, get_object_or_404
from matches.models import Match
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tournament

@api_view(['GET'])
def api_tournament_list(request): # Kiểm tra kỹ từng chữ cái ở đây
    tournaments = Tournament.objects.all().values('id', 'name', 'status', 'start_date')
    return Response(list(tournaments))

@user_passes_test(lambda u: u.is_staff)
def process_start_tournament(request, tournament_id):
    organizer = TournamentOrganizer(tournament_id)
    success, message = organizer.start_group_stage()
    
    if success:
        messages.success(request, message)
    else:
        messages.error(request, message)
        
    return redirect('tournament_detail', pk=tournament_id)
def update_match_score(request, match_id):
    match = get_object_or_404(Match, id=match_id)
    
    if request.method == 'POST' and request.user.is_staff:
        match.score_a = int(request.POST.get('score_a', 0))
        match.score_b = int(request.POST.get('score_b', 0))
        match.is_finished = True # Đánh dấu đã xong để tính điểm
        match.save()
        
        messages.success(request, f"Đã cập nhật tỉ số trận {match.team_a.name} vs {match.team_b.name}")
        return redirect('tournament_detail', pk=match.tournament.id)

@user_passes_test(lambda u: u.is_staff)
def bulk_register_teams(request, tournament_id):
    tournament = get_object_or_404(Tournament, id=tournament_id)
    results = []

    if request.method == 'POST':
        raw_data = request.POST.get('data_input') # Ví dụ: Team A | a@gmail.com
        lines = raw_data.strip().split('\n')
        
        data_to_process = []
        for line in lines:
            if '|' in line:
                name, email = line.split('|')
                data_to_process.append({
                    'team_name': name.strip(),
                    'leader_email': email.strip()
                })
        
        results = bulk_create_leaders(tournament, data_to_process)
        messages.success(request, f"Đã tạo thành công {len(results)} đội trưởng.")

    return render(request, 'admin/bulk_create.html', {
        'tournament': tournament,
        'results': results
    })