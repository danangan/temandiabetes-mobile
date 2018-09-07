import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  Image
} from 'react-native';

import styles from '../style';
import { Indicator } from '../../../components/indicator/Indicator';
import Style from '../../../style/defaultStyle';
import { registerPassword } from '../../../actions/registerActions';
import Images from '../../../assets/images';
import { SnackBar } from '../../../components';

class RegisterScreenThird extends React.Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      password: null,
      confirmPassword: null,
      keyboardActive: false,
      showSnackBar: false,
      errorMessage: ''
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyboardActive: true });
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardActive: false });
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleNavigation() {
    const { password, confirmPassword } = this.props.registerReducer.dataUser;
    if (password || confirmPassword !== '') {
      if (password !== confirmPassword) {
        this.showSnackBar('Kata sandi Anda tidak sesuai');
      } else if (password === confirmPassword) {
        // detect length string
        const passwordLength = password.length < 6;
        // detect 1 Uppercase
        const isOneUpperCase = /[A-Z]/.test(password);
        // detect 1 number
        const oneNumber = /\d+/.test(password);

        if (passwordLength || !isOneUpperCase || !oneNumber) {
          this.showSnackBar('Password minimal 6 karakter dengan 1 huruf kapital dan 1 angka');
        } else {
          this.props.navigator.push({
            screen: 'TemanDiabetes.RegisterScreenFourth',
            title: 'Next Step 4',
            passProps: {
              fcmToken: this.props.fcmToken
            }
          });
        }
      }
    } else {
      this.showSnackBar('Silakan lengkapi semua isian');
    }
  }

  showSnackBar = message => {
    this.setState({ showSnackBar: true, errorMessage: message }, () => this.hideSnackBar());
  };

  hideSnackBar = () => {
    setTimeout(() => {
      this.setState({ showSnackBar: false });
    }, 3000);
  };

  render() {
    const { password, confirmPassword } = this.props.registerReducer.dataUser;

    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageBackground} source={Images.backgroundPass}>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 70 }}
            style={{
              flex: 0,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
              marginTop: this.state.keyboardActive ? 10 : 0
            }}
            onPress={() => this.props.navigator.pop()}
          >
            <Image
              resizeMode={'contain'}
              style={{ width: 30, height: 30, margin: 10 }}
              source={require('../../../assets/icons/back_white.png')}
            />
          </TouchableOpacity>
          <View style={[styles.wrapTitle, { flex: this.state.keyboardActive ? 1 : 2 }]}>
            <Text style={styles.titles}>Masukkan kata sandi Anda</Text>
          </View>
          <View style={styles.wrapForm}>
            <View
              style={[
                stylesLocal.containerForm,
                { flex: 2, justifyContent: this.state.keyboardActive ? 'flex-start' : 'flex-end' }
              ]}
            >
              <TextInput
                placeholder={'*********'}
                underlineColorAndroid={'#fff'}
                value={password}
                secureTextEntry
                onChangeText={password => this.props.registerPassword(password, 'FIRST')}
                style={[styles.textInputStyle, stylesLocal.inputStyle]}
              />
              <TextInput
                placeholder={'*********'}
                underlineColorAndroid={'#fff'}
                secureTextEntry
                value={confirmPassword}
                onChangeText={confirmPassword =>
                  this.props.registerPassword(confirmPassword, 'SECOND')
                }
                style={[styles.textInputStyle, stylesLocal.inputStyle]}
              />
              <TouchableOpacity style={styles.btnNext} onPress={() => this.handleNavigation()}>
                <Text style={styles.buttonText}>LANJUT</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.indicatorWrapper}>
              <Indicator persentase={{ width: '60%' }} />
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

const mapStateToProps = state => ({ registerReducer: state.registerReducer });

const mapDispatchToProps = dispatch => ({
  registerPassword: (password, typePassword) => dispatch(registerPassword(password, typePassword))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreenThird);
