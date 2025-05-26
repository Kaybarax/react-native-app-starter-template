/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import FallBackPage from './fall-back-page';

export default class SafeComponentWrapper extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // @ts-ignore
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  // @ts-ignore
  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // @ts-ignore
    console.log('caught error --- ', this.state.error);
    // @ts-ignore
    console.log('has error --- ', this.state.hasError);
    console.log('info --- ', info);
    console.log('error --- ', error);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      return <FallBackPage />;
    }
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
