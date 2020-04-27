import { setCacheData } from "gqless-hooks";
import { uniqBy } from "lodash";
import { NextPage } from "next";
import Router from "next/router";
import { FC, memo } from "react";

import { Box, Button, Heading, Spinner, Stack, Text } from "@chakra-ui/core";

import { AdminNavigation } from "../../../src/components/AdminNavigation";
import { Blog, useQuery } from "../../../src/graphql";
import { useAdminAuth } from "../../../src/hooks/adminAuth";

declare global {
  interface gqlessSharedCache {
    blogsPaginated: {
      hasNextPage: boolean;
      nodes: Pick<
        Blog,
        | "_id"
        | "content"
        | "createdAt"
        | "lead"
        | "title"
        | "updatedAt"
        | "urlSlug"
        | "mainImage"
        | "mainImageAlt"
        | "author"
        | "metaDescription"
        | "metaSection"
      >[];
    };
  }
}

const BlogBox: FC<{
  blog: gqlessSharedCache["blogsPaginated"]["nodes"][number];
}> = memo(({ blog }) => {
  return (
    <Box
      border="1px solid black"
      borderRadius="10px"
      width="fit-content"
      padding="15px"
      marginBottom="5px"
    >
      <Heading fontSize="2em">{blog.title}</Heading>
      <Heading fontSize="1.5em">/{blog.urlSlug}</Heading>
      <Text>updatedAt: {blog.updatedAt}</Text>
      <Text>createdAt: {blog.createdAt}</Text>
      <Button
        variantColor="cyan"
        leftIcon="edit"
        onClick={() => {
          setCacheData("edit_" + blog.urlSlug, blog);
          Router.push(
            "/admin/editBlog/[slug]",
            `/admin/editBlog/${blog.urlSlug}`
          );
        }}
      >
        Edit Blog
      </Button>
    </Box>
  );
});

const EditBlogListPage: NextPage = () => {
  const { isAdmin, isCurrentUserLoading } = useAdminAuth({
    requireAdmin: true,
  });

  const [blogsPaginated, { fetchMore }] = useQuery(
    ({ blogList }, { skip, limit }): gqlessSharedCache["blogsPaginated"] => {
      const {
        nodes,
        pageInfo: { hasNextPage },
      } = blogList({
        pagination: {
          skip,
          limit,
        },
      });

      return {
        hasNextPage,
        nodes: nodes.map(
          ({
            _id,
            title,
            urlSlug,
            createdAt,
            updatedAt,
            lead,
            content,
            mainImage,
            mainImageAlt,
            author,
            metaDescription,
            metaSection,
          }: gqlessSharedCache["blogsPaginated"]["nodes"][number]) => {
            return {
              _id,
              title,
              urlSlug,
              createdAt,
              updatedAt,
              lead,
              content,
              mainImage,
              mainImageAlt,
              author,
              metaDescription,
              metaSection,
            };
          }
        ),
      };
    },
    {
      sharedCacheId: "blogsPaginated",
      variables: {
        skip: 0,
        limit: 20,
      },
      skip: !isAdmin,
      pollInterval: 0,
    }
  );

  if (isCurrentUserLoading) return <Spinner size="xl" margin="50px" />;

  return (
    <Stack margin="15px">
      <AdminNavigation />
      <Spinner
        hidden={
          blogsPaginated.fetchState !== "loading" || blogsPaginated.data != null
        }
      />
      {blogsPaginated.data?.nodes.map((blog) => {
        return <BlogBox key={blog._id} blog={blog} />;
      })}

      {blogsPaginated.data?.hasNextPage && (
        <Box>
          <Button
            leftIcon="plus-square"
            variantColor="blue"
            isDisabled={blogsPaginated.fetchState === "loading"}
            isLoading={blogsPaginated.fetchState === "loading"}
            onClick={() => {
              fetchMore({
                notifyLoading: true,
                variables: {
                  skip: blogsPaginated.data?.nodes.length,
                },
                updateQuery(previousResult, fetchMoreResult) {
                  if (!fetchMoreResult) return previousResult;

                  return {
                    hasNextPage: fetchMoreResult.hasNextPage,
                    nodes: uniqBy(
                      [
                        ...(previousResult?.nodes ?? []),
                        ...fetchMoreResult.nodes,
                      ],

                      ({ _id }) => _id
                    ),
                  };
                },
              });
            }}
          >
            Fetch more
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default EditBlogListPage;
