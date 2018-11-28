import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
} from 'react-native';

import { NavigationBar, Button, Spinner, TextField, CardSection } from '../../../components'
import { API_CALL } from '../../../utils/ajaxRequestHelper'
import { capitalize } from '../../../utils/helpers'

class InputEmail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      confirmPassword: '',
      isError: false,
      errorMessages: [],
      isPasswordSame: false,
      isLoading: true,
      loadingMessage: 'Memverifikasi token...',
      showForm: true,
      currentUser: {
        nama: ''
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount() {
    const {token} = this.props
    this.validateToken(token)
    // validate token here
  }

  async validateToken(token) {
    const option = {
      method: 'get',
      url: `/api/users/reset-password/confirm/${token}`
    };

    try {
      const {data: {data: { user } }} = await API_CALL(option);
      this.setState({
        currentUser: user
      })
    } catch (error) {
      this.setState({
        showForm: false,
        isError: true
      })
    }

    this.setState({
      isLoading: false
    })
  }

  validatePassword(password) {
    const regx = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm
    return regx.test(password)
  }

  validate(cb) {
    const {password, confirmPassword} = this.state
    let errorMessages = []

    if(password !== confirmPassword) {
      errorMessages.push('Password Anda tidak cocok')
    }

    if(!this.validatePassword(password)) {
      errorMessages.push('Password minimal 6 karakter dengan 1 huruf kapital dan 1 angka')
    }

    this.setState({
      isError: errorMessages.length > 0,
      errorMessages
    }, cb)
  }

  onSubmit() {
    this.validate(() => {
      if(!this.state.isError) {
        // send api here
        this.changePassword()
      }
    })
  }

  async changePassword() {
    this.setState({
      isLoading: true,
      loadingMessage: 'Menunggu...'
    })

    const option = {
      method: 'put',
      url: `/api/users/reset-password/change-password`,
      data: {
        newPassword: this.state.password,
        userId: this.state.currentUser._id,
        resetPasswordToken: this.state.currentUser.resetPasswordToken
      }
    };

    try {
      const res = await API_CALL(option);
      Alert.alert('Pemberitahuan', 'Password Anda telah berhasil diubah.');
      this.setState({
        showForm: false
      })
    } catch (error) {
      console.log(error)
    }

    this.setState({
      isLoading: false
    })
  }


  render(){
    const {isLoading, loadingMessage, isError, password, confirmPassword, errorMessages, showForm, currentUser} = this.state
    return (
      <View style={styles.container}>
			  {isLoading && <Spinner color="#EF434F" text={loadingMessage} size="large" />}

        <NavigationBar
          onPress={() => this.props.navigator.pop()}
          title="LUPA PASSWORD"
        />
        <View style={styles.innerContainer}>
          {
            showForm &&
            <View>
              <Text style={styles.headerText}>Halo, {capitalize(currentUser.nama)}</Text>
              <CardSection containerStyle={styles.containerStyle}>
                <TextField
                  secureTextEntry
                  value={password}
                  placeholder="Password baru Anda"
                  onChangeText={password => this.setState({password})}
                  inputStyle={styles.inputStyle}
                  underlineColorAndroid="rgba(0,0,0,0)"
                />
              </CardSection>
              <CardSection containerStyle={{
                ...styles.containerStyle,
                marginTop: 0
                }}>
                <TextField
                  secureTextEntry
                  value={confirmPassword}
                  placeholder="Konfirmasi password Anda"
                  onChangeText={confirmPassword => this.setState({confirmPassword})}
                  inputStyle={styles.inputStyle}
                  underlineColorAndroid="rgba(0,0,0,0)"
                />
              </CardSection>
              {
                isError &&
                <View style={styles.errorContainer}>
                  {errorMessages.map(item => (<Text style={styles.errorText}>{item}</Text>))}
                </View>
              }
              <Button buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={this.onSubmit}>
                KIRIM
              </Button>
            </View>
          }
          {
            !showForm &&
            <View>
              <CardSection containerStyle={[styles.containerStyle, { backgroundColor: '#eee' }]}>
                <Text style={[styles.notificationText]}>
                  {isError ? 'Token Anda tidak valid/expired.' : 'Password berhasil diubah.'}
                </Text>
              </CardSection>
              <Button buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={() => {this.props.navigator.pop()}}>
                KEMBALI KE LOGIN
              </Button>
            </View>
          }
        </View>

      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 120,
  },
  errorContainer: {
    marginBottom: 15,
    marginHorizontal: 40,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 3,
  },
  headerText: {
    marginHorizontal: 20,
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 17
  },
  containerStyle: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
  },
  inputStyle: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    // height: 20,
    fontSize: 16
  },
	buttonStyle: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 16,
    paddingTop: 5,
  },
  notificationText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 17
  }
}

export default InputEmail
