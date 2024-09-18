from .models import *
from .serializers import *
from rest_framework import viewsets
from django.http import FileResponse
from rest_framework.response import Response
from .utils.extract_subtitle_languages import extract_subtitle_languages


class VideoView(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class VideoUploadView(viewsets.ModelViewSet):
    serializer_class = VideoSerializer
    queryset = Video.objects.all()

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            video = serializer.save()

            # Extract subtitles
            langs_and_subs = extract_subtitle_languages(video.file.path)

            for lang_code, subtitle_content in langs_and_subs.items():
                Subtitle.objects.create(
                    video=video,
                    language=lang_code,
                    content=subtitle_content
                )

            return Response(headers={"Accept-Ranges": bytes}, data={
                "message": f"{video.title} file uploaded successfully",
            }, status=201)

        return Response(serializer.errors, status=400)


class SubtitlesListView(viewsets.ModelViewSet):
    serializer_class = SubtitleSerializer

    def get_queryset(self):
        video_id = self.kwargs.get('video_id')
        return Subtitle.objects.filter(video_id=video_id)
