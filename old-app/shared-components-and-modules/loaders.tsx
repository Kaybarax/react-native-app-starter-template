/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { StyleSheet, Text, View } from 'react-native';
import { isTrue } from '../util/util';

// Error boundary wrapper since hooks don't have direct equivalents for error boundaries
const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return fallback;
  }

  try {
    return children;
  } catch (error) {
    // This simulates componentDidCatch and getDerivedStateFromError
    setHasError(true);
    // You could log the error here if needed
    return fallback;
  }
};

const LoaderContent = ({ message }) => {
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
};

const Loader = ({ message }) => {
  return (
    <ErrorBoundary fallback={<Text>Loader failing!!</Text>}>
      <LoaderContent message={message} />
    </ErrorBoundary>
  );
};

Loader.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Loader;

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
