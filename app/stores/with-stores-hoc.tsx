/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { useStores } from './with-stores-hook';

/**
 * sd _ Kaybarax
 * @param Wrapped
 * @param stores
 * @constructor
 */
const WithStoresHoc = (Wrapped, stores: Array<string>) => {
  return function (props) {
    // Use the useStores hook to get the stores
    const storeProps = useStores(stores);

    // Pass the stores and the original props to the wrapped component
    return <Wrapped {...props} {...storeProps} />;
  };
};

export default WithStoresHoc;
