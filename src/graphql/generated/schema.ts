// @ts-nocheck
import * as extensions from "../extensions";
import { lazyGetters } from "@gqless/utils";
import {
  ObjectNode,
  FieldNode,
  ArrayNode,
  Arguments,
  ArgumentsField,
  ScalarNode,
  InputNode,
  InputNodeField,
  EnumNode,
} from "gqless";

export const schema = {
  get Query() {
    return new ObjectNode(
      {
        get currentUser() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get slugUrls() {
          return new FieldNode(
            new ArrayNode(schema.String, false),
            undefined,
            false
          );
        },
        get blog() {
          return new FieldNode(
            schema.Blog,
            new Arguments({
              get slug() {
                return new ArgumentsField(schema.String, true);
              },
              get _id() {
                return new ArgumentsField(schema.ObjectId, true);
              },
            }),
            true
          );
        },
        get blogList() {
          return new FieldNode(
            schema.BlogNodes,
            new Arguments({
              get pagination() {
                return new ArgumentsField(schema.PaginationArgs, true);
              },
              get filter() {
                return new ArgumentsField(schema.BlogFilter, true);
              },
              get sort() {
                return new ArgumentsField(
                  new ArrayNode(schema.BlogSortValue, true),
                  true
                );
              },
            }),
            false
          );
        },
        get dateNow() {
          return new FieldNode(schema.DateTime, undefined, false);
        },
      },
      { name: "Query", extension: ((extensions as any) || {}).Query }
    );
  },
  get Boolean() {
    return new ScalarNode({
      name: "Boolean",
      extension: ((extensions as any) || {}).Boolean,
    });
  },
  get String() {
    return new ScalarNode({
      name: "String",
      extension: ((extensions as any) || {}).String,
    });
  },
  get ObjectId() {
    return new ScalarNode({
      name: "ObjectId",
      extension: ((extensions as any) || {}).ObjectId,
    });
  },
  get Blog() {
    return new ObjectNode(
      {
        get _id() {
          return new FieldNode(schema.ObjectId, undefined, false);
        },
        get title() {
          return new FieldNode(schema.String, undefined, false);
        },
        get lead() {
          return new FieldNode(schema.String, undefined, true);
        },
        get content() {
          return new FieldNode(schema.String, undefined, false);
        },
        get urlSlug() {
          return new FieldNode(schema.String, undefined, false);
        },
        get mainImage() {
          return new FieldNode(schema.URL, undefined, true);
        },
        get mainImageAlt() {
          return new FieldNode(schema.String, undefined, true);
        },
        get author() {
          return new FieldNode(schema.String, undefined, true);
        },
        get metaDescription() {
          return new FieldNode(schema.String, undefined, true);
        },
        get metaSection() {
          return new FieldNode(schema.String, undefined, true);
        },
        get updatedAt() {
          return new FieldNode(schema.DateTime, undefined, false);
        },
        get createdAt() {
          return new FieldNode(schema.DateTime, undefined, false);
        },
      },
      { name: "Blog", extension: ((extensions as any) || {}).Blog }
    );
  },
  get URL() {
    return new ScalarNode({
      name: "URL",
      extension: ((extensions as any) || {}).URL,
    });
  },
  get DateTime() {
    return new ScalarNode({
      name: "DateTime",
      extension: ((extensions as any) || {}).DateTime,
    });
  },
  get PaginationArgs() {
    return new InputNode(
      {
        get skip() {
          return new InputNodeField(schema.NonNegativeInt, true);
        },
        get limit() {
          return new InputNodeField(schema.PositiveInt, true);
        },
      },
      { name: "PaginationArgs" }
    );
  },
  get NonNegativeInt() {
    return new ScalarNode({
      name: "NonNegativeInt",
      extension: ((extensions as any) || {}).NonNegativeInt,
    });
  },
  get PositiveInt() {
    return new ScalarNode({
      name: "PositiveInt",
      extension: ((extensions as any) || {}).PositiveInt,
    });
  },
  get BlogFilter() {
    return new InputNode(
      {
        get urlSlug() {
          return new InputNodeField(schema.String, true);
        },
        get minDate() {
          return new InputNodeField(schema.DateTime, true);
        },
        get maxDate() {
          return new InputNodeField(schema.DateTime, true);
        },
      },
      { name: "BlogFilter" }
    );
  },
  get BlogSortValue() {
    return new InputNode(
      {
        get field() {
          return new InputNodeField(schema.BlogSortField, false);
        },
        get direction() {
          return new InputNodeField(schema.SortDirection, false);
        },
      },
      { name: "BlogSortValue" }
    );
  },
  get BlogSortField() {
    return new EnumNode({ name: "BlogSortField" });
  },
  get SortDirection() {
    return new EnumNode({ name: "SortDirection" });
  },
  get BlogNodes() {
    return new ObjectNode(
      {
        get pageInfo() {
          return new FieldNode(schema.PageInfo, undefined, false);
        },
        get nodes() {
          return new FieldNode(
            new ArrayNode(schema.Blog, false),
            undefined,
            false
          );
        },
      },
      { name: "BlogNodes", extension: ((extensions as any) || {}).BlogNodes }
    );
  },
  get PageInfo() {
    return new ObjectNode(
      {
        get hasNextPage() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get pageCount() {
          return new FieldNode(schema.NonNegativeInt, undefined, false);
        },
        get totalCount() {
          return new FieldNode(schema.NonNegativeInt, undefined, false);
        },
        get totalPages() {
          return new FieldNode(schema.NonNegativeInt, undefined, false);
        },
      },
      { name: "PageInfo", extension: ((extensions as any) || {}).PageInfo }
    );
  },
  get Mutation() {
    return new ObjectNode(
      {
        get enablePreviewMode() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get logout() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get login() {
          return new FieldNode(
            schema.Boolean,
            new Arguments(
              {
                get token() {
                  return new ArgumentsField(schema.String, false);
                },
              },
              true
            ),
            false
          );
        },
        get createBlog() {
          return new FieldNode(
            schema.Blog,
            new Arguments(
              {
                get blog() {
                  return new ArgumentsField(schema.BlogCreate, false);
                },
              },
              true
            ),
            false
          );
        },
        get deleteBlog() {
          return new FieldNode(
            schema.Boolean,
            new Arguments(
              {
                get blog() {
                  return new ArgumentsField(schema.ObjectId, false);
                },
              },
              true
            ),
            false
          );
        },
        get updateBlog() {
          return new FieldNode(
            schema.Blog,
            new Arguments(
              {
                get blog() {
                  return new ArgumentsField(schema.BlogUpdate, false);
                },
              },
              true
            ),
            true
          );
        },
      },
      { name: "Mutation", extension: ((extensions as any) || {}).Mutation }
    );
  },
  get BlogCreate() {
    return new InputNode(
      {
        get title() {
          return new InputNodeField(schema.String, false);
        },
        get lead() {
          return new InputNodeField(schema.String, true);
        },
        get content() {
          return new InputNodeField(schema.String, false);
        },
        get urlSlug() {
          return new InputNodeField(schema.String, false);
        },
        get mainImage() {
          return new InputNodeField(schema.URL, true);
        },
        get mainImageAlt() {
          return new InputNodeField(schema.String, true);
        },
        get author() {
          return new InputNodeField(schema.String, true);
        },
        get metaDescription() {
          return new InputNodeField(schema.String, true);
        },
        get metaSection() {
          return new InputNodeField(schema.String, true);
        },
      },
      { name: "BlogCreate" }
    );
  },
  get BlogUpdate() {
    return new InputNode(
      {
        get _id() {
          return new InputNodeField(schema.ObjectId, false);
        },
        get title() {
          return new InputNodeField(schema.String, false);
        },
        get lead() {
          return new InputNodeField(schema.String, true);
        },
        get content() {
          return new InputNodeField(schema.String, false);
        },
        get urlSlug() {
          return new InputNodeField(schema.String, false);
        },
        get mainImage() {
          return new InputNodeField(schema.URL, true);
        },
        get mainImageAlt() {
          return new InputNodeField(schema.String, true);
        },
        get author() {
          return new InputNodeField(schema.String, true);
        },
        get metaDescription() {
          return new InputNodeField(schema.String, true);
        },
        get metaSection() {
          return new InputNodeField(schema.String, true);
        },
      },
      { name: "BlogUpdate" }
    );
  },
  get __Schema() {
    return new ObjectNode(
      {
        get types() {
          return new FieldNode(
            new ArrayNode(schema.__Type, false),
            undefined,
            false
          );
        },
        get queryType() {
          return new FieldNode(schema.__Type, undefined, false);
        },
        get mutationType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
        get subscriptionType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
        get directives() {
          return new FieldNode(
            new ArrayNode(schema.__Directive, false),
            undefined,
            false
          );
        },
      },
      { name: "__Schema", extension: ((extensions as any) || {}).__Schema }
    );
  },
  get __Type() {
    return new ObjectNode(
      {
        get kind() {
          return new FieldNode(schema.__TypeKind, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, true);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get fields() {
          return new FieldNode(
            new ArrayNode(schema.__Field, true),
            new Arguments({
              get includeDeprecated() {
                return new ArgumentsField(schema.Boolean, true);
              },
            }),
            true
          );
        },
        get interfaces() {
          return new FieldNode(
            new ArrayNode(schema.__Type, true),
            undefined,
            true
          );
        },
        get possibleTypes() {
          return new FieldNode(
            new ArrayNode(schema.__Type, true),
            undefined,
            true
          );
        },
        get enumValues() {
          return new FieldNode(
            new ArrayNode(schema.__EnumValue, true),
            new Arguments({
              get includeDeprecated() {
                return new ArgumentsField(schema.Boolean, true);
              },
            }),
            true
          );
        },
        get inputFields() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, true),
            undefined,
            true
          );
        },
        get ofType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
      },
      { name: "__Type", extension: ((extensions as any) || {}).__Type }
    );
  },
  get __TypeKind() {
    return new EnumNode({ name: "__TypeKind" });
  },
  get __Field() {
    return new ObjectNode(
      {
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get args() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, false),
            undefined,
            false
          );
        },
        get type() {
          return new FieldNode(schema.__Type, undefined, false);
        },
        get isDeprecated() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get deprecationReason() {
          return new FieldNode(schema.String, undefined, true);
        },
      },
      { name: "__Field", extension: ((extensions as any) || {}).__Field }
    );
  },
  get __InputValue() {
    return new ObjectNode(
      {
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get type() {
          return new FieldNode(schema.__Type, undefined, false);
        },
        get defaultValue() {
          return new FieldNode(schema.String, undefined, true);
        },
      },
      {
        name: "__InputValue",
        extension: ((extensions as any) || {}).__InputValue,
      }
    );
  },
  get __EnumValue() {
    return new ObjectNode(
      {
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get isDeprecated() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get deprecationReason() {
          return new FieldNode(schema.String, undefined, true);
        },
      },
      {
        name: "__EnumValue",
        extension: ((extensions as any) || {}).__EnumValue,
      }
    );
  },
  get __Directive() {
    return new ObjectNode(
      {
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get locations() {
          return new FieldNode(
            new ArrayNode(schema.__DirectiveLocation, false),
            undefined,
            false
          );
        },
        get args() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, false),
            undefined,
            false
          );
        },
      },
      {
        name: "__Directive",
        extension: ((extensions as any) || {}).__Directive,
      }
    );
  },
  get __DirectiveLocation() {
    return new EnumNode({ name: "__DirectiveLocation" });
  },
};

lazyGetters(schema);
