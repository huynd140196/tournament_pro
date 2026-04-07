from django.contrib import admin
from .models import Tournament, Team, Player

@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    # Hiển thị các cột thông tin nhanh ở danh sách
    list_display = ('name', 'start_date', 'status', 'member_per_team')
    # Thêm bộ lọc bên phải
    list_filter = ('status',)
    # Thêm ô tìm kiếm
    search_fields = ('name',)

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'tournament', 'leader', 'group')
    list_filter = ('tournament', 'group')

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'ingame_uid', 'team')
    search_fields = ('full_name', 'ingame_uid')