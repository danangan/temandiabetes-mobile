import React from 'react';
import { ScrollView, Text, View, Dimensions, Linking, Image } from 'react-native';
import HTMLView from 'react-native-render-html';

import Style from '../../../style/defaultStyle';
import color from '../../../style/color';
import { CardSection } from '../../../components';

const CONTAINER_MAX_WIDTH = (Dimensions.get('window').width * 95) / 100;
const IMAGES_MAX_WIDTH = CONTAINER_MAX_WIDTH - 25;
const CUSTOM_STYLES = {
  p: {
    marginBottom: 10
  },
  iframe: {
    maxWidth: IMAGES_MAX_WIDTH
  }
};
const CUSTOM_CONTAINER_STYLE = {
  maxWidth: CONTAINER_MAX_WIDTH
};

let defaultHeight = 300;

const CUSTOM_RENDERERS = {
  img: attr => (
    <Image
      key={attr.src + attr.alt}
      style={{
        resizeMode: 'contain',
        width: IMAGES_MAX_WIDTH,
        height: defaultHeight
      }}
      onLoad={() => {
        // use onload to fix the image width
        Image.getSize(attr.src, (width, height) => {
          defaultHeight = (IMAGES_MAX_WIDTH / width) * height;
        });
      }}
      source={{
        uri:
          attr.src ||
          'https://firebasestorage.googleapis.com/v0/b/temandiabetes.appspot.com/o/assets%2FplaceholderTD-Android.png?alt=media&token=d26ffbb4-08d5-4890-b6f5-fc8922300a0e'
      }}
    />
  )
};

const DEFAULT_PROPS = {
  tagsStyles: CUSTOM_STYLES,
  renderers: CUSTOM_RENDERERS,
  imagesMaxWidth: IMAGES_MAX_WIDTH,
  staticContentMaxWidth: IMAGES_MAX_WIDTH,
  containerStyle: CUSTOM_CONTAINER_STYLE,
  onLinkPress: (evt, href) => {
    Linking.openURL(href);
  },
  debug: false
};

const ContentFeatured = ({ item }) => (
  <ScrollView style={styles.containerStyle}>
    <CardSection style={styles.cardSectionStyle}>
      <Text style={styles.titleStyle}>{item.topic}</Text>
    </CardSection>
    <View style={styles.borderLine} />
    <CardSection style={styles.cardSectionStyle}>
      <HTMLView {...DEFAULT_PROPS} html={item.description} />
    </CardSection>
  </ScrollView>
);

const styles = {
  containerStyle: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  cardSectionStyle: {
    flex: 1,
    padding: '5%',
    backgroundColor: color.solitude,
    margin: 0
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_TITLE,
    fontStyle: 'normal',
    textAlign: 'justify'
  },
  borderLine: {
    borderBottomColor: color.midGray,
    borderBottomWidth: 2,
    opacity: 0.2,
    width: '100%',
    alignSelf: 'center',
    marginTop: 10
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE * 1.1,
    fontStyle: 'normal',
    padding: 10,
    textAlign: 'justify'
  }
};

export default ContentFeatured;
