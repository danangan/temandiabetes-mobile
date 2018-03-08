import React, { Component } from 'react';
import { View, ScrollView, Platform, TouchableOpacity } from 'react-native';

import { Card, FooterThread, HeaderThread } from '../../../components';
import ContentThread from './contentThread';

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

	render() {
		return (
			<View>
				<ScrollView>
					{this.state.nums.map((item, index) => (
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
							<Card key={index} containerStyle={styles.container}>
								<HeaderThread
									source="http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg"
									name="Gloria James"
									category="Teman Diabetes"
								/>
								<ContentThread />
								<FooterThread numOfComments={17} />
							</Card>
						</TouchableOpacity>
					))}
				</ScrollView>
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

export default TabLatest;
