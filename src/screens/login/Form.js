import React from 'react';
import { Text } from 'react-native';

import { Card, CardSection, TextField } from '../../components';
import Style from '../../style/defaultStyle';

const Form = ({ onChangeTextHandlerEmail, onChangeTextHandlerPass, onValue }) => {
  return (
    <Card containerStyle={{ marginLeft: 35, marginRight: 35 }}>
      <CardSection>
        <Text style={[styles.labelStyle, { marginTop: 20 }]}>USERNAME</Text>
      </CardSection>
      <CardSection>
        <TextField
          value={onValue.email}
          placeholder="Masukan username"
          onChangeText={email => onChangeTextHandlerEmail(email)}
          rightIcon={{ uri: 'https://www.trybooking.com/media/3446/login-user-icon.png' }}
          inputStyle={styles.inputStyle}
        />
      </CardSection>
      <CardSection>
        <Text style={styles.labelStyle}>KATA SANDI</Text>
      </CardSection>
      <CardSection>
        <TextField
          value={onValue.pass}
          secureTextEntry
          placeholder="Masukan password"
          onChangeText={pass => onChangeTextHandlerPass(pass)}
          rightIcon={{ uri: 'https://www.trybooking.com/media/3446/login-user-icon.png' }}
          inputStyle={styles.inputStyle}
        />
      </CardSection>
    </Card>
  );
};

const styles = {
  labelStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    marginLeft: 10,
    marginBottom: -10
  },
  inputStyle: {
    fontStyle: 'italic'
  }
};

export default Form;
