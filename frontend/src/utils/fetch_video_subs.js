import { useState, useEffect } from "react";

const fetch_video_subs = (id) => {
  const [video, setVideo] = useState(null);
  const [subtitle, setSubtitle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchSubtitles = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/${id}/subtitles`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch subtitles");
          }
          const data = await response.json();
          setSubtitle(data);
        } catch (err) {
          setError(err.message);
        }
      };

      const fetchVideo = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/${id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch video");
          }
          const data = await response.json();
          setVideo(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchSubtitles();
      fetchVideo();
    }
  }, [id]);

  return { video, subtitle, loading, error };
};

export default fetch_video_subs;
