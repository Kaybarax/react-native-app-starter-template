/* eslint-disable prettier/prettier */
//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {
  AppActivitySchema,
  LoginActivitySchema,
  Page1ExampleActivitySchema,
  Page2ExampleActivitySchema,
  Page3ExampleActivitySchema,
  Page4ExampleActivitySchema,
  RecipeBoxActivitySchema, StoreNames,
} from './store-schemas';
import {createStoreModelSnapshot, getPersistedStoreKey} from './store-utils';

// Define the StoreProvider interface
interface StoreProvider {
  storeKey: (namespace: string) => string;
  storeProvidedBy: (namespace: string | null) => any;
  storeModelSnapshot: Promise<any>;
}

// Define the StoreProviders type
type StoreProvidersType = {
  [key: string]: StoreProvider;
};

const StoreProviders: StoreProvidersType = {

  appStore: {
    storeKey: (namespace: string) => getPersistedStoreKey(namespace, StoreNames.appStore),
    storeProvidedBy: (namespace: string | null) => new AppActivitySchema(namespace, StoreNames.appStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.appStore,
        new AppActivitySchema(null, StoreNames.appStore),
    ),
  },

  loginStore: {
    storeKey: (namespace: string) => getPersistedStoreKey(namespace, StoreNames.loginStore),
    storeProvidedBy: (namespace: string | null) => new LoginActivitySchema(namespace, StoreNames.loginStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.loginStore,
        new LoginActivitySchema(null, StoreNames.loginStore),
    ),
  },

  page1ExampleStore: {
    storeKey: (namespace: string) => getPersistedStoreKey(namespace, StoreNames.page1ExampleStore),
    storeProvidedBy: (namespace: string | null) => new Page1ExampleActivitySchema(namespace, StoreNames.page1ExampleStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.page1ExampleStore,
        new Page1ExampleActivitySchema(null, StoreNames.page1ExampleStore),
    ),
  },

  page2ExampleStore: {
    storeKey: (namespace: string) => getPersistedStoreKey(namespace, StoreNames.page2ExampleStore),
    storeProvidedBy: (namespace: string | null) => new Page2ExampleActivitySchema(namespace, StoreNames.page2ExampleStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.page2ExampleStore,
        new Page2ExampleActivitySchema(null, StoreNames.page2ExampleStore),
    ),
  },

  page3ExampleStore: {
    storeKey: (namespace: string) => getPersistedStoreKey(namespace, StoreNames.page3ExampleStore),
    storeProvidedBy: (namespace: string | null) => new Page3ExampleActivitySchema(namespace, StoreNames.page3ExampleStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.page3ExampleStore,
        new Page3ExampleActivitySchema(null, StoreNames.page3ExampleStore),
    ),
  },

  page4ExampleStore: {
    storeKey: (namespace: string) => getPersistedStoreKey(namespace, StoreNames.page4ExampleStore),
    storeProvidedBy: (namespace: string | null) => new Page4ExampleActivitySchema(namespace, StoreNames.page4ExampleStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.page4ExampleStore,
        new Page4ExampleActivitySchema(null, StoreNames.page4ExampleStore),
    ),
  },

  recipeBoxStore: {
    storeKey: (namespace: string) => getPersistedStoreKey(namespace, StoreNames.recipeBoxStore),
    storeProvidedBy: (namespace: string | null) => new RecipeBoxActivitySchema(namespace, StoreNames.recipeBoxStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.recipeBoxStore,
        new RecipeBoxActivitySchema(null, StoreNames.recipeBoxStore),
    ),
  },

};

export default StoreProviders;