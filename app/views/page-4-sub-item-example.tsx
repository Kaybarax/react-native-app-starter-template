//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { isEmptyArray, isNullUndefined, localeDateStringFormatFromDatetime, makeId } from '../util/util';
import { SOs_and_Credits_List } from '../app-management/data-manager/list-manager';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import RN, { Image, Text } from 'react-native';
import {
  AlignCenterContentCN,
  AlignCenterTextCN,
  AlignLeftFlexContainerContentCN,
  AlignLeftTextCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexFluidRowContainerCN,
} from '../theme/app-layout-styles-classnames';
import className from '../util/react-native-based-utils';
import { SCREEN_HEIGHT } from '../App';
import appNavigation from '../routing-and-navigation/app-navigation';
import { BlankSpaceDivider } from '../shared-components-and-modules/shared-components';
import { NegativeButtonCN, NegativeButtonTextCN } from '../theme/component-themes';
import { LinkText } from '../theme/app-text-styles-classnames';

export default function Page4SubItemExample(props) {
  console.log('Page4SubItemExample props', props);

  const {
    route: { params },
    navigation,
  } = props;

  let { item } = params;
  let person = SOs_and_Credits_List.find(it => it.person === item);

  if (isNullUndefined(person)) {
    return (
      <RN.ScrollView contentInsetAdjustmentBehavior={'automatic'} style={[className(FlexColumnContainerCN)]}>
        <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
          <RN.View style={[className(FlexFluidRowContainerCN)]}>
            <Text style={[className(FlexContainerChildItemFullWidthCN, AlignCenterTextCN)]}>No user details</Text>
          </RN.View>

          <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
            <RN.View style={[className(FlexFluidRowContainerCN)]}>
              <RN.TouchableOpacity
                activeOpacity={0.6}
                style={[className(FlexContainerChildItemFullWidthCN)]}
                onPress={_ => {
                  appNavigation.navigateBack(navigation);
                }}
              >
                <Text style={[className(AlignCenterContentCN)]}>Go back</Text>
              </RN.TouchableOpacity>
            </RN.View>
          </RN.View>
          <BlankSpaceDivider />
        </RN.View>
      </RN.ScrollView>
    );
  }

  return (
    <RN.ScrollView contentInsetAdjustmentBehavior={'automatic'} style={[className(FlexColumnContainerCN)]}>
      <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
        <RN.View style={[className(FlexFluidRowContainerCN)]}>
          <Text style={[className(FlexContainerChildItemFullWidthCN, AlignCenterTextCN)]}>
            Page 4 Item Example : Accredited Details
          </Text>
        </RN.View>
      </RN.View>

      <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
        <RN.View style={[className(FlexFluidRowContainerCN)]}>
          <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
            <Image
              source={require('../media/images/image.png')}
              style={[
                {
                  height: SCREEN_HEIGHT * 0.5,
                  width: '100%',
                  resizeMode: 'cover',
                },
              ]}
            />
          </RN.View>
        </RN.View>
      </RN.View>

      <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
        <RN.View style={[className(FlexFluidRowContainerCN)]}>
          <Text style={[className(FlexContainerChildItemFullWidthCN, AlignLeftFlexContainerContentCN)]}>
            {person && person.person}
          </Text>
          {!isEmptyArray(person?.links) &&
            person?.links.map(item => {
              return (
                <RN.Pressable
                  onPress={_ => {
                    RN.Linking.openURL(item.link).then(null);
                  }}
                  key={makeId(16)}
                >
                  <RN.Text style={[className(FlexContainerChildItemFullWidthCN, AlignLeftTextCN, LinkText)]}>
                    {item.site}
                  </RN.Text>
                </RN.Pressable>
              );
            })}
          <Text style={[className(FlexContainerChildItemFullWidthCN, AlignLeftFlexContainerContentCN)]}>
            <FontAwesomeIcon icon={faCoffee} size={30} />
          </Text>
          <Text style={[className(FlexContainerChildItemFullWidthCN, AlignLeftFlexContainerContentCN)]}>
            {localeDateStringFormatFromDatetime(new Date())}
          </Text>
        </RN.View>
      </RN.View>

      <BlankSpaceDivider />

      <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
        <RN.View style={[className(FlexFluidRowContainerCN)]}>
          <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
            <Image source={require('../media/images/short-paragraph.png')} />
          </RN.View>
        </RN.View>
      </RN.View>

      <BlankSpaceDivider />

      <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
        <RN.TouchableOpacity
          activeOpacity={0.6}
          style={[className(FlexContainerChildItemFullWidthCN, NegativeButtonCN)]}
          onPress={_ => {
            appNavigation.navigateBack(navigation);
          }}
        >
          <Text
            style={[
              className(AlignCenterTextCN, NegativeButtonTextCN),
              {
                width: '100%',
              },
            ]}
          >
            Go back
          </Text>
        </RN.TouchableOpacity>
      </RN.View>

      <BlankSpaceDivider />
    </RN.ScrollView>
  );
}
