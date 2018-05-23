import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Style from '../../../style/defaultStyle';
import { Avatar } from '../../../components';
import BookMark from '../../../assets/icons/bookmark.png';
import BookMarked from '../../../assets/icons/bookmark_dark.png';
import Share from '../../../assets/icons/share.png';

const defaultAuthor = {
  nama: '',
  tipe_user: '',
  foto_profile: ''
}

const Footer = ({ author, saveBookmark, shareThread, threadItem, threadIndex }) => {
  author = author || defaultAuthor
  return (
    <View style={styles.containerFooterStyle}>
      <View style={styles.footerLeftStyle}>
        {
          author.nama !== '' &&
          <Avatar
            avatarStyle={styles.avatarStyle}
            imageSource={author.foto_profile}
            userName={author.nama}
            customSize={40}
            initialStyle={{ paddingVertical: 8 }}
            textStyle={{ fontSize: 18 }}
          />
        }
        {
          author.nama !== '' &&
          <View style={styles.nameAndMonthStyle}>
            <Text style={styles.nameStyle}>{author.nama}</Text>
            <Text style={styles.monthStyle}>{author.tipe_user}</Text>
          </View>
        }
      </View>
      <View style={styles.footerRightStyle}>
        <TouchableOpacity onPress={() => { shareThread(threadItem)}}>
          <Image
            source={Share}
            style={styles.iconStyle}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { saveBookmark(threadItem, threadIndex) }}>
          <Image
            source={ threadItem.isBookmarked ? BookMarked : BookMark}
            style={styles.iconStyle}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = {
	containerFooterStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	footerLeftStyle: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingLeft: 10,
		alignSelf: 'flex-start'
	},
	footerRightStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	avatarStyle: {
		width: 40,
		height: 40,
		borderRadius: 20
	},
	nameAndMonthStyle: {
		paddingLeft: 7,
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
		fontSize: Style.FONT_SIZE_SMALLER / 1.1,
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
