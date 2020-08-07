//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {toastNotificationCallback} from "../shared-components-and-modules/notification-center/notifications-controller";
import {deepCloneObject, isNullUndefined} from "../util/util";
import {toJS} from "mobx";
import {APP_SQLITE_DATABASE, DB_REFERENCE} from "../app-management/data-manager/declarations";
import {appSQLiteDb} from "../app-management/data-manager/embeddedDb-manager";

/**
 * sd _ Kaybarax
 * @param signUpModel
 * @param appStore
 * @param toastNotificationAlert
 */
export function handleSignUp(signUpModel, appStore, toastNotificationAlert) {

    toastNotificationCallback(
        'info',
        'Signup Functionality upcoming',
        toastNotificationAlert,
    );

    // //save to sqlitedb if you fancy

    // Start a database transaction and get the notes object store
    // let tx = db.transaction;
    // let store = tx.objectStore(APP_SQLITE_DATABASE.USERS);
    // // Put the data into the db
    // let user = toJS(signUpModel.user);
    // let userId = user.id;
    //then strip id away
    // delete user.id;
    // @ts-ignore
    // let DML_Statements = appSQLiteDb.DML_Statements;
    // DML_Statements.addUserStmt(DB_REFERENCE.db,user);
    // store.add(user, userId);
    // // Wait for the database transaction to complete
    // tx.oncomplete = function () {
    //   toastNotificationCallback('succ', 'Sign up success', toastNotificationAlert)
    // }
    // tx.onerror = function (event) {
    //   console.log('error storing note ' + event.target.errorCode);
    //   toastNotificationCallback('err', 'Sign up failed!', toastNotificationAlert);
    // }

}

/**
 * sd _ Kaybarax
 * @param loginForm
 * @param toastNotificationAlert
 * @param appStore
 * @param authStore
 * @param navigation
 */
export function handleLogin(loginForm, toastNotificationAlert, appStore, authStore, navigation) {

    toastNotificationCallback(
        'info',
        'Signup Functionality upcoming',
        toastNotificationAlert,
    );

    // let db = window.db;//get db;
    // // Set up an object store and transaction
    // let tx = db.transaction([APP_SQLITE_DATABASE.USERS], 'readonly');
    // let store = tx.objectStore(APP_SQLITE_DATABASE.USERS);
    //
    // // Set up a request to get all users
    // let req = store.getAll();
    //
    // // If we get an error
    // req.onerror = function (event) {
    //   console.log('error getting users ', event.target.errorCode);
    //   toastNotificationCallback('err', 'Cannot query users', toastNotificationAlert);
    // }
    //
    // let users = [];
    // // onsuccess handler
    // req.onsuccess = function (event) {
    //
    //   users = event.target.result;
    //
    //   let user = users.find(item => item.usernameOrEmail === loginForm.usernameOrEmail &&
    //       item.password === loginForm.password);
    //   if (isNullUndefined(user)) {
    //     toastNotificationCallback('err', 'User not found', toastNotificationAlert);
    //     return;
    //   }
    //   appStore.user = deepCloneObject(user);
    //   toastNotificationCallback('succ', 'Login success', toastNotificationAlert);
    //   //to allow notification display
    //   setTimeout(_ => authStore.handleLogin(), 2000)
    // }

}

/**
 * sd _ Kaybarax
 * @param toastNotificationAlert
 */
export function handleResetPassword(toastNotificationAlert) {
    // todo: ... your logic ... you get the drill by now

    toastNotificationCallback(
        'succ',
        'I will leave this one for you))',
        toastNotificationAlert,
    );
    // toastNotificationCallback('info', 'You can play around with this!)', toastNotificationAlert)
}
