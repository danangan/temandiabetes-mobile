import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Avatar } from '../avatar';
import { DEFAULT_PROFILE_IMAGE } from '../../utils/constants'

const ProfileCard = (props) => {
  const { currentUser } = props;
  const profilePicture = currentUser.foto_profile && currentUser.foto_profile !== '' ? currentUser.foto_profile : DEFAULT_PROFILE_IMAGE;
  return (
    <View style={[styles.containerStyle]}>
      <View style={styles.backButtonStyle}>
        <Avatar
          avatarSize="Medium"
          imageSource={ profilePicture }
        />
      </View>
      <View style={styles.titleContainerStyle}>
        <Text style={{ fontSize: 20, fontFamily: 'Monserrat-Regular', color: '#000' }}>{ currentUser.nama }</Text>
        <Text style={{ fontSize: 12, fontFamily: 'Monserrat-Regular', color: '#414141' }}>{ currentUser.tipe_user }</Text>
      </View>
    </View>
  )
};

const styles = {
	containerStyle: {
    paddingTop: 5,
    flexDirection: 'row',
	},
	backButtonStyle: {
		flex: 0.7,
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
	},
	imageStyle: {
		width: 25,
		height: 25
	},
	titleContainerStyle: {
    paddingLeft: 10,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
};

const mapStateToProps = state => ({
	currentUser: state.authReducer.currentUser
});

export default connect(mapStateToProps)(ProfileCard);
