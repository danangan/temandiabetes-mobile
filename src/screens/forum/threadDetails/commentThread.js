import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Avatar } from '../../../components';
import CommentChild from './commentChild';

class CommentThread extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderCommentChild() {
		const { replies, _id } = this.props.contentComment;
		return replies.map((item, index) => <CommentChild key={index} comment={item} />);
	}

	render() {
		// console.log('COMMENT --', this.props.contentComment);
		const { _id, user, text, updatedAt, replies } = this.props.contentComment;
		if (this.props === null) {
			return (<Text>Loading...</Text>);
		}
		return (
			<View>
				<View style={styles.container}>
					<View style={styles.wrapperHeader}>
						<Avatar
							avatarSize="ExtraSmall"
							imageSource="http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg"
						/>
						<View style={{ flex: 1, margin: 5 }}>
							<Text style={{ fontSize: 12 }}>{user.nama}</Text>
							<Text style={{ fontSize: 10 }}>{updatedAt}</Text>
						</View>
						<TouchableOpacity 
							onPress={() => Navigation.showModal({
								screen: 'TemanDiabets.ModalReplyComment',
								title: 'Modal',
								passProps: {
									idComment: _id,
									idThread: this.props.idThread,
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
					<View style={styles.commentContent}>
						<Text style={{ fontSize: 18 }}>
							{text}
						</Text>
					</View>
				</View>
				<View style={styles.containerCommentChild}>
					{replies.length === 0 ? null : <View style={{ marginBottom: 25 }} /> }
					{this.renderCommentChild()}
				</View>
			</View>
		);
	}
};

const styles = {
	container: { 
		flex: 1, 
		borderRadius: 20,
		elevation: 2, 
		backgroundColor: '#fff', 
		marginHorizontal: 10,
		marginVertical: 4
	},
	wrapperHeader: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		paddingTop: 15,
		backgroundColor: 'transparant',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		paddingHorizontal: 15
	},
	commentContent: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingHorizontal: 15,
		backgroundColor: 'transparant'
	},
	containerCommentChild: { 
    flex: 1, 
    position: 'relative',
    top: -20,
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  }
}

export { CommentThread };
