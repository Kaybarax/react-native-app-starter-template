/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { useStores } from './with-stores-hook';

/**
 * A higher-order component that provides the specified stores to the wrapped component
 * @param Wrapped - The component to wrap
 * @param storeNames - Array of store names to provide to the component
 * @returns A new component with the stores provided as props
 */
const WithStoresHoc = (Wrapped: React.ComponentType<any>, storeNames: Array<string>) => {
  return function (props: any) {
    // Use the useStores hook to get the stores
    const storeProps = useStores(storeNames);

    // Pass the stores and the original props to the wrapped component
    return <Wrapped {...props} {...storeProps} />;
  };
};

export default WithStoresHoc;
