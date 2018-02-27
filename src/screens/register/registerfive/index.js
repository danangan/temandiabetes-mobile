import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from '../style';
import { Indicator } from '../../../components/indicator/Indicator';

class RegisterFive extends React.Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.wrapTitle}>
					<Text style={styles.titles}>Surat Izin Praktek ( SIP ) </Text>
				</View>
				<View style={styles.wrapForm}>
					<View
						style={{
							height: '70%',
							justifyContent: 'flex-end'
						}}
					>
						<TextInput
							placeholder={'SIP'}
							underlineColorAndroid={'#fff'}
							style={[styles.textInputStyle, { marginBottom: 15 }]}
						/>
						<TouchableOpacity
							style={styles.btnNext}
							onPress={() =>
								null
							}
						>
							<Text style={{ color: '#fff' }}>SELESAI</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.indicatorWrapper}>
						<Indicator persentase={{ width: '100%' }} />
					</View>
				</View>
			</View>
		);
	}
}

export default RegisterFive;
