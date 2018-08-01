import React, { Component } from 'react';
import { Linking, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';

import { Spinner } from '../../components/Spinner';
import { authToken } from '../../utils/constants';
import { guelogin } from '../../utils/GueLogin';
import { API_CALL } from '../../utils/ajaxRequestHelper';
import { updateDeepLink } from '../../actions';
import { mainApp, startApp, startLoginPage } from '../../../App';
import { resetState } from '../../actions/loginActions';
class AppLoader extends Component {
  constructor(props) {
    super(props);

    this.timeout = setTimeout(() => {
      this.initMainApp();
    }, 1200);

    this.redirectForNewUser = this.redirectForNewUser.bind(this);
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
  }

  redirectForNewUser({ email, _id, nama }) {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'TemanDiabetes.RegisterScreenFourth',
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
        this.onLogin()
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
            const { tipe_user, is_active, email, _id, nama } = res.data.data.currentUser;

            AsyncStorage.getItem('isNewUser', error => { startLoginPage() })
              .then((isNewUser) => {
                if (isNewUser === 'true') {
                  this.redirectForNewUser({ email, _id, nama })
                } else if (is_active) {
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
                  // redirect to login page if the current user is not active yet
                  startLoginPage()
                }
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
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

const mapStateToProps = state => ({
  loginReducer: state.loginReducer
});

const mapDispatchToProps = dispatch => ({
  updateDeepLink: deepLink => dispatch(updateDeepLink(deepLink)),
  resetState: () => dispatch(resetState()),
});

export default connect(
  null,
  mapDispatchToProps
)(AppLoader);
