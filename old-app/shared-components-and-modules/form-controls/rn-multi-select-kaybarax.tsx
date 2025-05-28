import React from 'react';
import RN from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  AlignCenterContentCN,
  AlignCenterTextCN,
  AlignLeftFlexContainerContentCN,
  AlignLeftTextCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexContainerChildItemWidthCN,
  FlexFluidRowContainerCN,
} from '../../theme/app-layout-styles-classnames';
import { isEmptyArray, isNullUndefined, isTrue, makeId } from '../../util/util';
import { MAIN_BG_COLOR, SECONDARY_COLOR } from '../../theme/app-theme';
import { SCREEN_HEIGHT } from '../../App';
import { BlankSpaceDivider } from '../shared-components';
import { NegativeButtonCN } from '../../theme/component-themes';

interface RnMultiSelectKaybaraxProps {
  selectedItems: Array<SelectedItem>;
  itemsList: Array<SelectedItem>;
  multiSelectDialogIsOpen?: boolean;
  onItemSelected: Function;
  onItemRemoved: Function;
  toggleOpenMultiSelectDialog?: Function;
  style?: object;
}

type SelectedItem = {
  text?: string;
  label?: string;
  value: string;
};

export default function RnMultiSelectKaybarax(props: RnMultiSelectKaybaraxProps) {
  console.log('PROPS IN RnMultiSelectKaybarax', props);

  let [state, set_state] = React.useState({
    selectedItems: isEmptyArray(props.selectedItems) ? [] : [...props.selectedItems],
    itemsList: isEmptyArray(props.itemsList) ? [] : [...props.itemsList],
    multiSelectDialogIsOpen: props.multiSelectDialogIsOpen || false,
  });

  function onItemSelected(value) {
    let itemsList = state.itemsList;
    let selectedItems = state.selectedItems;
    let item = itemsList.find(item => item.value === value);
    isEmptyArray(selectedItems) && (selectedItems = []);
    if (!isNullUndefined(item)) {
      // @ts-ignore
      selectedItems.push(item);
      // @ts-ignore
      let idx = itemsList.indexOf(item);
      itemsList.splice(idx, 1);
    }
    state.selectedItems = [...selectedItems];
    state.itemsList = [...itemsList];
    //update parent first
    props.onItemSelected(value);
    //after parent has re-rendered child, update child
    set_state(state);
  }

  function onItemRemoved(value) {
    let itemsList = state.itemsList;
    let selectedItems = state.selectedItems;
    isNullUndefined(selectedItems) && (selectedItems = []);
    let item = selectedItems.find(item => item.value === value);
    if (!isNullUndefined(item)) {
      // @ts-ignore
      itemsList.push(item);
      // @ts-ignore
      let idx = selectedItems.indexOf(item);
      selectedItems.splice(idx, 1);
    }
    state.selectedItems = [...selectedItems];
    state.itemsList = [...itemsList];
    set_state(state);
    props.onItemRemoved(value);
  }

  let openMultiSelectDialog = () => {
    state.multiSelectDialogIsOpen = true;
    set_state(state);
    props?.toggleOpenMultiSelectDialog?.(true);
  };

  let closeDropdown = () => {
    state.multiSelectDialogIsOpen = false;
    set_state(state);
    props.toggleOpenMultiSelectDialog?.(false);
  };

  return (
    <RN.ScrollView
      style={[
        FlexColumnContainerCN,
        {
          backgroundColor: SECONDARY_COLOR,
          borderRadius: 15,
        },
      ]}
    >
      <RN.TouchableOpacity
        activeOpacity={0.6}
        onPress={openMultiSelectDialog}
        style={[
          FlexFluidRowContainerCN,
          {
            backgroundColor: 'white',
            borderRadius: 15,
          },
        ]}
      >
        <RN.TouchableOpacity
          activeOpacity={0.6}
          onPress={openMultiSelectDialog}
          style={[
            FlexColumnContainerCN,
            FlexContainerChildItemWidthCN('80%'),
            {
              backgroundColor: SECONDARY_COLOR,
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
            },
          ]}
        >
          <RN.View style={[FlexFluidRowContainerCN]}>
            {!isEmptyArray(state.selectedItems) && (
              <RN.View style={[FlexContainerChildItemFullWidthCN]}>
                <RN.View style={[FlexFluidRowContainerCN]}>
                  <RN.View
                    style={[FlexContainerChildItemFullWidthCN, AlignLeftFlexContainerContentCN]}
                    key={makeId(16)}
                  >
                    <RN.View style={[FlexFluidRowContainerCN]}>
                      <RN.View
                        style={[
                          {
                            backgroundColor: '#FFFFFF',
                            borderTopLeftRadius: 15,
                            borderBottomLeftRadius: 15,
                          },
                        ]}
                      >
                        <RN.Text
                          style={{
                            color: '#929fb2',
                            fontSize: 14,
                            textAlign: 'center',
                            paddingTop: 5,
                            paddingLeft: 5,
                            paddingBottom: 5,
                          }}
                        >
                          {state.selectedItems[0].text || state.selectedItems[0].label}
                        </RN.Text>
                      </RN.View>

                      <RN.TouchableOpacity
                        activeOpacity={0.6}
                        style={[
                          {
                            backgroundColor: '#FFFFFF',
                            borderTopRightRadius: 15,
                            borderBottomRightRadius: 15,
                          },
                        ]}
                        onPress={onItemRemoved.bind(null, state.selectedItems[0].value)}
                      >
                        <RN.Text
                          style={[
                            {
                              padding: 2,
                            },
                          ]}
                        >
                          <FontAwesomeIcon icon={faTimes} color={'#E0E0E0'} size={30} />
                        </RN.Text>
                      </RN.TouchableOpacity>
                    </RN.View>
                  </RN.View>
                </RN.View>
              </RN.View>
            )}

            {isEmptyArray(state.selectedItems) && (
              <RN.TouchableOpacity
                activeOpacity={0.6}
                style={[FlexContainerChildItemFullWidthCN]}
                onPress={openMultiSelectDialog}
              >
                <RN.Text
                  style={[
                    {
                      color: '#808A9D',
                      fontSize: 16,
                      paddingTop: 10,
                    },
                    AlignLeftTextCN,
                  ]}
                >
                  Select
                </RN.Text>
              </RN.TouchableOpacity>
            )}
          </RN.View>

          <RN.Modal
            animationType={'slide'}
            transparent={false}
            visible={state.multiSelectDialogIsOpen}
            onRequestClose={() => {}}
          >
            <RN.View
              style={[
                FlexColumnContainerCN,
                {
                  backgroundColor: SECONDARY_COLOR,
                  padding: 2,
                  elevation: 5,
                  zIndex: props['zIndez'] || 1000000,
                  height: SCREEN_HEIGHT,
                },
              ]}
            >
              <RN.ScrollView style={[FlexContainerChildItemFullWidthCN]}>
                {isTrue(state.multiSelectDialogIsOpen) &&
                  !isEmptyArray(state.itemsList) &&
                  state.itemsList.map((item, i) => {
                    console.log('state.multiSelectDialogIsOpen ', item);
                    let boundOnPress = onItemSelected.bind(null, item.value);
                    return (
                      <RN.TouchableOpacity
                        style={[
                          {
                            padding: 5,
                            backgroundColor: `${i % 2 === 0 ? '#FFFFFF' : '#ADBECF'}`,
                          },
                        ]}
                        activeOpacity={0.6}
                        onPress={boundOnPress}
                        key={makeId(16)}
                      >
                        <RN.Text
                          style={[
                            {
                              color: '#929fb2',
                              fontSize: 15,
                              fontWeight: 'bold',
                              paddingTop: 10,
                            },
                            AlignLeftTextCN,
                          ]}
                        >
                          {item.label || item.text}
                        </RN.Text>
                      </RN.TouchableOpacity>
                    );
                  })}
              </RN.ScrollView>

              <RN.View
                style={[
                  {
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    right: 10,
                  },
                ]}
              >
                {isTrue(state.multiSelectDialogIsOpen) && isEmptyArray(state.itemsList) && (
                  <RN.View>
                    <RN.Text
                      style={[
                        AlignCenterTextCN,
                        {
                          color: '#929fb2',
                          fontSize: 15,
                          fontWeight: 'bold',
                          paddingTop: 10,
                        },
                      ]}
                    >
                      No options to select!
                    </RN.Text>
                    <BlankSpaceDivider />
                  </RN.View>
                )}

                <RN.TouchableOpacity style={[NegativeButtonCN]} activeOpacity={0.6} onPress={closeDropdown}>
                  <RN.Text>EXIT SELECTION</RN.Text>
                </RN.TouchableOpacity>
              </RN.View>
            </RN.View>
          </RN.Modal>
        </RN.TouchableOpacity>

        <RN.TouchableOpacity
          activeOpacity={0.6}
          style={[
            {
              backgroundColor: MAIN_BG_COLOR,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
            },
            FlexContainerChildItemWidthCN('20%'),
            AlignCenterContentCN,
          ]}
          onPress={openMultiSelectDialog}
        >
          <RN.Text style={[]}>
            <FontAwesomeIcon icon={faSearch} color={SECONDARY_COLOR} size={30} />
          </RN.Text>
        </RN.TouchableOpacity>
      </RN.TouchableOpacity>

      {!isEmptyArray(state.selectedItems) && (
        <RN.View style={[FlexContainerChildItemFullWidthCN]}>
          <RN.View style={[FlexFluidRowContainerCN]}>
            {state.selectedItems.map((item, i) => {
              if (i === 0) {
                return null;
              }
              let boundOnClearItem = onItemRemoved.bind(null, item.value);
              return (
                <RN.View style={[FlexContainerChildItemFullWidthCN, AlignLeftFlexContainerContentCN]} key={makeId(16)}>
                  <RN.View style={[FlexFluidRowContainerCN]}>
                    <RN.View
                      style={[
                        {
                          backgroundColor: '#FFFFFF',
                          borderTopLeftRadius: 15,
                          borderBottomLeftRadius: 15,
                        },
                      ]}
                    >
                      <RN.Text
                        style={{
                          color: '#929fb2',
                          fontSize: 14,
                          textAlign: 'center',
                          paddingTop: 5,
                          paddingLeft: 5,
                          paddingBottom: 5,
                        }}
                      >
                        {item.label || item.text}
                      </RN.Text>
                    </RN.View>

                    <RN.TouchableOpacity
                      activeOpacity={0.6}
                      style={[
                        {
                          backgroundColor: '#FFFFFF',
                          borderTopRightRadius: 15,
                          borderBottomRightRadius: 15,
                        },
                      ]}
                      onPress={boundOnClearItem}
                    >
                      <RN.Text
                        style={[
                          {
                            padding: 2,
                          },
                        ]}
                      >
                        <FontAwesomeIcon icon={faTimes} color={'#E0E0E0'} size={30} />
                      </RN.Text>
                    </RN.TouchableOpacity>
                  </RN.View>
                </RN.View>
              );
            })}
          </RN.View>
        </RN.View>
      )}
    </RN.ScrollView>
  );
}
