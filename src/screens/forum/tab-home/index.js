import React, { Component } from 'react';
import { View, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Card, FooterThread } from '../../../components';
import { ContentThread } from './contentThread';
import { HeaderThread } from './headerThread';

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

	render() {
		return (
			<View>
				<ScrollView>
					{this.state.nums.map((a, index) => (
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
								<HeaderThread />
								<ContentThread />
								<FooterThread />
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

export default TabHome;
