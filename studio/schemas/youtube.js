import React from "react";
import getYouTubeId from "get-youtube-id";

const YoutubeEmbed = ({ value }) => {
  const { url } = value;
  const id = getYouTubeId(url);
  return (
    <div
      className="video-responsive"
      style={{
        overflow: "hidden",
        paddingBottom: "56.25%",
        position: "relative",
        height: "0",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        style={{
          left: "0",
          top: "0",
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
      />
    </div>
  );
};

export default {
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "YouTube video URL",
    },
  ],
  preview: {
    select: {
      url: "url",
    },
    component: YoutubeEmbed,
  },
};
