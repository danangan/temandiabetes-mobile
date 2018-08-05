import React from 'react';
import { View, Text } from 'react-native';
import Style from '../../../../style/defaultStyle';
import { Avatar } from '../../../../components';
import { dateFormatter } from '../../../../utils/helpers';

const defaultAuthor = {
  nama: '',
  tipe_user: '',
  foto_profile: ''
};

const processName = name => {
  if (name === 'Gue Sehat') {
    return 'GueSehat';
  }
  return name
    .split(' ')
    .slice(0, 2)
    .join(' ');
};

const Footer = ({ author, threadItem }) => {
  author = author || defaultAuthor;

  return (
    <View style={styles.containerFooterStyle}>
      <View style={styles.footerStyle}>
        {author.nama !== '' && (
          <Avatar
            avatarStyle={styles.avatarStyle}
            imageSource={author.foto_profile}
            userName={author.nama}
            customSize={40}
            initialStyle={{ paddingVertical: 2 }}
            textStyle={{ fontSize: 18 }}
          />
        )}
        {author.nama !== '' && (
          <View style={styles.nameAndMonthStyle}>
            <Text style={styles.nameStyle}>{processName(author.nama)}</Text>
            <Text style={styles.monthStyle}>
              {dateFormatter(threadItem.createdAt, { isUTC: true })}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = {
  containerFooterStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    paddingLeft: 7
  },
  avatarStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginVertical: 5
  },
  nameAndMonthStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  nameStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALL,
    fontStyle: 'normal',
    textAlign: 'left'
  },
  monthStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER / 1.2,
    fontStyle: 'normal',
    textAlign: 'left',
    bottom: 3
  }
};

export default Footer;
