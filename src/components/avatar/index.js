import React from 'react';
import { View, Image } from 'react-native';

import PropTypes from 'prop-types';
import ViewPropTypes from '../../config/ViewPropTypes';

const Avatar = ({ avatarSize, imageSource, avatarStyle, resizeMode }) => (
	<View
		style={{
			width:
				avatarSize === 'ExtraSmall'
					? 24
					: avatarSize === 'Small' ? 50 : avatarSize === 'Medium' ? 75 : 150,
			height:
				avatarSize === 'ExtraSmall'
					? 25
					: avatarSize === 'Small' ? 50 : avatarSize === 'Medium' ? 75 : 150,
			marginHorizontal: 5
		}}
	>
		<Image
			source={{ uri: imageSource }}
			style={[styles.avatarStyle, avatarStyle]}
			resizeMode={resizeMode}
		/>
	</View>
);

Avatar.propTypes = {
	imageSource: PropTypes.string,
	avatarSize: PropTypes.string,
	avatarStyle: ViewPropTypes.style
};

const styles = {
	avatarStyle: {
		width: '100%',
		height: '100%',
		borderRadius: 100,
	}
};

export { Avatar };
