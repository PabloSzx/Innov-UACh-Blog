import { FC, useCallback, useState, useMemo } from "react";
import usePortal from "react-useportal";

import { Button, Flex } from "@chakra-ui/core";

import { initialNBlogs } from "../../constants";
import { BlogProps, ExtraBlogPost } from "../../pages/index";

let nSlideState = initialNBlogs;

const nMorePosts = 4;

export const MoreBlogPosts: FC<{
  blogPosts: BlogProps["blogList"]["nodes"];
}> = ({ blogPosts }) => {
  const { Portal } = usePortal();
  const [nSlice, setNSlice] = useState(nSlideState);

  const addMorePosts = useCallback(() => {
    setNSlice((n) => {
      return (nSlideState = n += nMorePosts);
    });
  }, []);

  const blogPostsSlice = blogPosts.slice(initialNBlogs, nSlice);

  const ButtonPortal = useMemo(() => {
    return (
      <Portal>
        <Flex margin="15px" justifyContent="center">
          <Button leftIcon="add" onClick={addMorePosts} variantColor="blue">
            More Blog Posts
          </Button>
        </Flex>
      </Portal>
    );
  }, []);

  return (
    <>
      {blogPostsSlice.map((blog) => {
        return <ExtraBlogPost key={blog._id} blog={blog} />;
      })}

      {nSlice < blogPosts.length && ButtonPortal}
    </>
  );
};

export default MoreBlogPosts;
