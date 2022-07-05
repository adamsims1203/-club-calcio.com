import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getClient } from "~/lib/sanity/getClient";
import {
  MainPost,
  SidePost,
  links as postCardsLinksFunction,
} from "../components/postCards";

export const links = () => {
  return [...postCardsLinksFunction()];
};

export const loader = async () => {
  const featuredPost = await getClient().fetch(
    `*[_type == "post"][0]{
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt
    }`
  );

  const sidePosts = await getClient().fetch(
    `*[_type == "post"][1..3]{
        _id,
        title,
        slug,
        mainImage,
        publishedAt
      }`
  );

  return json({ featuredPost, sidePosts });
};

const IndexRoute = () => {
  const { featuredPost, sidePosts } = useLoaderData();

  return (
    <div>
      <div className="post-cards-grid">
        <MainPost post={featuredPost} />

        {sidePosts.map((post) => (
          <SidePost post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default IndexRoute;
