/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

/**
 * Manifest of all "main activity level" screens _ Kaybarax
 */

import React from 'react';
import {
  _404_VIEW,
  APP_DEV_MOCKS_STACK_VIEW_ROUTE,
  APP_DEV_MOCKS_VIEW_ROUTE,
  APP_TOP_TABS_VIEW_ROUTE,
  MAIN_APP_STACK_VIEW_ROUTE,
  MY_RECIPE_CREATE_EDIT_RECIPE_VIEW_ROUTE,
  MY_RECIPE_HOME_VIEW_ROUTE,
  MY_RECIPE_LOGIN_VIEW_ROUTE,
  MY_RECIPE_RECIPE_DETAILS_VIEW_ROUTE,
  MY_RECIPE_REQUESTS_VIEW_ROUTE,
  PAGE1EXAMPLE_VIEW_ROUTE,
  PAGE2EXAMPLE_VIEW_ROUTE,
  PAGE3EXAMPLE_VIEW_ROUTE,
  PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE,
  PAGE4EXAMPLE_VIEW_ROUTE,
  RECIPE_BOX_BOTTOM_TABS_VIEW_ROUTE,
  RECIPE_BOX_SUB_APP_STACK_VIEW_ROUTE,
} from './views-routes-declarations';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppDrawerNavigationContent from './app-drawer-navigation-content';
import { SCREEN_WIDTH } from '../App';
import { MAIN_BG_COLOR, MAIN_SUPPORT_COLOR, NEGATIVE_ACTION_COLOR, SECONDARY_SUPPORT_COLOR } from '../theme/app-theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecipeBoxBottomNavigationTabsCustomTabBars from './recipe-box-bottom-navigation-tabs-custom-tab-bars';
import {
  AppDevScratchTitleBar,
  AppTopTabsTitleBar,
  CreateEditTitleBar,
  Page4SubItemExampleTitleBar,
  RecipeBoxHomeTitleBar,
  RecipeBoxTitleBar,
  RecipeDetailsTitleBar,
} from './navigated-views-header-bars-content';
import { RecipeBoxPopupMenuWithStores } from './popup-menu';
import MainAppTopNavigationTabsCustomTabBars from './main-app-top-navigation-tabs-custom-tab-bars';

export default function AppWithDrawerNavigationRoutingComposition() {
  const DrawerNav = createDrawerNavigator();

  return (
    <DrawerNav.Navigator
      drawerContent={props => {
        return <AppDrawerNavigationContent {...props} />;
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: MAIN_BG_COLOR,
          width: SCREEN_WIDTH * 0.75,
        },
        drawerType: SCREEN_WIDTH >= 768 ? 'permanent' : 'front',
      }}
    >
      <DrawerNav.Screen
        name={MAIN_APP_STACK_VIEW_ROUTE.name}
        component={MAIN_APP_STACK_VIEW_ROUTE.screen}
      />
      <DrawerNav.Screen
        name={APP_DEV_MOCKS_STACK_VIEW_ROUTE.name}
        component={APP_DEV_MOCKS_STACK_VIEW_ROUTE.screen}
      />
      <DrawerNav.Screen
        name={RECIPE_BOX_SUB_APP_STACK_VIEW_ROUTE.name}
        component={RECIPE_BOX_SUB_APP_STACK_VIEW_ROUTE.screen}
        options={{
          swipeEnabled: false,
        }}
      />
    </DrawerNav.Navigator>
  );
}

export function MainAppStackRoutingComposition() {
  const StackNav = createStackNavigator();

  return (
    <StackNav.Navigator
      initialRouteName={APP_TOP_TABS_VIEW_ROUTE.name}
      screenOptions={{
        headerStyle: {
          backgroundColor: MAIN_SUPPORT_COLOR,
        },
        headerTintColor: '#fff',
        headerTitleStyle: [],
      }}
    >
      <StackNav.Screen
        name={APP_TOP_TABS_VIEW_ROUTE.name}
        component={APP_TOP_TABS_VIEW_ROUTE.screen}
        options={{
          headerTitle: props => <AppTopTabsTitleBar {...props} />,
        }}
      />
      <StackNav.Screen
        name={PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE.name}
        component={PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE.screen}
        options={{
          headerTitle: props => <Page4SubItemExampleTitleBar {...props} />,
        }}
      />
      <StackNav.Screen name={_404_VIEW.name} component={_404_VIEW.screen} />
    </StackNav.Navigator>
  );
}

export function RecipeBoxSubAppStackRoutingComposition() {
  const StackNav = createStackNavigator();

  return (
    <StackNav.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: NEGATIVE_ACTION_COLOR,
        },
        headerTintColor: '#fff',
        headerTitleStyle: [],
      }}
    >
      <StackNav.Screen
        name={MY_RECIPE_LOGIN_VIEW_ROUTE.name}
        component={MY_RECIPE_LOGIN_VIEW_ROUTE.screen}
        options={{
          headerTitle: props => <RecipeBoxTitleBar {...props} />,
        }}
      />
      <StackNav.Screen
        name={RECIPE_BOX_BOTTOM_TABS_VIEW_ROUTE.name}
        component={RECIPE_BOX_BOTTOM_TABS_VIEW_ROUTE.screen}
        options={{
          headerTitle: props => <RecipeBoxHomeTitleBar {...props} />,
          headerRight: props => <RecipeBoxPopupMenuWithStores {...props} />,
          headerLeft: () => null, // Hide back button
        }}
      />
      <StackNav.Screen
        name={MY_RECIPE_RECIPE_DETAILS_VIEW_ROUTE.name}
        component={MY_RECIPE_RECIPE_DETAILS_VIEW_ROUTE.screen}
        options={{
          headerTitle: props => <RecipeDetailsTitleBar {...props} />,
        }}
      />
      <StackNav.Screen
        name={MY_RECIPE_CREATE_EDIT_RECIPE_VIEW_ROUTE.name}
        component={MY_RECIPE_CREATE_EDIT_RECIPE_VIEW_ROUTE.screen}
        options={{
          headerTitle: props => <CreateEditTitleBar {...props} />,
        }}
      />
    </StackNav.Navigator>
  );
}

export function AppTopTabsNavigationRoutingComposition() {
  const TopTabsNav = createMaterialTopTabNavigator();

  return (
    <TopTabsNav.Navigator tabBar={props => <MainAppTopNavigationTabsCustomTabBars {...props} />}>
      <TopTabsNav.Screen
        name={PAGE1EXAMPLE_VIEW_ROUTE.name}
        component={PAGE1EXAMPLE_VIEW_ROUTE.screen}
      />
      <TopTabsNav.Screen
        name={PAGE2EXAMPLE_VIEW_ROUTE.name}
        component={PAGE2EXAMPLE_VIEW_ROUTE.screen}
      />
      <TopTabsNav.Screen
        name={PAGE3EXAMPLE_VIEW_ROUTE.name}
        component={PAGE3EXAMPLE_VIEW_ROUTE.screen}
      />
      <TopTabsNav.Screen
        name={PAGE4EXAMPLE_VIEW_ROUTE.name}
        component={PAGE4EXAMPLE_VIEW_ROUTE.screen}
      />
    </TopTabsNav.Navigator>
  );
}

export function RecipeBoxBottomTabsNavigationRoutingComposition() {
  const BottomTabsNav = createBottomTabNavigator();

  return (
    <BottomTabsNav.Navigator
      tabBar={props => <RecipeBoxBottomNavigationTabsCustomTabBars {...props} />}
    >
      <BottomTabsNav.Screen
        name={MY_RECIPE_HOME_VIEW_ROUTE.name}
        component={MY_RECIPE_HOME_VIEW_ROUTE.screen}
      />
      <BottomTabsNav.Screen
        name={MY_RECIPE_REQUESTS_VIEW_ROUTE.name}
        component={MY_RECIPE_REQUESTS_VIEW_ROUTE.screen}
      />
    </BottomTabsNav.Navigator>
  );
}

export function AppDevMocksStackRoutingComposition() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={APP_DEV_MOCKS_VIEW_ROUTE.name}
      screenOptions={{
        headerStyle: {
          backgroundColor: SECONDARY_SUPPORT_COLOR,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {},
      }}
    >
      <Stack.Screen
        name={APP_DEV_MOCKS_VIEW_ROUTE.name}
        component={APP_DEV_MOCKS_VIEW_ROUTE.screen}
        options={{
          headerTitle: props => <AppDevScratchTitleBar {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
