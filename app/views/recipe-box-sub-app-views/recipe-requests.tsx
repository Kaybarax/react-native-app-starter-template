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
import className from '../../util/react-native-based-utils';
import {
  AlignCenterContentCN,
  AlignCenterTextCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
} from '../../theme/app-layout-styles-classnames';

export default function RecipeRequests(props) {
  return (
    <RN.View style={[className(FlexColumnContainerCN)]}>
      <RN.View style={[className(FlexContainerChildItemFullWidthCN, AlignCenterContentCN)]}>
        <RN.Text
          style={[
            className(AlignCenterTextCN),
            {
              fontSize: 18,
              fontWeight: 'bold',
            },
          ]}
        >
          Recipe requests, for example.
        </RN.Text>
      </RN.View>
    </RN.View>
  );
}
