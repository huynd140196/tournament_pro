import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.cache import cache

class MatchConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.match_id = self.scope['url_route']['kwargs']['match_id']
        self.room_group_name = f'match_{self.match_id}'

        # Tham gia vào nhóm của trận đấu
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get('action')
        team_id = data.get('team_id')

        if action == 'confirm_lineup':
            # Lưu trạng thái xác nhận vào Redis (tồn tại trong 1 giờ)
            cache_key = f"match_{self.match_id}_confirm_{team_id}"
            cache.set(cache_key, True, 3600)

            # Kiểm tra xem đội kia đã xác nhận chưa
            # (Bạn cần truyền team_id của đối thủ từ frontend hoặc query db)
            other_team_id = data.get('opponent_id')
            other_confirmed = cache.get(f"match_{self.match_id}_confirm_{other_team_id}")

            if other_confirmed:
                # Cả hai đã xong -> Thông báo công khai
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'lineup_ready',
                        'message': 'Cả hai đội đã xác nhận! Đội hình đã hiển thị.'
                    }
                )
            else:
                # Chỉ mới một đội xong -> Thông báo cho đối thủ nhanh lên
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'opponent_ready',
                        'sender_team_id': team_id
                    }
                )

    async def opponent_ready(self, event):
        await self.send(text_data=json.dumps({
            'status': 'OPPONENT_CONFIRMED',
            'team_id': event['sender_team_id']
        }))

    async def lineup_ready(self, event):
        await self.send(text_data=json.dumps({
            'status': 'ALL_CONFIRMED',
            'message': event['message']
        }))