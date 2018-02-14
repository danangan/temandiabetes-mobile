import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from '../style';

class RegisterScreenSecond extends React.Component {
  render () {
    return (
			<View style={ styles.container }>
				<View style={ styles.wrapTitle }>
					<Text style={ styles.titles }>Silahkan masukkan email Anda</Text>
				</View>
        <View style={ styles.wrapForm }>
					<View style={{ borderColor: '#000',
					borderWidth: 1.5, }}>
						<TextInput
								{...this.props}
							placeholder={'daniel@gmail.com'}
							style={ [styles.textInputStyle, {marginBottom: 20}] } />
						<TouchableOpacity
							style={ styles.btnNext }
							onPress={() => this.props.navigator.push({
								screen: 'TemanDiabets.RegisterScreenThird',
	  						title: 'Next Step 3'
							})}>
							<Text style={{ color: '#fff' }}>LANJUT</Text>
						</TouchableOpacity>
					</View>
					<View style={{
						borderColor: '#000',
						borderWidth: 1.5,
						marginVertical: 20,
						height: 20,
					  }}>
						<Text>Indicator</Text>
					</View>
				</View>
			</View>
		);
  }
}

export default RegisterScreenSecond;
