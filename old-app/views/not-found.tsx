/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React, { Component } from 'react';
import SafeComponentWrapper from '../safe-component-wrapper';
import { Button, ImageBackground, Text, View } from 'react-native';
import {
  AlignCenterTextCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexFluidRowContainerCN,
} from '../theme/app-layout-styles-classnames';
import className from '../util/react-native-based-utils';
import { SCREEN_HEIGHT } from '../App';
import { BlankSpaceDivider } from '../shared-components-and-modules/shared-components';
import { SECONDARY_COLOR } from '../theme/app-theme';
import FallBackPage from '@/old-app/fall-back-page';

export default class NotFound extends Component {
  render() {
    return (
      <SafeComponentWrapper fallback={<FallBackPage />}>
        <ImageBackground
          source={require('../media/images/page-not-found.jpg')}
          style={[
            className(FlexColumnContainerCN),
            {
              height: SCREEN_HEIGHT,
            },
          ]}
        >
          <View style={[className(FlexFluidRowContainerCN)]}>
            <View style={[className(FlexContainerChildItemFullWidthCN)]}>
              <View
                style={[
                  className(FlexFluidRowContainerCN),
                  {
                    marginTop: SCREEN_HEIGHT * 0.8,
                  },
                ]}
              >
                <View
                  style={[
                    className(FlexContainerChildItemFullWidthCN),
                    {
                      backgroundColor: SECONDARY_COLOR,
                      borderRadius: 10,
                      padding: 5,
                    },
                  ]}
                >
                  <Text
                    style={[
                      className(AlignCenterTextCN),
                      {
                        color: 'black',
                        fontSize: 24,
                      },
                    ]}
                  >
                    Oops! View, Not Found!
                  </Text>
                  <BlankSpaceDivider />
                  <Button
                    title={'Return'}
                    onPress={() => {
                      //
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeComponentWrapper>
    );
  }
}
