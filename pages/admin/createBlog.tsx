import { Maybe, setCacheData } from "gqless-hooks";
import { loremIpsum } from "lorem-ipsum";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Stack,
  Spinner,
} from "@chakra-ui/core";

import { AdminNavigation } from "../../src/components/AdminNavigation";
import {
  BlogEditCreatePostProps,
  BlogPostForm,
} from "../../src/components/BlogPostForm";
import { BlogCreate, useMutation } from "../../src/graphql";
import { useAdminAuth } from "../../src/hooks/adminAuth";

const CreateBlogPage: NextPage = () => {
  const { isCurrentUserLoading } = useAdminAuth({
    requireAdmin: true,
  });
  const defaultValues = useMemo(() => {
    return {
      title: loremIpsum({
        count: 3,
        units: "words",
      }),
      lead: loremIpsum({
        count: 5,
      }),
      content: loremIpsum({
        count: 40,
      }),
      urlSlug: loremIpsum({
        count: 2,
        units: "words",
      }),
    };
  }, []);

  const { push } = useRouter();

  const [
    createBlog,
    { errors: createBlogErrors, fetchState: createFetchState },
  ] = useMutation(
    (
      { createBlog },
      blogVariables: BlogCreate
    ): gqlessSharedCache["blogsPaginated"]["nodes"][number] => {
      const blog = createBlog({
        blog: blogVariables,
      });

      return {
        _id: blog._id,
        title: blog.title,
        content: blog.content,
        updatedAt: blog.updatedAt,
        createdAt: blog.createdAt,
        urlSlug: blog.urlSlug,
      };
    },
    {
      onCompleted(createdBlogData) {
        if (createdBlogData == null) return;

        setCacheData("blogsPaginated", (prevData) => {
          if (!prevData) return null;

          return {
            hasNextPage: prevData.hasNextPage,
            nodes: [createdBlogData, ...prevData.nodes],
          };
        });
        setCacheData("edit_" + createdBlogData.urlSlug, createdBlogData);

        push("/blog/[slug]", `/blog/${createdBlogData.urlSlug}`);
      },
    }
  );

  const onCorrectSubmit = useCallback<
    (data: BlogEditCreatePostProps) => Promise<Maybe<BlogEditCreatePostProps>>
  >(
    async (data) => {
      let { title, lead, content, urlSlug } = data;

      return await createBlog({
        variables: {
          title,
          lead,
          content,
          urlSlug,
        },
      });
    },
    [createBlog]
  );

  const isFetchLoading = createFetchState === "loading";

  const SubmitButton = useCallback<FC>(() => {
    return (
      <Button
        marginBottom="5px"
        variantColor="blue"
        type="submit"
        isDisabled={isFetchLoading}
        isLoading={isFetchLoading}
      >
        Create Blog
      </Button>
    );
  }, [isFetchLoading]);

  if (isCurrentUserLoading) return <Spinner size="xl" margin="50px" />;

  return (
    <Stack margin="15px">
      <AdminNavigation />
      <Stack alignSelf="center">
        {createBlogErrors &&
          createBlogErrors.map((error, key) => {
            return (
              <Alert
                textAlign="center"
                margin="10px"
                status="error"
                key={key}
                borderRadius="5px"
              >
                <AlertIcon />
                <AlertTitle mr={2}>Error!</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            );
          })}
      </Stack>

      <BlogPostForm
        blog={defaultValues}
        onCorrectSubmit={onCorrectSubmit}
        children={SubmitButton}
      />
    </Stack>
  );
};

export default CreateBlogPage;
