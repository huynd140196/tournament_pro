from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    # Đường dẫn: ws/match/<match_id>/
    re_path(r'ws/match/(?P<match_id>\w+)/$', consumers.MatchConsumer.as_view()),
]