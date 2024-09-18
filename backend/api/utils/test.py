from Fatmug2.backend.api.utils.extract_subtitle_languages import *

file_path = '/Users/sahilbhor/Work/Fatmug/Fatmug2/backend/media/media/test2.mkv'
# langs = extract_subtitle_languages(file_path)
# print(langs.keys())
save_sub_cmd = f"ffmpeg -i {
    file_path} -map 0:s:m:language:eng -c:s webvtt -f webvtt /Users/sahilbhor/Work/Fatmug/Fatmug2/backend/media/opt.vtt"

subprocess.run(save_sub_cmd, shell=True, text=True)
