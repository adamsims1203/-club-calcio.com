import React from "react";
import getTweetId from "get-tweet-id";
import { TwitterTweetEmbed } from "react-twitter-embed";

const TweetPreview = ({ value }) => {
  if (!value?.url) return null;
  console.log(value);

  const { url } = value;
  const id = getTweetId(url);
  console.log(id);

  return <TwitterTweetEmbed tweetId={id} />;
};

export default {
  name: "tweet",
  type: "object",
  title: "Tweet Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "Tweet URL",
    },
  ],
  preview: {
    select: {
      url: "url",
    },
    component: TweetPreview,
  },
};
