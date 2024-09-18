"use client";
import fetch_video_subs from "@/utils/fetch_video_subs";
import { PiClockCounterClockwiseFill } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { searchSubtitle } from "@/utils/subtitleUtils";
import Link from "next/link";

const VideoPage = ({ params }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const [phrase, setPhrase] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [selectedTimestamp, setSelectedTimestamp] = useState(null);

  let id = params.slug;
  const { video, subtitle, loading, error } = fetch_video_subs(id);

  useEffect(() => {
    const canvas = canvasRef.current;
    const videoElement = videoRef.current;

    if (canvas && videoElement) {
      const ctx = canvas.getContext("2d");

      const drawFrame = () => {
        if (!videoElement.paused && !videoElement.ended) {
          ctx.drawImage(
            videoElement,
            0,
            0,
            videoElement.videoWidth,
            videoElement.videoHeight,
            0,
            0,
            canvas.width,
            canvas.height
          );
          setTimeout(drawFrame, 1000 / 30);
        }
      };

      videoElement.addEventListener("play", drawFrame);

      return () => {
        videoElement.removeEventListener("play", drawFrame);
      };
    }
  }, [video]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // search
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setPhrase(inputValue);

    if (inputValue.trim() !== "" && subtitle.length > 0) {
      const vttContent = subtitle.map((sub) => sub.content).join("\n\n");
      const results = searchSubtitle(vttContent, inputValue);
      setSearchResults(results);
    } else {
      setSearchResults({});
    }
  };

  // jump to time-stamp

  const handleSearch = () => {
    if (selectedTimestamp && videoRef.current) {
      const videoElement = videoRef.current;
      const [startTime, endTime] = selectedTimestamp.split(" --> ");
      const timeParts = startTime.split(":");

      let hours = 0,
        minutes = 0,
        secondsMilliseconds = "0.000";

      if (timeParts.length === 3) {
        [hours, minutes, secondsMilliseconds] = timeParts;
      } else if (timeParts.length === 2) {
        [minutes, secondsMilliseconds] = timeParts;
      }

      const [seconds, milliseconds] = secondsMilliseconds.split(".");

      const timeInSeconds =
        parseInt(hours) * 3600 +
        parseInt(minutes) * 60 +
        parseFloat(`${seconds}.${milliseconds}`);
      videoElement.currentTime = timeInSeconds;
    }
  };

  const onClickResult = (timestamp, dialogue) => {
    setSelectedTimestamp(timestamp);
    setPhrase(dialogue);
  };

  return (
    <div className="flex w-full h-full relative p-12 space-x-5">
      <div className="p-12 relative flex">
        <div className="flex flex-col gap-4">
          <div>
            <Link
              href={"/videos"}
              className="border border-[#a5a5a55e] hover:border-white py-2 px-4 rounded-lg duration-500"
            >
              Back
            </Link>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-full relative">
              <div
                id="video-player"
                className="relative flex flex-col justify-center items-center h-fit"
              >
                <canvas
                  ref={canvasRef}
                  className="w-[55vw] h-[55vh] absolute -z-10 blur-[60px] duration-[3000s] "
                ></canvas>
                <video
                  ref={videoRef}
                  className="w-[70vw] rounded-xl shadow-2xl"
                  controls
                  id="video"
                >
                  <source
                    src={`/static/${
                      video?.file.split("/").pop().split(".")[0]
                    }.webm`}
                    type="video/webm"
                  ></source>
                  {subtitle.map((sub) => (
                    <track
                      className=""
                      src={`data:text/vtt;base64,${Buffer.from(
                        sub.content
                      ).toString("base64")}`}
                      kind="subtitles"
                      srclang="en"
                      label={sub.language}
                      default
                    />
                  ))}
                </video>
              </div>
              <h1 className=" text-4xl w-full font-serif px-4 py-2">
                {video?.title}
              </h1>
            </div>
            <div className="w-[30%] h-fit flex flex-col gap-2 relative">
              {/* searchBox */}
              <h1 className="row-span-1 border text-center rounded p-2">
                Jump to time-stamp
              </h1>

              <div class="row-span-1 flex rounded-md border border-[#a5a5a55e] overflow-hidden w-full h-fit font-[sans-serif]">
                <input
                  onChange={handleChange}
                  type="email"
                  placeholder="Search phrase..."
                  class="w-full outline-none bg-transparent text-gray-300 text-sm px-4 py-2"
                  value={phrase}
                />
                <button
                  type="button"
                  class=" items-center justify-center bg-[#181818] px-5"
                  onClick={handleSearch}
                >
                  <PiClockCounterClockwiseFill className="scale-[1.5]" />
                </button>
              </div>

              {/* results */}
              <div className="flex">
                <div className="search-result overflow-y-scroll bg-[#292929] rounded-lg flex w-full max-h-[50vh]">
                  {phrase && (
                    <ul className="p-2">
                      {Object.entries(searchResults).map(
                        ([timestamp, dialogue]) => (
                          <li
                            className="border-b border-[#a5a5a55e] p-2 rounded-lg hover:bg-[#1b1b1b] cursor-pointer"
                            key={timestamp}
                            onClick={() => onClickResult(timestamp, dialogue)}
                          >
                            <strong>{timestamp}</strong>: {dialogue}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
