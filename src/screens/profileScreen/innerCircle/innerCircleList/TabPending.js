import React from 'react';
import { connect } from 'react-redux';
import { result } from 'lodash';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';

import { Avatar } from '../../../../components';
import Style from '../../../../style/defaultStyle';
import color from '../../../../style/color';
import { deleteInnerCircle } from '../../../../actions';

const TabPending = ({ innerCircle, deleted, onChangeIsProcess, navigator }) => {
  if (innerCircle.length === 0) {
    return (
      <View style={styles.placeholderContainerStyle}>
        <Text style={styles.placeholderStyle}>Ajak keluarga Anda untuk dijadikan inner circle</Text>
      </View>
    );
  }

  const deleteInnerCircle = (userId, innerCircleId) => {
    Alert.alert(
      'Hapus Inner Circle',
      'Apakah anda ingin menghapus permintaan anda ?',
      [
        { text: 'Cancel', onPress: () => null, style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            deleted(userId, innerCircleId);
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
                userName={result(item.friend, 'nama')}
                imageSource={result(item.friend, 'foto_profile')}
                avatarStyle={[
                  styles.avatarStyle,
                  {
                    borderColor:
                      result(item.friend, 'tipe_user') === 'non-diabetesi'
                        ? 'rgba(126,211,33,1)'
                        : result(item.friend, 'tipe_user') === 'diabetesi'
                          ? color.red
                          : 'rgba(74,144,226,1)'
                  }
                ]}
              />
              <View style={{ margin: 10 }}>
                <Text style={styles.nameStyle}>{result(item.friend, 'nama')}</Text>
                <Text style={styles.relationStyle}>{result(item.friend, 'tipe_user')}</Text>
              </View>
            </View>
            <View style={styles.buttonContainerStyle}>
              <TouchableOpacity
                style={styles.closeButtonStyle}
                onPress={() => deleteInnerCircle(result(item.friend, '_id'), item._id)}
              >
                <Image
                  source={require('../../../../assets/icons/close.png')}
                  tintColor={color.red}
                  style={styles.iconStyle}
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
    marginTop: 10
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonStyle: {
    width: 50,
    height: 50
  },
  avatarStyle: {
    borderWidth: 1.5,
    borderColor: 'rgba(126,211,33,1)'
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
  deleted: (userId, innerCircleId) => dispatch(deleteInnerCircle(userId, innerCircleId))
});

export default connect(
  null,
  mapDispatchToProps
)(TabPending);
