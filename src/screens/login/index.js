import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from 'react-native';
import { connect } from 'react-redux';

import { ButtonFacebook, ButtonGoogle, Button, Spinner } from '../../components/';
import Form from './Form';
import BorderLine from './BorderLine';
import Style from '../../style/defaultStyle';
import color from '../../style/color';
import logo from '../../assets/icons/logo.png';
import image from '../../assets/images/login.png';
import { mainApp } from '../../../App';
import { loginManual, setupGoogleSignIn, loginOauth, onSignOut } from '../../actions/loginActions';

import { updateFCMToken } from '../../actions/authAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      shouldRedirect: false,
      message: null
    };
  }

  componentDidMount() {
    this.props.setupGoogleSignIn();
  }

  componentDidUpdate() {
    const self = this;
    const { statusCode, message, isNewUser, name, email, is_active, _id } = this.props.loginReducer;
    // if (!isNewUser && !this.state.shouldRedirect) {
    // 	mainApp();
    // } else if (isNewUser && !this.state.shouldRedirect) {
    // 	this.props.navigator.push({
    // 		screen: 'TemanDiabets.RegisterScreenFourth',
    // 		passProps: {
    // 			name,
    // 			email
    // 		}
    // 	});
    // }

    if (statusCode === 200 && message === 'success login' && this.state.shouldRedirect) {
      self.setState({ shouldRedirect: false }, () => {
        if (!is_active) {
          Alert.alert(
            'Pemberitahuan',
            'Akun anda sedang tidak aktif',
            [{ text: 'OK', onPress: () => self.props.onSignOut() }],
            { cancelable: false }
          );
        }
        // alert('Jalan...');
        const params = {
          idUser: _id,
          token: {
            messagingRegistrationToken: this.props.fcmToken
          }
        };
        this.props.updateFCMToken(params);
      });
    } else if (statusCode === 500 && this.state.shouldRedirect) {
      self.setState(
        {
          shouldRedirect: false,
          email: null,
          password: null
        },
        () => {
          this.props.navigator.showSnackbar({
            text:
              message === 'The password is invalid or the user does not have a password.'
                ? 'password salah'
                : message ===
                  'There is no user record corresponding to this identifier. The user may have been deleted.'
                  ? Alert.alert(
                      'Pemberitahuan',
                      'Akun anda sedang tidak aktif',
                      [{ text: 'OK', onPress: () => {} }],
                      { cancelable: false }
                    )
                  : message === 'The email address is badly formatted.'
                    ? 'format email salah'
                    : message,
            textColor: color.red,
            duration: 'long'
          });
        }
      );
    }
  }

  onChangeTextHandlerEmail = e => this.setState({ email: e });
  onChangeTextHandlerPass = pass => this.setState({ password: pass });
  onGoogleSignIn = () => alert('development');

  onLogin = () => {
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    Keyboard.dismiss();

    if (!this.state.email || !this.state.password) {
      this.setState({ shouldRedirect: false, message: 'data tidak lengkap' }, () => {
        this.props.navigator.showSnackbar({
          text: this.state.message,
          textColor: color.red,
          duration: 'long'
        });
      });
    } else {
      // const { _id } = this.props.loginReducer;
      this.setState({ shouldRedirect: true }, () => {
        this.props.loginManual(user);
      });
    }
  };

  createAccount = () => {
    this.props.navigator.push({
      screen: 'TemanDiabets.RegisterScreen',
      animated: true,
      animationType: 'fade'
    });
  };

	forgotPassword = () => {
		this.props.navigator.push({
			screen: 'TemanDiabets.ForgotPasswordInputEmail',
			animated: true,
      animationType: 'fade',
      navigatorStyle: {
        navBarHidden: true
      },
		});
	};

  render() {
    const spinner = this.state.shouldRedirect ? (
      <Spinner color="#FFDE00" text="Logging In..." size="large" />
    ) : (
      <View />
    );

    return (
      <ImageBackground source={image} style={styles.containerStyle}>
        <View style={styles.contentStyle}>
          <View style={styles.contentTopStyle}>
            <Image source={logo} style={styles.logoStyle} />
          </View>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.contentCenterStyle}>
              <Form
                onValue={{ email: this.state.email, pass: this.state.password }}
                onChangeTextHandlerEmail={this.onChangeTextHandlerEmail}
                onChangeTextHandlerPass={this.onChangeTextHandlerPass}
              />
              <Button buttonStyle={styles.buttonStyle} onPress={this.onLogin}>
                MASUK
              </Button>
              <BorderLine />
            </View>
          </KeyboardAvoidingView>
          <View style={styles.contentBottomStyle}>
            <ButtonFacebook
              onPress={() => alert('development')}
              text="Masuk dengan Facebook"
              containerStyle={styles.buttonSocialStyle}
              textStyle={styles.buttonSocialTextStyle}
            />
            <ButtonGoogle
              onPress={this.onGoogleSignIn}
              text="Masuk dengan Google"
              textStyle={styles.buttonSocialTextStyle}
            />
						<Text style={styles.forgotPasswordLink} onPress={this.forgotPassword}>
							Lupa password?
						</Text>
            <Text style={styles.textLink} onPress={this.createAccount}>
              BUAT AKUN
            </Text>
          </View>
        </View>
        {spinner}
      </ImageBackground>
    );
  }
}

const styles = {
	containerStyle: {
		flex: 1
	},
	contentStyle: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	contentCenterStyle: {
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	contentBottomStyle: {
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	logoStyle: {
		width: Style.DEVICE_WIDTH - 80,
		height: Style.DEVICE_WIDTH / 8.5,
		alignSelf: 'center',
		marginTop: 40
	},
	forgotPasswordLink: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 16,
    color: color.gray,
    fontStyle: 'italic',
		// fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 8
  },
	textLink: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_TITLE,
		color: color.gray,
		fontWeight: 'bold',
		alignSelf: 'center',
		marginTop: 30
	},
	buttonStyle: {
		height: 55,
		marginLeft: 35,
    marginRight: 35,
    borderRadius: 0,
  },
  textStyle: {
    // fontSize: 16
  },
	buttonSocialStyle: {
		margin: 10
	},
	buttonSocialTextStyle: {
		fontSize: Style.FONT_SIZE,
		paddingTop: 2
	}
};

const mapStateToProps = state => ({
  loginReducer: state.loginReducer
});

const mapDispatchToProps = dispatch => ({
  loginManual: user => dispatch(loginManual(user)),
  loginOauth: () => dispatch(loginOauth()),
  setupGoogleSignIn: () => dispatch(setupGoogleSignIn()),
  onSignOut: () => dispatch(onSignOut()),
  updateFCMToken: params => dispatch(updateFCMToken(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
