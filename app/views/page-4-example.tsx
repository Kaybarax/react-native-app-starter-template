/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { isEmptyArray, makeId } from '../util/util';
import { SOs_and_Credits_List } from '../app-management/data-manager/list-manager';
import appNavigation from '../routing-and-navigation/app-navigation';
import RN, { Image, Text, View } from 'react-native';
import {
  AlignCenterTextCN,
  AlignLeftFlexContainerContentCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexFluidRowContainerCN,
} from '../theme/app-layout-styles-classnames';
import className from '../util/react-native-based-utils';
import { BlankSpaceDivider, NewLine, Spacer } from '../shared-components-and-modules/shared-components';
import { BoldTextCN, ItalicizedTextCN, LinkText } from '../theme/app-text-styles-classnames';

export default function Page4Example(props) {
  const { navigation } = props;

  const _viewAttributedPersonDetails = person => {
    appNavigation.navigateToPage4SubItemExample(navigation, { item: person });
  };

  return (
    <RN.ScrollView contentInsetAdjustmentBehavior={'automatic'} style={[FlexColumnContainerCN]}>
      <RN.View style={[FlexContainerChildItemFullWidthCN]}>
        <RN.View style={[FlexFluidRowContainerCN]}>
          <Text style={[FlexContainerChildItemFullWidthCN, AlignCenterTextCN]}>
            Page 4 Example : About me, and S/Os and credits
          </Text>
        </RN.View>
      </RN.View>

      <RN.View style={[FlexContainerChildItemFullWidthCN]}>
        <RN.View style={[FlexFluidRowContainerCN]}>
          <RN.View style={[FlexContainerChildItemFullWidthCN]}>
            <RN.View style={[FlexFluidRowContainerCN]}>
              <Text style={[FlexContainerChildItemFullWidthCN, AlignLeftFlexContainerContentCN]}>
                <Text
                  style={[
                    {
                      fontWeight: 'bold',
                    },
                  ]}
                >
                  About me:
                </Text>
                <NewLine lines={3} />
                Hi. I'm Kevin Barasa. A full stack software engineer currently based in my hometown and&nbsp; country,
                Nairobi, Kenya. At this time of this build and writing (September, 2020), I have 3 and&nbsp;a half years
                of professional (hired) software engineering experience, and 5 to 6 yrs of total software engineering
                experience, both professionally and personally.
                <NewLine lines={3} />
                I'm especially, particularly well versed with
                <Text style={[]}>Java</Text>,<Text style={[]}>SQL (MySQL/OracleSQL)</Text>
                ,&nbsp;
                <Text style={[]}>Javascript and web technologies</Text>,
                <Text style={[]}>Mobile app development with React Native and Android</Text>
                ,&nbsp; and I have, and can as well work with other languages and technologies like&nbsp;
                <Text style={[]}>Python, C++, C#, Dart, NoSQL Dbs, and AWS cloud</Text>
                .
                <NewLine lines={3} />
                <Text>Let's connect:</Text>
                <NewLine lines={3} />
                <RN.Pressable
                  style={[FlexFluidRowContainerCN]}
                  onPress={_ => {
                    RN.Linking.openURL('https://linkedin.com/in/kaybarax').then(null);
                  }}
                >
                  <RN.Text>LinkedIn:</RN.Text>
                  <Spacer />
                  <Text style={[]}>Kevin Barasa (kaybarax)</Text>
                </RN.Pressable>
                <NewLine lines={3} />
                <RN.Pressable
                  style={[FlexFluidRowContainerCN]}
                  onPress={_ => {
                    RN.Linking.openURL('https://github.com/Kaybarax').then(null);
                  }}
                >
                  <RN.Text>Github:</RN.Text>
                  <Spacer />
                  <Text style={[]}>Kaybarax</Text>
                </RN.Pressable>
                <NewLine lines={3} />
                <RN.Pressable
                  style={[FlexFluidRowContainerCN]}
                  onPress={_ => {
                    RN.Linking.openURL('https://twitter.com/Kaybarax').then(null);
                  }}
                >
                  <RN.Text>Twitter:</RN.Text>
                  <Spacer />
                  <Text style={[]}>Kaybarax</Text>
                </RN.Pressable>
                <NewLine lines={3} />
                <Text style={[]}>Shout out's and credits:</Text>
                <NewLine lines={1} />
                {!isEmptyArray(SOs_and_Credits_List) &&
                  SOs_and_Credits_List.map(item => {
                    return (
                      <View key={makeId(16)} style={[]}>
                        <View style={[]}>
                          <View style={[]}>
                            <BlankSpaceDivider />
                            <View style={[]}>
                              <View>
                                <Image
                                  source={require('../media/images/image.png')}
                                  style={{
                                    width: 96,
                                    height: 96,
                                  }}
                                />
                                <BlankSpaceDivider />
                                <View>
                                  <RN.Pressable
                                    onPress={_ => {
                                      _viewAttributedPersonDetails(item.person);
                                    }}
                                  >
                                    <Text style={[]}>{item.person}</Text>
                                  </RN.Pressable>
                                </View>
                              </View>
                            </View>
                          </View>
                          <BlankSpaceDivider />
                          <View style={[]}>
                            <RN.TouchableOpacity
                              activeOpacity={0.6}
                              style={[]}
                              onPress={_ => {
                                _viewAttributedPersonDetails(item.person);
                              }}
                            >
                              <Text>A little about {item.person}, click to view full details</Text>
                              <Image
                                source={require('../media/images/short-paragraph.png')}
                                style={{
                                  width: 520,
                                  height: 84,
                                }}
                              />
                            </RN.TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                <NewLine />
              </Text>
            </RN.View>
          </RN.View>
        </RN.View>
      </RN.View>
    </RN.ScrollView>
  );
}
