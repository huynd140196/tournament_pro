from django.db import models
from django.contrib.auth.models import User

class Tournament(models.Model):
    name = models.CharField(max_length=255, verbose_name="Tên giải đấu")
    reg_deadline = models.DateTimeField(verbose_name="Hạn đăng ký")
    start_date = models.DateTimeField(verbose_name="Ngày bắt đầu")
    member_per_team = models.PositiveIntegerField(verbose_name="Số TV/Đội")
    is_active = models.BooleanField(default=True)
    status = models.CharField(max_length=20, default='open')
    
    def __str__(self):
        return self.name

class Team(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='teams')
    leader = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Đội trưởng")
    name = models.CharField(max_length=100, verbose_name="Tên đội")
    group = models.CharField(max_length=10, blank=True, null=True) # A, B, C...

class Player(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')
    full_name = models.CharField(max_length=100)
    ingame_uid = models.CharField(max_length=50) # UID game để check trùng

    class Meta:
        unique_together = ('team', 'ingame_uid')