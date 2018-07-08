import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from '../../../components';
import color from '../../../style/color';
import Style from '../../../style/defaultStyle';

const UsersList = ({ item, navigation }) => (
  <View style={styles.containerStyle}>
    <TouchableOpacity style={styles.contentStyle} onPress={() => navigation(item)}>
      <View style={styles.leftContentStyle}>
        <Avatar
          userName={item.nama}
          avatarSize="Small"
          imageSource={item.foto_profile}
          avatarStyle={[
            styles.avatarStyle,
            {
              borderColor:
                item.tipe_user === 'non-diabetesi'
                  ? 'rgba(126,211,33,1)'
                  : item.tipe_user === 'diabetesi'
                    ? color.red
                    : 'rgba(74,144,226,1)'
            }
          ]}
        />
        <View style={styles.nameContainerStyle}>
          <Text style={styles.nameStyle}>
            {item.nama
              .split(' ')
              .slice(0, 2)
              .join(' ')}
          </Text>
        </View>
      </View>
      <Text style={styles.relationStyle}>{item.tipe_user}</Text>
    </TouchableOpacity>
  </View>
);

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10
  },
  contentStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: color.gray1
  },
  leftContentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameContainerStyle: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  nameStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALL,
    color: 'rgba(29,29,38,1)'
  },
  avatarStyle: {
    borderWidth: 1.5,
    borderColor: 'rgba(126,211,33,1)'
  },
  relationStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER
  }
};

export default UsersList;
