import React from 'react';
import { View, Image } from 'react-native';

import PropTypes from 'prop-types';
// import ViewPropTypes from '../../config/ViewPropTypes';

const Avatar = ({ avatarSize, imageSource, imageStyle, resizeMode }) => (
	<View
		style={{
			width:
				avatarSize === 'ExtraSmall'
					? 25
					: avatarSize === 'Small' ? 50 : avatarSize === 'Medium' ? 100 : 150,
			height:
				avatarSize === 'ExtraSmall'
					? 25
					: avatarSize === 'Small' ? 50 : avatarSize === 'Medium' ? 100 : 150,
			marginHorizontal: 5
		}}
	>
		<Image
			source={{ uri: imageSource }}
			style={[styles.imageStyle, { imageStyle }]}
			resizeMode={resizeMode}
		/>
	</View>
);

Avatar.propTypes = {
	imageSource: PropTypes.string,
	avatarSize: PropTypes.string,
	imageStyle: PropTypes.style
};

const styles = {
	imageStyle: {
		width: '100%',
		height: '100%',
		borderRadius: 100,
	}
};

export { Avatar };
