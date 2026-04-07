# tournaments/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Đường dẫn này khi kết hợp với tiền tố ở Bước 1 sẽ thành:
    # /tournaments/api/list/
    path('api/list/', views.api_tournament_list, name='api_tournament_list'),
]