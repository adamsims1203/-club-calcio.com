import { urlFor } from "~/lib/sanity/helpers";
import styles from "./postCards.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const MainPost = ({ post }) => {
  const { title, excerpt, slug, mainImage } = post;

  return (
    <div className="post-card post-card-featured">
      <a href={slug.current}>
        <img
          src={urlFor(mainImage).width(608).height(320).quality(100).url()}
          alt=""
        />
      </a>
      <a href={slug.current}>
        <h2>{title}</h2>
      </a>
      <p>{excerpt}</p>
      <a href={slug.current} className="post-link-button">
        READ MORE
      </a>
    </div>
  );
};

export const SidePost = ({ post }) => {
  const { title, slug, mainImage } = post;

  return (
    <div className="post-card post-card-side">
      <div className="post-card-side-image-container">
        <a href={slug.current}>
          <img
            src={urlFor(mainImage).width(140).height(190).quality(100).url()}
            alt=""
          />
        </a>
      </div>
      <div className="post-card-side-info">
        <a href={slug.current}>
          <h4>{title}</h4>
        </a>
        <a href={slug.current} className="post-link-button">
          READ MORE
        </a>
      </div>
    </div>
  );
};
