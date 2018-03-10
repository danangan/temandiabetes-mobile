import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Card, CardSection } from '../../../components';
import Style from '../../../style/defaultStyle';
import Footer from './Footer';
import color from '../../../style/color';

class TabFeatured extends Component {
	static navigatorStyle = {
		topBarCollapseOnScroll: true,
		navBarHideOnScroll: true
	};

	constructor(props) {
		super(props);
		this.state = {
			nums: [1, 2, 3, 4, 5]
		};
	}

	onBookmark = () => {
		
	}

	renderItem = () => (
		<TouchableOpacity onPress={() => null}>
			<Card>
				<CardSection>
					<Image
						resizeMode={'cover'}
						style={styles.imageStyle}
						source={{
							uri: 'https://i.imgur.com/zHd5A.jpg'
						}}
					/>
					<View style={styles.contentStyle}>
						<Text style={styles.titleStyle}>
							Ternyata, Gula Batu Tidak Lebih Sehat Dibanding Gula Pasir
						</Text>
						<Footer />
					</View>
				</CardSection>
			</Card>
		</TouchableOpacity>
	);

	render() {
		return (
			<View style={styles.containerStyle}>
				<FlatList data={this.state.nums} renderItem={item => this.renderItem(item)} />
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		backgroundColor: color.solitude
	},
	contentStyle: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	titleStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE,
		fontStyle: 'normal',
		justifyContent: 'center',
		textAlign: 'justify',
		paddingLeft: 10,
		width: Style.DEVICE_WIDTH / 1.5
	},
	imageStyle: {
		height: 105,
		width: 100
	}
};

export default TabFeatured;
