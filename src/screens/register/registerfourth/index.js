import React from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet,
	AsyncStorage
} from 'react-native';

import styles from '../style';
const URL_IMAGE =
	'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAqDAAAAJDNhMmVjZTMxLWYwMmYtNDkyMS05MWQ5LTQ5NGY1ZDQzNDc4OA.jpg';

import { Button } from '../../../components/button/Button';
import { Indicator } from '../../../components/indicator/Indicator';
import { registerAction } from '../../../actions';
import { authToken } from '../../../utils/constants';

class RegisterScreenFourth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			images: ['diabetesi', 'Non-Diabetesi', 'Ahli'],
			nama: this.props.name,
			email: this.props.email,
			password: this.props.password,
			selected: '',
			persentase: '80%',
			btn_submit: 'LANJUT',
			shouldRedirect: false
		};
		this.handleFinalRegister = this.handleFinalRegister.bind(this);
	}

	static navigatorStyle = {
		navBarHidden: true
	};

	componentDidUpdate() {
		const { message, status_code } = this.props.dataRegister.dataUser;
		if (status_code === 200 && this.state.shouldRedirect) {
			this.setState(
				{
					shouldRedirect: false
				},
				() => {
					this.props.navigator.resetTo({
						screen: 'TemanDiabets.RegisterFive',
						title: 'Final Step RESET'
					});
				}
			);
		}
	}

	handleFinalRegister() {
		const { nama, email, password, selected } = this.state;
		const dataUser = {
			nama: nama,
			email: email,
			password: password,
			tipeuser: selected
		};
		console.log("DATA USER COMPONENT ->", dataUser)
		this.props.registerAction(dataUser);
	}

	handleUserDecision(item) {
		if (item !== 'Ahli') {
			this.setState({ selected: item, persentase: '100%', btn_submit: 'SELESAI' });
		} else {
			this.setState({ selected: item, persentase: '80%', btn_submit: 'LANJUT' });
		}
	}

	handleSelectedUser() {
		return this.state.images.map((item, index) => (
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
		if (selected !== 'Ahli' && selected !== '') {
			this.setState({
				shouldRedirect: true
			});
			this.handleFinalRegister();
		} else {
			this.props.navigator.push({
				screen: 'TemanDiabets.RegisterFive',
				title: 'Next Step 5'
			});
		}
	}

	render() {
		console.log('PROPS PARAMS 4', this.props);
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
			<View style={[styles.container, { paddingBottom: 50 }]}>
				<View style={styles.wrapTitle}>
					<Text style={styles.titles}>Siapakah Anda?</Text>
				</View>
				<View style={stylesLocal.wrapperScroll}>
					<View style={{ backgroundColor: '#fff' }}>
						<ScrollView showsHorizontalScrollIndicator={false} horizontal>
							{this.handleSelectedUser()}
						</ScrollView>
					</View>
					<TouchableOpacity
						style={[styles.btnNext, { marginBottom: 40, marginTop: 10 }]}
						onPress={() => this.handleNavigation()}
					>
						<Text style={{ color: '#fff' }}>{this.state.btn_submit}</Text>
					</TouchableOpacity>
					<View style={styles.indicatorWrapper}>
						<Indicator persentase={{ width: this.state.persentase }} />
					</View>
				</View>
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
		marginHorizontal: 20,
		padding: 10
	},
	wrapperScroll: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'column'
	},
	images: { width: '100%', height: '80%' }
});

// const mapDispatchToProps = dispatch => ({
//   registerAction: dataUser => dispatch(registerAction(dataUser))
// });

// const mapStateToProps = state => {
//   console.log("PROPS DI REGISTER 4", state);
//   return {
//     registerReducer: state.registerReducer
//   };
// };

const mapStateToProps = state => ({
	dataRegister: state.registerReducer
});

const mapDispatchToProps = dispatch => ({
	registerAction: dataUser => dispatch(registerAction(dataUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreenFourth);
