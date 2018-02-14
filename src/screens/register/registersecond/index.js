import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from '../style';

import { Indicator } from '../../../components/indicator/Indicator';

class RegisterScreenSecond extends React.Component {

  static navigatorStyle = {
		navBarHidden: true
	}

  render () {
    return (
      <View style={ styles.container }>
				<View style={ styles.wrapTitle }>
					<Text style={ styles.titles }>Silahkan masukkan email Anda</Text>
				</View>
				<View style={ styles.wrapForm }>
					<View
						style={{
							height: '70%',
							borderColor: 'green',
							borderWidth: 3,
							justifyContent: 'flex-end'
						}}
					>
						<TextInput
							placeholder={'daniel@gmail.com'}
							style={ [styles.textInputStyle, {marginBottom: 15}] } />
              <TextInput
  							placeholder={'daniel@gmail.com'}
  							style={ [styles.textInputStyle, {marginBottom: 15}] } />
						<TouchableOpacity
							style={ styles.btnNext }
							onPress={() => this.props.navigator.push({
								screen: 'TemanDiabets.RegisterScreenThird',
	  						title: 'Next Step 3'
							})}>
							<Text style={{ color: '#fff' }}>LANJUT</Text>
						</TouchableOpacity>
					</View>
					<View
						style={{
							height: '30%',
							marginBottom: 10,
							justifyContent: 'center',
							borderColor: 'blue',
							borderWidth: 1.5,
							alignItems: 'center'
						}}
					>
						<Indicator
							persentase={{ width: '50%' }}
						/>
					</View>
				</View>
			</View>
		);
  }
}

export default RegisterScreenSecond;
