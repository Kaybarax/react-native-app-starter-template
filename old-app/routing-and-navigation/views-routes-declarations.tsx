//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import NotFound from '../views/not-found';
import AppDevScratchPad from '../app-dev-scratch-pad/app-dev-scratch-pad';
import { ViewRoute } from './routing-and-navigation-utils';
import WithStoresHoc from '../stores/with-stores-hoc';
import RecipeRequests from '../views/recipe-box-sub-app-views/recipe-requests';
import RecipeDetails from '../views/recipe-box-sub-app-views/recipe-details';
import {
  AppDevMocksStackRoutingComposition,
  AppTopTabsNavigationRoutingComposition,
  MainAppStackRoutingComposition,
  RecipeBoxBottomTabsNavigationRoutingComposition,
  RecipeBoxSubAppStackRoutingComposition,
} from './routing-composition';
import Page1Example from '../views/page-1-example';
import Page2Example from '../views/page-2-example';
import Page3Example from '../views/page-3-example';
import Page4Example from '../views/page-4-example';
import Page4SubItemExample from '../views/page-4-sub-item-example';
import RecipeHome from '../views/recipe-box-sub-app-views/home';
import Login from '../views/recipe-box-sub-app-views/login';
import CreateEditRecipeForm from '../views/recipe-box-sub-app-views/create-edit-recipe/create-edit-recipe-form';

/*Declare the application views for routing*/

/*App primitive views/screens*/

export const PAGE1EXAMPLE_VIEW_ROUTE: ViewRoute = {
  name: 'PAGE1EXAMPLE_VIEW_ROUTE',
  screen: WithStoresHoc(Page1Example, ['page1ExampleStore', 'appStore']),
  viewTitle: 'Page 1 Example',
};

export const PAGE2EXAMPLE_VIEW_ROUTE: ViewRoute = {
  name: 'PAGE2EXAMPLE_VIEW_ROUTE',
  screen: WithStoresHoc(Page2Example, ['page2ExampleStore', 'appStore']),
  viewTitle: 'Page 2 Example',
};

export const PAGE3EXAMPLE_VIEW_ROUTE: ViewRoute = {
  name: 'PAGE3EXAMPLE_VIEW_ROUTE',
  screen: WithStoresHoc(Page3Example, ['page3ExampleStore', 'appStore']),
  viewTitle: 'Page 3 Example',
};

export const PAGE4EXAMPLE_VIEW_ROUTE: ViewRoute = {
  name: 'PAGE4EXAMPLE_VIEW_ROUTE',
  screen: WithStoresHoc(Page4Example, ['page4ExampleStore', 'appStore']),
  viewTitle: 'Page 4 Example',
};

export const PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE: ViewRoute = {
  name: 'PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE',
  screen: WithStoresHoc(Page4SubItemExample, ['page4ExampleStore', 'appStore']),
  viewTitle: 'Page 4 Sub Item',
};

//the 404 route
export const _404_VIEW: ViewRoute = {
  name: '_404_',
  screen: NotFound,
  viewTitle: 'Page Not Found',
};

// just added for your mocking of scenarios
export const APP_DEV_MOCKS_VIEW_ROUTE: ViewRoute = {
  name: 'APP_DEV_MOCKS_VIEW_ROUTE',
  screen: WithStoresHoc(AppDevScratchPad, ['loginStore', 'appStore']),
  viewTitle: 'App Dev Scratchpad',
};

/*End app primitive views/screens*/

/*App composite views/screens*/

export const MAIN_APP_STACK_VIEW_ROUTE: ViewRoute = {
  name: 'MAIN_APP_STACK_VIEW_ROUTE',
  screen: MainAppStackRoutingComposition,
  viewTitle: '',
};

export const APP_TOP_TABS_VIEW_ROUTE: ViewRoute = {
  name: 'APP_TOP_TABS_VIEW_ROUTE',
  screen: AppTopTabsNavigationRoutingComposition,
  viewTitle: '',
};

export const APP_DEV_MOCKS_STACK_VIEW_ROUTE: ViewRoute = {
  name: 'APP_DEV_MOCKS_STACK_VIEW_ROUTE',
  screen: AppDevMocksStackRoutingComposition,
  viewTitle: '',
};

export const RECIPE_BOX_SUB_APP_STACK_VIEW_ROUTE: ViewRoute = {
  name: 'RECIPE_BOX_SUB_APP_STACK_VIEW_ROUTE',
  screen: RecipeBoxSubAppStackRoutingComposition,
  viewTitle: 'My Recipes',
};

/*End App composite views/screens*/

/*Recipe-Box, example sub-application primitive views/screens*/
export const MY_RECIPE_LOGIN_VIEW_ROUTE: ViewRoute = {
  name: 'MY_RECIPE_LOGIN_VIEW_ROUTE',
  screen: WithStoresHoc(Login, ['loginStore', 'appStore']),
  viewTitle: 'Login and Registration',
};

export const MY_RECIPE_HOME_VIEW_ROUTE: ViewRoute = {
  name: 'MY_RECIPE_HOME_VIEW_ROUTE',
  screen: WithStoresHoc(RecipeHome, ['loginStore', 'appStore', 'recipeBoxStore']),
  viewTitle: 'Home',
};

export const MY_RECIPE_RECIPE_DETAILS_VIEW_ROUTE: ViewRoute = {
  name: 'MY_RECIPE_RECIPE_DETAILS_VIEW_ROUTE',
  screen: WithStoresHoc(RecipeDetails, ['recipeBoxStore']),
  viewTitle: '',
};

export const MY_RECIPE_CREATE_EDIT_RECIPE_VIEW_ROUTE: ViewRoute = {
  name: 'MY_RECIPE_CREATE_EDIT_RECIPE_VIEW_ROUTE',
  screen: WithStoresHoc(CreateEditRecipeForm, ['loginStore', 'appStore', 'recipeBoxStore']),
  viewTitle: '',
};

export const MY_RECIPE_REQUESTS_VIEW_ROUTE: ViewRoute = {
  name: 'MY_RECIPE_REQUESTS_VIEW_ROUTE',
  screen: RecipeRequests,
  viewTitle: '',
};

/*End Recipe-Box, example sub-application primitive views/screens*/

/*Recipe-Box, example sub-application composite views/screens*/

export const RECIPE_BOX_BOTTOM_TABS_VIEW_ROUTE: ViewRoute = {
  name: 'RECIPE_BOX_BOTTOM_TABS_VIEW_ROUTE',
  screen: RecipeBoxBottomTabsNavigationRoutingComposition,
  viewTitle: '',
};

/*End Recipe-Box, example sub-application composite views/screens*/
