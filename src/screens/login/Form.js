import React from 'react';
import { Text, View } from 'react-native';

import { Card, CardSection, TextField } from '../../components';
import Style from '../../style/defaultStyle';
import color from '../../style/color';

const Form = ({ onChangeTextHandlerEmail, onChangeTextHandlerPass, onValue }) => (
  <Card containerStyle={{ marginLeft: 35, marginRight: 35 }}>
    <Text style={[styles.labelStyle, { marginTop: 25 }]}>USERNAME</Text>
    <CardSection>
      <TextField
        value={onValue.email}
        placeholder="Masukan username"
        onChangeText={email => onChangeTextHandlerEmail(email)}
        rightIcon={require('../../assets/icons/username-dark.png')}
        inputStyle={styles.inputStyle}
        underlineColorAndroid="rgba(0,0,0,0)"
      />
    </CardSection>
    <View style={styles.borderLine} />
    <Text style={styles.labelStyle}>KATA SANDI</Text>
    <CardSection>
      <TextField
        value={onValue.pass}
        secureTextEntry
        placeholder="Masukan password"
        onChangeText={pass => onChangeTextHandlerPass(pass)}
        rightIcon={require('../../assets/icons/pasword_black.png')}
        inputStyle={styles.inputStyle}
        underlineColorAndroid="rgba(0,0,0,0)"
      />
    </CardSection>
  </Card>
);

const styles = {
	labelStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE,
		marginLeft: 10,
		marginBottom: -5
	},
	inputStyle: {
		fontStyle: 'italic',
	},
	borderLine: {
		borderBottomColor: color.midGray,
    borderBottomWidth: 0.7,
    marginTop: 5,
    marginBottom: 15,
    alignSelf: 'center',
		width: '90%'
	}
};

export default Form;
