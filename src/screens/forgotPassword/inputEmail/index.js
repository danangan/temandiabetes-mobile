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
      email: '',
      isError: false,
      isLoading: false
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {

  }

  render(){
    const {isLoading, isError, email} = this.state
    return (
      <View style={styles.container}>
			  {isLoading && <Spinner color="#EF434F" text="Menunggu..." size="large" />}

        <NavigationBar
          onPress={() => this.props.navigator.pop()}
          title="LUPA PASSWORD"
        />
        <View style={styles.innerContainer}>
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
              Email anda tidak valid/belum terdaftar
            </Text>
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
    textAlign: 'center'
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
}

export default InputEmail
