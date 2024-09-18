"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsCloudUpload, BsArrowRight } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Home() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file) {
      alert("Please provide both a title and a video file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/upload/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Video uploaded successfully!");

        setTitle("");
        setFile(null);
        setLoading(false);
      } else {
        alert("Failed to upload video.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("An error occurred during the upload.");
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows w-full p-12">
      {/* section 1 */}
      <div className="grid grid-cols-7 p-10 w-full h-screen">
        {/* left */}
        <div className="col-span-2 grid grid-rows font-bold mt-24 h-full z-10">
          <div className="grid gap-10 h-fit">
            <div className="grid gap-5">
              <div className="w-full text-nowrap">
                <h1 className="text-3xl">Upload, Search, and Jump</h1>
                <span className="text-4xl">Never Miss a Line Again!</span>
              </div>
              <div>
                <p>
                  Upload your video, search for phrases, and jump to the exact
                  scene effortlessly.
                </p>
              </div>
            </div>
            <div>
              <Link
                href={"#upload"}
                className="border border-[#a5a5a55e] shadow-md shadow-slate-600 hover:border-[#a5a5a5b2] hover:bg-[#141414] py-2 px-4 rounded-lg duration-500"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        {/* right */}
        <div id="hero" className="col-span-4 col-start-4">
          <div className="h-fit mt-14">
            <Image
              src={"/static/hero1.png"}
              width={1000}
              height={1000}
              className="shadow-lg shadow-slate-600 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* section 2 */}
      <div id="upload" className="w-full h-full grid grid-cols-2">
        <div className="p-10">
          <div className="grid gap-6 mt-10">
            <h1 className="text-2xl font-semibold">How It Works:</h1>
            <ol className="text-lg grid gap-2 list-disc p-2">
              <li>Upload your video.</li>
              <li>Our app extracts available subtitles.</li>
              <li>Search for any phrase within the subtitles.</li>
              <li>Click to jump directly to that part of the video.</li>
            </ol>
          </div>
        </div>

        <div className="p-10">
          <form
            className="grid grid-rows gap-5 justify-items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl text-gray-500 font-bold">Title</h1>
              <input
                onChange={handleTitleChange}
                type="text"
                placeholder="Enter title"
                className="w-full outline-none border border-[#a5a5a55e] bg-transparent text-gray-300 text-sm px-4 py-2 rounded-lg"
                value={title}
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="uploadFile1"
                className="bg-transparent text-gray-500 font-semibold text-base rounded h-60 flex flex-col gap-5 items-center justify-center cursor-pointer border-2 border-[#a5a5a55e] border-dashed mx-auto font-[sans-serif]"
              >
                <div>
                  <BsCloudUpload className="scale-[4]" />
                </div>
                <h1>Upload file</h1>
                <input
                  type="file"
                  id="uploadFile1"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".mp4,.mkv,.webm"
                  required
                />
                <p className="text-xs font-medium text-gray-400 mt-2">
                  Mp4, Mkv & Webm are Allowed.
                </p>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="border border-[#a5a5a55e] hover:border-[#a5a5a5b2] active:bg-[#181818] active:duration-0 py-2 px-4 rounded-lg duration-500 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <ImSpinner2 className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </button>
              <Link
                href={"/videos"}
                className="border flex items-center gap-1 border-[#a5a5a55e] hover:border-[#a5a5a5b2] active:bg-[#181818] active:duration-0 py-2 px-4 rounded-lg duration-500"
              >
                Videos <BsArrowRight className="animate-pulse" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
