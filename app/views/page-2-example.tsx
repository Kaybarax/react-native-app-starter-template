//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import appNavigation from '../routing-and-navigation/app-navigation';
import RN, { Text } from 'react-native';
import {
  AlignCenterTextCN,
  AlignLeftFlexContainerContentCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexFluidRowContainerCN,
} from '../theme/app-layout-styles-classnames';
import className from '../util/react-native-based-utils';
import { LinkText } from '../theme/app-text-styles-classnames';
import { NewLine } from '../shared-components-and-modules/shared-components';

export default function Page2Example(props) {
  const { navigation } = props;

  return (
    <RN.ScrollView contentInsetAdjustmentBehavior={'automatic'} style={[className(FlexColumnContainerCN)]}>
      <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
        <RN.View style={[className(FlexFluidRowContainerCN)]}>
          <Text style={[className(FlexContainerChildItemFullWidthCN, AlignCenterTextCN)]}>
            Page 2 Example : The design philosophy!
          </Text>
        </RN.View>
      </RN.View>

      <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
        <RN.View style={[className(FlexFluidRowContainerCN)]}>
          <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
            <RN.View style={[className(FlexFluidRowContainerCN)]}>
              <Text style={[className(FlexContainerChildItemFullWidthCN, AlignLeftFlexContainerContentCN)]}>
                Hey there again
                <NewLine lines={3} />
                Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for
                me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey..
                leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem
                ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous
                sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave
                some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum,
                gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous
                sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave
                some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum,
                gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous
                sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave
                some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum,
                gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous
                sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave
                some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum,
                gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous
                sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave
                some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum,
                gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous
                sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave
                some for me! Nous sommes!! Lorem ipsum, gypsum, hey.. leave some for me! Nous sommes!!
                <NewLine lines={3} />
                <RN.Pressable
                  onPress={_ => {
                    appNavigation.navigateToPage3Example(navigation, null);
                  }}
                >
                  <Text style={[className(LinkText)]}>Continue to Page 3 Example...</Text>
                </RN.Pressable>
                <NewLine lines={3} />
              </Text>
            </RN.View>
          </RN.View>
        </RN.View>
      </RN.View>
    </RN.ScrollView>
  );
}
