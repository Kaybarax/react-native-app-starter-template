//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { Pressable, Text, View } from 'react-native';
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

interface HeaderBarProps {
  [key: string]: any;
}

export function AppTopTabsTitleBar(props: HeaderBarProps) {
  const drawerProps = appNavigation.globalNavigationProps.drawerProps;
  return (
    <View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: MAIN_SUPPORT_COLOR,
        },
      ]}
    >
      <Pressable
        onPress={() => {
          if (drawerProps?.navigation?.openDrawer) {
            drawerProps.navigation.openDrawer();
          }
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
      </Pressable>

      <Spacer spaces={2} />

      <Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        RN Ts App Starter Template
      </Text>
    </View>
  );
}

export function AppDevScratchTitleBar(props: HeaderBarProps) {
  const drawerProps = appNavigation.globalNavigationProps.drawerProps;
  return (
    <View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: SECONDARY_SUPPORT_COLOR,
        },
      ]}
    >
      <Pressable
        onPress={() => {
          if (drawerProps?.navigation?.openDrawer) {
            drawerProps.navigation.openDrawer();
          }
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
      </Pressable>

      <Spacer spaces={2} />

      <Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        App Dev Scratchpad
      </Text>
    </View>
  );
}

export function RecipeBoxTitleBar(props: HeaderBarProps) {
  const drawerProps = appNavigation.globalNavigationProps.drawerProps;
  return (
    <View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: NEGATIVE_ACTION_COLOR,
        },
      ]}
    >
      <Pressable
        onPress={() => {
          if (drawerProps?.navigation?.openDrawer) {
            drawerProps.navigation.openDrawer();
          }
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
      </Pressable>

      <Spacer spaces={2} />

      <Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        My Recipe
      </Text>
    </View>
  );
}

export function RecipeBoxHomeTitleBar(props: HeaderBarProps) {
  return (
    <View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: NEGATIVE_ACTION_COLOR,
        },
      ]}
    >
      <Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        My Recipe : Home
      </Text>
    </View>
  );
}

export function RecipeDetailsTitleBar(props: HeaderBarProps) {
  const { navigatedToParams } = appNavigation;
  console.log(
    '\nRecipeDetailsTitleBar props\n',
    props,
    '\nGlobalDrawerProps\n',
    appNavigation.globalNavigationProps.drawerProps,
    '\nnavigatedToParams\n',
    navigatedToParams,
  );
  return (
    <View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: NEGATIVE_ACTION_COLOR,
        },
      ]}
    >
      <Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        {navigatedToParams?.recipe?.name}
      </Text>
    </View>
  );
}

export function CreateEditTitleBar(props: HeaderBarProps) {
  return (
    <View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: NEGATIVE_ACTION_COLOR,
        },
      ]}
    >
      <Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        {appStores.stores?.recipeBoxStore?.viewAction === RECIPE_BOX_VIEWS_ACTIONS_ENUM.CREATE_RECIPE
          ? 'Create Recipe'
          : 'Edit Recipe'}
      </Text>
    </View>
  );
}

export function Page4SubItemExampleTitleBar(props: HeaderBarProps) {
  console.log('Page4SubItemExampleTitleBar Props', props);
  console.log('Page4SubItemExampleTitleBar navParams', appNavigation.navigatedToParams);

  const { navigatedToParams } = appNavigation;

  return (
    <View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: MAIN_SUPPORT_COLOR,
        },
      ]}
    >
      <Text
        style={[
          {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        ]}
      >
        {navigatedToParams?.item}
      </Text>
    </View>
  );
}
