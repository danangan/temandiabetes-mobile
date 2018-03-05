import React from 'react';
import { View, Image } from 'react-native';

import PropTypes from 'prop-types';
// import ViewPropTypes from '../../config/ViewPropTypes';

const Avatar = props => (
	<View
		style={{
			width: props.avatarSize === 'Small' ? 50 : props.avatarSize === 'Medium' ? 100 : 150,
			height: props.avatarSize === 'Small' ? 50 : props.avatarSize === 'Medium' ? 100 : 150,
			marginHorizontal: 5
		}}
	>
		<Image
			source={{ uri: props.imageSource }}
			style={{
				width: '100%',
				height: '100%',
				borderRadius: 100
			}}
			resizeMode={'center'}
		/>
	</View>
);

Avatar.propTypes = {
	imageSource: PropTypes.string,
	avatarSize: PropTypes.string
};

export { Avatar };
