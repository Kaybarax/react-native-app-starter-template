//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import className from '../util/react-native-based-utils';
import {
  AlignCenterContentCN,
  FlexContainerChildItemWidthCN,
  FlexFluidRowContainerCN,
} from '../theme/app-layout-styles-classnames';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faInbox } from '@fortawesome/free-solid-svg-icons';
import { MAIN_BG_COLOR, MAIN_SUPPORT_COLOR, SECONDARY_COLOR, SECONDARY_SUPPORT_COLOR } from '../theme/app-theme';
import { SCREEN_HEIGHT } from '../App';

interface RecipeBoxBottomNavigationTabsCustomTabBarsProps {
  state: {
    index: number;
    routes: Array<{
      key: string;
      name: string;
    }>;
  };
  descriptors: {
    [key: string]: {
      options: {
        tabBarLabel?: string | ((props: { focused: boolean; color: string; position: any; children: string; }) => React.ReactNode);
        title?: string;
        tabBarAccessibilityLabel?: string;
        tabBarTestID?: string;
      };
    };
  };
  navigation: any;
  insets?: any;
}

export default function RecipeBoxBottomNavigationTabsCustomTabBars({
  state,
  descriptors,
  navigation,
}: RecipeBoxBottomNavigationTabsCustomTabBarsProps) {
  console.log('RecipeBoxBottomNavigationTabsCustomTabBars');
  console.log('PROPS', state, descriptors, navigation);

  const TAB_NAMES = ['Home', 'Recipe Requests'];
  const TAB_ICONS = [faHome, faInbox];

  return (
    <View
      style={[
        className(FlexFluidRowContainerCN),
        {
          backgroundColor: SECONDARY_COLOR,
          position: 'absolute',
          bottom: 5, // Changed from '0.5%' to a numeric value
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

        let perItemWidth: string = (1.0 / state.routes.length) * 100 + '%';

        return (
          <View style={[className(FlexContainerChildItemWidthCN(perItemWidth))]} key={route.key}>
            <TouchableOpacity
              style={[
                className(AlignCenterContentCN),
                {
                  backgroundColor: SECONDARY_COLOR,
                  height: SCREEN_HEIGHT * 0.08,
                },
              ]}
              activeOpacity={0.6}
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <FontAwesomeIcon icon={TAB_ICONS[index]} color={MAIN_BG_COLOR} size={25} />

              <Text
                style={[
                  {
                    color: isFocused ? SECONDARY_SUPPORT_COLOR : MAIN_SUPPORT_COLOR,
                    fontWeight: 'bold',
                  },
                ]}
              >
                {TAB_NAMES[index]}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
