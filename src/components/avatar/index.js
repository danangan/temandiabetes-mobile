import React from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import { getInitialName } from '../../utils/helpers'
import PropTypes from 'prop-types';
import ViewPropTypes from '../../config/ViewPropTypes';

const Avatar = ({ avatarSize, containerStyle, imageSource, avatarStyle, textStyle, initialStyle, resizeMode, userName, customSize }) => {
  const isImageExist = !!imageSource && imageSource !== ''
  let size
  let paddingVertical = 16
  let fontSize = 32
  switch (avatarSize) {
    case 'ExtraSmall':
      size = 25
      fontSize = 10
      paddingVertical = 6
      break;
    case 'Small':
      size = 50
      fontSize = 20
      paddingVertical = 11
      break;
    case 'Medium':
      size = 75
      break;
    default:
      size = customSize
      break;
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        marginHorizontal: 5,
        ...containerStyle
      }}
    >
      {
        isImageExist &&
          <Image
          source={{ uri: imageSource || '' }}
          style={[styles.avatarStyle, avatarStyle]}
          resizeMode={resizeMode}
        />
      }
      {
        !isImageExist &&
        <View
          style={[styles.avatarStyle, styles.initialStyle, { paddingVertical }, initialStyle, avatarStyle]}
        >
          <Text style={[styles.textStyle, { fontSize }, textStyle]}>{ getInitialName(userName) || '' }</Text>
        </View>
      }

    </View>
  )
}

Avatar.propTypes = {
	imageSource: PropTypes.string,
	avatarSize: PropTypes.string,
	avatarStyle: ViewPropTypes.style
};

const styles = {
	avatarStyle: {
		width: '100%',
		height: '100%',
    borderRadius: 100
  },
  initialStyle: {
    backgroundColor: '#E2E2E2',
    paddingVertical: 18
  },
  textStyle:{
		fontFamily: 'Montserrat-Regular',
    color: '#424242',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
};

export { Avatar };
