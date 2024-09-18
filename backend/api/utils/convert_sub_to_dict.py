f = open("/Users/sahilbhor/Work/Fatmug/Fatmug2/backend/media/opt.vtt", "r")

subtitle = f.read().strip()


def get_timeStamp(subtitle: str, keyword: str):
    sub_list = subtitle.split('\n\n')[1:]

    sub_dict = {}
    for line in sub_list:
        phrase_list = line.split("\n")
        sub_dict[phrase_list[0]] = (' ').join(phrase_list[1:])

    result = {}
    for timestamp, dialogue in sub_dict.items():
        if keyword in dialogue:
            result[timestamp] = dialogue

    return result


print(get_timeStamp(subtitle, "holiday"))
