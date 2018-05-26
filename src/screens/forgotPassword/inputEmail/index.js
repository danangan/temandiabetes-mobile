import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native'

import { NavigationBar, Button, Spinner, TextField, CardSection } from '../../../components'
import { API_CALL } from '../../../utils/ajaxRequestHelper'

class InputEmail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      showForm: true,
      isError: false,
      errorMessage: '',
      isLoading: false
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  checkEmail(email) {
    const rgx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    return rgx.test(email)
  }

  errorValidation(cb) {
    if (this.state.email.trim() === '') {
      this.setState({
        isError: true,
        errorMessage: 'Email tidak boleh kosong'
      }, cb)
    } else if (!this.checkEmail(this.state.email)) {
      this.setState({
        isError: true,
        errorMessage: 'Format email salah'
      }, cb)
    } else {
      this.setState({
        isError: false,
        errorMessage: ''
      }, cb)
    }
  }

  onSubmit() {
    this.errorValidation(() => {
      if (!this.state.isError) {
        this.apiCall()
      }
    })
  }

  async apiCall() {
    this.setState({
      isLoading: true
    })

    const option = {
      method: 'post',
      url: '/api/users/reset-password',
      data: {
        email: this.state.email
      }
    };

    try {
      const res = await API_CALL(option);
      this.setState({
        showForm: false
      })
      console.log(res)
    } catch (error) {
      this.setState({
        isError: true,
        errorMessage: 'Email anda tidak valid/belum terdaftar',
      })
      console.log(error)
    }

    this.setState({
      isLoading: false
    })
  }

  render(){
    const {isLoading, isError, email, errorMessage, showForm} = this.state
    return (
      <View style={styles.container}>
			  {isLoading && <Spinner color="#EF434F" text="Menunggu..." size="large" />}

        <NavigationBar
          onPress={() => this.props.navigator.pop()}
          title="LUPA PASSWORD"
        />
        <View style={styles.innerContainer}>
          {
            showForm &&
            <View>
              <CardSection containerStyle={styles.containerStyle}>
                <TextField
                  value={email}
                  placeholder="masukkan email anda"
                  onChangeText={email => this.setState({email})}
                  inputStyle={styles.inputStyle}
                  underlineColorAndroid="rgba(0,0,0,0)"
                />
              </CardSection>
              <Button buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={this.onSubmit}>
                KIRIM
              </Button>
              {
                isError &&
                <Text style={styles.errorText}>
                  {errorMessage}
                </Text>
              }
            </View>
          }
          {
            !showForm &&
            <View>
              <CardSection containerStyle={[styles.containerStyle, { backgroundColor: '#eee', height: 70 }]}>
                <Text style={styles.notificationText}>
                  Link untuk merubah password telah dikirim ke email Anda.
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10
  },
  containerStyle: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputStyle: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
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
    fontSize: 17,
  }
}

export default InputEmail
