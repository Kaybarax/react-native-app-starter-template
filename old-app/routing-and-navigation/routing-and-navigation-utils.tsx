//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { Animated, Easing } from 'react-native';

/**
 * sd _ Kaybarax
 */
export interface ViewRoute {
  name: string;
  screen: any;
  options?: object;
  viewTitle: string;
}

/**
 * sd _ Kaybarax
 * @param viewRoutes
 * @returns {any}
 */
export function routeConfigMapBuilder(viewRoutes: Array<ViewRoute>) {
  let viewMap = {};
  for (let item of viewRoutes) {
    // @ts-ignore
    viewMap[item.name] = item.screen;
  }
  return viewMap;
}

/**
 * Define transition behavior during screen to screen navigation
 */
export const transitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0,
  },
});
