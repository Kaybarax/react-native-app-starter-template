//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { isNullUndefined } from '../util/util';
import {
  APP_DEV_MOCKS_STACK_VIEW_ROUTE,
  MAIN_APP_STACK_VIEW_ROUTE,
  MY_RECIPE_CREATE_EDIT_RECIPE_VIEW_ROUTE,
  MY_RECIPE_LOGIN_VIEW_ROUTE,
  MY_RECIPE_RECIPE_DETAILS_VIEW_ROUTE,
  PAGE1EXAMPLE_VIEW_ROUTE,
  PAGE2EXAMPLE_VIEW_ROUTE,
  PAGE3EXAMPLE_VIEW_ROUTE,
  PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE,
  PAGE4EXAMPLE_VIEW_ROUTE,
  RECIPE_BOX_BOTTOM_TABS_VIEW_ROUTE,
  RECIPE_BOX_SUB_APP_STACK_VIEW_ROUTE,
} from './views-routes-declarations';
import { deepCloneObject } from '../util/util';
import { showToast } from '../util/react-native-based-utils';

/**
 * Navigation store interface
 */
interface NavStore {
  navigationTrail: string[];
  currentNavigationTrailIndex: number;
  navigatedTo: string | null;
  navigatedFrom: string | null;
}

/**
 * Global navigation props interface
 */
interface GlobalNavigationProps {
  drawerProps: any;
  navigator: any;
  executeHaltedBackNavigation: () => void;
  internalLogout: boolean;
}

/**
 * sd _ Kaybarax
 * NOTE1: THERE IS NO 'NAVIGATE TO DEFAULT' FOR THIS TEMPLATE FRAMEWORK, BECAUSE
 * THAT WOULD BE NAVIGATING TO LOGIN PAGE, AND THAT IS HANDLED BY LOGOUT LOGIC FROM 'AUTH-STORE'
 * NOTE2: HERE, NAVIGATION IS USING ".navigate(...) and .goBack()" BECAUSE
 * THAT IS NAVIGATION FUNCTION PROVIDED BY
 * REACT-NAVIGATION IN USE HERE! REPLACE WITH APPROPRIATE NAVIGATION FUNCTION IF USING ANOTHER
 * ROUTER IN OF YOUR CHOICE. LOGIC REMAINS THE SAME
 */
export class AppNavigation {
  navigatedToParams: Record<string, any> | null = null;
  navigatedTo: string | null = null;
  navigatedFrom: string | null = null;
  navStore: NavStore | null = null;
  globalNavigationProps: GlobalNavigationProps = {
    drawerProps: null,
    navigator: null,
    executeHaltedBackNavigation: () => {
      //perform the back nav
    },
    internalLogout: false,
  };

  navigate = (navigator: any, navTo: string, navParams: Record<string, any> | null = null, goingBack = false) => {
    this.navigatedFrom = this.navigatedTo || 'home';
    this.navigatedTo = navTo;

    if (!isNullUndefined(navParams)) {
      this.navigatedToParams = navParams;
    }

    if (goingBack) {
      this.navigatedFrom = null;
      if (!isNullUndefined(this.navigatedToParams)) {
        navigator.goBack();
      } else {
        //clear any previous navigation params
        this.navigatedToParams = null;
        navigator.goBack();
      }
    } else {
      if (!isNullUndefined(this.navigatedToParams)) {
        navigator.navigate(this.navigatedTo, this.navigatedToParams);
      } else {
        //clear any previous navigation params
        this.navigatedToParams = null;
        navigator.navigate(this.navigatedTo);
      }
    }

    //trail navigation
    if (!isNullUndefined(this.navStore)) {
      this.trailNavigation(goingBack, this.navStore);
    }
  };

  trailNavigation = (goingBack: boolean, navStore: NavStore) => {
    let goTo = navStore.currentNavigationTrailIndex - 1;
    if (goTo >= 0) {
      navStore.currentNavigationTrailIndex = goTo;
    }
    if (goingBack) {
      //remove whence come from
      navStore.navigationTrail.splice(navStore.currentNavigationTrailIndex, 1);
      navStore.navigatedFrom = this.navigatedFrom; //should be null, if all works correctly
    } else {
      if (this.navigatedTo) {
        navStore.navigationTrail.push(this.navigatedTo);
        navStore.currentNavigationTrailIndex = navStore.navigationTrail.length - 1;
        navStore.navigatedTo = this.navigatedTo;
        navStore.navigatedFrom = this.navigatedFrom;
      }
    }
  };

  navigateBack = (navigator: any, navParams: Record<string, any> | null = null) => {
    console.log('this.navStore', deepCloneObject(this.navStore));
    if (isNullUndefined(this.navStore?.navigatedFrom)) {
      showToast('Cannot determine where to return!', 'long');
      return;
    } else {
      if (this.navigatedFrom) {
        this.navigate(navigator, this.navigatedFrom, navParams, true);
      }
    }
  };

  navigateToHome = (navigator: any, navParams: Record<string, any> | null = null) => {
    this.navigate(navigator, MAIN_APP_STACK_VIEW_ROUTE.name, navParams);
  };

  navigateToPage1Example = (navigator: any, navParams: Record<string, any> | null = null) => {
    this.navigate(navigator, PAGE1EXAMPLE_VIEW_ROUTE.name, navParams);
  };

  navigateToPage2Example = (navigator: any, navParams: Record<string, any> | null = null) => {
    this.navigate(navigator, PAGE2EXAMPLE_VIEW_ROUTE.name, navParams);
  };

  navigateToPage3Example = (navigator: any, navParams: Record<string, any> | null = null) => {
    this.navigate(navigator, PAGE3EXAMPLE_VIEW_ROUTE.name, navParams);
  };

  navigateToPage4Example = (navigator: any, navParams: Record<string, any> | null = null) => {
    this.navigate(navigator, PAGE4EXAMPLE_VIEW_ROUTE.name, navParams);
  };

  navigateToPage4SubItemExample = (navigator: any, navParams: Record<string, any> | null = null) => {
    this.navigate(navigator, PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE.name, navParams);
  };

  navigateToAppDevScratchPad = (navigator: any, navParams: Record<string, any> | null = null) => {
    this.navigate(navigator, APP_DEV_MOCKS_STACK_VIEW_ROUTE.name, navParams);
  };

  navigateToRecipeBoxSubApplication = (navigator: any, navParams: Record<string, any> | null = null) => {
    this.navigate(navigator, RECIPE_BOX_SUB_APP_STACK_VIEW_ROUTE.name, navParams);
  };

  navigateToRecipeBoxLogin = (navigator: any, navParams: Record<string, any> | null = null) => {
    this.navigate(navigator, MY_RECIPE_LOGIN_VIEW_ROUTE.name, navParams);
  };

  navigateToRecipeBoxHome = (navigator: any, navParams: Record<string, any> | null = null) => {
    this.navigate(navigator, RECIPE_BOX_BOTTOM_TABS_VIEW_ROUTE.name, navParams);
  };

  navigateToRecipeDetails = (navigator: any, navParams: Record<string, any> | null = null) => {
    this.navigate(navigator, MY_RECIPE_RECIPE_DETAILS_VIEW_ROUTE.name, navParams);
  };

  navigateToCreateEditRecipe = (navigator: any, navParams: Record<string, any> | null = null) => {
    this.navigate(navigator, MY_RECIPE_CREATE_EDIT_RECIPE_VIEW_ROUTE.name, navParams);
  };
}

const appNavigation = new AppNavigation();
export default appNavigation;
