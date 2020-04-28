import { FC, useCallback, useMemo, useState } from "react";
import usePortal from "react-useportal";

import { Button, Flex } from "@chakra-ui/core";

import { initialNBlogs } from "../../constants";
import { BlogProps, ExtraBlogPost } from "../../pages";

let nSlideState = initialNBlogs;

const nMorePosts = 4;

export const MoreBlogPosts: FC<{
  blogPosts: BlogProps["blogList"]["nodes"];
}> = ({ blogPosts }) => {
  const bindTo = useMemo(() => {
    return document.querySelector<HTMLDivElement>("#preFooter") || undefined;
  }, []);

  const { Portal } = usePortal({
    bindTo,
  });

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
