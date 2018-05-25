import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native'

import { NavigationBar, Button, Spinner, TextField, CardSection } from '../../../components'

class InputEmail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      confirmPassword: '',
      isError: false,
      errorMessage: '',
      isPasswordSame: false,
      isLoading: false,
      loadingMessage: '',
      showContent: true
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount() {
    const {token} = this.props
    // validate token here
  }

  onSubmit() {
    const {password, confirmPassword} = this.state
    if(password !== confirmPassword) {
      this.setState({
        isError: true,
        errorMessage: 'Password anda tidak cocok'
      })
    } else {
      this.setState({
        isError: false
      })
    }
  }

  render(){
    const {isLoading, loadingMessage, isError, password, confirmPassword, errorMessage, showContent} = this.state
    return (
      <View style={styles.container}>
			  {isLoading && <Spinner color="#EF434F" text={loadingMessage} size="large" />}

        <NavigationBar
          onPress={() => this.props.navigator.pop()}
          title="LUPA PASSWORD"
        />
        <View style={styles.innerContainer}>
          {
            showContent &&
            <View>
              <CardSection containerStyle={styles.containerStyle}>
                <TextField
                  secureTextEntry
                  value={password}
                  placeholder="masukkan password anda"
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
                  placeholder="konfirmasi password anda"
                  onChangeText={confirmPassword => this.setState({confirmPassword})}
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
            !showContent &&
            <View>
              <CardSection containerStyle={[styles.containerStyle, { backgroundColor: '#eee' }]}>
                <Text style={[styles.notificationText, isError ? { color: 'red' } : {}]}>
                  {isError ? 'Token Anda tidak Valid' : 'Password berhasil diubah'}
                </Text>
              </CardSection>
              <Button buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={this.props.navigator.pop}>
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
    marginTop: 20
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
