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
import Images from '../../assets/images';

import {
  loginManual,
  setupGoogleSignIn,
  signWithGoogle,
  onSignOut,
  resetState
} from '../../actions/loginActions';

import { clearDataRegister } from '../../actions/registerActions';

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
    const { statusCode, message, is_active } = this.props.loginReducer;
    const errorMessage = this.errorMessage(message);

    if (statusCode === 200 && message === 'success login' && this.state.shouldRedirect) {
      self.setState({ shouldRedirect: false }, () => {
        if (!is_active) {
          this.props.resetState();
          self.props.onSignOut();
        }
      });
    } else if (statusCode === 500 && this.state.shouldRedirect) {
      self.setState(
        {
          shouldRedirect: false
        },
        () => {
          if (errorMessage !== undefined) {
            this.props.navigator.showSnackbar({
              text: errorMessage,
              textColor: color.red,
              duration: 'long'
            });
          }
        }
      );
      this.props.resetState();
    }
  }

  onChangeTextHandlerEmail = e => this.setState({ email: e });
  onChangeTextHandlerPass = pass => this.setState({ password: pass });
  onGoogleSignIn = () => this.props.signWithGoogle();

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
      this.setState({ shouldRedirect: true }, () => {
        this.props.loginManual(user);
      });
    }
  };

  errorMessage = message => {
    switch (message) {
      case 'Kata sandi salah':
        return 'Kata sandi salah';
      case 'Data pengguna tidak ditemukan':
        return Alert.alert(
          'Pemberitahuan',
          'Akun anda tidak terdaftar',
          [
            {
              text: 'OK',
              onPress: () => {
                this.props.resetState();
              }
            }
          ],
          { cancelable: false }
        );
      case 'Format email salah':
        return 'Format email salah';
      default:
        return message;
    }
  };

  createAccount = () => {
    this.props.clearDataRegister('CLEAR_DATA_REGISTER');
    this.props.navigator.push({
      screen: 'TemanDiabetes.RegisterScreen',
      animated: true,
      animationType: 'fade'
    });
  };

  forgotPassword = () => {
    this.props.navigator.push({
      screen: 'TemanDiabetes.ForgotPasswordInputEmail',
      animated: true,
      animationType: 'fade',
      navigatorStyle: {
        navBarHidden: true
      }
    });
  };

  render() {
    const spinner = this.state.shouldRedirect ? (
      <Spinner color="#EF434F" text="Logging In..." size="large" />
    ) : (
      <View />
    );

    return (
      <ImageBackground source={Images.backgroundLogin} style={styles.containerStyle}>
        <View style={styles.contentStyle}>
          <View style={styles.contentTopStyle}>
            <Image source={Images.logoApp} style={styles.logoStyle} />
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
    borderRadius: 0
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
  signWithGoogle: () => dispatch(signWithGoogle()),
  setupGoogleSignIn: () => dispatch(setupGoogleSignIn()),
  onSignOut: () => dispatch(onSignOut()),
  resetState: () => dispatch(resetState()),
  clearDataRegister: type => dispatch(clearDataRegister(type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
