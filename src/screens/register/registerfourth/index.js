import React from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet,
	ImageBackground
} from 'react-native';

import styles from '../style';
import { Indicator } from '../../../components/indicator/Indicator';
import { registerAction } from '../../../actions';
import { buttonLabelDone, buttonLabelNext, URL_IMAGE, typeOfUsers } from '../../../utils/constants';
import backImage from '../../../assets/images/siapakah_anda.jpg';

class RegisterScreenFourth extends React.Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	constructor(props) {
		super(props);
		this.state = {
			selected: '',
			persentase: '80%',
			btn_submit: buttonLabelNext,
			shouldRedirect: false
		};
		this.handleFinalRegister = this.handleFinalRegister.bind(this);
	}

	componentDidUpdate() {
		const { status_code, tipe_user } = this.props.dataRegister.dataUser;
		if (status_code === 200 && this.state.shouldRedirect) {
			this.setState(
				{
					shouldRedirect: false
				},
				() => {
					if (tipe_user !== 'ahli') {
						// harus balik ke Home
						this.props.navigator.resetTo({
							screen: 'TemanDiabets.OnBoardingScreen',
							title: 'Home Screen'
						});
					} else {
						this.props.navigator.resetTo({
							screen: 'TemanDiabets.RegisterFive',
							title: 'SIP Screen'
						});
					}
				}
			);
		}
	}

	handleFinalRegister() {
		const dataUser = {
			nama: this.props.name,
			email: this.props.email,
			password: this.props.password,
			tipeuser: this.state.selected
		};
		console.log('JALAN');
		this.props.registerAction(dataUser);
	}

	handleUserDecision(item) {
		if (item !== 'ahli') {
			this.setState({ selected: item, persentase: '100%', btn_submit: buttonLabelDone });
		} else {
			this.setState({ selected: item, persentase: '80%', btn_submit: buttonLabelNext });
		}
	}

	handleSelectedUser() {
		return typeOfUsers.map((item, index) => (
			<TouchableOpacity
				key={index}
				style={
					this.state.selected === item
						? [stylesLocal.imagesWrapper, { borderColor: 'rgb(239, 67, 79)', borderWidth: 1.5 }]
						: stylesLocal.imagesWrapper
				}
				onPress={() => this.handleUserDecision(item)}
			>
				<Image resizeMode={'contain'} style={stylesLocal.images} source={{ uri: URL_IMAGE }} />
				<Text style={{ fontSize: 12, color: '#000', textAlign: 'center' }}>{item}</Text>
			</TouchableOpacity>
		));
	}

	handleNavigation() {
		const { selected } = this.state;
		if (selected !== '') {
			this.setState({
				shouldRedirect: true
			});
			this.handleFinalRegister();
		} else {
			alert('Silahkan pilih jenis user Anda');
		}
	}

	render() {
		console.log('PROPS FINAL ', this.props);
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
			<View style={[styles.container, { paddingBottom: 0 }]}>
				<ImageBackground style={styles.imageBackground} source={backImage}>
					<TouchableOpacity
						style={{
							flex: 0,
							justifyContent: 'flex-start',
							alignItems: 'flex-start',
							alignSelf: 'flex-start',
							marginTop: this.state.keyboardActive ? 10 : 0
						}}
						onPress={() => this.props.navigator.pop()}
					>
						<Image
							resizeMode={'contain'}
							style={{ width: 30, height: 30, margin: 10 }}
							source={{
								uri:
									'https://www.materialui.co/materialIcons/navigation/arrow_back_grey_192x192.png'
							}}
						/>
					</TouchableOpacity>
					<View style={styles.wrapTitle}>
						<Text style={styles.titles}>Siapakah Anda?</Text>
					</View>
					<View style={styles.wrapForm}>
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								flexDirection: 'row',
								alignItems: 'center',
								marginBottom: 40
							}}
						>
							{this.handleSelectedUser()}
						</View>

						<TouchableOpacity
							style={[styles.btnNext, { marginBottom: 40, marginTop: 20 }]}
							onPress={() => this.handleNavigation()}
						>
							<Text style={styles.buttonText}>{this.state.btn_submit}</Text>
						</TouchableOpacity>
						<View style={styles.indicatorWrapper}>
							<Indicator persentase={{ width: this.state.persentase }} />
						</View>
					</View>
				</ImageBackground>
			</View>
		);
	}
}

const stylesLocal = StyleSheet.create({
	imagesWrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: '#fff',
		width: 150,
		height: 150,
		marginVertical: 5,
		marginHorizontal: 5,
		padding: 10
	},
	wrapperScroll: {
		flex: 1,
		width: '90%',
		justifyContent: 'center',
		flexDirection: 'column'
	},
	images: { width: '100%', height: '80%' }
});

const mapStateToProps = state => ({
	dataRegister: state.registerReducer
});

const mapDispatchToProps = dispatch => ({
	registerAction: dataUser => dispatch(registerAction(dataUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreenFourth);
