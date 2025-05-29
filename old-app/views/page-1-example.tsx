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
  AlignLeftTextCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexFluidRowContainerCN,
} from '../theme/app-layout-styles-classnames';
import { NewLine } from '../shared-components-and-modules/shared-components';

export default function Page1Example(props) {
  const { navigation } = props;

  return (
    <RN.ScrollView contentInsetAdjustmentBehavior={'automatic'} style={[FlexColumnContainerCN]}>
      <RN.View style={[FlexContainerChildItemFullWidthCN]}>
        <RN.View style={[FlexFluidRowContainerCN]}>
          <Text style={[FlexContainerChildItemFullWidthCN, AlignCenterTextCN]}>
            Page 1 Example : Let&#39;s start here!
          </Text>
        </RN.View>
      </RN.View>

      <RN.View style={[FlexContainerChildItemFullWidthCN]}>
        <RN.View style={[FlexFluidRowContainerCN]}>
          <RN.View style={[FlexContainerChildItemFullWidthCN]}>
            <RN.View style={[FlexFluidRowContainerCN]}>
              <Text style={[FlexContainerChildItemFullWidthCN, AlignLeftTextCN]}>
                Hey
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
                    appNavigation.navigateToPage2Example(navigation, null);
                  }}
                >
                  <Text style={[]}>Continue to Page 2 Example to learn more...</Text>
                </RN.Pressable>
              </Text>
            </RN.View>
          </RN.View>
        </RN.View>
      </RN.View>
    </RN.ScrollView>
  );
}
