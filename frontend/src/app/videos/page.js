"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_GET_VIDEOS);
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-row w-full h-full relative p-12 space-x-5 gap-4">
      <div className="p-12 w-full h-screen">
        <div>
          <Link
            href={"/"}
            className="border border-[#a5a5a55e] hover:border-white py-2 px-4 rounded-lg duration-500"
          >
            Back
          </Link>
        </div>
        <div className="flex flex-col items-center w-full h-full">
          <h1 className="text-4xl w-full text-center font-bold font-serif">
            Videos
          </h1>

          <div id="list" className=" h-full w-full mt-10">
            <ul className="grid grid-cols-3">
              {videos.map((video) => (
                <div className="group m-3 p-2 relative rounded-lg shadow-xl shadow-[#ffecbc25]">
                  <Link
                    key={video.id}
                    href={`/video/${video.id}`}
                    className="relative flex"
                  >
                    <video
                      className="w-[30vw] h-[30vh] rounded-lg object-fill"
                      src={video.file}
                    ></video>
                    <p
                      className="absolute text-5xl text-center justify-center flex flex-col
                 h-full w-full invisible group-hover:visible group-hover:bg-[#000000da] ease-in duration-300"
                    >
                      {video.title}
                    </p>
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
