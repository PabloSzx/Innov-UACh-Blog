import { Maybe } from "gqless-hooks";
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

import { ONE_DAY_MS } from "../../constants";
import { BlogCreate, BlogUpdate } from "../graphql";
import { BlogPost, BlogPostProps } from "./BlogPost";

export type BlogEditCreatePostProps = BlogCreate &
  Partial<Pick<BlogUpdate, "_id">>;

const createdAt = new Date(Date.now() - ONE_DAY_MS).toISOString();
const updatedAt = new Date().toISOString();

const nestTrue = { nest: true };

export const PreviewBlog: FC = memo(() => {
  const { watch } = useFormContext();

  const [previewState, setPreviewState] = useState<BlogPostProps["blog"]>();

  useEffect(() => {
    const checkSetState = () => {
      const {
        title,
        lead,
        content,
        mainImage,
        mainImageAlt,
        author,
        metaDescription,
        metaSection,
      } = watch(nestTrue);

      if (
        previewState != null &&
        content === previewState.content &&
        lead === previewState.lead &&
        title === previewState.title &&
        mainImage === previewState.mainImage &&
        author === author
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
        mainImage,
        mainImageAlt,
        author,
        metaDescription,
        metaSection,
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
    handleSubmit(
      ({
        title,
        lead,
        content,
        urlSlug,
        mainImage,
        mainImageAlt,
        author,
        metaDescription,
        metaSection,
      }) => {
        title = title.trim();
        lead = lead?.trim() || null;
        content = content.trim();
        mainImage = mainImage?.trim() || null;
        urlSlug = slugify(urlSlug.trim(), {
          strict: true,
        });
        mainImageAlt = mainImageAlt?.trim() || null;
        author = author?.trim() || null;
        metaDescription = metaDescription?.trim() || null;
        metaSection = metaSection?.trim() || null;

        const formData = {
          title,
          lead,
          content,
          urlSlug,
          mainImage,
          mainImageAlt,
          author,
          metaDescription,
          metaSection,
        };

        reset(formData);

        onCorrectSubmitRef
          .current({
            _id: blog?._id,
            ...formData,
          })
          .then((newData) => {
            if (newData?._id) reset(newData);
          });
      }
    ),
    [handleSubmit]
  );

  return (
    <form onSubmit={onSubmit}>
      <Stack margin="20px">
        <FormControl isRequired isInvalid={!!errors.title}>
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

        <FormControl isInvalid={!!errors.mainImage}>
          <FormLabel>Main Image</FormLabel>
          <Input name="mainImage" type="url" ref={register({})} />
          <FormHelperText>
            Main image used in blog post preview and page
          </FormHelperText>
          <FormErrorMessage>{errors.mainImage?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.mainImageAlt}>
          <FormLabel>Main Image Alt</FormLabel>
          <Input name="mainImageAlt" ref={register({})} />
          <FormHelperText>
            Text used as image description, for accessibility and SEO
          </FormHelperText>
          <FormErrorMessage>{errors.mainImageAlt?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.author}>
          <FormLabel>Author</FormLabel>
          <Input
            name="author"
            ref={register({
              maxLength: {
                value: 25,
                message: "The author should be at most 25 characters",
              },
            })}
          />
          <FormHelperText>Author mentioned in the blog post</FormHelperText>
          <FormErrorMessage>{errors.author?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lead}>
          <FormLabel>Lead</FormLabel>
          <Textarea height="100px" name="lead" ref={register} />
          <FormHelperText>
            Blog lead, it can be <b>Markdown</b> / <b>HTML</b> / <b>JSX</b>
          </FormHelperText>
          <FormErrorMessage>{errors.lead?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.content}>
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

        <FormControl isRequired isInvalid={!!errors.urlSlug}>
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

        <FormControl isInvalid={!!errors.metaDescription}>
          <FormLabel>Meta Description</FormLabel>
          <Input
            name="metaDescription"
            ref={register({
              maxLength: {
                value: 100,
                message: "This description should be at most 100 characters",
              },
            })}
          />
          <FormHelperText>
            Meta description used for SEO purposes, it has to be plain text
          </FormHelperText>
          <FormErrorMessage>{errors.metaDescription?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.metaSection}>
          <FormLabel>Meta Section</FormLabel>
          <Input
            name="metaSection"
            ref={register({
              maxLength: {
                value: 30,
                message: "This section should be at most 30 characters",
              },
            })}
          />
          <FormHelperText>
            Meta section used for SEO purposes, for example: "Technology"
          </FormHelperText>
          <FormErrorMessage>{errors.metaSection?.message}</FormErrorMessage>
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
