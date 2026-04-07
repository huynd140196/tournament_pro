from django.db import models
class Match(models.Model):
    tournament = models.ForeignKey('tournaments.Tournament', on_delete=models.CASCADE)
    team_a = models.ForeignKey('tournaments.Team', on_delete=models.CASCADE, related_name='matches_a')
    team_b = models.ForeignKey('tournaments.Team', on_delete=models.CASCADE, related_name='matches_b')
    stage = models.CharField(max_length=20, default='group')
    score_a = models.IntegerField(default=0)
    score_b = models.IntegerField(default=0)
    is_finished = models.BooleanField(default=False) # Đánh dấu trận đấu đã kết thúc