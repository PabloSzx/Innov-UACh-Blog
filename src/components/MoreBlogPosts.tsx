import { FC, useCallback } from "react";

import { Box, Button, Stack } from "@chakra-ui/core";

import { ExtraBlogPost, initialNBlogs } from "../../pages/index";
import { useQuery } from "../graphql";

let firstSkip = true;

const MoreBlogPosts: FC = () => {
  const [{ data: blogPosts, fetchState }, { fetchMore }] = useQuery(
    ({ blogList }, { limit, skip }) => {
      const {
        nodes,
        pageInfo: { hasNextPage },
      } = blogList({
        pagination: {
          limit,
          skip,
        },
      });

      return {
        nodes: nodes.map(
          ({
            _id,
            title,
            lead,
            updatedAt,
            createdAt,
            urlSlug,
            mainImage,
            mainImageAlt,
          }) => {
            return {
              _id,
              title,
              lead,
              updatedAt,
              createdAt,
              urlSlug,
              mainImage,
              mainImageAlt,
            };
          }
        ),
        hasNextPage,
      };
    },
    {
      sharedCacheId: "moreBlogPosts",
      skip: firstSkip,
      variables: {
        limit: 4,
        skip: 0,
      },
      onError: console.error,
    }
  );

  const blogNodes = blogPosts?.nodes;
  const nNodes = blogNodes?.length ?? 0;
  const hasNextPage = blogPosts?.hasNextPage ?? true;

  const onFetchMoreBlogPosts = useCallback(() => {
    firstSkip = false;
    fetchMore({
      variables: {
        skip: initialNBlogs + nNodes,
      },
      updateQuery(previousResult, fetchMoreResult) {
        if (fetchMoreResult == null) return previousResult;
        if (previousResult == null) return fetchMoreResult;

        return {
          hasNextPage: fetchMoreResult.hasNextPage,
          nodes: [...previousResult.nodes, ...fetchMoreResult.nodes],
        };
      },
    });
  }, [fetchMore, nNodes]);

  return (
    <Stack>
      {blogNodes && (
        <Stack
          shouldWrapChildren
          isInline
          flexWrap="wrap"
          justifyContent="space-around"
          spacing={0}
        >
          {blogNodes.map((blog) => {
            return <ExtraBlogPost key={blog._id} blog={blog} />;
          })}
        </Stack>
      )}

      {hasNextPage && (
        <Box alignSelf="center">
          <Button
            leftIcon="add"
            onClick={onFetchMoreBlogPosts}
            isLoading={fetchState === "loading"}
            variantColor="blue"
          >
            More Blog Posts
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default MoreBlogPosts;
