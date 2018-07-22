import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';

import { Avatar } from '../../../../components';
import color from '../../../../style/color';
import Style from '../../../../style/defaultStyle';
import close from '../../../../assets/icons/close.png';
import checklist from '../../../../assets/icons/check.png';
import { acceptRequestToInnerCircle, declineRequestToInnerCircle } from '../../../../actions';

const borderColor = typeOfUser => {
  if (typeOfUser === 'non-diabetesi') {
    return color.green;
  }

  if (typeOfUser === 'diabetesi') {
    return color.red;
  }

  if (typeOfUser === 'ahli') {
    return color.lightBlue;
  }
};

const TabRequest = ({ innerCircle = [], accept, reject, onChangeIsProcess, navigator }) => {
  if (innerCircle.length === 0) {
    return (
      <View style={styles.placeholderContainerStyle}>
        <Text style={styles.placeholderStyle}>Kamu belum memiliki permintaan</Text>
      </View>
    );
  }

  const rejectRequest = (friendId, innerCircleId) => {
    Alert.alert(
      'Tolak Permintaan',
      'Apakah anda ingin menolak permintaan sebagai inner circle ?',
      [
        { text: 'Cancel', onPress: () => null, style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            reject(friendId, innerCircleId);
            onChangeIsProcess(true);
          }
        }
      ],
      { cancelable: false }
    );
  };

  const acceptRequest = (friendId, innerCircleId) => {
    Alert.alert(
      'Terima Permintaan',
      'Apakah anda ingin menerima permintaan sebagai inner circle ?',
      [
        { text: 'Cancel', onPress: () => null, style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            accept(friendId, innerCircleId);
            onChangeIsProcess(true);
          }
        }
      ],
      { cancelable: false }
    );
  };

  const pushNavigation = item => {
    navigator.push({
      screen: 'TemanDiabetes.ProfileDetails',
      passProps: {
        id: item.friend._id
      },
      animation: true,
      animationType: 'fade'
    });
  };

  return (
    <FlatList
      data={innerCircle}
      renderItem={({ item, index }) => (
        <TouchableOpacity key={index} onPress={() => pushNavigation(item)}>
          <View style={styles.containerStyle}>
            <View style={styles.contentStyle}>
              <Avatar
                avatarSize="Small"
                userName={item.friend.nama}
                imageSource={item.friend.foto_profile}
                avatarStyle={[
                  styles.avatarStyle,
                  {
                    borderColor: borderColor(item)
                  }
                ]}
              />
              <View style={{ margin: 10 }}>
                <Text style={styles.nameStyle}>{item.friend.nama}</Text>
                <Text style={styles.relationStyle}>{item.friend.tipe_user}</Text>
              </View>
            </View>
            <View style={styles.buttonContainerStyle}>
              <TouchableOpacity
                style={styles.closeButtonStyle}
                onPress={() => rejectRequest(item.friend._id, item._id)}
              >
                <Image source={close} tintColor={color.red} style={styles.iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButtonStyle}
                onPress={() => acceptRequest(item.friend._id, item._id)}
              >
                <Image
                  source={checklist}
                  tintColor={color.green}
                  style={[styles.iconStyle, { width: 25, height: 25, marginTop: 7 }]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: color.white
  },
  contentStyle: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  nameStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    color: 'rgba(29,29,38,1)'
  },
  relationStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER
  },
  iconStyle: {
    height: 17,
    width: 17,
    marginTop: 13,
    alignSelf: 'center'
  },
  buttonContainerStyle: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  closeButtonStyle: {
    width: 50,
    height: 50
  },
  avatarStyle: {
    borderWidth: 1.5,
    borderColor: color.red
  },
  placeholderContainerStyle: {
    marginTop: Style.CARD_WIDTH / 2,
    alignSelf: 'center',
    alignItems: 'center'
  },
  placeholderStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    justifyContent: 'center',
    textAlign: 'center'
  }
};

const mapDispatchToProps = dispatch => ({
  accept: (friendId, innerCircleId) =>
    dispatch(acceptRequestToInnerCircle(friendId, innerCircleId)),
  reject: (friendId, innerCircleId) =>
    dispatch(declineRequestToInnerCircle(friendId, innerCircleId))
});

export default connect(
  null,
  mapDispatchToProps
)(TabRequest);
