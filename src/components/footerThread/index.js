import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardSection } from '../card/CardSection';

const FooterThread = props => (
	<CardSection>
		<View style={styles.wrapper}>
			<TouchableOpacity>
				<Text>13 Balasan</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text>Tandai</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text>Laporkan</Text>
			</TouchableOpacity>
		</View>
	</CardSection>
);

const styles = {
	wrapper: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingHorizontal: 15,
		justifyContent: 'space-between'
	}
};

export { FooterThread };
