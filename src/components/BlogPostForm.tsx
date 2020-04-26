import { Maybe } from "gqless-hooks";
import ms from "ms";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { FormContext, useForm, useFormContext } from "react-hook-form";
import slugify from "slugify";

import {
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/core";

import { BlogCreate, BlogUpdate } from "../graphql";
import { BlogPost, BlogPostProps } from "./BlogPost";

export type BlogEditCreatePostProps = BlogCreate &
  Partial<Pick<BlogUpdate, "_id">>;

const createdAt = new Date(Date.now() - ms("1 day")).toISOString();
const updatedAt = new Date().toISOString();

const nestTrue = { nest: true };

export const PreviewBlog: FC = memo(() => {
  const { watch } = useFormContext();

  const [previewState, setPreviewState] = useState<BlogPostProps["blog"]>();

  useEffect(() => {
    const checkSetState = () => {
      const { title, lead, content } = watch(nestTrue);

      if (
        previewState != null &&
        content === previewState.content &&
        lead === previewState.lead &&
        title === previewState.title
      ) {
        return;
      }
      clearInterval(autoRefresh);
      setPreviewState({
        title,
        lead,
        content,
        createdAt,
        updatedAt,
      });
    };

    checkSetState();

    const autoRefresh = setInterval(checkSetState, 1500);

    return () => {
      clearInterval(autoRefresh);
    };
  }, [previewState]);

  if (previewState == null) return null;

  return <BlogPost blog={previewState} />;
});

export const BlogPostForm: FC<{
  blog: BlogEditCreatePostProps;
  children?: FC;
  onCorrectSubmit: (
    data: BlogEditCreatePostProps
  ) => Promise<Maybe<BlogEditCreatePostProps>>;
}> = memo(({ blog, onCorrectSubmit, children: Children }) => {
  const onCorrectSubmitRef = useRef(onCorrectSubmit);
  onCorrectSubmitRef.current = onCorrectSubmit;

  const formMethods = useForm<BlogCreate>({
    defaultValues: blog,
  });

  const { register, handleSubmit, errors, reset } = formMethods;

  const onSubmit = useCallback(
    handleSubmit((data) => {
      let { title, lead, content, urlSlug } = data;

      title = title.trim();
      lead = lead?.trim();
      content = content.trim();
      urlSlug = slugify(urlSlug.trim(), {
        strict: true,
      });

      reset({
        title,
        lead,
        content,
        urlSlug,
      });

      onCorrectSubmitRef
        .current({
          _id: blog?._id,
          title,
          lead,
          content,
          urlSlug,
        })
        .then((newData) => {
          if (newData) reset(newData);
        });
    }),
    [handleSubmit]
  );

  return (
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

        <FormContext {...formMethods}>
          {Children && <Children />}

          <Divider width="100%" />

          <PreviewBlog />
        </FormContext>
      </Stack>
    </form>
  );
});
