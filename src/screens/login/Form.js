import React from 'react';
import { Text, View, Platform } from 'react-native';

import { Card, CardSection, TextField } from '../../components';
import Style from '../../style/defaultStyle';
import color from '../../style/color';
import Images from '../../assets/images';

const Form = ({ onChangeTextHandlerEmail, onChangeTextHandlerPass, onValue }) => (
  <Card containerStyle={{ marginLeft: 35, marginRight: 35, borderWidth: 0, paddingVertical: 5, paddingHorizontal: 10, elevation: 0, borderRadius: 0, }}>
    <Text style={[styles.labelStyle, { marginTop: 15 }]}>USERNAME</Text>
    <CardSection>
      <TextField
        autoCapitalize='none'
        value={onValue.email}
        placeholder="masukkan username"
        onChangeText={email => onChangeTextHandlerEmail(email)}
        rightIcon={Images.userIcon}
        inputStyle={styles.inputStyle}
        underlineColorAndroid="rgba(0,0,0,0)"
      />
    </CardSection>
    <View style={styles.borderLine} />
    <Text style={styles.labelStyle}>KATA SANDI</Text>
    <CardSection>
      <TextField
        autoCapitalize='none'
        value={onValue.pass}
        secureTextEntry
        placeholder="masukkan password"
        onChangeText={pass => onChangeTextHandlerPass(pass)}
        rightIcon={Images.lockIcon}
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
    fontWeight: 'normal',
    marginLeft: 10,
    marginBottom: -7
	},
	inputStyle: {
    marginLeft: Platform.OS === 'ios' ? -35 : 0,
    fontStyle: 'italic',
    fontWeight: 'normal',
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
