import React, { Component } from 'react';
import {
  View,
  Text,
  Linking,
  Dimensions,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import HTMLView from 'react-native-render-html';
import Style from '../../style/defaultStyle';
import color from '../../style/color';
import RecommendationInsurance from './recommendationInsurance';

const CONTAINER_MAX_WIDTH = (Dimensions.get('window').width * 95) / 100;
const IMAGES_MAX_WIDTH = CONTAINER_MAX_WIDTH - 65;
const CUSTOM_STYLES = {
  p: {
    marginBottom: 10
  },
  iframe: {
    maxWidth: IMAGES_MAX_WIDTH
  },
  h1: {
    marginTop: 0,
    marginBottom: 10
  },
  h2: {
    marginTop: 0,
    marginBottom: 10
  },
  h3: {
    marginTop: 0,
    marginBottom: 10
  },
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
        resizeMode: 'cover',
        width: '100%',
        marginBottom: 10,
        height: Style.DEVICE_WIDTH / 2
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
  ),
  br: () => null
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
    const { title, description } = this.props;

    return (
      <View style={styles.containerStyle}>
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={styles.backButtonStyle}
            onPress={() => this.props.navigator.pop()}
          >
            <Image
              resizeMode={'contain'}
              style={styles.imageStyle}
              tintColor={color.red}
              source={require('../../assets/icons/close.png')}
            />
          </TouchableOpacity>
          <View style={styles.titleContainerStyle}>
            <Text style={styles.navTitle}>{`Catalog ${title}`}</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.card}>
            <HTMLView {...DEFAULT_PROPS} html={description} />
          </View>
          <RecommendationInsurance />
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
  },
  card: {
    padding: Style.PADDING,
    marginTop: Style.PADDING,
    backgroundColor: '#fff',
    borderRadius: 10,
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2.5
      }
    })
  },
  navContainer: {
    padding: Style.PADDING,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF'
  },
  backButtonStyle: {
    paddingLeft: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  imageStyle: {
    width: 25,
    height: 25,
    tintColor: color.red
  },
  titleContainerStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  navTitle: {
    flex: 1,
    fontSize: Style.FONT_SIZE,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    alignSelf: 'center',
    paddingRight: 25,
    color: color.red
  }
};
