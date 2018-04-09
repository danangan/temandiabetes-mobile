import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card, CardSection } from '../../components';
import Style from '../../style/defaultStyle';
import color from '../../style/color';

class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dummy: [1, 2, 3, 4, 5, 6]
		};
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'notification') {
				alert('NavBar', 'Edit button pressed');
			}
			if (event.id === 'sideMenu') {
				alert('NavBar', 'Add button pressed');
			}
		}
	}

	ShowModal = () => {
		this.props.navigator.showModal({
			screen: 'TemanDiabets.DetailOrder',
			navigatorStyle: {
				navBarHidden: true
			},
			animationType: 'none'
		});
	};

	showLightBox = () => {
		this.props.navigator.showLightBox({
			screen: 'TemanDiabets.LightBox',
			passProps: {
				title: 'DIABETONE KAPSUL BOX',
				content: 'Apakah Anda yakin akan membeli item ini?'
			},
			style: {
				backgroundBlur: 'dark',
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				tapBackgroundToDismiss: true
			}
		});
	};

	render() {
		return (
			<View style={styles.containerStyle}>
				<ScrollView>
					<View style={styles.contentStyle}>
						{this.state.dummy.map((item, index) => (
							<Card containerStyle={styles.cardStyle} key={index}>
								<TouchableOpacity onPress={this.ShowModal}>
									<CardSection>
										<Image source={{ uri: 'https://goo.gl/oqvwhS' }} style={styles.imageStyle} />
									</CardSection>
									<Text style={styles.priceStyle}>Rp. 235.500</Text>
									<Text style={styles.productNameStyle}>DIABETONE KAPSUL BOX</Text>
								</TouchableOpacity>
								<View style={styles.borderLineStyle} />
								<TouchableOpacity onPress={this.showLightBox}>
									<View style={styles.orderContainerStyle}>
										<Image
											source={require('../../assets/icons/cart.png')}
											style={styles.iconOrderStyle}
											tintColor={color.blue}
										/>
										<Text style={styles.textOrderStyle}>PESAN SEKARANG</Text>
									</View>
								</TouchableOpacity>
							</Card>
						))}
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		flex: 1,
		paddingBottom: Style.PADDING,
		backgroundColor: color.solitude
	},
	contentStyle: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	cardStyle: {
		height: Style.CARD_WIDTH - 109,
		width: Style.CARD_WIDTH / 2,
		padding: Style.CARD_PADDING_X,
		marginLeft: 5,
		marginRight: 5
	},
	imageStyle: {
		height: 108.26,
		width: 108.08
	},
	priceStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_SMALLER,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'rgba(37,44,104,1)'
	},
	productNameStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_SMALL - 2,
		fontWeight: 'bold',
		lineHeight: 15,
		textAlign: 'center',
		color: 'rgba(55,55,56,1)'
	},
	orderContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	iconOrderStyle: {
		height: 18,
		width: 18,
		bottom: 2
	},
	textOrderStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_SMALLER - 2,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'rgba(21,21,21,1)',
		marginBottom: 17.01
	},
	borderLineStyle: {
		borderBottomColor: 'rgba(222,221,221,1)',
		borderBottomWidth: 1,
		width: Style.CARD_WIDTH / 2,
		marginLeft: -30,
		marginTop: 23.2,
		marginBottom: 12.87
	}
};

export default Chart;
