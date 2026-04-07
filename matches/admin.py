from django.contrib import admin
from .models import Match

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('id', 'tournament', 'team_a', 'team_b', 'score_a', 'score_b', 'stage', 'is_finished')
    list_filter = ('tournament', 'stage', 'is_finished')