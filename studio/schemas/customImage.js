import React from "react";
import { FaYoutube, FaTwitter, FaFileImage } from "react-icons/fa";

const customImageComponent = ({ value }) => {
  if (value === null) return <p>No image</p>;

  const { imageUrl } = value;

  return (
    <img
      src={imageUrl}
      style={{
        width: "100%",
      }}
      alt=" "
    />
  );
};

export default {
  title: "Image",
  name: "customImage",
  type: "image",
  icon: FaFileImage,
  options: {
    hotspot: true, // <-- Defaults to false
  },

  fields: [
    {
      name: "caption",
      type: "string",
      title: "Caption",
      options: {
        isHighlighted: true, // <-- make this field easily accessible
      },
    },
    {
      // Editing this field will be hidden behind an "Edit"-button
      name: "alt",
      type: "string",
      title: "Alt text",
      options: {
        isHighlighted: true, // <-- make this field easily accessible
      },
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
    },
    component: customImageComponent,
  },
};
