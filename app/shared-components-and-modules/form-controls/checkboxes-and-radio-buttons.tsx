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
import CheckBox from '@react-native-community/checkbox';
import RadioForm from 'react-native-simple-radio-button';
import className from '../../util/react-native-based-utils';
import { AlignLeftFlexContainerContentCN, FlexFluidRowContainerCN } from '../../theme/app-layout-styles-classnames';
import { isBoolean, isNumberType } from '../../util/util';

export function Radiobutton(props) {
  let { onRadioItemSelectChange, model, modelKey, radio_props } = props;

  const [radio, selectRadio] = React.useState(0);

  return (
    <RadioForm
      radio_props={radio_props}
      initial={radio}
      onPress={value => {
        selectRadio(value);
        onRadioItemSelectChange(model, modelKey, value);
      }}
    />
  );
}

export function Checkbox(props) {
  let { label, onCheckBoxChange, value } = props;

  const [checkBoxValue, changeCheckBoxValue] = React.useState(false);

  let handleSetToggleCheckBox = value => {
    changeCheckBoxValue(value);
    onCheckBoxChange(value);
  };

  return (
    <RN.View style={[className(FlexFluidRowContainerCN, AlignLeftFlexContainerContentCN)]}>
      <CheckBox
        disabled={false}
        value={isBoolean(value) ? value : isNumberType(value) ? value == 1 : checkBoxValue}
        onValueChange={value => {
          handleSetToggleCheckBox(value);
        }}
      />
      <RN.TouchableOpacity
        activeOpacity={0.6}
        style={[
          {
            marginTop: 5,
          },
        ]}
        onPress={_ => {
          handleSetToggleCheckBox(!checkBoxValue);
        }}
      >
        <RN.Text>{label}</RN.Text>
      </RN.TouchableOpacity>
    </RN.View>
  );
}
