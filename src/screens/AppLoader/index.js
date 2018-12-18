import React, { Component } from 'react';
import { Linking, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import firebase from 'react-native-firebase';

import { Spinner } from '../../components/Spinner';
import { authToken } from '../../utils/constants';
import { guelogin } from '../../utils/GueLogin';
import { API_CALL } from '../../utils/ajaxRequestHelper';
import { updateDeepLink, updateNotification } from '../../actions';
import { mainApp, startApp, startLoginPage } from '../../../App';
import { resetState } from '../../actions/loginActions';

class AppLoader extends Component {
  constructor(props) {
    super(props);

    this.timeout = setTimeout(() => {
      this.initMainApp();
    }, 1200);

    this.redirectForUnfinishedRegistration = this.redirectForUnfinishedRegistration.bind(this);
  }

  componentDidMount() {
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
        startLoginPage(cb);
      } else {
        AsyncStorage.setItem('goToLoginPage', 'true');
        // onboarding
        startApp(cb);
      }
    } catch (error) {
      await AsyncStorage.setItem('goToLoginPage', 'true');
      // render onboarding
      startApp(cb);
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
                  mainApp();
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
