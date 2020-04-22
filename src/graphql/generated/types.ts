import * as extensions from "../extensions";
import {
  TypeData,
  FieldsType,
  ScalarType,
  FieldsTypeArg,
  EnumType,
} from "gqless";

type Extension<TName extends string> = TName extends keyof typeof extensions
  ? typeof extensions[TName]
  : any;

/**
 * @name Query
 * @type OBJECT
 */
type t_Query = FieldsType<
  {
    __typename: t_String<"Query">;
    blog?: t_Blog | null;
    dateNow: t_DateTime;
  },
  Extension<"Query">
>;

/**
 * @name Blog
 * @type OBJECT
 */
type t_Blog = FieldsType<
  {
    __typename: t_String<"Blog">;
    _id: t_ObjectId;
    title: t_String;
    lead?: t_String | null;
    content: t_String;
    urlSlug: t_String;
    updatedAt: t_DateTime;
    createdAt: t_DateTime;
  },
  Extension<"Blog">
>;

/**
 * @name ObjectId
 * @type SCALAR
 */
type t_ObjectId<T extends any = any> = ScalarType<T, Extension<"ObjectId">>;

/**
 * @name String
 * @type SCALAR
 */
type t_String<T extends string = string> = ScalarType<T, Extension<"String">>;

/**
 * @name DateTime
 * @type SCALAR
 */
type t_DateTime<T extends any = any> = ScalarType<T, Extension<"DateTime">>;

/**
 * @name Mutation
 * @type OBJECT
 */
type t_Mutation = FieldsType<
  {
    __typename: t_String<"Mutation">;
    ok: t_Boolean;
  },
  Extension<"Mutation">
>;

/**
 * @name Boolean
 * @type SCALAR
 */
type t_Boolean<T extends boolean = boolean> = ScalarType<
  T,
  Extension<"Boolean">
>;

/**
 * @name __Schema
 * @type OBJECT
 */
type t___Schema = FieldsType<
  {
    __typename: t_String<"__Schema">;

    /**
     * A list of all types supported by this server.
     */
    types: t___Type[];

    /**
     * The type that query operations will be rooted at.
     */
    queryType: t___Type;

    /**
     * If this server supports mutation, the type that mutation operations will be rooted at.
     */
    mutationType?: t___Type | null;

    /**
     * If this server support subscription, the type that subscription operations will be rooted at.
     */
    subscriptionType?: t___Type | null;

    /**
     * A list of all directives supported by this server.
     */
    directives: t___Directive[];
  },
  Extension<"__Schema">
>;

/**
 * @name __Type
 * @type OBJECT
 */
type t___Type = FieldsType<
  {
    __typename: t_String<"__Type">;
    kind: t___TypeKind;
    name?: t_String | null;
    description?: t_String | null;
    fields?: FieldsTypeArg<
      { includeDeprecated?: boolean | null },
      t___Field[] | null
    >;
    interfaces?: t___Type[] | null;
    possibleTypes?: t___Type[] | null;
    enumValues?: FieldsTypeArg<
      { includeDeprecated?: boolean | null },
      t___EnumValue[] | null
    >;
    inputFields?: t___InputValue[] | null;
    ofType?: t___Type | null;
  },
  Extension<"__Type">
>;

/**
 * @name __TypeKind
 * @type ENUM
 */
type t___TypeKind = EnumType<
  | "SCALAR"
  | "OBJECT"
  | "INTERFACE"
  | "UNION"
  | "ENUM"
  | "INPUT_OBJECT"
  | "LIST"
  | "NON_NULL"
>;

/**
 * @name __Field
 * @type OBJECT
 */
type t___Field = FieldsType<
  {
    __typename: t_String<"__Field">;
    name: t_String;
    description?: t_String | null;
    args: t___InputValue[];
    type: t___Type;
    isDeprecated: t_Boolean;
    deprecationReason?: t_String | null;
  },
  Extension<"__Field">
>;

/**
 * @name __InputValue
 * @type OBJECT
 */
type t___InputValue = FieldsType<
  {
    __typename: t_String<"__InputValue">;
    name: t_String;
    description?: t_String | null;
    type: t___Type;

    /**
     * A GraphQL-formatted string representing the default value for this input value.
     */
    defaultValue?: t_String | null;
  },
  Extension<"__InputValue">
>;

/**
 * @name __EnumValue
 * @type OBJECT
 */
type t___EnumValue = FieldsType<
  {
    __typename: t_String<"__EnumValue">;
    name: t_String;
    description?: t_String | null;
    isDeprecated: t_Boolean;
    deprecationReason?: t_String | null;
  },
  Extension<"__EnumValue">
>;

/**
 * @name __Directive
 * @type OBJECT
 */
type t___Directive = FieldsType<
  {
    __typename: t_String<"__Directive">;
    name: t_String;
    description?: t_String | null;
    locations: t___DirectiveLocation[];
    args: t___InputValue[];
  },
  Extension<"__Directive">
>;

/**
 * @name __DirectiveLocation
 * @type ENUM
 */
type t___DirectiveLocation = EnumType<
  | "QUERY"
  | "MUTATION"
  | "SUBSCRIPTION"
  | "FIELD"
  | "FRAGMENT_DEFINITION"
  | "FRAGMENT_SPREAD"
  | "INLINE_FRAGMENT"
  | "VARIABLE_DEFINITION"
  | "SCHEMA"
  | "SCALAR"
  | "OBJECT"
  | "FIELD_DEFINITION"
  | "ARGUMENT_DEFINITION"
  | "INTERFACE"
  | "UNION"
  | "ENUM"
  | "ENUM_VALUE"
  | "INPUT_OBJECT"
  | "INPUT_FIELD_DEFINITION"
>;

/**
 * @name Query
 * @type OBJECT
 */
export type Query = TypeData<t_Query>;

/**
 * @name Blog
 * @type OBJECT
 */
export type Blog = TypeData<t_Blog>;

/**
 * @name ObjectId
 * @type SCALAR
 */
export type ObjectId = TypeData<t_ObjectId>;

/**
 * @name String
 * @type SCALAR
 */
export type String = TypeData<t_String>;

/**
 * @name DateTime
 * @type SCALAR
 */
export type DateTime = TypeData<t_DateTime>;

/**
 * @name Mutation
 * @type OBJECT
 */
export type Mutation = TypeData<t_Mutation>;

/**
 * @name Boolean
 * @type SCALAR
 */
export type Boolean = TypeData<t_Boolean>;

/**
 * @name __Schema
 * @type OBJECT
 */
export type __Schema = TypeData<t___Schema>;

/**
 * @name __Type
 * @type OBJECT
 */
export type __Type = TypeData<t___Type>;

/**
 * @name __TypeKind
 * @type ENUM
 */
export enum __TypeKind {
  SCALAR = "SCALAR",
  OBJECT = "OBJECT",
  INTERFACE = "INTERFACE",
  UNION = "UNION",
  ENUM = "ENUM",
  INPUT_OBJECT = "INPUT_OBJECT",
  LIST = "LIST",
  NON_NULL = "NON_NULL",
}

/**
 * @name __Field
 * @type OBJECT
 */
export type __Field = TypeData<t___Field>;

/**
 * @name __InputValue
 * @type OBJECT
 */
export type __InputValue = TypeData<t___InputValue>;

/**
 * @name __EnumValue
 * @type OBJECT
 */
export type __EnumValue = TypeData<t___EnumValue>;

/**
 * @name __Directive
 * @type OBJECT
 */
export type __Directive = TypeData<t___Directive>;

/**
 * @name __DirectiveLocation
 * @type ENUM
 */
export enum __DirectiveLocation {
  QUERY = "QUERY",
  MUTATION = "MUTATION",
  SUBSCRIPTION = "SUBSCRIPTION",
  FIELD = "FIELD",
  FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION",
  FRAGMENT_SPREAD = "FRAGMENT_SPREAD",
  INLINE_FRAGMENT = "INLINE_FRAGMENT",
  VARIABLE_DEFINITION = "VARIABLE_DEFINITION",
  SCHEMA = "SCHEMA",
  SCALAR = "SCALAR",
  OBJECT = "OBJECT",
  FIELD_DEFINITION = "FIELD_DEFINITION",
  ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION",
  INTERFACE = "INTERFACE",
  UNION = "UNION",
  ENUM = "ENUM",
  ENUM_VALUE = "ENUM_VALUE",
  INPUT_OBJECT = "INPUT_OBJECT",
  INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION",
}
