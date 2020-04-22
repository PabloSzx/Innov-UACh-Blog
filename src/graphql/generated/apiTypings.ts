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
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  BlogCreate: {
    // input type
    content: string; // String!
    lead?: string | null; // String
    title: string; // String!
    urlSlug: string; // String!
  };
  BlogFilter: {
    // input type
    maxDate?: Date | null; // DateTime
    minDate?: Date | null; // DateTime
    urlSlug?: string | null; // String
  };
  BlogUpdate: {
    // input type
    _id: ObjectId; // ObjectId!
    content: string; // String!
    lead?: string | null; // String
    title: string; // String!
    urlSlug: string; // String!
  };
}

export interface NexusGenEnums {}

export interface NexusGenRootTypes {
  Blog: {
    // root type
    _id: ObjectId; // ObjectId!
    content: string; // String!
    createdAt: Date; // DateTime!
    lead?: string | null; // String
    title: string; // String!
    updatedAt: Date; // DateTime!
    urlSlug: string; // String!
  };
  Mutation: {};
  Query: {};
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: Date;
  ObjectId: ObjectId;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  BlogCreate: NexusGenInputs["BlogCreate"];
  BlogFilter: NexusGenInputs["BlogFilter"];
  BlogUpdate: NexusGenInputs["BlogUpdate"];
}

export interface NexusGenFieldTypes {
  Blog: {
    // field return type
    _id: ObjectId; // ObjectId!
    content: string; // String!
    createdAt: Date; // DateTime!
    lead: string | null; // String
    title: string; // String!
    updatedAt: Date; // DateTime!
    urlSlug: string; // String!
  };
  Mutation: {
    // field return type
    createBlog: NexusGenRootTypes["Blog"]; // Blog!
    updateBlog: NexusGenRootTypes["Blog"] | null; // Blog
  };
  Query: {
    // field return type
    blog: NexusGenRootTypes["Blog"] | null; // Blog
    blogList: NexusGenRootTypes["Blog"][]; // [Blog!]!
    dateNow: Date; // DateTime!
  };
}

export interface NexusGenArgTypes {
  Mutation: {
    createBlog: {
      // args
      blog: NexusGenInputs["BlogCreate"]; // BlogCreate!
    };
    updateBlog: {
      // args
      blog: NexusGenInputs["BlogUpdate"]; // BlogUpdate!
    };
  };
  Query: {
    blog: {
      // args
      id: ObjectId; // ObjectId!
    };
    blogList: {
      // args
      filter?: NexusGenInputs["BlogFilter"] | null; // BlogFilter
      limit?: number | null; // Int
      skip?: number | null; // Int
    };
  };
}

export interface NexusGenAbstractResolveReturnTypes {}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Blog" | "Mutation" | "Query";

export type NexusGenInputNames = "BlogCreate" | "BlogFilter" | "BlogUpdate";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames =
  | "Boolean"
  | "DateTime"
  | "Float"
  | "ID"
  | "Int"
  | "ObjectId"
  | "String";

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
