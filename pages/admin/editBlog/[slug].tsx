import { Maybe, setCacheData } from "gqless-hooks";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect } from "react";

import { Button, Heading, Spinner, Stack } from "@chakra-ui/core";

import { AdminNavigation } from "../../../src/components/AdminNavigation";
import {
  BlogEditCreatePostProps,
  BlogPostForm,
} from "../../../src/components/BlogPostForm";
import { BlogUpdate, useMutation, useQuery } from "../../../src/graphql";
import { useAdminAuth } from "../../../src/hooks/adminAuth";

export const getServerSideProps: GetServerSideProps<EditBlogPageProps> = async ({
  query: { slug },
}) => {
  if (typeof slug !== "string") throw Error("Wrong parameters" + slug);

  return {
    props: {
      slug,
    },
  };
};

type EditBlogPageProps = {
  slug: string;
};

const EditBlogPage: NextPage<EditBlogPageProps> = ({ slug }) => {
  const { isAdmin, isCurrentUserLoading } = useAdminAuth({
    requireAdmin: true,
  });

  const { push } = useRouter();

  const sharedCacheId = "edit_" + slug;

  const [{ data: blog, fetchState }] = useQuery(
    (
      { blog },
      { slug }
    ): Maybe<gqlessSharedCache["blogsPaginated"]["nodes"][number]> => {
      const blogData = blog({
        slug,
      });

      if (!blogData) return null;

      const {
        _id,
        title,
        lead,
        content,
        urlSlug,
        updatedAt,
        createdAt,
        mainImage,
        mainImageAlt,
        author,
        metaDescription,
        metaSection,
      } = blogData;
      return {
        _id,
        title,
        lead,
        content,
        urlSlug,
        updatedAt,
        createdAt,
        mainImage,
        mainImageAlt,
        author,
        metaDescription,
        metaSection,
      };
    },
    {
      skip: !isAdmin,
      sharedCacheId,
      variables: {
        slug,
      },
    }
  );

  const [updateBlog, { fetchState: updateFetchState }] = useMutation(
    (
      { updateBlog },
      blog: BlogUpdate
    ): Maybe<gqlessSharedCache["blogsPaginated"]["nodes"][number]> => {
      const updatedBlog = updateBlog({
        blog,
      });

      if (!updatedBlog) return null;

      const {
        _id,
        title,
        content,
        updatedAt,
        createdAt,
        lead,
        urlSlug,
        mainImage,
        mainImageAlt,
        author,
        metaDescription,
        metaSection,
      } = updatedBlog;

      return {
        _id,
        title,
        content,
        updatedAt,
        createdAt,
        lead,
        urlSlug,
        mainImage,
        mainImageAlt,
        author,
        metaDescription,
        metaSection,
      };
    },
    {
      sharedCacheId,
      onCompleted(updatedBlog) {
        if (updatedBlog?._id == null) return;

        setCacheData("blogsPaginated", (prevData) => {
          if (!prevData?.nodes) return null;

          return {
            hasNextPage: prevData.hasNextPage,
            nodes: prevData.nodes.map((blog) => {
              if (blog._id === updatedBlog._id) {
                return updatedBlog;
              }
              return blog;
            }),
          };
        });

        console.log({
          updatedBlog,
        });

        if (updatedBlog.urlSlug !== slug) {
          setCacheData("edit_" + updatedBlog.urlSlug, updatedBlog);
          push(
            "/admin/editBlog/[slug]",
            `/admin/editBlog/${updatedBlog.urlSlug}`
          );
        }
      },
    }
  );

  useEffect(() => {
    if (fetchState === "done" && !blog) {
      push("/admin/editBlog");
    }
  }, [fetchState, blog]);

  const onCorrectSubmit = useCallback<
    (data: BlogEditCreatePostProps) => Promise<Maybe<BlogEditCreatePostProps>>
  >(
    async ({ _id, ...blog }) => {
      return await updateBlog({
        variables: {
          _id,
          ...blog,
        },
      });
    },
    [updateBlog]
  );

  const isFetchLoading = updateFetchState === "loading";

  const SubmitButton = useCallback<FC>(() => {
    return (
      <Button
        marginBottom="5px"
        variantColor="blue"
        type="submit"
        isDisabled={isFetchLoading}
        isLoading={isFetchLoading}
      >
        Update Blog
      </Button>
    );
  }, [isFetchLoading]);

  if (isCurrentUserLoading) return <Spinner size="xl" margin="50px" />;

  return (
    <>
      <Head key={0}>
        <title>Admin Edit Blog Post {blog?.title}</title>
      </Head>
      <Stack margin="15px">
        {blog ? (
          <Heading>
            Editing Blog Post <i>{blog.title}</i>
          </Heading>
        ) : (
          <Heading>
            Editing Blog Post <i>...</i>
          </Heading>
        )}
        {blog ? (
          <BlogPostForm
            blog={blog}
            onCorrectSubmit={onCorrectSubmit}
            children={SubmitButton}
          />
        ) : (
          <Spinner margin="50px" size="xl" />
        )}
      </Stack>
    </>
  );
};

export default EditBlogPage;
