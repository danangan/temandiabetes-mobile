import React, { Component } from 'react';
import { View, Platform, TouchableOpacity, FlatList, TextInput } from 'react-native';

import { Card, FooterThread, HeaderThread, TextField, CardSection } from '../../../components';
import ContentThread from './contentThread';
import searchIcon from '../../../assets/icons/close.png';
import Blood from '../../../assets/icons/explorer_icon.png';

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

	renderHeader() {
		return (
			<View>
				{/* <CardSection> */}
					<TextField
						leftIcon={Blood}
						rightIcon={searchIcon}
						placeholder={'Cari post, pengguna'}
						underlineColorAndroid={'#fff'}
						sectionStyle={{
							backgroundColor: 'yellow',
							borderWidth: 1,
							borderColor: '#fff',
							borderRadius: 5
						}}
						inputStyle={{ color: '#b6b6b6', fontSize: 12, backgroundColor: 'red' }}
					/>
				{/* </CardSection> */}
				{/* <TextField
					placeholder={'Tanya atau bagikan disini'}
					containerStyle={{
						backgroundColor: '#ccc',
						borderWidth: 1,
						borderColor: '#fff',
						borderRadius: 5,
						marginHorizontal: 5,
						height: 70
					}}
					underlineColorAndroid="rgba(0,0,0,0)"
					inputStyle={{ color: '#b6b6b6', fontSize: 12, height: 100, backgroundColor: 'red' }}
				/> */}
				<View
					style={{
						backgroundColor: 'white',
						borderWidth: 1,
						borderColor: '#fff',
						borderRadius: 5,
						marginHorizontal: 5,
						elevation: 2.5,
						height: 70
					}}
				>
					<TextInput
						style={{
							fontSize: 16,
							height: 70
						}}
						placeholder="Tanya atau bagiakn disini"
						underlineColorAndroid="rgba(0,0,0,0)"
					/>
				</View>
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
				<Card containerStyle={styles.container}>
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
			<View style={{ flex: 1 }}>
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
	container: {
		...Platform.select({
			android: { elevation: 4 },
			ios: {
				shadowColor: 'rgba(0,0,0, .2)',
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 0.1,
				shadowRadius: 2.5
			}
		})
	}
};

export default TabHome;
