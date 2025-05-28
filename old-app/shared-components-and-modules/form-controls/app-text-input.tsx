/* eslint-disable prettier/prettier */
//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { MAIN_BG_COLOR, SECONDARY_COLOR } from '../../theme/app-theme';

const AppTextInput = props => {
  let { onChangeText, label, value, secureTextEntry, autoCorrect } = props;
  let [textValue, textValueChange] = React.useState(value);
  return (
    <View style={[styles.container]}>
      <Text style={[styles.label]}>{`${label}`}</Text>
      <TextInput
        style={styles.input}
        value={textValue}
        onChangeText={text => {
          textValueChange(text);
        }}
        onBlur={_ => {
          onChangeText(textValue);
        }}
        placeholder={label}
        autoCorrect={autoCorrect || false}
        secureTextEntry={secureTextEntry || false}
      />
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: MAIN_BG_COLOR,
    padding: 4,
    borderRadius: 10,
  },
  input: {
    fontSize: 13,
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: '#f5f5f5',
    borderRadius: 15,
    padding: 10,
    backgroundColor: SECONDARY_COLOR,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 8,
    marginLeft: 8,
    color: 'black',
  },
  error: {
    fontSize: 12,
    color: '#e74c3c',
  },
  errorContainer: {
    padding: 8,
  },
});
