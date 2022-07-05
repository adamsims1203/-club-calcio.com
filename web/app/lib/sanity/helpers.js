import imageUrlBuilder from "@sanity/image-url";
import getYouTubeId from "get-youtube-id";
import { PortableText as PortableTextComponent } from "@portabletext/react";

import { config } from "./config";

export const urlFor = (source) => imageUrlBuilder(config).image(source);

const portableTextComponents = {
  types: {
    youtube: ({ value }) => (
      <div
        className="youtube-video"
        style={{
          overflow: "hidden",
          paddingBottom: "56.25%",
          position: "relative",
          height: "0",
        }}
      >
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${getYouTubeId(value.url)}`}
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
    ),
    customImage: ({ value }) => {
      if (!value.asset) return;

      return value.caption ? (
        <figure>
          <img src={value ? urlFor(value) : ""} alt={value.alt || ""} />{" "}
          <figcaption>{value.caption}</figcaption>
        </figure>
      ) : (
        <img src={value ? urlFor(value) : ""} alt={value.alt || ""} />
      );
    },
  },
};

export const PortableText = (props) => {
  return (
    <PortableTextComponent {...props} components={portableTextComponents} />
  );
};
