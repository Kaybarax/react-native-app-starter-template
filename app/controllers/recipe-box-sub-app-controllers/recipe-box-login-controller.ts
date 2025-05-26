//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { notificationCallback } from '../../shared-components-and-modules/notification-center/notifications-controller';
import { toJS } from '../../stores';
import { APP_SQLITE_DATABASE } from '../../app-management/data-manager/db-config';
import { appSQLiteDb } from '../../app-management/data-manager/embeddedDb-manager';
import { User, UserCredentials } from '../../app-management/data-manager/models-manager';
import { createPasswordHash } from '../../android-custom-native-modules/app-security-custom-native-module';
import { isNullUndefined } from '../../util/util';
import { showToast } from '../../util/react-native-based-utils';
import { TIME_OUT } from '../../app-config';
import { invokeLoader } from '../../shared-components-and-modules/loaders';
import { serviceWorkerThread } from '../app-controller';
import appNavigation from '../../routing-and-navigation/app-navigation';
import { fetchUserRecipes } from './recipe-box-controller';

/**
 * sd _ Kaybarax
 * @param userModel
 * @param password
 * @param loginStore
 * @param notificationAlert
 * @param showLoginForm
 */
export function handleSignUp(userModel, password, loginStore, notificationAlert, showLoginForm) {
  console.log('userModel:', toJS(userModel));
  // return;

  let db = APP_SQLITE_DATABASE.DB_REFERENCE;

  let functionServiceWorkerThreadsPool = [];

  let user: User = toJS(userModel);

  console.log('user', user);

  // generate user password salt and hash
  let userCredentials: UserCredentials = {
    username: user.id,
    salt: undefined,
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
 * sd _ Kaybarax
 * @param loginForm
 * @param password
 * @param notificationAlert
 * @param recipeBoxStore
 * @param loginStore
 * @param navigation
 */
export function handleLogin(loginForm, password, notificationAlert, recipeBoxStore, loginStore, navigation) {
  console.log('handleLogin');
  console.log('loginForm:', toJS(loginForm));
  // return;

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

  //verify password
  //NOTE! Not used because of the limits of the sqlite storage npm package.
  //the hashed password, cannot be be verified with the given salt and hash
  // invokeLoader(loginStore);
  // let validatePasswordFeedback = {
  //     done: false,
  //     isValidPassword: false,
  // };
  // serviceWorkerThread(() => {
  //         validatePasswordWithHashAndSalt(password, userCredentials.password_hash,
  //             userCredentials.salt, notificationAlert, validatePasswordFeedback);
  //     },
  //     TIME_OUT, 1000,
  //     () => {
  //         return validatePasswordFeedback.done;
  //     },
  //     () => {
  //         if (validatePasswordFeedback.isValidPassword) {
  //             showToast('Login success');
  //             appNavigation.loginToRecipeBox(navigation, null);
  //         } else {
  //             notificationCallback('err',
  //                 `Password incorrect`,
  //                 notificationAlert);
  //         }
  //     }, () => {
  //         notificationCallback('err',
  //             `Check password failed`,
  //             notificationAlert);
  //     }, functionServiceWorkerThreadsPool
  // );

  invokeLoader(loginStore);

  //set user
  recipeBoxStore.user = user;

  //collect user recipes
  recipeBoxStore.recipeItems = fetchUserRecipes(user.id);

  //login
  showToast('Login success');
  appNavigation.navigateToRecipeBoxHome(navigation, null);
}

/**
 * sd _ Kaybarax
 * @param notificationAlert
 */
export function handleResetPassword(notificationAlert) {
  // todo: ... your logic ... you get the drill by now
  notificationCallback('succ', 'I will leave this one for you))', notificationAlert);
}

/**
 * sd _ Kaybarax
 * @param recipeBoxStore
 * @param loginStore
 * @param navigator
 */
export function handleLogOut(recipeBoxStore, loginStore, navigator) {
  recipeBoxStore.user = null;
  recipeBoxStore.selectedRecipe = null;
  recipeBoxStore.recipeItems = [];
  appNavigation.navigateToRecipeBoxLogin(navigator);
  notificationCallback('info', 'You have been logged out', loginStore.notificationAlert);
  //turn back off logout
  appNavigation.globalNavigationProps.internalLogout = false;
}
