/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React, { useEffect, useRef, useState } from 'react';
import RN, { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { isEmptyString, isNullUndefined } from '../../util/util';
import { showToast } from '../../util/react-native-based-utils';
import {
  AlignCenterContentCN,
  AlignCenterTextCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexRowContainerCN,
} from '../../theme/app-layout-styles-classnames';
import { SCREEN_HEIGHT } from '../../App';
import { CameraView, Camera } from 'expo-camera';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCamera,
  faCheck,
  faExchangeAlt,
  faLightbulb as OnLightbulb,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Spacer } from '../shared-components';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { MAIN_BG_COLOR, POSITIVE_ACTION_COLOR, SECONDARY_COLOR } from '../../theme/app-theme';

interface CameraControlsProps {
  camera: any;
  takePicture: (camera: any) => Promise<void>;
  cameraFlashOn: boolean;
  backCamera: boolean;
  cameraModuleProps: any;
  updateCameraModuleProps: (props: any) => void;
  hideCameraModal: () => void;
  OnLightbulb: any; // Icon component
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  camera,
  takePicture,
  cameraFlashOn,
  backCamera,
  cameraModuleProps,
  updateCameraModuleProps,
  hideCameraModal,
  OnLightbulb,
}) => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          bottom: SCREEN_HEIGHT * 0.08,
          padding: 5,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={_ => {
          showToast('Capturing photo...', 'short');
          takePicture(camera).then(null);
        }}
        style={[]}
      >
        <Text
          style={[
            {
              fontSize: 18,
              padding: 5,
            },
          ]}
        >
          <FontAwesomeIcon icon={faCamera} color={'white'} size={30} />
        </Text>
      </TouchableOpacity>
      <Spacer spaces={5} />
      <TouchableOpacity
        onPress={_ => {
          if (cameraFlashOn) {
            showToast('Turning flashlight off...', 'short');
          } else {
            showToast('Turning flashlight on...', 'short');
          }
          cameraModuleProps.cameraFlashOn = !cameraFlashOn;
          updateCameraModuleProps(cameraModuleProps);
        }}
      >
        <Text
          style={[
            {
              fontSize: 18,
              padding: 5,
            },
          ]}
        >
          <FontAwesomeIcon icon={cameraFlashOn ? OnLightbulb : faLightbulb} color={'white'} size={30} />
        </Text>
      </TouchableOpacity>
      <Spacer spaces={5} />
      <TouchableOpacity
        onPress={_ => {
          cameraModuleProps.backCamera = !backCamera;
          updateCameraModuleProps(cameraModuleProps);
        }}
      >
        <Text
          style={[
            {
              fontSize: 18,
              padding: 5,
            },
          ]}
        >
          <FontAwesomeIcon icon={faExchangeAlt} color={'white'} size={30} />
        </Text>
      </TouchableOpacity>
      <Spacer spaces={5} />
      <TouchableOpacity
        onPress={_ => {
          hideCameraModal();
        }}
      >
        <Text
          style={[
            {
              fontSize: 18,
              padding: 5,
            },
          ]}
        >
          <FontAwesomeIcon icon={faTimes} color={'white'} size={30} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ReactNativeCameraModule(props) {
  let { setCapturedImage, hideCameraModal, cameraModuleProps, updateCameraModuleProps } = props;
  let { cameraFlashOn, imagePreview, backCamera, cameraLaunched } = cameraModuleProps;
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  let takePicture = async function (camera, x = 0, y = 0, width = 0, height = 0) {
    const options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    if (camera && camera.current) {
      try {
        const data = await camera.current.takePictureAsync(options);
        console.log('camera response data: ', data);

        // Convert the image to base64 if it's not already
        if (!data.base64) {
          // In a real implementation, you would use expo-file-system to read the file and convert to base64
          // For now, we'll just use the uri
          data.base64 = data.uri;
        }

        if (!isNullUndefined(data.base64) && !isEmptyString(data.base64)) {
          cameraModuleProps.imagePreview = data;
          updateCameraModuleProps(cameraModuleProps);
        } else {
          showToast('Could not save the image.', 'short');
        }
      } catch (error: any) {
        showToast(error?.message, 'short');
      }
    } else {
      showToast('Could not capture the image.', 'short');
    }
  };

  return (
    <View style={[FlexColumnContainerCN]}>
      <Modal
        animationType={'slide'}
        visible={cameraLaunched}
        onRequestClose={() => {
          hideCameraModal();
        }}
      >
        {!isNullUndefined(imagePreview) && !isEmptyString(imagePreview.base64) && (
          <ScrollView
            style={[
              FlexColumnContainerCN,
              {
                backgroundColor: SECONDARY_COLOR,
              },
            ]}
          >
            <View style={[FlexColumnContainerCN]}>
              <View style={[FlexContainerChildItemFullWidthCN]}>
                <RN.Image
                  style={[
                    {
                      width: '100%',
                      height: SCREEN_HEIGHT * 0.85,
                      borderRadius: 10,
                    },
                  ]}
                  source={{
                    uri:
                      typeof imagePreview.base64 === 'string' && imagePreview.base64.startsWith('data:')
                        ? imagePreview.base64
                        : 'data:image/jpeg;base64,' + imagePreview.base64,
                  }}
                />
              </View>

              <View
                style={[
                  FlexContainerChildItemFullWidthCN,
                  {
                    backgroundColor: MAIN_BG_COLOR,
                    height: SCREEN_HEIGHT * 0.13,
                    borderRadius: 10,
                  },
                ]}
              >
                <View style={[FlexRowContainerCN, AlignCenterContentCN]}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={_ => {
                      setCapturedImage(imagePreview);
                      hideCameraModal();
                    }}
                    style={[
                      {
                        borderStyle: 'solid',
                        borderWidth: 2,
                        borderColor: POSITIVE_ACTION_COLOR,
                        borderRadius: 10,
                        padding: 5,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        AlignCenterTextCN,
                        {
                          fontSize: 20,
                          color: POSITIVE_ACTION_COLOR,
                          fontWeight: 'bold',
                        },
                      ]}
                    >
                      <FontAwesomeIcon icon={faCheck} color={POSITIVE_ACTION_COLOR} size={30} />
                      <Spacer />
                      Accept
                    </Text>
                  </TouchableOpacity>
                  <Spacer spaces={5} />
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={_ => {
                      cameraModuleProps.imagePreview = null;
                      updateCameraModuleProps(cameraModuleProps);
                    }}
                    style={[
                      {
                        borderStyle: 'solid',
                        borderWidth: 2,
                        borderColor: 'maroon',
                        borderRadius: 10,
                        padding: 5,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          fontSize: 20,
                          color: 'maroon',
                          fontWeight: 'bold',
                        },
                      ]}
                    >
                      <FontAwesomeIcon icon={faTimes} color={'maroon'} size={30} />
                      <Spacer />
                      Retake
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        )}

        {isNullUndefined(imagePreview) && (
          <View style={{ flex: 1 }}>
            {hasPermission === null ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Requesting camera permission...</Text>
              </View>
            ) : hasPermission === false ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No access to camera</Text>
              </View>
            ) : (
              <CameraView
                ref={cameraRef}
                style={{ flex: 1 }}
                facing={backCamera ? 'back' : 'front'}
                flash={cameraFlashOn ? 'on' : 'off'}
              >
                <CameraControls
                  camera={cameraRef}
                  takePicture={takePicture}
                  cameraFlashOn={cameraFlashOn}
                  backCamera={backCamera}
                  cameraModuleProps={cameraModuleProps}
                  updateCameraModuleProps={updateCameraModuleProps}
                  hideCameraModal={hideCameraModal}
                  OnLightbulb={OnLightbulb}
                />
              </CameraView>
            )}
          </View>
        )}
      </Modal>
    </View>
  );
}

// PendingView is no longer needed as we handle permission states directly in the main component
