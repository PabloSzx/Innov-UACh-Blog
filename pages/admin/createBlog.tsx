import { loremIpsum } from "lorem-ipsum";
import ms from "ms";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/core";

import { BlogPost, BlogPostProps } from "../../src/components/BlogPost";
import { BlogCreate, useMutation } from "../../src/graphql";
import { useAdminAuth } from "../../src/hooks/adminAuth";

const CreateBlogPage: NextPage = () => {
  const { isCurrentUserLoading } = useAdminAuth({
    requireAdmin: true,
  });
  const { register, handleSubmit, errors, watch, setValue } = useForm<
    BlogCreate
  >({
    defaultValues: {
      title: loremIpsum({
        count: 3,
        units: "words",
      }),
      lead: loremIpsum({
        count: 10,
      }),
      content: loremIpsum({
        count: 40,
      }),
      urlSlug: loremIpsum({
        count: 2,
        units: "words",
      }),
    },
  });

  const onSubmit = useCallback(
    handleSubmit((data) => {
      const { title, lead, content, urlSlug } = data;

      createBlog({
        variables: {
          title,
          lead,
          content,
          urlSlug,
        },
      });
    }),
    [handleSubmit]
  );

  const { push } = useRouter();

  const [createBlog, { errors: createBlogErrors, fetchState }] = useMutation(
    (
      { createBlog },
      blogVariables: BlogCreate
    ): gqlessHooksPool["blogsPaginated"]["data"][number] => {
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
      onCompleted(data, hooksPool) {
        if (data?._id) {
          hooksPool.blogsPaginated?.setData((prevData) => {
            if (prevData) {
              return [...prevData, data];
            }

            return prevData;
          });

          push("/blog/[slug]", `/blog/${data.urlSlug}`);
        }
      },
    }
  );

  const [previewState, setPreviewState] = useState<BlogPostProps["blog"]>();

  if (isCurrentUserLoading) return null;

  return (
    <Stack>
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

      <form onSubmit={onSubmit}>
        <Stack margin="20px">
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              ref={register({
                required: "You have to specify a title",
                minLength: {
                  value: 3,
                  message: "It should be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "It should be at most 50 characters",
                },
              })}
            />
            <FormHelperText>Blog Title</FormHelperText>
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.lead}>
            <FormLabel>Lead</FormLabel>
            <Textarea height="100px" name="lead" ref={register} />
            <FormHelperText>
              Blog lead, it can be <b>Markdown</b> / <b>HTML</b> / <b>JSX</b>
            </FormHelperText>
            <FormErrorMessage>{errors.lead?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.content}>
            <FormLabel>Content</FormLabel>
            <Textarea
              height="300px"
              resize="vertical"
              name="content"
              ref={register({ required: "You have to specify the content" })}
            />
            <FormHelperText>
              Blog Content, it can be <b>Markdown</b> / <b>HTML</b> / <b>JSX</b>
            </FormHelperText>
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.urlSlug}>
            <FormLabel>URL Slug</FormLabel>
            <Input
              name="urlSlug"
              ref={register({
                required: "You have to specify an URL Slug",
                minLength: {
                  value: 3,
                  message: "It has to be at least 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "It has to be at most 30 characters",
                },
              })}
            />
            <FormHelperText>
              This is the path used to reference the blog, used in the URL.{" "}
              <b>It has to be unique.</b>{" "}
              <i>
                It will automatically convert into an HTTP friendly string if
                necessary
              </i>
            </FormHelperText>
            <FormErrorMessage>{errors.urlSlug?.message}</FormErrorMessage>
          </FormControl>

          <Button
            variantColor="blue"
            type="submit"
            isDisabled={fetchState === "loading"}
            isLoading={fetchState === "loading"}
            onClick={() => {
              setValue("urlSlug", slugify(watch("urlSlug"), { strict: true }));
            }}
          >
            Crear Blog
          </Button>
          <Button
            variantColor="green"
            type="button"
            onClick={() => {
              setValue("urlSlug", slugify(watch("urlSlug"), { strict: true }));
              const { title, lead, content } = watch();
              setPreviewState({
                title,
                lead,
                content,
                createdAt: new Date(Date.now() - ms("1 day")).toISOString(),
                updatedAt: new Date().toISOString(),
              });
            }}
          >
            Preview Blog
          </Button>
        </Stack>
      </form>

      <Divider />

      {previewState && <BlogPost blog={previewState} />}
    </Stack>
  );
};

export default CreateBlogPage;
