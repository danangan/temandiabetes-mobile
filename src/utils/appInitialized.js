import { AsyncStorage, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';

import { startApp, mainApp, startLoginPage, mainLoader } from '../../App';
import { authToken } from '../utils/constants';
import { API_CALL } from './ajaxRequestHelper';
import { Navigation } from 'react-native-navigation';

const initMainApp = async (cb = () => {}) => {
  try {
    const val = await AsyncStorage.getItem('goToLoginPage');
    if (val !== null) {
      startLoginPage(cb);
    } else {
      AsyncStorage.setItem('goToLoginPage', 'true');
      // onboarding
      startApp(cb);
    }
  } catch (error) {
    await AsyncStorage.setItem('goToLoginPage', 'true');
    const val = await AsyncStorage.getItem('goToLoginPage');
    // render onboarding
    startApp(cb);
  }
};

const appInitialized = () => {
  mainLoader();

  const timeout = setTimeout(() => {
    initMainApp();
  }, 1200);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // clear the timeout
      clearTimeout(timeout);
      firebase
        .auth()
        .currentUser.getIdToken()
        .then(firebaseIdToken => {
          AsyncStorage.setItem(authToken, firebaseIdToken).then(() => {
            const option = {
              method: 'get',
              url: 'api/users/getcurrentuser'
            };

            API_CALL(option)
              .then(res => {
                const { tipe_user, is_active, _id, email, nama } = res.data.data.currentUser;
                if (is_active) {
                  switch (tipe_user) {
                    case 'non-diabetesi':
                    case 'diabetesi':
                    case 'ahli':
                      mainApp();
                      break;
                    default:
                      // do nothing
                      break;
                  }
                } else {
                  // do nothing
                  AsyncStorage.getItem('isNewUser')
                    .then(val => {
                      if (val === 'true') {
                        // redirect to fourth page
                        Navigation.startSingleScreenApp({
                          screen: {
                            screen: 'TemanDiabets.RegisterScreenFourth',
                            navigatorStyle: {
                              navBarHidden: true
                            }
                          },
                          passProps: {
                            email,
                            _id,
                            nama,
                            registerType: 'GoogleSignIn'
                          },
                          animationType: 'fade'
                        });
                      } else {
                        initMainApp(() => {
                          setTimeout(() => {
                            Alert.alert(
                              'Akun Anda sedang tidak aktif.',
                              'Hubungi penyedia layanan untuk info lebih lanjut.'
                            );
                          }, 300);
                        });
                        GoogleSignin.signOut();
                        firebase.auth().signOut();
                      }
                    })
                    .catch(() => {
                      initMainApp();
                    });
                }
              })
              .catch(err => {
                console.log(err);
              });
          });
        });
    }
  });
};

export default appInitialized;
