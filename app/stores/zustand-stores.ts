/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AppActivitySchema,
  LoginActivitySchema,
  Page1ExampleActivitySchema,
  Page2ExampleActivitySchema,
  Page3ExampleActivitySchema,
  Page4ExampleActivitySchema,
  RecipeBoxActivitySchema,
  StoreNames,
} from './store-schemas';
import { _StoreKey_ } from './actions-and-stores-data';

// Define the namespace for all stores
const namespace = 'AppStores_' + _StoreKey_;

// Create individual zustand stores for each store in the application
export const useAppStore = create(
  persist(
    set => ({
      ...new AppActivitySchema(namespace, StoreNames.appStore),
      // Add actions to update the store
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setUser: (user: any) => set({ user }),
      setNavStore: (navStore: any) => set({ navStore }),
      // Add a reset action
      reset: () => set(new AppActivitySchema(namespace, StoreNames.appStore)),
    }),
    {
      name: namespace + StoreNames.appStore,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useLoginStore = create(
  persist(
    set => ({
      ...new LoginActivitySchema(namespace, StoreNames.loginStore),
      // Add actions to update the store
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setLoginForm: (loginForm: any) => set({ loginForm }),
      setSignUpForm: (signUpForm: any) => set({ signUpForm }),
      setResetPasswordForm: (resetPasswordForm: any) => set({ resetPasswordForm }),
      setViewAction: (viewAction: any) => set({ viewAction }),
      setNotificationAlert: (notificationAlert: any) => set({ notificationAlert }),
      // Add a reset action
      reset: () => set(new LoginActivitySchema(namespace, StoreNames.loginStore)),
    }),
    {
      name: namespace + StoreNames.loginStore,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const usePage1ExampleStore = create(
  persist(
    set => ({
      ...new Page1ExampleActivitySchema(namespace, StoreNames.page1ExampleStore),
      // Add actions to update the store
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setTodo: (todo: any) => set({ todo }),
      setNotificationAlert: (notificationAlert: any) => set({ notificationAlert }),
      // Add a reset action
      reset: () => set(new Page1ExampleActivitySchema(namespace, StoreNames.page1ExampleStore)),
    }),
    {
      name: namespace + StoreNames.page1ExampleStore,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const usePage2ExampleStore = create(
  persist(
    set => ({
      ...new Page2ExampleActivitySchema(namespace, StoreNames.page2ExampleStore),
      // Add actions to update the store
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setTodo: (todo: any) => set({ todo }),
      setNotificationAlert: (notificationAlert: any) => set({ notificationAlert }),
      // Add a reset action
      reset: () => set(new Page2ExampleActivitySchema(namespace, StoreNames.page2ExampleStore)),
    }),
    {
      name: namespace + StoreNames.page2ExampleStore,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const usePage3ExampleStore = create(
  persist(
    set => ({
      ...new Page3ExampleActivitySchema(namespace, StoreNames.page3ExampleStore),
      // Add actions to update the store
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setTodo: (todo: any) => set({ todo }),
      setNotificationAlert: (notificationAlert: any) => set({ notificationAlert }),
      // Add a reset action
      reset: () => set(new Page3ExampleActivitySchema(namespace, StoreNames.page3ExampleStore)),
    }),
    {
      name: namespace + StoreNames.page3ExampleStore,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const usePage4ExampleStore = create(
  persist(
    set => ({
      ...new Page4ExampleActivitySchema(namespace, StoreNames.page4ExampleStore),
      // Add actions to update the store
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setTodo: (todo: any) => set({ todo }),
      setNotificationAlert: (notificationAlert: any) => set({ notificationAlert }),
      // Add a reset action
      reset: () => set(new Page4ExampleActivitySchema(namespace, StoreNames.page4ExampleStore)),
    }),
    {
      name: namespace + StoreNames.page4ExampleStore,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useRecipeBoxStore = create(
  persist(
    set => ({
      ...new RecipeBoxActivitySchema(namespace, StoreNames.recipeBoxStore),
      // Add actions to update the store
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setRecipeItems: (recipeItems: any[]) => set({ recipeItems }),
      setSelectedRecipe: (selectedRecipe: any) => set({ selectedRecipe }),
      setUser: (user: any) => set({ user }),
      setNotificationAlert: (notificationAlert: any) => set({ notificationAlert }),
      // Add a reset action
      reset: () => set(new RecipeBoxActivitySchema(namespace, StoreNames.recipeBoxStore)),
    }),
    {
      name: namespace + StoreNames.recipeBoxStore,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

// Map store names to their respective hooks
export const storeHooks = {
  [StoreNames.appStore]: useAppStore,
  [StoreNames.loginStore]: useLoginStore,
  [StoreNames.page1ExampleStore]: usePage1ExampleStore,
  [StoreNames.page2ExampleStore]: usePage2ExampleStore,
  [StoreNames.page3ExampleStore]: usePage3ExampleStore,
  [StoreNames.page4ExampleStore]: usePage4ExampleStore,
  [StoreNames.recipeBoxStore]: useRecipeBoxStore,
};
