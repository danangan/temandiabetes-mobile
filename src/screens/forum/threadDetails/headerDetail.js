import React from 'react';
import { View, Text } from 'react-native';

import { CardSection, Avatar } from '../../../components';

class HeaderDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		// console.log("PROPS ", this.props);
		return (
			<CardSection containerStyle={{ backgroundColor: '#f2f4fd', margin: 0 }}>
				<View style={styles.container}>
					<Avatar
						avatarSize="Small"
						imageSource="http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg"
					/>
					<View style={{ flex: 1, margin: 5 }}>
						<Text style={{ fontSize: 12 }}>{this.props.authorItem.nama}</Text>
						<Text style={{ fontSize: 10 }}>a minutes ago</Text>
					</View>
					<View style={styles.wrapperButton}>
						<Text style={styles.titleButton}>Stevia</Text>
					</View>
					<View style={styles.wrapperButton}>
						<Text style={styles.titleButton}>Sweteners</Text>
					</View>
				</View>
			</CardSection>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		paddingTop: 15,
		paddingHorizontal: 15,
		borderRadius: 15
	},
	wrapperButton: {
		marginVertical: 5,
		marginHorizontal: 1,
		alignItems: 'center',
    backgroundColor: '#252c68',
    borderRadius: 10,
	},
	titleButton: {
		fontSize: 12,
		color: '#8084a7',
		paddingHorizontal: 10
	}
};

export default HeaderDetail;
