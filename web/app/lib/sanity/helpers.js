import imageUrlBuilder from "@sanity/image-url";
import getYouTubeId from "get-youtube-id";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { PortableText as PortableTextComponent } from "@portabletext/react";

import { config } from "./config";

export const urlFor = (source) => imageUrlBuilder(config).image(source);

const getTweetId = (url) => {
  if (url != "" && url.includes("/status/")) {
    var re = new RegExp(/[/status/][0-9]+/g);
    let id = url.match(re);
    return id[0].replace("/", "");
  } else {
    return "Invalid URL";
  }
};

const portableTextComponents = {
  types: {
    customImage: ({ value }) => {
      if (!value.asset) return null;

      return value.caption ? (
        <figure>
          <img src={value ? urlFor(value) : ""} alt={value.alt || ""} />{" "}
          <figcaption>{value.caption}</figcaption>
        </figure>
      ) : (
        <img src={value ? urlFor(value) : ""} alt={value.alt || ""} />
      );
    },
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

    tweet: ({ value }) => {
      if (!value.url) return null;
      const id = getTweetId(value.url);
      console.log(id);
      return <TwitterTweetEmbed tweetId={id} />;
    },
  },
};

export const PortableText = (props) => {
  return (
    <PortableTextComponent {...props} components={portableTextComponents} />
  );
};
