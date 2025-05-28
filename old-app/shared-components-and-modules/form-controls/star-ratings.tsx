//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { Rating } from 'react-native-ratings';

export default function StarRatings(props) {
  let { ratings, disabled, type, imageSize } = props;

  return (
    <Rating
      type={type || 'star'}
      // showRating
      ratingColor="#3498db"
      ratingBackgroundColor="#c8c7c8"
      startingValue={ratings || 0}
      ratingCount={5}
      imageSize={imageSize || 20}
      // onFinishRating={this.ratingCompleted}
      // style={{ paddingVertical: 10 }}
    />
  );
}

StarRatings.props = {
  ratings: null,
  disabled: null,
};
