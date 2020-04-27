import { FC, useCallback, useState } from "react";

import { Box, Button, Stack } from "@chakra-ui/core";

import { BlogProps, ExtraBlogPost } from "../../pages/index";

export const MoreBlogPosts: FC<{
  initialN: number;
  blogPosts: BlogProps["blogList"]["nodes"];
}> = ({ initialN, blogPosts }) => {
  const [nSlice, setNSlice] = useState(initialN);

  const addMorePosts = useCallback(() => {
    setNSlice((n) => (n += 4));
  }, []);

  const blogPostsSlice = blogPosts.slice(initialN, nSlice);

  return (
    <Stack>
      <Stack
        shouldWrapChildren
        isInline
        flexWrap="wrap"
        justifyContent="space-around"
        spacing={0}
      >
        {blogPostsSlice.map((blog) => {
          return <ExtraBlogPost key={blog._id} blog={blog} />;
        })}
      </Stack>

      {nSlice < blogPosts.length && (
        <Box alignSelf="center">
          <Button leftIcon="add" onClick={addMorePosts} variantColor="blue">
            More Blog Posts
          </Button>
        </Box>
      )}
    </Stack>
  );
};
