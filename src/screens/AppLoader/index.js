import React, { Component } from 'react';
import { Linking, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';
import { result } from 'lodash';

import { Spinner } from '../../components/Spinner';
import { authToken } from '../../utils/constants';
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
  }

  componentDidMount() {
    // handling deeplink here
    // save to store to handle later in main app
    Linking.getInitialURL().then(url => {
      this.props.updateDeepLink(url);
    });

    this.firebaseHandler();
  }

  componentWillReceiveProps(nextProps) {
    // the inactive user goes here
    // here we check if the inactive user is a new user or not
    // if the user is existing user, the isnewuser value will be false, thus
    // we give them alert that the user account is inactive
    if (nextProps.loginReducer.isNewUser === true) {
      // redirect to fourth page
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'TemanDiabetes.RegisterScreenFourth',
          navigatorStyle: {
            navBarHidden: true
          }
        },
        passProps: {
          email: nextProps.loginReducer.email,
          _id: nextProps.loginReducer.currentUser._id,
          nama: nextProps.loginReducer.nama,
          registerType: 'GoogleSignIn'
        },
        animationType: 'fade'
      });
    } else if (result(nextProps.loginReducer, 'currentUser.is_active') === false) {
      Alert.alert(
        'Akun Anda sedang tidak aktif.',
        'Hubungi penyedia layanan untuk info lebih lanjut.'
      );
      this.props.resetState();
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
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // clear the timeout
        clearTimeout(this.timeout);
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
                  const { tipe_user, is_active } = res.data.data.currentUser;
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
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            });
          });
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
