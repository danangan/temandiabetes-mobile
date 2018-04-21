import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { CommentThread } from './commentThread';
import CommentChild from './commentChild';
import ThreadDesc from './threadDesc';

const ContentDetail = (props) => {
	// console.log('PROPS DETAILS 2', props)
	const state = {
		data: [1, 2, 3, 4, 5, 6, 7]
	};

	return (
		<View>
			<ThreadDesc desc={props.threadItem.description} />
			{
				props.threadDetails === null ?
				<View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size="large" color="rgb(239, 67, 79)" />
				</View>
				:
				props.threadDetails.comments.map((comment, index) => (
					<CommentThread 
						key={index}
						contentComment={comment}
						idThread={props.threadItem._id}
					/>
				))
			}
		</View>
	);
};

export { ContentDetail };
