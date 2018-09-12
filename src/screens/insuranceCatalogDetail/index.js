import React, { Component } from 'react';
import { View, Text, Linking, Dimensions, Platform, ScrollView, Image } from 'react-native';
import HTMLView from 'react-native-render-html';
import { NavigationBar } from '../../components';
import Style from '../../style/defaultStyle';
import color from '../../style/color';

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

export default class InsuranceCatalogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, subTitle, imageURL, description } = this.props;

    return (
      <View style={styles.containerStyle}>
        <NavigationBar onPress={() => this.props.navigator.pop()} title="Data Asuransi" />
        <View style={styles.contentWrapper}>
          <Text style={styles.titleStyle}>{title}</Text>
          <Text style={styles.subTitleStyle}>{subTitle}</Text>
          <View style={styles.underLine} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <HTMLView {...DEFAULT_PROPS} html={description} />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: color.solitude,
    paddingTop: Platform.OS === 'ios' ? 15 : 0
  },
  contentWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  scrollView: {
    paddingHorizontal: 15
  },
  titleStyle: {
    fontFamily: Platform.OS === 'android' ? 'Montserrat-Regular' : 'MontSerrat',
    fontSize: Style.FONT_SIZE_TITLE / 1.2,
    marginBottom: 5
  },
  subTitleStyle: {
    fontFamily: Platform.OS === 'android' ? 'Montserrat-Regular' : 'MontSerrat-Light',
    fontSize: Style.FONT_SIZE_SMALL / 1.2,
    marginBottom: 5
  },
  underLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#a1a1a1',
    marginBottom: 10
  }
};
