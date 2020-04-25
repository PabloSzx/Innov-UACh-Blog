import { uniqBy } from "lodash";
import { NextPage } from "next";

import { Text, Stack, Box, Heading, Button } from "@chakra-ui/core";

import { Blog, useQuery } from "../../src/graphql";
import { useAdminAuth } from "../../src/hooks/adminAuth";

declare global {
  interface gqlessHooksPool {
    blogsPaginated: {
      data: Pick<
        Blog,
        | "_id"
        | "content"
        | "createdAt"
        | "lead"
        | "title"
        | "updatedAt"
        | "urlSlug"
      >[];
    };
  }
}

const EditBlogPage: NextPage = () => {
  const { isAdmin, isCurrentUserLoading } = useAdminAuth({
    requireAdmin: true,
  });

  const [blogsPaginated, { fetchMore }] = useQuery(
    ({ blogList }, { skip, limit }) => {
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
          }: gqlessHooksPool["blogsPaginated"]["data"][number]) => {
            return {
              _id,
              title,
              urlSlug,
              createdAt,
              updatedAt,
              lead,
              content,
            };
          }
        ),
      };
    },
    {
      sharedCacheId: "blogsPaginated",
      variables: {
        skip: 0,
        limit: 3,
      },
      skip: !isAdmin,
      pollInterval: 0,
    }
  );

  if (isCurrentUserLoading) return null;

  return (
    <Stack margin="15px">
      {blogsPaginated.data?.nodes.map((blogData) => {
        return (
          <Box
            key={blogData._id}
            border="1px solid black"
            borderRadius="10px"
            width="fit-content"
            padding="15px"
          >
            <Heading fontSize="2em">{blogData.title}</Heading>
            <Heading fontSize="1.5em">/{blogData.urlSlug}</Heading>
            <Text>updatedAt: {blogData.updatedAt}</Text>
            <Text>createdAt: {blogData.createdAt}</Text>
          </Box>
        );
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

export default EditBlogPage;
