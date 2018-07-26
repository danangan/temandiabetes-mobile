import React, { Component } from 'react';
import { Linking, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import { Spinner } from '../../components/Spinner';
import { authToken } from '../../utils/constants';
import { API_CALL } from '../../utils/ajaxRequestHelper';
import { updateDeepLink } from '../../actions';
import { mainApp, startApp, startLoginPage } from '../../../App';

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

const mapDispatchToProps = dispatch => ({
  updateDeepLink: deepLink => dispatch(updateDeepLink(deepLink))
});

export default connect(
  null,
  mapDispatchToProps
)(AppLoader);
