import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Platform, TouchableOpacity, FlatList } from 'react-native';

import { Card, FooterThread, HeaderThread } from '../../../components';
import ContentThread from './contentThread';
import color from '../../../style/color';

class TabLatest extends Component {
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

	renderItem(threads) {
		return (
			<TouchableOpacity
				key={threads.index}
				onPress={() =>
					this.props.navigator.push({
						screen: 'TemanDiabets.ThreadDetails',
						navigatorStyle: {
							navBarHidden: true
						},
						passProps: threads
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
		const { listThreads } = this.props.dataThreads;

		return (
			<View style={styles.containerStyle}>
				<FlatList
					data={listThreads.item.data}
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
	}
};

const mapStateToProps = state => ({
	dataThreads: state.threadsReducer,
});

// const mapDispatchToProps = dispatch => ({
// 	// getThreads: (token) => dispatch(getThreads(token)),
// });

export default connect(mapStateToProps, null)(TabLatest);
