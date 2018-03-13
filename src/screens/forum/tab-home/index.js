import React, { Component } from 'react';
import { View, Platform, TouchableOpacity, FlatList, TextInput, Text, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { Card, FooterThread, HeaderThread, TextField } from '../../../components';
import ContentThread from './contentThread';
import searchIcon from '../../../assets/icons/close.png';
import Blood from '../../../assets/icons/explorer_icon.png';
import color from '../../../style/color';

class TabHome extends Component {
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

	togleModal(params) {
		Navigation.showModal({
			screen: params,
			title: 'Modal',
			navigatorButtons: {
				leftButtons: [
					{}
				]
			},
			animationType: 'slide-up'
		});
	}

	renderButtonSearch() {
		return (
			<TouchableOpacity 
				onPress={() => this.togleModal('TemanDiabets.ModalSearch')}
				style={styles.wrapButonSearch}
			>
				<View style={{ flex: 0.2, alignItems: 'center', borderRightWidth: 0.7, borderRightColor: 'red', padding: 5 }}>
					<Image source={Blood} style={{ width: 25, height: 25 }} />
				</View>
				<View style={{ flex: 2, alignItems: 'flex-start', paddingHorizontal: 5 }}>
					<Text>Cari post, pengguna</Text>
				</View>
				<View style={{ flex: 0.2, alignItems: 'center' }}>
					<Image source={searchIcon} style={{ width: 25, height: 25 }} />
				</View>
			</TouchableOpacity>
		);
	}

	renderPostThread() {
		return (
			<View style={styles.wrapPostThread}>
				<TextInput
					onFocus={() => this.togleModal('TemanDiabets.ModalPostThread')}
					style={{
						fontSize: 16,
						height: 70
					}}
					placeholder="Tanya atau bagikan disini"
					underlineColorAndroid="rgba(0,0,0,0)"
				/>
			</View>
		);
	}

	renderHeader() {
		return (
			<View>
				{
					this.renderButtonSearch()
				}
				{
					this.renderPostThread()
				}
			</View>
		);
	}
	
	renderItem(item) {
		return (
			<TouchableOpacity
				onPress={() =>
					this.props.navigator.push({
						screen: 'TemanDiabets.ThreadDetails',
						navigatorStyle: {
							navBarHidden: true
						}
					})
				}
			>
				<Card containerStyle={styles.cardStyle}>
					<HeaderThread
						source="http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg"
						name="Gloria James"
						category="Teman Diabetes"
					/>
					<ContentThread />
					<FooterThread numOfComments={17} />
				</Card>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.containerStyle}>
				<FlatList
					ListHeaderComponent={() => this.renderHeader()}
					data={this.state.nums}
					renderItem={item => this.renderItem(item)}
				/>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		backgroundColor: color.solitude
	},
	cardStyle: {
		...Platform.select({
			android: { elevation: 4 },
			ios: {
				shadowColor: 'rgba(0,0,0, .2)',
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 0.1,
				shadowRadius: 2.5
			}
		})
	},
	wrapButonSearch: { 
		flex: 2, 
		flexDirection: 'row', 
		justifyContent: 'space-around', 
		alignItems: 'center', 
		paddingVertical: 10,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#fff',
		borderRadius: 5,
		marginVertical: 10,
		marginHorizontal: 5,
		elevation: 2.5,
		height: 50 
	},
	wrapPostThread: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#fff',
		borderRadius: 5,
		marginHorizontal: 5,
		elevation: 2.5,
		height: 70,
		marginVertical: 10,
		paddingHorizontal: 30,
	}
};

export default TabHome;
