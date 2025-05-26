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
import PropTypes from 'prop-types';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { StyleSheet, Text, View } from 'react-native';
import { isTrue } from '../util/util';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      hasError: false,
    };
  }

  static propTypes = {
    message: PropTypes.string.isRequired,
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Text>Loader failing!!</Text>;
    }
    // @ts-ignore
    let message = this.props.message;
    return (
      <View style={styles.container}>
        <OrientationLoadingOverlay
          visible={true}
          color={'#EDDFF6'}
          indicatorSize={'large'}
          messageFontSize={24}
          message={message}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

/**
 * sd _ Kaybarax
 * @param loaderActivityStore
 */
export function invokeLoader(loaderActivityStore) {
  // console.log('loaderActivity:', toJS(loaderActivity));
  //if was earlier running, stop to start over
  if (isTrue(loaderActivityStore.loading)) {
    loaderActivityStore.loading = false;
  }
  //then continue
  loaderActivityStore.loading = true;
  setTimeout(_ => {
    loaderActivityStore.loading = false;
  }, 4000);
}
