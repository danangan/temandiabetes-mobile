import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  Image,
  Alert
} from 'react-native';

import styles from '../style';
import { Indicator } from '../../../components/indicator/Indicator';
import Style from '../../../style/defaultStyle';
import {
  registerEmail,
  emailAlreadyRegistered,
  clearDataRegister
} from '../../../actions/registerActions';
import Images from '../../../assets/images';
import { SnackBar } from '../../../components';

class RegisterScreenSecond extends React.Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      emailChecking: false,
      keyboardActive: false,
      showSnackBar: false,
      errorMessage: ''
    };
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyboardActive: true });
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardActive: false });
    });
  }

  componentDidUpdate() {
    const { dataUser } = this.props.registerReducer;
    if (this.state.emailChecking && dataUser.emailValid.status_code === 201) {
      this.setState(
        {
          emailChecking: false
        },
        () => {
          if (dataUser.emailValid.message === 'VALID') {
            this.handleSuccessValidation();
            this.props.clearDataRegister('PENDING_EMAIL_ALREADY_REGISTERED');
          } else {
              Alert.alert('Perhatian!', dataUser.emailValid.message, [
                {
                  text: 'OK',
                  onPress: () => this.props.clearDataRegister('PENDING_EMAIL_ALREADY_REGISTERED')
                }
              ]);
          }
        }
      );
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleSuccessValidation() {
    this.props.navigator.push({
      screen: 'TemanDiabetes.RegisterScreenThird',
      title: 'Next Step 3',
      passProps: {
        name: this.props.name,
        email: this.state.email,
        fcmToken: this.props.fcmToken
      }
    });
  }

  handleNavigation() {
    const { email } = this.props.registerReducer.dataUser;
    this.setState(
      {
        emailChecking: true
      },
      () => {
        if (email !== '') {
          const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          const shouldTrue = emailRegex.test(email);
          if (!shouldTrue) {
            this.setState(
              {
                keyboardActive: false,
                emailChecking: false
              },
              () => this.showSnackBar('Email yang Anda masukkan tidak valid!')
            );
          } else {
            this.props.emailAlreadyRegistered(email);
          }
        } else {
          this.setState(
            {
              emailChecking: false
            },
            () => this.showSnackBar('Masukan email Anda')
          );
        }
      }
    );
  }

  showSnackBar = message => {
    this.setState({ showSnackBar: true, errorMessage: message }, () => this.hideSnackBar());
  };

  hideSnackBar = () => {
    setTimeout(() => {
      this.setState({ showSnackBar: false });
    }, 2000);
  };

  render() {
    const { email } = this.props.registerReducer.dataUser;

    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageBackground} source={Images.backgroundEmail}>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 70 }}
            style={{
              flex: 0,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              alignSelf: 'flex-start'
            }}
            onPress={() => this.props.navigator.pop()}
          >
            <Image
              resizeMode={'contain'}
              style={{ width: 30, height: 30, margin: 10 }}
              source={Images.backIcon}
            />
          </TouchableOpacity>
          <View style={[styles.wrapTitle, { flex: this.state.keyboardActive ? 1 : 2 }]}>
            <Text style={styles.titles}>Silakan masukkan email Anda</Text>
          </View>
          <View style={styles.wrapForm}>
            <View
              style={[
                stylesLocal.containerForm,
                { flex: 2, justifyContent: this.state.keyboardActive ? 'flex-start' : 'flex-end' }
              ]}
            >
              <TextInput
                placeholder={'example@email.com'}
                value={email}
                autoCapitalize="none"
                onChangeText={email => this.props.registerEmail(email)}
                underlineColorAndroid={'#fff'}
                style={[styles.textInputStyle, stylesLocal.inputStyle]}
              />
              <TouchableOpacity style={styles.btnNext} onPress={this.handleNavigation}>
                <Text style={styles.buttonText}>LANJUT</Text>
              </TouchableOpacity>
              <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20, color: 'red' }}>
                {this.state.message}
              </Text>
            </View>
            <View style={styles.indicatorWrapper}>
              <Indicator persentase={{ width: '40%' }} />
            </View>
          </View>
          <SnackBar
            visible={this.state.showSnackBar}
            textMessage={this.state.errorMessage}
            position="top"
          />
        </ImageBackground>
      </View>
    );
  }
}

const stylesLocal = {
  containerForm: {
    height: '70%'
  },
  inputStyle: {
    fontSize: Style.FONT_SIZE * 1.2,
    marginBottom: 15,
    paddingLeft: 20,
    fontFamily: 'Montserrat-Regular'
  }
};

const mapStateToProps = state => ({
  registerReducer: state.registerReducer
});

const mapDispatchToProps = dispatch => ({
  registerEmail: email => dispatch(registerEmail(email)),
  emailAlreadyRegistered: email => dispatch(emailAlreadyRegistered(email)),
  clearDataRegister: type => dispatch(clearDataRegister(type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreenSecond);
