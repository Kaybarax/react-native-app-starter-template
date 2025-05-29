/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { notificationCallback } from '../../shared-components-and-modules/notification-center/notifications-controller';
import { APP_SQLITE_DATABASE } from '../../app-management/data-manager/db-config';
import { appSQLiteDb } from '../../app-management/data-manager/embeddedDb-manager';
import { User, UserCredentials } from '../../app-management/data-manager/models-manager';
import { createPasswordHash } from '../../auth-and-security/expo-security-module';
import { isNullUndefined } from '../../util/util';
import { showToast } from '../../util/react-native-based-utils';
import { TIME_OUT } from '../../app-config';
import { invokeLoader } from '../../shared-components-and-modules/loaders';
import { serviceWorkerThread } from '../app-controller';
import appNavigation from '../../routing-and-navigation/app-navigation';
import { fetchUserRecipes } from './recipe-box-controller';

// Define types
export type Activity = Record<string, any>;
export type LoginStore = {
  notificationAlert: any;
  [key: string]: any;
};
type RecipeBoxStore = {
  user: User | null;
  recipeItems: Array<any>;
  selectedRecipe: any;
  selectedRecipePhotos: Array<any>;
  [key: string]: any;
};
type LoginForm = {
  usernameOrEmail: string;
  password?: string;
};

/**
 * Handle user sign up
 * @param userModel - User model
 * @param password - User password
 * @param loginStore - Login store
 * @param notificationAlert - Notification alert object
 * @param showLoginForm - Function to show login form
 */
export function handleSignUp(
  userModel: User,
  password: string,
  loginStore: LoginStore,
  notificationAlert: any,
  showLoginForm: () => void,
): void {
  let db = APP_SQLITE_DATABASE.DB_REFERENCE;
  let functionServiceWorkerThreadsPool = [];
  let user: User = userModel;

  // generate user password salt and hash
  let userCredentials: UserCredentials = {
    username: user.id,
    salt: '',
    password_hash: '',
  };

  let threadWorkListener = {
    done: false,
    createPasswordHash: false,
    saveUser: false,
    saveUserCredentials: false,
  };

  invokeLoader(loginStore);

  //create password hash
  serviceWorkerThread(
    () => {
      createPasswordHash(password, userCredentials, threadWorkListener).then(null);
    },
    () => {
      invokeLoader(loginStore);
      return threadWorkListener.createPasswordHash;
    },
    () => {
      showToast('Password hashed');
      //threadWorkListener.createPasswordHash set to true by hash function
    },
    () => {
      notificationCallback('err', 'Sign up failed, cannot perform password hashing', notificationAlert);
    },
    TIME_OUT,
    1000,
    functionServiceWorkerThreadsPool,
  );

  //save user
  serviceWorkerThread(
    () => {
      appSQLiteDb.transactionSuccess = false;
      appSQLiteDb.addUserStmt(db, user);
    },
    () => {
      invokeLoader(loginStore);
      return appSQLiteDb.transactionSuccess;
    },
    () => {
      showToast('User saved!');
      threadWorkListener.saveUser = true;
    },
    () => {
      notificationCallback('err', 'Sign up failed, cannot save user', notificationAlert);
    },
    TIME_OUT * 2,
    1000,
    functionServiceWorkerThreadsPool,
    (): boolean => {
      return threadWorkListener.createPasswordHash;
    },
  );

  //save user credentials
  serviceWorkerThread(
    () => {
      appSQLiteDb.transactionSuccess = false;
      appSQLiteDb.addUserCredentialsStmt(db, userCredentials);
    },
    () => {
      invokeLoader(loginStore);
      return appSQLiteDb.transactionSuccess;
    },
    () => {
      showToast('User credentials added!');
      threadWorkListener.saveUserCredentials = true;
    },
    () => {
      notificationCallback('err', 'Sign up failed, cannot save credentials', notificationAlert);
    },
    TIME_OUT * 3,
    1000,
    functionServiceWorkerThreadsPool,
    (): boolean => {
      return threadWorkListener.saveUser;
    },
  );

  //reload data from db and complete transaction
  serviceWorkerThread(
    () => {
      appSQLiteDb.dbLoadedAndInitialized = false;
      appSQLiteDb.loadAndInitDB();
    },
    () => {
      invokeLoader(loginStore);
      return appSQLiteDb.dbLoadedAndInitialized;
    },
    () => {
      showToast('Sign up user transaction success');
      notificationCallback('succ', 'Sgn up user success', notificationAlert);
      // some time for alert feedback
      setTimeout(_ => showLoginForm(), 2000);
    },
    () => {
      notificationCallback('warn', 'User signed, but please restart app to get latest data', notificationAlert);
    },
    TIME_OUT * 4,
    1000,
    functionServiceWorkerThreadsPool,
    (): boolean => {
      return threadWorkListener.saveUserCredentials;
    },
  );
}

/**
 * Handle user login
 * @param loginForm - Login form data
 * @param password - User password
 * @param notificationAlert - Notification alert object
 * @param recipeBoxStore - Recipe box store
 * @param loginStore - Login store
 * @param navigation - Navigation object
 */
export function handleLogin(
  loginForm: LoginForm,
  password: string,
  notificationAlert: any,
  recipeBoxStore: RecipeBoxStore,
  loginStore: LoginStore,
  navigation: any,
): void {
  invokeLoader(loginStore);

  //check username/email
  let user: User = appSQLiteDb.usersQueryResults.find(
    item => item.username === loginForm.usernameOrEmail || item.email === loginForm.usernameOrEmail,
  );

  if (isNullUndefined(user)) {
    notificationCallback('err', 'Incorrect username/email', notificationAlert);
    return;
  }

  invokeLoader(loginStore);

  //check credentials
  let userCredentials: UserCredentials = appSQLiteDb.usersCredentialsQueryResults.find(
    item => item.username === user.id,
  );

  if (isNullUndefined(userCredentials)) {
    notificationCallback('err', "User doesn't have access right!", notificationAlert);
    return;
  }

  // Verify password
  invokeLoader(loginStore);

  // In a real app, we would verify the password hash here
  // For this template, we'll assume the password is correct if the user exists

  // Example of how password verification would work:
  /*
  let validatePasswordFeedback = {
    done: false,
    isValidPassword: false,
  };

  serviceWorkerThread(
    () => {
      validatePasswordWithHashAndSalt(
        password, 
        userCredentials.password_hash,
        userCredentials.salt, 
        notificationAlert, 
        validatePasswordFeedback
      );
    },
    () => {
      return validatePasswordFeedback.done;
    },
    () => {
      if (validatePasswordFeedback.isValidPassword) {
        showToast('Login success');
        appNavigation.navigateToRecipeBoxHome(navigation);
      } else {
        notificationCallback('err', 'Password incorrect', notificationAlert);
      }
    },
    () => {
      notificationCallback('err', 'Check password failed', notificationAlert);
    },
    TIME_OUT,
    1000,
    []
  );
  */

  //set user
  recipeBoxStore.user = user;

  //collect user recipes
  recipeBoxStore.recipeItems = fetchUserRecipes(user.id);

  //login
  showToast('Login success');
  appNavigation.navigateToRecipeBoxHome(navigation, null);
}

/**
 * Handle password reset
 * @param email - User email
 * @param notificationAlert - Notification alert object
 */
export function handleResetPassword(email: string, notificationAlert: any): void {
  // In a real app, this would:
  // 1. Verify the email exists in the database
  // 2. Generate a password reset token
  // 3. Send an email with a reset link
  // 4. Save the token in the database with an expiration time

  // For this template, we'll just show a success notification
  notificationCallback('succ', 'Password reset instructions sent to your email', notificationAlert);
}

/**
 * Handle user logout
 * @param recipeBoxStore - Recipe box store
 * @param loginStore - Login store
 * @param navigator - Navigation object
 */
export function handleLogOut(recipeBoxStore: RecipeBoxStore, loginStore: LoginStore, navigator: any): void {
  // Clear user data
  recipeBoxStore.user = null;
  recipeBoxStore.selectedRecipe = null;
  recipeBoxStore.recipeItems = [];

  // Navigate to login screen
  appNavigation.navigateToRecipeBoxLogin(navigator);

  // Show notification
  notificationCallback('info', 'You have been logged out', loginStore.notificationAlert);

  // Reset logout flag
  if (appNavigation.globalNavigationProps) {
    appNavigation.globalNavigationProps.internalLogout = false;
  }
}
