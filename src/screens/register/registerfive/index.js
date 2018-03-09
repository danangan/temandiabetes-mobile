import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

import styles from '../style';
import { Indicator } from '../../../components/indicator/Indicator';
import { mainApp } from '../../../../App';
import Style from '../../../style/defaultStyle';

class RegisterFive extends React.Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	constructor(props) {
		super(props);
		this.state = {
			sip: ''
		};
	}

	toHome() {
		mainApp();
	}

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					style={styles.imageBackground}
					source={require('../../../assets/images/sip.png')}
				>
					<TouchableOpacity
						style={{
							flex: 1,
							justifyContent: 'flex-start',
							alignItems: 'flex-start',
							alignSelf: 'flex-start'
						}}
						onPress={() => this.props.navigator.pop()}
					>
						<Image
							resizeMode={'contain'}
							style={{ width: 30, height: 30, margin: 10 }}
							source={require('../../../assets/icons/back_white.png')}
						/>
					</TouchableOpacity>
					<View style={[styles.wrapTitle, { flex: this.state.keyboardActive ? 1 : 2 }]}>
						<Text style={styles.titles}>Surat Izin Praktek (SIP)</Text>
					</View>
					<View style={styles.wrapForm}>
						<View
							style={[
								stylesLocal.containerForm,
								{ flex: 2, justifyContent: this.state.keyboardActive ? 'flex-start' : 'flex-end' }
							]}
						>
							<TextInput
								placeholder={'Surat Izin Praktek'}
								onChangeText={sip => this.setState({ sip })}
								underlineColorAndroid={'#fff'}
								style={[styles.textInputStyle, stylesLocal.inputStyle]}
							/>
							<TouchableOpacity style={styles.btnNext} onPress={() => this.toHome()}>
								<Text style={styles.buttonText}>SELESAI</Text>
							</TouchableOpacity>
							<Text style={{ fontSize: 20, color: 'red' }}>{this.state.message}</Text>
						</View>
						<View style={styles.indicatorWrapper}>
							<Indicator persentase={{ width: '100%' }} />
						</View>
					</View>
				</ImageBackground>
			</View>
		);
	}
}

const stylesLocal = {
	containerForm: {
		height: '70%'
	},
	inputStyle: {
		fontSize: Style.FONT_SIZE * 1.2,
		marginBottom: 15,
		paddingLeft: 20,
		fontFamily: 'Montserrat-Regular'
	}
};

export default RegisterFive;
