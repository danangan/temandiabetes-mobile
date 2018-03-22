import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { Card, CardSection } from '../../../components';
import Style from '../../../style/defaultStyle';
import Footer from './Footer';
import color from '../../../style/color';

import { getThreadStatic } from '../../../actions/threadActions';
import { authToken } from '../../../utils/constants';

class TabFeatured extends Component {
	static navigatorStyle = {
		topBarCollapseOnScroll: true,
		navBarHideOnScroll: true
	};

	constructor(props) {
		super(props);
		this.state = {
			refreshing: false
		};
	}

	componentDidMount() {
		this.getThreadStatic();
	}

	onBookmark = () => {};

	onPressDetail = item => {
		this.props.navigator.push({
			screen: 'TemanDiabets.FeaturedDetail',
			navigatorStyle: {
				navBarHidden: true
			},
			passProps: {
				item
			}
		});
	};

	getThreadStatic = async () => {
		const idToken = await AsyncStorage.getItem(authToken);
		this.props.getThreadStatic(idToken);
	};

	handleRefresh = () => {
		this.setState(
			{
				refreshing: true
			},
			() => {
				this.getThreadStatic();
				this.setState({ refreshing: false });
			}
		);
	};

	renderItem = ({ item }) => (
		<TouchableOpacity onPress={() => this.onPressDetail(item)}>
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
						<Text style={styles.titleStyle}>{item.topic}</Text>
						<Footer author={item.author} />
					</View>
				</CardSection>
			</Card>
		</TouchableOpacity>
	);

	render() {
		const { data } = this.props.threadsReducer.listThreadStatic.item;
		return (
			<View style={styles.containerStyle}>
				<FlatList
					data={data}
					renderItem={item => this.renderItem(item)}
					refreshing={this.state.refreshing}
					onRefresh={this.handleRefresh}
				/>
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

const mapStateToProps = state => ({
	threadsReducer: state.threadsReducer
});

const mapDispatchToProps = dispatch => ({
	getThreadStatic: idToken => dispatch(getThreadStatic(idToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabFeatured);
