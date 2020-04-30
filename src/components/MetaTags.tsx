import Head from "next/head";
import { FC, memo } from "react";

import { BlogPostProps } from "./BlogPost";

export const BlogMetaDataHead: FC<{
  blog: BlogPostProps["blog"];
  url: string;
}> = memo(
  ({
    blog: {
      title,
      metaDescription,
      mainImage,
      mainImageAlt,
      author,
      createdAt,
      updatedAt,
      metaSection,
    },
    url,
  }) => {
    const titleStr = `${title} - Comunidades Práctica INFO`;

    return (
      <Head>
        <title>{titleStr}</title>
        <meta property="og:title" content={titleStr} />
        <meta property="og:url" content={url} />
        {metaDescription ? (
          <meta property="og:description" content={metaDescription} />
        ) : null}
        {mainImage ? <meta property="og:image" content={mainImage} /> : null}
        {mainImageAlt ? (
          <meta property="og:image:alt" content={mainImageAlt} />
        ) : null}
        <meta property="og:type" content="article" />
        {author ? <meta property="article:author" content={author} /> : null}
        {createdAt ? (
          <meta property="article:published_time" content={createdAt} />
        ) : null}
        {updatedAt ? (
          <meta property="article:modified_time" content={updatedAt} />
        ) : null}
        {metaSection ? (
          <meta property="article:section" content={metaSection} />
        ) : null}
      </Head>
    );
  }
);
