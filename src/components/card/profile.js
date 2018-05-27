import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Avatar } from '../avatar';
import { CAMERA_ICON } from '../../utils/constants'
import ImageUploader from '../imageUploader'

const ProfileCard = (props) => {
  const { currentUser, updateLoadingState } = props;
  const isProfpicExist = currentUser.foto_profile && currentUser.foto_profile !== ''
  return (
    <View style={[styles.containerStyle]}>
      <View>
        <Avatar
          style={styles.imageStyle}
          avatarSize="Medium"
          imageSource={ currentUser.foto_profile }
          userName={ currentUser.nama }
        />
        <ImageUploader style={styles.imageOverlay} updateLoadingState={updateLoadingState}>
          <Image
            tintColor="#EF434F"
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
	},
	titleContainerStyle: {
    paddingLeft: 15,
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
