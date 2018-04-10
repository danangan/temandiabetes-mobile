import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { CardSection } from '../../../components';

import { ContentDetail } from './contentDetail';
import HeaderDetail from './headerDetail';

class ThreadDetails extends React.Component {
	static navigatorStyle = {
		tabBarHidden: true
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		console.log("PROPS DI DETAILS ", this.props);
		const { topic, author, _id } = this.props.item;
		return (
			<View style={{ flex: 2, backgroundColor: '#f2f4fd' }}>
				<HeaderDetail authorItem={author} />
				<ScrollView>
					{/* <ContentDetail /> */}
					<CardSection containerStyle={{ backgroundColor: '#f2f4fd', margin: 0 }}>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'flex-start',
								paddingHorizontal: 15,
								borderRadius: 15
							}}
						>
							<Text style={{ fontSize: 22 }}>
								{topic}
							</Text>
						</View>
					</CardSection>
					<CardSection containerStyle={{ backgroundColor: '#f2f4fd', margin: 0 }}>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'flex-start',
								paddingVertical: 5,
								paddingHorizontal: 15,
								borderRadius: 15
							}}
						>
							<TouchableOpacity style={{ backgroundColor: '#252c68', marginRight: 10 }}>
								<Text
									style={{
										fontSize: 12,
										paddingHorizontal: 20,
										paddingVertical: 3,
										color: '#8084a7'
									}}
								>
									Ikuti
								</Text>
							</TouchableOpacity>
							<TouchableOpacity 
								onPress={() => Navigation.showModal({
									screen: 'TemanDiabets.ModalPostComment',
									title: 'Modal',
									passProps: {
										idThread: _id
									},
									navigatorButtons: {
										leftButtons: [
											{}
										]
									},
									animationType: 'slide-up'
								})}
								style={{ backgroundColor: '#252c68' }}>
								<Text
									style={{
										fontSize: 12,
										paddingHorizontal: 20,
										paddingVertical: 3,
										color: '#8084a7'
									}}
								>
									Balas
								</Text>
							</TouchableOpacity>
						</View>
					</CardSection>
					<ContentDetail 
						threadItem={this.props.item}
					/>
				</ScrollView>
				<TouchableOpacity
					onPress={() => this.props.navigator.pop()}
					style={{
						width: '100%',
						backgroundColor: 'red',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text style={{ color: '#fff', fontSize: 30 }}>X</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default ThreadDetails;
