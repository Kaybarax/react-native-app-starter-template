import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function AppSwitch(props) {
  let { onSwitchChange, model, modelKey } = props;

  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    onSwitchChange(model, modelKey, isEnabled);
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text>Include incomplete trips</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
