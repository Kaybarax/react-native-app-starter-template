//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

//your app-wide lists here

import { FoodGroupConsumer } from './models-manager';

interface Link {
  site: string;
  link: string;
}

interface Credit {
  person: string;
  attribution: string;
  links: Link[];
}

export const SOs_and_Credits_List: Credit[] = [
  {
    person: 'Michel Weststrate',
    attribution: 'Creator of MobX. The global state manager powering the app.',
    links: [
      {
        site: 'Twitter',
        link: 'https://twitter.com/mweststrate',
      },
      {
        site: 'MobX',
        link: 'https://mobx-state-tree.js.org/intro/philosophy',
      },
    ],
  },
  {
    person: 'Kevin Barasa',
    attribution: 'Author of this React Native with Typescript, App Starter Template',
    links: [
      {
        site: 'Twitter',
        link: 'https://twitter.com/Kaybarax',
      },
      {
        site: 'Linkedin',
        link: 'https://linkedin.com/in/kaybarax',
      },
    ],
  },
];

/**
 * sd _ Kaybarax
 */
export const RecipeGroupsSuitable = [
  FoodGroupConsumer('VEG', 'Vegan'),
  FoodGroupConsumer('LCM', 'Breast feeding mothers'),
  FoodGroupConsumer('LCTI', 'Lactose Intolerant'),
  FoodGroupConsumer('NWME', 'Non White Meat Eaters'),
  FoodGroupConsumer('NRME', 'Non Red Meat Eater'),
  FoodGroupConsumer('HALAL', 'Muslims'),
  FoodGroupConsumer('JWS', 'Jewish'),
  FoodGroupConsumer('UND9', 'Kids Under 9 Years Old'),
];
