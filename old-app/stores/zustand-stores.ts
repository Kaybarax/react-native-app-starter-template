/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { objectInstanceProvider } from '../util/util';
import { notificationAlertProps } from '../shared-components-and-modules/notification-center/notifications-controller';

// Define the namespace for all stores
const namespace = 'AppStores_';

// Define store types
interface BaseStore {
  loading: boolean;
  loadingMessage: string;
}

interface AppStore extends BaseStore {
  user: any | null;
  navStore: {
    navigationTrail: any[];
    currentNavigationTrailIndex: number;
    navigatedTo: any | null;
    navigatedFrom: any | null;
  };
  setLoading: (loading: boolean) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  setUser: (user: any) => void;
  setNavStore: (navStore: any) => void;
  reset: () => void;
}

interface LoginStore extends BaseStore {
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
  setLoading: (loading: boolean) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  setLoginForm: (loginForm: any) => void;
  setSignUpForm: (signUpForm: any) => void;
  setResetPasswordForm: (resetPasswordForm: any) => void;
  setViewAction: (viewAction: any) => void;
  setNotificationAlert: (notificationAlert: any) => void;
  reset: () => void;
}

interface PageExampleStore extends BaseStore {
  todo: any | null;
  notificationAlert: any;
  setLoading: (loading: boolean) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  setTodo: (todo: any) => void;
  setNotificationAlert: (notificationAlert: any) => void;
  reset: () => void;
}

interface RecipeBoxStore extends BaseStore {
  recipeItems: any[];
  selectedRecipe: any | null;
  user: any | null;
  notificationAlert: any;
  setLoading: (loading: boolean) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  setRecipeItems: (recipeItems: any[]) => void;
  setSelectedRecipe: (selectedRecipe: any) => void;
  setUser: (user: any) => void;
  setNotificationAlert: (notificationAlert: any) => void;
  reset: () => void;
}

// Create individual zustand stores for each store in the application
export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      loading: false,
      loadingMessage: 'Loading...',
      user: null,
      navStore: {
        navigationTrail: [],
        currentNavigationTrailIndex: 0,
        navigatedTo: null,
        navigatedFrom: null,
      },
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setUser: (user: any) => set({ user }),
      setNavStore: (navStore: any) => set({ navStore }),
      reset: () => set({
        loading: false,
        loadingMessage: 'Loading...',
        user: null,
        navStore: {
          navigationTrail: [],
          currentNavigationTrailIndex: 0,
          navigatedTo: null,
          navigatedFrom: null,
        },
      }),
    }),
    {
      name: namespace + 'appStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useLoginStore = create<LoginStore>()(
  persist(
    (set) => ({
      loading: false,
      loadingMessage: 'Loading...',
      loginForm: {
        usernameOrEmail: null,
      },
      signUpForm: {
        user: null,
      },
      resetPasswordForm: {
        usernameOrEmail: null,
      },
      viewAction: null,
      notificationAlert: objectInstanceProvider(notificationAlertProps),
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setLoginForm: (loginForm: any) => set({ loginForm }),
      setSignUpForm: (signUpForm: any) => set({ signUpForm }),
      setResetPasswordForm: (resetPasswordForm: any) => set({ resetPasswordForm }),
      setViewAction: (viewAction: any) => set({ viewAction }),
      setNotificationAlert: (notificationAlert: any) => set({ notificationAlert }),
      reset: () => set({
        loading: false,
        loadingMessage: 'Loading...',
        loginForm: {
          usernameOrEmail: null,
        },
        signUpForm: {
          user: null,
        },
        resetPasswordForm: {
          usernameOrEmail: null,
        },
        viewAction: null,
        notificationAlert: objectInstanceProvider(notificationAlertProps),
      }),
    }),
    {
      name: namespace + 'loginStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const usePage1ExampleStore = create<PageExampleStore>()(
  persist(
    (set) => ({
      loading: false,
      loadingMessage: 'Loading...',
      todo: null,
      notificationAlert: objectInstanceProvider(notificationAlertProps),
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setTodo: (todo: any) => set({ todo }),
      setNotificationAlert: (notificationAlert: any) => set({ notificationAlert }),
      reset: () => set({
        loading: false,
        loadingMessage: 'Loading...',
        todo: null,
        notificationAlert: objectInstanceProvider(notificationAlertProps),
      }),
    }),
    {
      name: namespace + 'page1ExampleStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const usePage2ExampleStore = create<PageExampleStore>()(
  persist(
    (set) => ({
      loading: false,
      loadingMessage: 'Loading...',
      todo: null,
      notificationAlert: objectInstanceProvider(notificationAlertProps),
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setTodo: (todo: any) => set({ todo }),
      setNotificationAlert: (notificationAlert: any) => set({ notificationAlert }),
      reset: () => set({
        loading: false,
        loadingMessage: 'Loading...',
        todo: null,
        notificationAlert: objectInstanceProvider(notificationAlertProps),
      }),
    }),
    {
      name: namespace + 'page2ExampleStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const usePage3ExampleStore = create<PageExampleStore>()(
  persist(
    (set) => ({
      loading: false,
      loadingMessage: 'Loading...',
      todo: null,
      notificationAlert: objectInstanceProvider(notificationAlertProps),
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setTodo: (todo: any) => set({ todo }),
      setNotificationAlert: (notificationAlert: any) => set({ notificationAlert }),
      reset: () => set({
        loading: false,
        loadingMessage: 'Loading...',
        todo: null,
        notificationAlert: objectInstanceProvider(notificationAlertProps),
      }),
    }),
    {
      name: namespace + 'page3ExampleStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const usePage4ExampleStore = create<PageExampleStore>()(
  persist(
    (set) => ({
      loading: false,
      loadingMessage: 'Loading...',
      todo: null,
      notificationAlert: objectInstanceProvider(notificationAlertProps),
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setTodo: (todo: any) => set({ todo }),
      setNotificationAlert: (notificationAlert: any) => set({ notificationAlert }),
      reset: () => set({
        loading: false,
        loadingMessage: 'Loading...',
        todo: null,
        notificationAlert: objectInstanceProvider(notificationAlertProps),
      }),
    }),
    {
      name: namespace + 'page4ExampleStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useRecipeBoxStore = create<RecipeBoxStore>()(
  persist(
    (set) => ({
      loading: false,
      loadingMessage: 'Loading...',
      recipeItems: [],
      selectedRecipe: null,
      user: null,
      notificationAlert: objectInstanceProvider(notificationAlertProps),
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setRecipeItems: (recipeItems: any[]) => set({ recipeItems }),
      setSelectedRecipe: (selectedRecipe: any) => set({ selectedRecipe }),
      setUser: (user: any) => set({ user }),
      setNotificationAlert: (notificationAlert: any) => set({ notificationAlert }),
      reset: () => set({
        loading: false,
        loadingMessage: 'Loading...',
        recipeItems: [],
        selectedRecipe: null,
        user: null,
        notificationAlert: objectInstanceProvider(notificationAlertProps),
      }),
    }),
    {
      name: namespace + 'recipeBoxStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

// Map store names to their respective hooks for backward compatibility
export const storeHooks = {
  appStore: useAppStore,
  loginStore: useLoginStore,
  page1ExampleStore: usePage1ExampleStore,
  page2ExampleStore: usePage2ExampleStore,
  page3ExampleStore: usePage3ExampleStore,
  page4ExampleStore: usePage4ExampleStore,
  recipeBoxStore: useRecipeBoxStore,
};
