import React from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import CommentThread from './commentThread';
import ThreadDesc from './threadDesc';

const ContentDetail = (props) => {
	const state = {
		data: [1, 2, 3, 4, 5, 6, 7]
	};
	console.log('PROPS -->00', props);
	return (
		<View>
			<ThreadDesc desc={props.threadItem.description} />
			{
				props.threadDetails === null ?
				<View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size="large" color="rgb(239, 67, 79)" />
				</View>
				:
				props.commentList.map((comment, index) => (
					<CommentThread
						key={index}
						contentComment={comment}
						idThread={props.threadItem._id}
						idComment={comment._id}
						navigator={props.navigator}

					/>
				))
			}
			{
				props.isLoadMore ?
				<TouchableOpacity 
					style={styles.loadMoreBtn}
					onPress={props.nextPageCommentList}
				>
					<Text style={styles.textStyle}>Lihat selengkapnya</Text>
				</TouchableOpacity>
				:
				null
			}
		</View>
	);
};

const styles = {
	loadMoreBtn: {
    width: '100%', justifyContent: 'center', alignItems: 'center'
	},
	textStyle: {
		fontFamily: 'OpenSans-Regular',
    color: '#424242',
    fontSize: 15,
    textAlign: 'center'
  }
};

export { ContentDetail };
