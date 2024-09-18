from django.db import models


class Video(models.Model):
    file = models.FileField(upload_to='media/', null=True, blank=True)
    title = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)


class Subtitle(models.Model):
    video = models.ForeignKey(
        Video, on_delete=models.CASCADE)
    language = models.CharField(max_length=100)
    content = models.TextField()
