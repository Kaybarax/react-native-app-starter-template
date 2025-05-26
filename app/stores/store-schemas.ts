//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { isEmptyString, objectInstanceProvider } from '../util/util';
import { notificationAlertProps } from '../shared-components-and-modules/notification-center/notifications-controller';

export const StoreNames = {
  appStore: 'appStore',
  loginStore: 'loginStore',
  page1ExampleStore: 'page1ExampleStore',
  page2ExampleStore: 'page2ExampleStore',
  page3ExampleStore: 'page3ExampleStore',
  page4ExampleStore: 'page4ExampleStore',
  recipeBoxStore: 'recipeBoxStore',
};

// Base schema interface
interface StoreSchemaBase {
  storeName: string;
  namespace: string | null;
  storeKey: string;
  loading: boolean;
  updated: boolean;
  loadingMessage: string;
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @constructor
 */
export function ActivityStoreSchema(this: any, namespace: string | null, name: string) {
  this.storeSchema = {
    storeName: name,
    namespace: namespace,
    storeKey: !isEmptyString(namespace) ? namespace + name : 'StoreKey___' + name,
    loading: false,
    updated: false,
    loadingMessage: 'Loading...',
  } as StoreSchemaBase;
}

// App activity schema interface
interface AppActivitySchemaType extends StoreSchemaBase {
  user: any | null;
  navStore: {
    navigationTrail: any[];
    currentNavigationTrailIndex: number;
    navigatedTo: any | null;
    navigatedFrom: any | null;
  };
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @returns {{loadingMessage: string, storeKey: *, name: *, loading: boolean, updated: boolean}}
 * @constructor
 */
export function AppActivitySchema(this: any, namespace: string | null, name: string): AppActivitySchemaType {
  ActivityStoreSchema.call(this, namespace, name);
  let schema = this.storeSchema;
  schema.user = null;
  schema.navStore = {
    navigationTrail: [],
    currentNavigationTrailIndex: 0,
    navigatedTo: null,
    navigatedFrom: null,
  };
  // console.log('AppActivitySchema::', this.storeSchema)
  return this.storeSchema as AppActivitySchemaType;
}

// Login activity schema interface
interface LoginActivitySchemaType extends StoreSchemaBase {
  loginForm: {
    usernameOrEmail: string | null;
  };
  signUpForm: {
    user: any | null;
  };
  resetPasswordForm: {
    usernameOrEmail: string | null;
  };
  viewAction: any | null;
  notificationAlert: any;
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @returns {{loadingMessage: string, storeKey: *, name: *, loading: boolean, updated: boolean}}
 * @constructor
 */
export function LoginActivitySchema(this: any, namespace: string | null, name: string): LoginActivitySchemaType {
  ActivityStoreSchema.call(this, namespace, name);
  let schema = this.storeSchema;
  schema.loginForm = {
    usernameOrEmail: null,
  };
  schema.signUpForm = {
    user: null,
  };
  schema.resetPasswordForm = {
    usernameOrEmail: null,
  };
  schema.viewAction = null;
  schema.notificationAlert = objectInstanceProvider(notificationAlertProps);
  // console.log('LoginActivitySchema:: ', this.storeSchema)
  return this.storeSchema as LoginActivitySchemaType;
}

// Page example activity schema interface
interface PageExampleActivitySchemaType extends StoreSchemaBase {
  todo: any | null;
  notificationAlert: any;
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @returns {{loadingMessage: string, storeKey: *, name: *, loading: boolean, updated: boolean}}
 * @constructor
 */
export function Page1ExampleActivitySchema(
  this: any,
  namespace: string | null,
  name: string,
): PageExampleActivitySchemaType {
  ActivityStoreSchema.call(this, namespace, name);
  let schema = this.storeSchema;
  schema.todo = null;
  schema.notificationAlert = objectInstanceProvider(notificationAlertProps);
  // console.log('Page1ExampleActivitySchema::', this.storeSchema)
  return this.storeSchema as PageExampleActivitySchemaType;
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @returns {{loadingMessage: string, storeKey: *, name: *, loading: boolean, updated: boolean}}
 * @constructor
 */
export function Page2ExampleActivitySchema(
  this: any,
  namespace: string | null,
  name: string,
): PageExampleActivitySchemaType {
  ActivityStoreSchema.call(this, namespace, name);
  let schema = this.storeSchema;
  schema.todo = null;
  schema.notificationAlert = objectInstanceProvider(notificationAlertProps);
  // console.log('Page2ExampleActivitySchema::', this.storeSchema)
  return this.storeSchema as PageExampleActivitySchemaType;
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @returns {{loadingMessage: string, storeKey: *, name: *, loading: boolean, updated: boolean}}
 * @constructor
 */
export function Page3ExampleActivitySchema(
  this: any,
  namespace: string | null,
  name: string,
): PageExampleActivitySchemaType {
  ActivityStoreSchema.call(this, namespace, name);
  let schema = this.storeSchema;
  schema.todo = null;
  schema.notificationAlert = objectInstanceProvider(notificationAlertProps);
  // console.log('Page3ExampleActivitySchema::', this.storeSchema)
  return this.storeSchema as PageExampleActivitySchemaType;
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @returns {{loadingMessage: string, storeKey: *, name: *, loading: boolean, updated: boolean}}
 * @constructor
 */
export function Page4ExampleActivitySchema(
  this: any,
  namespace: string | null,
  name: string,
): PageExampleActivitySchemaType {
  ActivityStoreSchema.call(this, namespace, name);
  let schema = this.storeSchema;
  schema.todo = null;
  schema.notificationAlert = objectInstanceProvider(notificationAlertProps);
  // console.log("Page4ExampleActivitySchema::", this.storeSchema)
  return this.storeSchema as PageExampleActivitySchemaType;
}

// Recipe box activity schema interface
interface RecipeBoxActivitySchemaType extends StoreSchemaBase {
  recipeItems: any[];
  selectedRecipe: any | null;
  user: any | null;
  notificationAlert: any;
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @returns {{loadingMessage: string, storeKey: *, name: *, loading: boolean, updated: boolean}}
 * @constructor
 */
export function RecipeBoxActivitySchema(
  this: any,
  namespace: string | null,
  name: string,
): RecipeBoxActivitySchemaType {
  ActivityStoreSchema.call(this, namespace, name);
  let schema = this.storeSchema;
  schema.recipeItems = [];
  schema.selectedRecipe = null;
  schema.user = null;
  schema.notificationAlert = objectInstanceProvider(notificationAlertProps);
  // console.log("RecipeBoxActivitySchema::", this.storeSchema)
  return this.storeSchema as RecipeBoxActivitySchemaType;
}
