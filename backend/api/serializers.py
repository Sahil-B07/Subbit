from .models import *
from rest_framework import serializers


class VideoSerializer(serializers.HyperlinkedModelSerializer):
    file = serializers.FileField()

    class Meta:
        model = Video
        fields = ['id', 'title', 'file']


class SubtitleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Subtitle
        fields = ['language', 'content']
