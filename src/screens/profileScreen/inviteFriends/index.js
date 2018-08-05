import React from 'react';
import Share from 'react-native-share';
import { View, Text, StyleSheet, Image, TouchableOpacity, Clipboard, Alert } from 'react-native';

import color from '../../../style/color';
import back from '../../../assets/icons/back.png';
import contentImage from '../../../assets/images/inviteFriend.png';
import Style from '../../../style/defaultStyle';
import { Button } from '../../../components';
import landingPageURL from '../../../config/landingPageURL';

class InviteFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clipboardContent: landingPageURL
    };
  }

  shareApp = () => {
    const options = {
      title: 'Ajakan bergabung di Teman Diabetes',
      message: 'Dapatkan aplikasi Teman Diabetes dengan klik link berikut',
      url: landingPageURL,
      subject: 'Ajakan bergabung di Teman Diabetes' //  for email
    };
    Share.open(options).catch(err => {
      err && console.log(err);
    });
  };

  writeToClipboard = async () => {
    await Clipboard.setString(this.state.clipboardContent);
    Alert.alert('Kode undangan telah berhasil disalin.');
  };

  randomLinkReferral = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const stringLength = 9;
    let randomString = '';
    for (let i = 0; i < stringLength; i++) {
      const num = Math.floor(Math.random() * chars.length);
      randomString += chars.substring(num, num + 1);
    }

    return randomString;
  };

  chooseToShare = () => {
    Alert.alert(
      'Ajak teman Anda bergabung di Aplikasi Teman Diabetes.',
      'Apakah Anda ingin membagikannya melalui media sosial atau menyalin kode nya ?',
      [
        { text: 'Cancel', onPress: () => null, style: 'cancel' },
        { text: 'Bagikan', onPress: () => this.shareApp() },
        { text: 'Salin Kode', onPress: () => this.writeToClipboard() }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.containerStyle}>
          <View style={styles.navBarContainerStyle}>
            <TouchableOpacity
              style={styles.leftButtonBackStyle}
              onPress={() => this.props.navigator.pop()}
            >
              <Image
                resizeMode={'contain'}
                style={styles.iconStyle}
                tintColor={color.red}
                source={back}
              />
            </TouchableOpacity>
            <Text style={styles.navBarTitleStyle}>AJAK TEMAN</Text>
            <Text style={{ color: 'transparent' }}>none</Text>
          </View>
          <View style={styles.contentStyle}>
            <Image resizeMode={'contain'} style={styles.contentImage} source={contentImage} />
            <Text style={styles.titleStyle}>Ajak teman Anda bergabung!</Text>
            <Text style={styles.urlStyle}>
              https://temandiabetes.com/{this.randomLinkReferral()}
            </Text>
            <Text style={styles.descriptionStyle}>
              Bagikan kode undangan di atas melalui akun media sosial Anda, Ajak teman Anda bergabung
              dan saling berinteraksi di Teman Diabetes.
            </Text>
          </View>
        </View>
        <Button buttonStyle={styles.buttonStyle} onPress={this.chooseToShare}>
          BAGIKAN
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: Style.PADDING,
    backgroundColor: color.white
  },
  navBarContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftButtonBackStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 50
  },
  navBarTitleStyle: {
    fontSize: Style.FONT_SIZE,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    textAlign: 'center',
    color: color.red
  },
  iconStyle: {
    width: 25,
    height: 25
  },
  contentImage: {
    marginTop: Style.PADDING,
    width: Style.CARD_WIDTH,
    height: Style.CARD_HEIGHT
  },
  buttonStyle: {
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
    borderWidth: 0
  },
  titleStyle: {
    fontSize: Style.FONT_SIZE,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: Style.PADDING,
    marginBottom: Style.PADDING
  },
  urlStyle: {
    fontSize: Style.FONT_SIZE,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    textAlign: 'center',
    color: color.red,
    marginBottom: Style.PADDING
  },
  descriptionStyle: {
    fontSize: Style.FONT_SIZE,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'justify',
    marginBottom: Style.PADDING,
    padding: Style.PADDING
  }
});

export default InviteFriends;
