import subprocess
import langcodes
import json


def extract_subtitle_languages(file_path):
    get_langs_cmd = f"ffprobe -loglevel error -select_streams s -show_entries stream=index:stream_tags=language -of json {file_path}"
    result = subprocess.run(get_langs_cmd, shell=True, capture_output=True, text=True)
    
    if result.returncode != 0 or not result.stdout:
        print("ffprobe failed or produced no output.")
        return {}

    try:
        streams = json.loads(result.stdout)
    except json.JSONDecodeError as e:
        print("JSON Decode Error:", str(e))
        return {}

    base_file = file_path
    name, ext = base_file.split('/')[-1].split('.')
    # new_file = f'/Users/sahilbhor/Work/Fatmug/Fatmug2/frontend/public/static/{name}.webm'
    new_file = f'app/public/static/{name}.webm' 

    with open(base_file, 'rb') as f1:
        with open(new_file, 'wb') as f2:
            f2.write(f1.read())

    langs_and_subs = {}
    for stream in streams.get('streams', []):
        try:
            lang_code = stream['tags'].get('language')
            if lang_code:
                get_sub_cmd = f"ffmpeg -i {file_path} -map 0:s:m:language:{lang_code} -c:s webvtt -f webvtt pipe:1"
                result = subprocess.run(get_sub_cmd, shell=True, capture_output=True, text=True)

                subtitle_content = result.stdout
                if subtitle_content:
                    lang_code_display = f"{langcodes.Language.get(lang_code).display_name()} ({lang_code})"
                    langs_and_subs[lang_code_display] = subtitle_content
        except Exception as e:
            print(f"Error processing stream: {e}")
            continue

    return langs_and_subs
