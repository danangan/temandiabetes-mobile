import React, { Component } from 'react';
import { Linking, AsyncStorage, Platform, Alert, AppState } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import firebase from 'react-native-firebase';
import Config from 'react-native-config';

import { Spinner } from '../../components/Spinner';
import { authToken } from '../../utils/constants';
import { guelogin } from '../../utils/GueLogin';
import { API_CALL } from '../../utils/ajaxRequestHelper';
import { updateDeepLink, updateNotification } from '../../actions';
import { mainApp, startApp, startLoginPage } from '../../../App';
import { resetState } from '../../actions/loginActions';

class AppLoader extends Component {
    state = {
        appState: AppState.currentState,
        needUpdate: false,
        mandatoryUpdate: true
    }

  constructor(props) {
    super(props);
    
    this.checkVersion();
    this.timeout = setTimeout(() => {
        this.initMainApp();
    }, 1200);

    this.redirectForUnfinishedRegistration = this.redirectForUnfinishedRegistration.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    // firebase.auth().signOut()
    // AsyncStorage.removeItem('isNewUser')

    // handling deeplink here
    // save to store to handle later in main app
    Linking.getInitialURL().then(url => {
      this.props.updateDeepLink(url);
    });

    this.firebaseHandler();

    this.checkNotification();
  }

    checkVersion = async () => {
        const option = {
            method: 'POST',
            url: 'api/app/version',
            data: {
                platform: Platform.OS,
                version: Platform.OS == 'ios' ? Config.IOS_VERSION : Config.ANDROID_VERSION
            }
        };

        try {
            let res = await API_CALL(option);
            let {
                needUpdate,
                mandatoryUpdate,
                platform,
                currentVersion
            } = res.data.data;
            
            this.setState({ needUpdate, mandatoryUpdate });
        } catch (error) {
            console.log(error)
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            // alert('App has come to the foreground!')
            this.showUpdate();
        }
        this.setState({appState: nextAppState});
    }

    showUpdate = () => {
        let alertButton = [];

        if (this.state.mandatoryUpdate == false) {
            alertButton.push({text: 'LATER', onPress: () => {
                this.setState({needUpdate: false});
                this.initMainApp();
                console.log('Ask me later pressed')
            }});
        }

        alertButton.push({
            text: 'UPDATE', 
            onPress: () => {
                let urlApp  = Platform.OS == 'ios' ? 
                    'https://itunes.apple.com/us/app/teman-diabetes/id1299580913' : 
                    'https://play.google.com/store/apps/details?id=com.temandiabetes.android';

                Linking.openURL(urlApp);
            }
        });

        if (this.state.needUpdate == true) {
            Alert.alert('', 'Update ke versi terbaru TemanDiabetes.', alertButton, { cancelable: false });
        }
    }

  async checkNotification() {
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      this.props.updateNotification(notificationOpen.notification);
    }
  }

  async initMainApp(cb = () => {}) {
    try {
        const val = await AsyncStorage.getItem('goToLoginPage');
        if (val !== null) {
            if (this.state.needUpdate == true) {
                this.showUpdate()
            } else {
                startLoginPage(cb);
            }
        } else {
            AsyncStorage.setItem('goToLoginPage', 'true');
            // onboarding
            if (this.state.needUpdate == true) {
                this.showUpdate()
            } else {
                startApp(cb);
            }
        }
    } catch (error) {
      await AsyncStorage.setItem('goToLoginPage', 'true');
      // render onboarding
        if (this.state.needUpdate == true) {
            this.showUpdate()
        } else {
            startApp(cb);
        }
    }
  }

  firebaseHandler() {
    // Handle firebase login here
    guelogin.auth().onAuthStateChanged(user => {
      if (user) {
        // clear the timeout
        clearTimeout(this.timeout);
        this.onLogin();
      }
    });
  }

  onLogin() {
      this.checkVersion();
    guelogin
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
              const {
                tipe_user,
                is_active,
                email,
                _id,
                nama,
                registration_status
              } = res.data.data.currentUser;
              // check the is_active status
              if (is_active) {
                // if registration status flag is not exist then goes straight to mainApp()
                // or the registration status is finished
                if (!registration_status || registration_status === 'finished') {
                    // checking is need update
                    if (this.state.needUpdate == true) {
                        this.showUpdate()
                    } else {
                        mainApp();
                    }
                } else {
                  this.redirectForUnfinishedRegistration({
                    email,
                    _id,
                    nama,
                    registration_status
                  });
                }
              } else {
                // log out
                guelogin.auth().signOut();
                // redirect to login page if the current user is not active yet
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
  }

  redirectForUnfinishedRegistration({ email, _id, nama, registration_status }) {
    let screen;
    switch (registration_status) {
      case 'pickUserType':
        screen = 'TemanDiabetes.RegisterScreenFourth';
        break;
      case 'inputSIP':
        screen = 'TemanDiabetes.RegisterFive';
        break;
      default:
        break;
    }

    Navigation.startSingleScreenApp({
      screen: {
        screen,
        navigatorStyle: {
          navBarHidden: true
        }
      },
      passProps: {
        email,
        _id,
        nama,
        registerType: 'GoogleSignIn'
      }
    });
  }

  render() {
    return (
      <Spinner
        color="red"
        size="large"
        containerStyle={{ backgroundColor: 'white' }}
        textStyle={{ color: 'gray' }}
        text="Memuat aplikasi Teman Diabetes..."
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateDeepLink: deepLink => dispatch(updateDeepLink(deepLink)),
  updateNotification: notificationPayload => dispatch(updateNotification(notificationPayload)),
  resetState: () => dispatch(resetState())
});

export default connect(
  null,
  mapDispatchToProps
)(AppLoader);
