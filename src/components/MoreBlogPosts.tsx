import { FC, useCallback, useState } from "react";

import { Box, Button, Stack } from "@chakra-ui/core";

import { initialNBlogs } from "../../constants";
import { BlogProps, ExtraBlogPost } from "../../pages/index";

let nSlideState = initialNBlogs;

export const MoreBlogPosts: FC<{
  blogPosts: BlogProps["blogList"]["nodes"];
}> = ({ blogPosts }) => {
  const [nSlice, setNSlice] = useState(nSlideState);

  const addMorePosts = useCallback(() => {
    setNSlice((n) => {
      return (nSlideState = n += 4);
    });
  }, []);

  const blogPostsSlice = blogPosts.slice(initialNBlogs, nSlice);

  return (
    <Stack>
      <Stack isInline flexWrap="wrap" justifyContent="space-around" spacing={0}>
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
