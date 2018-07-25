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

class RegisterScreenSecond extends React.Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      message: '',
      emailChecking: false,
      keyboardActive: false
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
          if (dataUser.emailValid.message === 'INVALID') {
            Alert.alert('Perhatian!', 'Email sudah pernah didaftarkan', [
              {
                text: 'OK',
                onPress: () => this.props.clearDataRegister('PENDING_EMAIL_ALREADY_REGISTERED')
              }
            ]);
          } else if (dataUser.emailValid.message === 'VALID') {
            this.handleSuccessValidation();
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
    this.setState({
      message: ''
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
            this.setState({
              message: 'Email yang Anda masukkan tidak valid!',
              keyboardActive: false,
              emailChecking: false
            });
          } else {
            this.props.emailAlreadyRegistered(email);
          }
        } else {
          this.setState({
            message: 'Masukan email Anda',
            emailChecking: false
          });
        }
      }
    );
  }

  render() {
    const { email } = this.props.registerReducer.dataUser;

    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageBackground} source={Images.backgroundEmail}>
          <TouchableOpacity
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
