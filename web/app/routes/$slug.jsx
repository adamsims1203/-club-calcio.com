import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getClient } from "~/lib/sanity/getClient";
import { PortableText, urlFor } from "~/lib/sanity/helpers";
import { filterDataToSingleItem } from "~/lib/sanity/filterDataToSingleItem";
import postStyles from "~/styles/post.css";
import { format } from "date-fns";
import Preview from "~/components/preview";

export const links = () => {
  return [{ rel: "stylesheet", href: postStyles }];
};

export const loader = async ({ request, params }) => {
  const requestUrl = new URL(request?.url);
  const preview =
    requestUrl?.searchParams?.get("preview") ===
    process.env.SANITY_PREVIEW_SECRET;

  const query = `*[_type == "post" && slug.current == $slug]{
  _id,
  title,
  body,
  mainImage,
  publishedAt,
  author->{
    name,
    image,
    bio
  }
}`;

  const queryParams = {
    slug: params.slug,
  };

  const initialData = await getClient(preview).fetch(query, queryParams);

  return json({
    initialData,
    preview,
    query: preview ? query : null,
    queryParams: preview ? queryParams : null,
  });
};

export const PostRoute = () => {
  let { initialData, preview, query, queryParams } = useLoaderData();
  const [data, setData] = useState(initialData);
  const post = filterDataToSingleItem(data, preview);

  const { title, publishedAt, body, author } = post;

  return (
    <>
      {preview ? (
        <Preview
          data={data}
          setData={setData}
          query={query}
          queryParams={queryParams}
        />
      ) : null}
      <article>
        {title ? <h1>{title}</h1> : null}
        {publishedAt ? (
          <p>
            <time dateTime={publishedAt}>
              {format(new Date(publishedAt), "do MMMM yyy")}
            </time>
          </p>
        ) : null}

        {author ? (
          <div className="post-author">
            <img
              src={urlFor(author?.image).width(90).quality(100).url()}
              alt={author?.name}
            />
            <div>
              <p>
                <a href={`/team/${author?.name}`}>{author?.name}</a>
              </p>
              <PortableText value={author?.bio} className="author-bio" />
            </div>
          </div>
        ) : null}

        {body ? <PortableText value={body} /> : null}
      </article>
    </>
  );
};

export default PostRoute;
