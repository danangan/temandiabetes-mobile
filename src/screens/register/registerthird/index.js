import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from '../style';

class RegisterScreenThird extends React.Component {
  render () {
    return (
			<View style={ styles.container }>
				<View style={ styles.wrapTitle }>
					<Text style={ styles.titles }>Masukkan kata sandi Anda</Text>
				</View>
        <View style={ styles.wrapForm }>
					<View style={{ borderColor: '#000',
					borderWidth: 1.5, }}>
						<TextInput
								{...this.props}
							placeholder={'********'}
							style={ [styles.textInputStyle, {marginBottom: 0}] } />
              <TextInput
  								{...this.props}
  							placeholder={'********'}
  							style={ [styles.textInputStyle, {marginVertical: 20}] } />
						<TouchableOpacity
							style={ [styles.btnNext, { marginBottom: 30 }] }
              onPress={() => this.props.navigator.push({
								screen: 'TemanDiabets.RegisterScreenFourth',
	  						title: 'Next Step 4'
							})}>
							<Text style={{ color: '#fff' }}>LANJUT</Text>
						</TouchableOpacity>
					</View>
					<View style={{
						borderColor: '#000',
						borderWidth: 1.5,
						marginBottom: 100,
						height: 20,
					  }}>
						<Text>Indicator</Text>
					</View>
				</View>
			</View>
		);
  }
}

export default RegisterScreenThird;
