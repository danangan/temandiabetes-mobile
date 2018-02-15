import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from '../style';

import { Indicator } from '../../../components/indicator/Indicator';

class RegisterScreenThird extends React.Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  render () {
    return (
      <View style={ styles.container }>
				<View style={ styles.wrapTitle }>
					<Text style={ styles.titles }>Masukkan kata sandi Anda</Text>
				</View>
				<View style={ styles.wrapForm }>
					<View
						style={{
							height: '70%',
							justifyContent: 'flex-end'
						}}
					>
						<TextInput
							placeholder={'*********'}
              underlineColorAndroid={'#fff'}
							style={ [styles.textInputStyle, {marginBottom: 15}] } />
              <TextInput
  							placeholder={'*********'}
                underlineColorAndroid={'#fff'}
  							style={ [styles.textInputStyle, {marginBottom: 15}] } />
						<TouchableOpacity
							style={ styles.btnNext }
							onPress={() => this.props.navigator.push({
								screen: 'TemanDiabets.RegisterScreenFourth',
	  						title: 'Final Step'
							})}>
							<Text style={{ color: '#fff' }}>LANJUT</Text>
						</TouchableOpacity>
					</View>
					<View style={ styles.indicatorWrapper }>
						<Indicator
							persentase={{ width: '50%' }}
						/>
					</View>
				</View>
			</View>
		);
  }
}

export default RegisterScreenThird;
