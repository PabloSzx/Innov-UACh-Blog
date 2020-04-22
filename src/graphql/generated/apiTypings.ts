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

export interface NexusGenInputs {}

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

export interface NexusGenAllTypes extends NexusGenRootTypes {}

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
    ok: boolean; // Boolean!
  };
  Query: {
    // field return type
    blog: NexusGenRootTypes["Blog"] | null; // Blog
    dateNow: Date; // DateTime!
  };
}

export interface NexusGenArgTypes {}

export interface NexusGenAbstractResolveReturnTypes {}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Blog" | "Mutation" | "Query";

export type NexusGenInputNames = never;

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
