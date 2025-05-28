//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import RN from 'react-native';
import className from '../util/react-native-based-utils';
import { FlexFluidRowContainerCN } from '../theme/app-layout-styles-classnames';
import { MAIN_BG_COLOR, MAIN_SUPPORT_COLOR, NEGATIVE_ACTION_COLOR, SECONDARY_SUPPORT_COLOR } from '../theme/app-theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Spacer } from '../shared-components-and-modules/shared-components';
import React from 'react';
import appNavigation from './app-navigation';
import { RECIPE_BOX_VIEWS_ACTIONS_ENUM } from '../stores/actions-and-stores-data';
import appStores from '../stores';

export function AppTopTabsTitleBar(props) {
  let drawerProps = appNavigation.globalNavigationProps.drawerProps;
  return (
    <RN.View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: MAIN_SUPPORT_COLOR,
        },
      ]}
    >
      <RN.Pressable
        onPress={_ => {
          // console.log('GlobalDrawerProps', GlobalDrawerProps);
          // @ts-ignore
          drawerProps.navigation.openDrawer();
        }}
      >
        <FontAwesomeIcon
          icon={faBars}
          color={MAIN_BG_COLOR}
          size={25}
          style={[
            {
              marginTop: 4,
            },
          ]}
        />
      </RN.Pressable>

      <Spacer spaces={2} />

      <RN.Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        RN Ts App Starter Template
      </RN.Text>
    </RN.View>
  );
}

export function AppDevScratchTitleBar(props) {
  let drawerProps = appNavigation.globalNavigationProps.drawerProps;
  return (
    <RN.View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: SECONDARY_SUPPORT_COLOR,
        },
      ]}
    >
      <RN.Pressable
        onPress={_ => {
          // @ts-ignore
          drawerProps.navigation.openDrawer();
        }}
      >
        <FontAwesomeIcon
          icon={faBars}
          color={MAIN_BG_COLOR}
          size={25}
          style={[
            {
              marginTop: 4,
            },
          ]}
        />
      </RN.Pressable>

      <Spacer spaces={2} />

      <RN.Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        App Dev Scratchpad
      </RN.Text>
    </RN.View>
  );
}

export function RecipeBoxTitleBar(props) {
  let drawerProps = appNavigation.globalNavigationProps.drawerProps;
  return (
    <RN.View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: NEGATIVE_ACTION_COLOR,
        },
      ]}
    >
      <RN.Pressable
        onPress={_ => {
          // @ts-ignore
          drawerProps.navigation.openDrawer();
        }}
      >
        <FontAwesomeIcon
          icon={faBars}
          color={MAIN_BG_COLOR}
          size={25}
          style={[
            {
              marginTop: 4,
            },
          ]}
        />
      </RN.Pressable>

      <Spacer spaces={2} />

      <RN.Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        My Recipe
      </RN.Text>
    </RN.View>
  );
}

export function RecipeBoxHomeTitleBar(props) {
  let drawerProps = appNavigation.globalNavigationProps.drawerProps;
  return (
    <RN.View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: NEGATIVE_ACTION_COLOR,
        },
      ]}
    >
      <RN.Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        My Recipe : Home
      </RN.Text>
    </RN.View>
  );
}

export function RecipeDetailsTitleBar(props) {
  let drawerProps = appNavigation.globalNavigationProps.drawerProps;
  let { navigatedToParams } = appNavigation;
  console.log(
    '\nRecipeDetailsTitleBar props\n',
    props,
    '\nGlobalDrawerProps\n',
    appNavigation.globalNavigationProps.drawerProps,
    '\nnavigatedToParams\n',
    navigatedToParams,
  );
  return (
    <RN.View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: NEGATIVE_ACTION_COLOR,
        },
      ]}
    >
      <RN.Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        {navigatedToParams?.['recipe']?.['name']}
      </RN.Text>
    </RN.View>
  );
}

export function CreateEditTitleBar(props) {
  let drawerProps = appNavigation.globalNavigationProps.drawerProps;
  return (
    <RN.View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: NEGATIVE_ACTION_COLOR,
        },
      ]}
    >
      <RN.Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        {appStores.stores?.recipeBoxStore['viewAction'] === RECIPE_BOX_VIEWS_ACTIONS_ENUM.CREATE_RECIPE
          ? 'Create Recipe'
          : 'Edit Recipe'}
      </RN.Text>
    </RN.View>
  );
}

export function Page4SubItemExampleTitleBar(props) {
  console.log('Page4SubItemExampleTitleBar Props', props);
  console.log('Page4SubItemExampleTitleBar navParams', appNavigation.navigatedToParams);

  let { navigatedToParams } = appNavigation;

  return (
    <RN.View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: MAIN_SUPPORT_COLOR,
        },
      ]}
    >
      <RN.Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        {navigatedToParams?.['item']}
      </RN.Text>
    </RN.View>
  );
}
