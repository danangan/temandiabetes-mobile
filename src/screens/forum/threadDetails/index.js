import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

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
		return (
			<View style={{ flex: 2, backgroundColor: '#f2f4fd' }}>
				<HeaderDetail />
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
								Tips Merawat dan Menjaga Kesehatan Bagi Para Bagi Para Penderita Diabetes
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
							<TouchableOpacity style={{ backgroundColor: '#252c68' }}>
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
					<ContentDetail />
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
