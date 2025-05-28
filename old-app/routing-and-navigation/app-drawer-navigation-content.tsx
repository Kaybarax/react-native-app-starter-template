/* eslint-disable @typescript-eslint/no-unused-vars */
//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import RN from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee, faCog, faHome } from '@fortawesome/free-solid-svg-icons';
import { MAIN_BG_COLOR, SECONDARY_COLOR } from '../theme/app-theme';
import className from '../util/react-native-based-utils';
import {
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexFluidRowContainerCN,
} from '../theme/app-layout-styles-classnames';
import { Spacer } from '../shared-components-and-modules/shared-components';
import { SCREEN_HEIGHT } from '../App';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import appNavigation from './app-navigation';

export default function AppDrawerNavigationContent(props) {
  console.log('AppDrawerNavigationContent');
  console.log('AppDrawerNavigationContent props', props);

  let { navigation } = props;

  //avail drawer props globally
  appNavigation.globalNavigationProps.drawerProps = props;
  appNavigation.globalNavigationProps.navigator = navigation;

  return (
    <DrawerContentScrollView {...props} style={[className(FlexColumnContainerCN)]}>
      <RN.TouchableOpacity
        activeOpacity={0.6}
        style={[className(FlexContainerChildItemFullWidthCN)]}
        onPress={_ => {
          appNavigation.navigateToHome(navigation);
        }}
      >
        <RN.Image
          style={[
            {
              height: SCREEN_HEIGHT * 0.2,
              width: '100%',
              resizeMode: 'cover',
            },
          ]}
          source={require('../media/images/breakfast-2151201_1920.jpg')}
        />
      </RN.TouchableOpacity>

      <DrawerItem
        style={[
          className(FlexContainerChildItemFullWidthCN),
          {
            backgroundColor: SECONDARY_COLOR,
            padding: 0,
          },
        ]}
        label={({ focused, color }) => {
          return (
            <RN.View
              style={[
                className(FlexFluidRowContainerCN),
                {
                  padding: 0,
                },
              ]}
            >
              <FontAwesomeIcon icon={faHome} color={MAIN_BG_COLOR} size={25} />
              <Spacer />
              <RN.Text
                style={[
                  {
                    color: 'teal',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 1,
                  },
                ]}
              >
                Home
              </RN.Text>
            </RN.View>
          );
        }}
        onPress={() => {
          appNavigation.navigateToHome(navigation);
        }}
      />

      <DrawerItem
        style={[
          className(FlexContainerChildItemFullWidthCN),
          {
            backgroundColor: SECONDARY_COLOR,
            padding: 0,
          },
        ]}
        label={({ focused, color }) => {
          return (
            <RN.View
              style={[
                className(FlexFluidRowContainerCN),
                {
                  padding: 0,
                },
              ]}
            >
              <FontAwesomeIcon icon={faCog} color={MAIN_BG_COLOR} size={25} />
              <Spacer />
              <RN.Text
                style={[
                  {
                    color: 'teal',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: -1,
                  },
                ]}
              >
                App Dev Scratchpad
              </RN.Text>
            </RN.View>
          );
        }}
        onPress={() => {
          appNavigation.navigateToAppDevScratchPad(navigation);
        }}
      />

      <DrawerItem
        style={[
          className(FlexContainerChildItemFullWidthCN),
          {
            backgroundColor: SECONDARY_COLOR,
            padding: 0,
          },
        ]}
        label={({ focused, color }) => {
          return (
            <RN.View
              style={[
                className(FlexFluidRowContainerCN),
                {
                  padding: 0,
                },
              ]}
            >
              <FontAwesomeIcon icon={faCoffee} color={MAIN_BG_COLOR} size={25} />
              <Spacer />
              <RN.Text
                style={[
                  {
                    color: 'teal',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: -1,
                  },
                ]}
              >
                My Recipe Sub-app
              </RN.Text>
            </RN.View>
          );
        }}
        onPress={() => {
          appNavigation.navigateToRecipeBoxSubApplication(navigation);
        }}
      />

      <DrawerItem
        style={[
          className(FlexContainerChildItemFullWidthCN),
          {
            backgroundColor: SECONDARY_COLOR,
            padding: 0,
          },
        ]}
        label={({ focused, color }) => {
          return (
            <RN.View
              style={[
                className(FlexFluidRowContainerCN),
                {
                  padding: 0,
                },
              ]}
            >
              <FontAwesomeIcon icon={faCreditCard} color={MAIN_BG_COLOR} size={25} />
              <Spacer />
              <RN.Text
                style={[
                  {
                    color: 'teal',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: -1,
                  },
                ]}
              >
                Credits Roll
              </RN.Text>
            </RN.View>
          );
        }}
        onPress={() => {
          // appNavigation.navigateToRecipeBoxSubApplication(navigation);
        }}
      />
    </DrawerContentScrollView>
  );
}
