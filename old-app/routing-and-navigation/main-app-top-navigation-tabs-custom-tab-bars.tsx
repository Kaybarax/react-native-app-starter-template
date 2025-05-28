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
import Animated from 'react-native-reanimated';
import {
  MAIN_SUPPORT_COLOR,
  NEGATIVE_ACTION_COLOR,
  SECONDARY_COLOR,
  SECONDARY_SUPPORT_COLOR,
} from '../theme/app-theme';
import { makeId } from '../util/util';
import { SCREEN_HEIGHT } from '../App';
import {
  PAGE1EXAMPLE_VIEW_ROUTE,
  PAGE2EXAMPLE_VIEW_ROUTE,
  PAGE3EXAMPLE_VIEW_ROUTE,
  PAGE4EXAMPLE_VIEW_ROUTE,
} from './views-routes-declarations';

export default function MainAppTopNavigationTabsCustomTabBars({ state, descriptors, navigation, position }) {
  console.log('MainAppTopNavigationTabsCustomTabBars');
  console.log('PROPS', state, descriptors, navigation);

  const TAB_NAMES = [
    PAGE1EXAMPLE_VIEW_ROUTE.viewTitle,
    PAGE2EXAMPLE_VIEW_ROUTE.viewTitle,
    PAGE3EXAMPLE_VIEW_ROUTE.viewTitle,
    PAGE4EXAMPLE_VIEW_ROUTE.viewTitle,
  ];

  return (
    <RN.View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: SECONDARY_COLOR,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.7)),
        });

        return (
          <RN.TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              {
                flex: 1,
                backgroundColor: SECONDARY_COLOR,
                height: SCREEN_HEIGHT * 0.08,
                padding: 10,
              },
            ]}
            key={makeId(16)}
          >
            <Animated.Text
              style={[
                {
                  color: isFocused ? SECONDARY_SUPPORT_COLOR : MAIN_SUPPORT_COLOR,
                  opacity,
                  padding: 5,
                  borderBottomWidth: isFocused ? 4 : 0,
                  borderBottomColor: isFocused ? NEGATIVE_ACTION_COLOR : SECONDARY_SUPPORT_COLOR,
                  fontWeight: 'bold',
                },
              ]}
            >
              {TAB_NAMES[index]}
            </Animated.Text>
          </RN.TouchableOpacity>
        );
      })}
    </RN.View>
  );
}
