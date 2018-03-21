import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

import styles from '../style';
import { Indicator } from '../../../components/indicator/Indicator';
import { mainApp } from '../../../../App';
import Style from '../../../style/defaultStyle';
import { registerAction } from '../../../actions';

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

	componentDidUpdate() {
		const { status_code, tipe_user } = this.props.dataRegister.dataUser;
		if (status_code === 200 && this.state.shouldRedirect) {
			this.setState({
					shouldRedirect: false
				}, () => {
					this.props.navigator.resetTo({
						screen: 'TemanDiabets.LoginScreen',
						navigatorStyle: {
							navBarHidden: true
						}
					});
				}
			);
		}
	}

	toHome() {
		// mainApp();
		const dataUser = {
			nama: this.props.name,
			email: this.props.email,
			password: this.props.password,
			tipeuser: this.props.tipeuser,
			sip: this.state.sip
		};
		this.setState({
			shouldRedirect: true
		}, () => {
			this.props.registerAction(dataUser);
		})
	}

	render() {
		console.log("PROPS REGISTER FIVE, ", this.props);
		const { message, status_code } = this.props.dataRegister.dataUser;
		if (this.state.shouldRedirect) {
			return (
				<View style={{ flex: 1 }}>
					<Text style={{ fontSize: 20, color: '#000' }}>Loading...</Text>
				</View>
			);
		} else if (message === 'registration data incomplete' && status_code === 400) {
			alert('Data already exist!');
		}
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

const mapStateToProps = state => ({
	dataRegister: state.registerReducer
});

const mapDispatchToProps = dispatch => ({
	registerAction: dataUser => dispatch(registerAction(dataUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFive);
