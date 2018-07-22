import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Style from '../../../../style/defaultStyle';
import { Avatar } from '../../../../components';
import BookMark from '../../../../assets/icons/bookmark.png';
import BookMarked from '../../../../assets/icons/bookmark_dark.png';
import Share from '../../../../assets/icons/share.png';
import { dateFormatter } from '../../../../utils/helpers';

const defaultAuthor = {
  nama: '',
  tipe_user: '',
  foto_profile: ''
};

const processName = name => {
  const a = name.split(' ');
  if (a.length > 1) {
    return `${a[0]} ${a[1][0]}`;
  }
  return a[0];
};

const Footer = ({ author, saveBookmark, shareThread, threadItem, threadIndex }) => {
  author = author || defaultAuthor;

  return (
    <View style={styles.containerFooterStyle}>
      <View style={styles.footerLeftStyle}>
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
            <Text style={styles.monthStyle}>{dateFormatter(threadItem.createdAt)}</Text>
          </View>
        )}
      </View>
      <View style={styles.footerRightStyle}>
        <TouchableOpacity
          onPress={() => {
            shareThread(threadItem);
          }}
        >
          <Image source={Share} style={styles.iconStyle} resizeMode={'contain'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            saveBookmark(threadItem, threadIndex);
          }}
        >
          <Image
            source={threadItem.isBookmarked ? BookMarked : BookMark}
            style={styles.iconStyle}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  containerFooterStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerLeftStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    paddingLeft: 7
  },
  footerRightStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  },
  iconStyle: {
    marginLeft: 5,
    height: 50,
    width: 25
  }
};

export default Footer;
