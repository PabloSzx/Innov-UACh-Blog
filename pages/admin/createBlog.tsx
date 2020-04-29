import { Maybe, setCacheData } from "gqless-hooks";
import { loremIpsum } from "lorem-ipsum";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo, useState } from "react";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/core";

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

  const [isRedirecting, setIsRedirecting] = useState(false);

  const { push } = useRouter();

  const toast = useToast();

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

      const {
        _id,
        title,
        content,
        updatedAt,
        createdAt,
        urlSlug,
        mainImage,
        mainImageAlt,
        author,
        metaDescription,
        metaSection,
      } = blog;

      return {
        _id,
        title,
        content,
        updatedAt,
        createdAt,
        urlSlug,
        mainImage,
        mainImageAlt,
        author,
        metaDescription,
        metaSection,
      };
    },
    {
      onCompleted(createdBlogData) {
        if (createdBlogData?._id == null) return;

        toast({
          title: "Blog Post Created!",
          status: "success",
          description: "You are being redirected...",
          duration: 5000,
        });
        setCacheData("blogsPaginated", (prevData) => {
          if (!prevData) return null;

          return {
            hasNextPage: prevData.hasNextPage,
            nodes: [createdBlogData, ...prevData.nodes],
          };
        });
        setCacheData("edit_" + createdBlogData.urlSlug, createdBlogData);

        push("/blog/[slug]", `/blog/${createdBlogData.urlSlug}`);
        setIsRedirecting(true);
      },
    }
  );

  const onCorrectSubmit = useCallback<
    (data: BlogEditCreatePostProps) => Promise<Maybe<BlogEditCreatePostProps>>
  >(
    async ({ _id, ...blog }) => {
      return await createBlog({
        variables: blog,
      });
    },
    [createBlog]
  );

  const isFetchLoading = createFetchState === "loading";

  const SubmitButton = useCallback<FC>(() => {
    return (
      <>
        <Button
          marginBottom="5px"
          variantColor="blue"
          type="submit"
          isDisabled={isFetchLoading}
          isLoading={isFetchLoading}
        >
          Create Blog
        </Button>
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
      </>
    );
  }, [isFetchLoading, createBlogErrors]);

  if (isCurrentUserLoading || isRedirecting)
    return <Spinner size="xl" margin="50px" />;

  return (
    <>
      <Head key={0}>
        <title>Admin Blog Post Creation</title>
      </Head>
      <Stack margin="15px">
        <BlogPostForm
          blog={defaultValues}
          onCorrectSubmit={onCorrectSubmit}
          children={SubmitButton}
        />
      </Stack>
    </>
  );
};

export default CreateBlogPage;
