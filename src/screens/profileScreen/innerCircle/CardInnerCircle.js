import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from '../../../components';
import color from '../../../style/color';
import Style from '../../../style/defaultStyle';

const CardInnerCircle = ({ item, navigation }) => (
  <View style={styles.containerStyle}>
    <View style={styles.contentStyle}>
      <View style={styles.leftContentStyle}>
        <Avatar
          avatarSize="Small"
          imageSource="https://images-cdn.9gag.com/photo/aMjGOVM_700b.jpg"
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
          <Text style={styles.nameStyle}>{item.nama}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.rightContentStyle} onPress={() => navigation(item)}>
        <Text style={styles.textButtonStyle}>+</Text>
      </TouchableOpacity>
    </View>
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
  rightContentStyle: {
    width: 50,
    height: 53
  },
  textButtonStyle: {
    fontFamily: 'Montserrat-Thin',
    textAlign: 'center',
    justifyContent: 'center',
    color: color.red,
    fontSize: Style.FONT_SIZE_TITLE * 2
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
  }
};

export default CardInnerCircle;
