//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { isNullUndefined } from '../util/util';
import appStores from '../stores';

/**
 * sd _ Kaybarax
 * Your app auth control needs
 */
export default class AppAuth {
  /**
   * Your frontend app, authentication logic for access: JWT, AWS Cognito, Google sign in,
   * facebook-sign-in, Twitter sign in ...  your fancy
   * @returns {Promise<boolean>}
   */
  isAuthenticated = async (): Promise<boolean> => {
    // TODO: write you authentication logic here that will need to pass for a user to
    //  access a secured page. For example if you were using aws, and a user should only
    //  access a page if still logged in, you would do something like the below commented out code:
    // return await AppAuth.currentAuthenticatedUser()
    //     .then(async (data) => {
    //         console.log('user data ::', data);
    //         return true;
    //     })
    //     .catch(() => {
    //         return false;
    //     });

    //my logic for this framework template share. Of course, remove it and use your own
    //like I have guided you above
    return !isNullUndefined(appStores.stores.recipeBoxStore.user);
  };
}
