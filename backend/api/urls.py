from django.urls import path
from .views import *


urlpatterns = [
    path('videos/',
         VideoView.as_view({'get': 'list'}), name='video-list'),
    path('video/<int:pk>/',
         VideoView.as_view({'get': 'retrieve'}), name='video-detail'),
    path('video/upload/',
         VideoUploadView.as_view({'post': 'create'}), name='video-upload'),
    path('video/<int:video_id>/subtitles/',
         SubtitlesListView.as_view({'get': 'list'}), name='subtitles-list'),
]
