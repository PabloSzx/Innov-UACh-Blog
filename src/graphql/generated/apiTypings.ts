import { ObjectId } from "mongodb";

import { core } from "@nexus/schema";
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    objectId<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.ScalarInputFieldConfig<
        core.GetGen3<"inputTypes", TypeName, FieldName>
      >
    ): void; // "ObjectId";
    dateTime<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.ScalarInputFieldConfig<
        core.GetGen3<"inputTypes", TypeName, FieldName>
      >
    ): void; // "DateTime";
    nonNegativeInt<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.ScalarInputFieldConfig<
        core.GetGen3<"inputTypes", TypeName, FieldName>
      >
    ): void; // "NonNegativeInt";
    positiveInt<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.ScalarInputFieldConfig<
        core.GetGen3<"inputTypes", TypeName, FieldName>
      >
    ): void; // "PositiveInt";
    url<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.ScalarInputFieldConfig<
        core.GetGen3<"inputTypes", TypeName, FieldName>
      >
    ): void; // "URL";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    objectId<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "ObjectId";
    dateTime<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "DateTime";
    nonNegativeInt<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "NonNegativeInt";
    positiveInt<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "PositiveInt";
    url<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "URL";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  BlogCreate: {
    // input type
    author?: string | null; // String
    content: string; // String!
    lead?: string | null; // String
    mainImage?: string | null; // URL
    mainImageAlt?: string | null; // String
    metaDescription?: string | null; // String
    metaSection?: string | null; // String
    title: string; // String!
    urlSlug: string; // String!
  };
  BlogFilter: {
    // input type
    maxDate?: Date | null; // DateTime
    minDate?: Date | null; // DateTime
    urlSlug?: string | null; // String
  };
  BlogSortValue: {
    // input type
    direction: NexusGenEnums["SortDirection"]; // SortDirection!
    field: NexusGenEnums["BlogSortField"]; // BlogSortField!
  };
  BlogUpdate: {
    // input type
    _id: ObjectId; // ObjectId!
    author?: string | null; // String
    content: string; // String!
    lead?: string | null; // String
    mainImage?: string | null; // URL
    mainImageAlt?: string | null; // String
    metaDescription?: string | null; // String
    metaSection?: string | null; // String
    title: string; // String!
    urlSlug: string; // String!
  };
  PaginationArgs: {
    // input type
    limit?: number | null; // PositiveInt
    skip?: number | null; // NonNegativeInt
  };
}

export interface NexusGenEnums {
  BlogSortField: "createdAt" | "title" | "updatedAt" | "urlSlug";
  SortDirection: "ASC" | "DESC";
}

export interface NexusGenRootTypes {
  Blog: {
    // root type
    _id: ObjectId; // ObjectId!
    author?: string | null; // String
    content: string; // String!
    createdAt: Date; // DateTime!
    lead?: string | null; // String
    mainImage?: string | null; // URL
    mainImageAlt?: string | null; // String
    metaDescription?: string | null; // String
    metaSection?: string | null; // String
    title: string; // String!
    updatedAt: Date; // DateTime!
    urlSlug: string; // String!
  };
  BlogNodes: {
    // root type
    nodes: NexusGenRootTypes["Blog"][]; // [Blog!]!
    pageInfo: NexusGenRootTypes["PageInfo"]; // PageInfo!
  };
  Mutation: {};
  PageInfo: {
    // root type
    hasNextPage: boolean; // Boolean!
    pageCount: number; // NonNegativeInt!
    totalCount: number; // NonNegativeInt!
    totalPages: number; // NonNegativeInt!
  };
  Query: {};
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: Date;
  NonNegativeInt: number;
  ObjectId: ObjectId;
  PositiveInt: number;
  URL: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  BlogCreate: NexusGenInputs["BlogCreate"];
  BlogFilter: NexusGenInputs["BlogFilter"];
  BlogSortValue: NexusGenInputs["BlogSortValue"];
  BlogUpdate: NexusGenInputs["BlogUpdate"];
  PaginationArgs: NexusGenInputs["PaginationArgs"];
  BlogSortField: NexusGenEnums["BlogSortField"];
  SortDirection: NexusGenEnums["SortDirection"];
}

export interface NexusGenFieldTypes {
  Blog: {
    // field return type
    _id: ObjectId; // ObjectId!
    author: string | null; // String
    content: string; // String!
    createdAt: Date; // DateTime!
    lead: string | null; // String
    mainImage: string | null; // URL
    mainImageAlt: string | null; // String
    metaDescription: string | null; // String
    metaSection: string | null; // String
    title: string; // String!
    updatedAt: Date; // DateTime!
    urlSlug: string; // String!
  };
  BlogNodes: {
    // field return type
    nodes: NexusGenRootTypes["Blog"][]; // [Blog!]!
    pageInfo: NexusGenRootTypes["PageInfo"]; // PageInfo!
  };
  Mutation: {
    // field return type
    createBlog: NexusGenRootTypes["Blog"]; // Blog!
    enablePreviewMode: boolean; // Boolean!
    login: boolean; // Boolean!
    logout: boolean; // Boolean!
    updateBlog: NexusGenRootTypes["Blog"] | null; // Blog
  };
  PageInfo: {
    // field return type
    hasNextPage: boolean; // Boolean!
    pageCount: number; // NonNegativeInt!
    totalCount: number; // NonNegativeInt!
    totalPages: number; // NonNegativeInt!
  };
  Query: {
    // field return type
    blog: NexusGenRootTypes["Blog"] | null; // Blog
    blogList: NexusGenRootTypes["BlogNodes"]; // BlogNodes!
    currentUser: boolean; // Boolean!
    dateNow: Date; // DateTime!
    slugUrls: string[]; // [String!]!
  };
}

export interface NexusGenArgTypes {
  Mutation: {
    createBlog: {
      // args
      blog: NexusGenInputs["BlogCreate"]; // BlogCreate!
    };
    login: {
      // args
      token: string; // String!
    };
    updateBlog: {
      // args
      blog: NexusGenInputs["BlogUpdate"]; // BlogUpdate!
    };
  };
  Query: {
    blog: {
      // args
      _id?: ObjectId | null; // ObjectId
      slug?: string | null; // String
    };
    blogList: {
      // args
      filter?: NexusGenInputs["BlogFilter"] | null; // BlogFilter
      pagination?: NexusGenInputs["PaginationArgs"] | null; // PaginationArgs
      sort?: NexusGenInputs["BlogSortValue"][] | null; // [BlogSortValue!]
    };
  };
}

export interface NexusGenAbstractResolveReturnTypes {}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames =
  | "Blog"
  | "BlogNodes"
  | "Mutation"
  | "PageInfo"
  | "Query";

export type NexusGenInputNames =
  | "BlogCreate"
  | "BlogFilter"
  | "BlogSortValue"
  | "BlogUpdate"
  | "PaginationArgs";

export type NexusGenEnumNames = "BlogSortField" | "SortDirection";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames =
  | "Boolean"
  | "DateTime"
  | "Float"
  | "ID"
  | "Int"
  | "NonNegativeInt"
  | "ObjectId"
  | "PositiveInt"
  | "String"
  | "URL";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: {};
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes:
    | NexusGenTypes["inputNames"]
    | NexusGenTypes["enumNames"]
    | NexusGenTypes["scalarNames"];
  allOutputTypes:
    | NexusGenTypes["objectNames"]
    | NexusGenTypes["enumNames"]
    | NexusGenTypes["unionNames"]
    | NexusGenTypes["interfaceNames"]
    | NexusGenTypes["scalarNames"];
  allNamedTypes:
    | NexusGenTypes["allInputTypes"]
    | NexusGenTypes["allOutputTypes"];
  abstractTypes: NexusGenTypes["interfaceNames"] | NexusGenTypes["unionNames"];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginSchemaConfig {}
}
