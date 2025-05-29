/**
 * @authored by Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { isEmptyArray, isEmptyString, isNullUndefined } from '../../../util/util';
import RN from 'react-native';
import className from '../../../util/react-native-based-utils';
import {
  AlignCenterContentCN,
  FlexContainerChildItemFullWidthCN,
  FlexFluidRowContainerCN,
} from '../../../theme/app-layout-styles-classnames';
import { SCREEN_HEIGHT } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export default function PhotoInput(props) {
  let { photoIndex, recipePhotos, removePhoto, showCameraModal } = props;

  let photoPlaceholder = '../../../media/images/image.png';

  console.log('PhotoInput recipePhotos:', recipePhotos);

  let photo = isEmptyArray(recipePhotos)
    ? null
    : isNullUndefined(recipePhotos[photoIndex])
      ? null
      : isEmptyString(recipePhotos[photoIndex].image_file)
        ? null
        : 'data:image/jpeg;base64,' + recipePhotos[photoIndex].image_file;

  return (
    <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
      <RN.View style={[className(FlexFluidRowContainerCN)]}>
        <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
          <RN.View style={[className(FlexFluidRowContainerCN)]}>
            <RN.View
              style={[
                className(FlexContainerChildItemFullWidthCN),
                {
                  height: SCREEN_HEIGHT * 0.18,
                },
              ]}
            >
              <RN.Image
                style={[
                  {
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  },
                ]}
                source={
                  !isEmptyString(photo)
                    ? {
                        uri: photo,
                      }
                    : require(photoPlaceholder)
                }
              />
            </RN.View>

            {isEmptyString(photo) && (
              <RN.TouchableOpacity
                activeOpacity={0.6}
                style={[
                  {
                    borderRadius: 50,
                    backgroundColor: 'forestgreen',
                    position: 'absolute',
                    right: -5,
                    bottom: -5,
                  },
                  className(AlignCenterContentCN),
                ]}
                onPress={_ => {
                  showCameraModal(photoIndex);
                }}
              >
                <RN.Text
                  style={[
                    {
                      padding: 5,
                    },
                  ]}
                >
                  <FontAwesomeIcon icon={faPlus} color={'white'} size={20} />
                </RN.Text>
              </RN.TouchableOpacity>
            )}

            {!isEmptyString(photo) && (
              <RN.TouchableOpacity
                activeOpacity={0.6}
                style={[
                  {
                    borderRadius: 50,
                    backgroundColor: 'maroon',
                    position: 'absolute',
                    right: -5,
                    bottom: -5,
                  },
                  className(AlignCenterContentCN),
                ]}
                onPress={_ => {
                  removePhoto(photoIndex);
                }}
              >
                <RN.Text
                  style={[
                    {
                      padding: 5,
                    },
                  ]}
                >
                  <FontAwesomeIcon icon={faTimes} color={'white'} size={20} />
                </RN.Text>
              </RN.TouchableOpacity>
            )}
          </RN.View>
        </RN.View>
      </RN.View>
    </RN.View>
  );
}

//props guide
PhotoInput.props = {
  photoIndex: null,
  recipePhotos: null,
  removePhoto: null,
  photoPlaceholder: null,
  showCameraModal: null,
};
