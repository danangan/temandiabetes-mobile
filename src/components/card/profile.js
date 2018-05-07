import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Avatar } from '../avatar';
import { CAMERA_ICON } from '../../utils/constants'
import ImageUploader from '../imageUploader'

const ProfileCard = (props) => {
  const { currentUser } = props;
  const isProfpicExist = currentUser.foto_profile && currentUser.foto_profile !== ''
  return (
    <View style={[styles.containerStyle]}>
      <View style={{ width: 75, height: 75 }}>
        <Avatar
          style={styles.imageStyle}
          avatarSize="Medium"
          imageSource={ currentUser.foto_profile }
          userName={ currentUser.nama }
        />
        <ImageUploader style={styles.imageOverlay}>
          <Image
            style={styles.image}
            source={{ uri: CAMERA_ICON }}
          />
        </ImageUploader>
      </View>
      <View style={styles.titleContainerStyle}>
        <Text style={{ fontSize: 28, fontFamily: 'Monserrat-Regular', color: '#000' }}>{ currentUser.nama }</Text>
        <Text style={{ fontSize: 14, fontFamily: 'Monserrat-Regular', color: '#414141' }}>{ currentUser.tipe_user }</Text>
      </View>
    </View>
  )
};

const styles = {
	containerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
	},
	titleContainerStyle: {
    paddingLeft: 10,
  },
  imageOverlay: {
    position: 'absolute',
    height: 41,
    width: 41,
    top: 17,
    left: 23,
    opacity: 0.8
  },
  image: {
    height: 41,
    width: 41
  }
};

const mapStateToProps = state => ({
	currentUser: state.authReducer.currentUser
});

export default connect(mapStateToProps)(ProfileCard);
