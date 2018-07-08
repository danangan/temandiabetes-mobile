import React, { Component } from 'react';
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

import { Indicator } from '../../components/indicator/Indicator';
import styles from './style';
import { registerNama } from '../../actions/registerActions';
import Style from '../../style/defaultStyle';
import Images from '../../assets/images';

class Register extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      keyboardActive: false
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
    const { nama } = this.props.registerReducer.dataUser;
    if (nama !== '') {
      if (nama.length < 3) {
        this.setState({
          message: 'Minimal 3 karakter'
        });
      } else {
        this.setState(
          {
            message: ''
          },
          () => {
            this.props.navigator.push({
              screen: 'TemanDiabetes.RegisterScreenSecond',
              title: 'Next Step 2'
            });
          }
        );
      }
    } else {
      this.setState({
        message: 'Masukkan nama Anda'
      });
    }
  }

  render() {
    const { nama } = this.props.registerReducer.dataUser;
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageBackground} source={Images.backgroundName}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              alignSelf: 'flex-start'
            }}
            onPress={() => {
              this.props.navigator.popToRoot({
                animated: true,
                animationType: 'fade'
              });
            }}
          >
            <Image
              resizeMode={'contain'}
              style={{ width: 30, height: 30, margin: 10 }}
              source={Images.backIcon}
            />
          </TouchableOpacity>
          <View style={[styles.wrapTitle, { flex: this.state.keyboardActive ? 1 : 2 }]}>
            <Text style={styles.titles}>Siapakah nama Anda?</Text>
          </View>
          <View style={styles.wrapForm}>
            <View
              style={[
                stylesLocal.containerForm,
                { flex: 2, justifyContent: this.state.keyboardActive ? 'flex-start' : 'flex-end' }
              ]}
            >
              <TextInput
                placeholder={'Your Fullname'}
                underlineColorAndroid={'#fff'}
                value={nama}
                onChangeText={name => this.props.registerNama(name)}
                style={[styles.textInputStyle, stylesLocal.inputStyle]}
              />
              <TouchableOpacity style={styles.btnNext} onPress={() => this.handleNavigation()}>
                <Text style={styles.buttonText}>LANJUT</Text>
              </TouchableOpacity>
              <Text style={stylesLocal.errMessage}>{this.state.message}</Text>
            </View>
            <View style={styles.indicatorWrapper}>
              <Indicator persentase={stylesLocal.indicatorStyle} />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const stylesLocal = {
  containerForm: {
    height: '70%',
    width: '100%'
  },
  inputStyle: {
    fontSize: Style.FONT_SIZE * 1.2,
    marginBottom: 15,
    paddingLeft: 20,
    fontFamily: 'Montserrat-Regular'
  },
  indicatorStyle: { width: '20%' },
  errMessage: {
    fontSize: Style.FONT_SIZE_SMALL * 1.2,
    color: 'red',
    marginTop: 10,
    fontFamily: 'Montserrat-Regular'
  }
};

const mapStateToProps = state => ({ registerReducer: state.registerReducer });

const mapDispatchToProps = dispatch => ({
  registerNama: name => dispatch(registerNama(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
