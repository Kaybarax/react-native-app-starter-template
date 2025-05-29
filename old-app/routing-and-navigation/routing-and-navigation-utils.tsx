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
  screen: React.ComponentType<any>;
  options?: Record<string, any>;
  viewTitle: string;
}

/**
 * sd _ Kaybarax
 * @param viewRoutes
 * @returns {Record<string, React.ComponentType<any>>}
 */
export function routeConfigMapBuilder(viewRoutes: Array<ViewRoute>): Record<string, React.ComponentType<any>> {
  let viewMap: Record<string, React.ComponentType<any>> = {};
  for (let item of viewRoutes) {
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
