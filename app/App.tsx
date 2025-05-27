/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import RN from 'react-native';
import AppEntry from './app-entry';
import appStores from './stores/index';
import appNavigation from './routing-and-navigation/app-navigation';
import { appSQLiteDb } from './app-management/data-manager/embeddedDb-manager';
import Loader from './shared-components-and-modules/loaders';
import NotFound from './views/not-found';
import className from './util/react-native-based-utils';
import { FlexColumnContainerCN } from './theme/app-layout-styles-classnames';
import { serviceWorkerThread } from './controllers/app-controller';
import { TIME_OUT } from './app-config';
import { isEmptyObject, isEmptyString } from './util/util';
import SafeComponentWrapper from './safe-component-wrapper';
import { useAppStore } from './stores';

export const SCREEN_HEIGHT = RN.Dimensions.get('window').height;
export const SCREEN_WIDTH = RN.Dimensions.get('window').width;

const App = () => {
  //manage runtime errors, warnings and logs feedback
  if (__DEV__) {
    // @ts-ignore
    if (global.location && global.location.pathname.includes('/debugger-ui')) {
      // RN.Alert.alert('Remote debug is ON');
      //hide in-development unnecessary console warnings. Comment to display
      // console.warn = console.error = function (message) {
      //     // do nothing
      // };
      //Disable all warnings, errors, and logs when
      // remotely debugging during development. Comment to enable
      // console.warn = console.error = console.log = function (message) {
      //     //do nothing
      // };
    } else {
      // RN.Alert.alert('Remote debug is OFF');
      //disable all warnings, errors, and logs when not
      //remote debugging during development
      console.warn =
        console.error =
        console.log =
          function (message) {
            //do nothing
          };
    }
  } else {
    //disable all warnings, errors, and logs in release
    console.warn =
      console.error =
      console.log =
        function (message) {
          //do nothing
        };
  }

  let [dbLoaded, loadDb] = React.useState(false);
  let [dbLoadFeedback, setDbLoadFeedback] = React.useState('');

  React.useEffect(() => {
    console.log('appSQLiteDb.dbLoadedAndInitialized :::: ', appSQLiteDb.dbLoadedAndInitialized);

    //init embedded app db
    serviceWorkerThread(
      _ => {
        appSQLiteDb.loadAndInitDB();
      },
      _ => {
        return appSQLiteDb.dbLoadedAndInitialized;
      },
      _ => {
        loadDb(true);
        // pass navStore reference to appNavigation
        appNavigation.navStore = useAppStore.getState().navStore;
      },
      _ => {
        setDbLoadFeedback('Failed to load app sqlite-db. Restart app to try again.');
      },
      TIME_OUT,
      1000,
    );
  }, []);

  if (!dbLoaded) {
    return (
      <RN.ScrollView style={[className(FlexColumnContainerCN)]}>
        <NotFound />
        <Loader message={isEmptyString(dbLoadFeedback) ? appSQLiteDb.latestProgressUpdate : dbLoadFeedback} />
      </RN.ScrollView>
    );
  }

  return (
    <SafeComponentWrapper>
      <AppEntry />
    </SafeComponentWrapper>
  );
};

export default App;
