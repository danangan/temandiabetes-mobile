import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Platform } from 'react-native';
import { Avatar } from '../avatar';
import { CAMERA_ICON } from '../../utils/constants'
import ImageUploader from '../imageUploader';
import Style from '../../style/defaultStyle';

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
            style={styles.image}
            source={{ uri: CAMERA_ICON }}
          />
        </ImageUploader>
      </View>
      <View style={styles.titleContainerStyle}>
        <Text style={{ fontSize: Style.FONT_SIZE, fontFamily: Monserrat, color: '#000' }}>{ currentUser.nama }</Text>
        <Text style={{ fontSize: Style.FONT_SIZE_SMALLER, fontFamily: Monserrat, color: '#414141' }}>{ currentUser.tipe_user }</Text>
      </View>
    </View>
  )
};

const Monserrat = Platform.OS === 'android' ? 'Montserrat-Regular' : 'Montserrat'

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
    width: 41,
    tintColor: "#EF434F"
  }
};

const mapStateToProps = state => ({
	currentUser: state.authReducer.currentUser
});

export default connect(mapStateToProps)(ProfileCard);
