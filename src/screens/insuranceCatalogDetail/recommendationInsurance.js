import React, { Component } from 'react';
import { View, Platform, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { result, filter } from 'lodash';
import Style from '../../style/defaultStyle';
import { API_CALL } from '../../utils/ajaxRequestHelper';
import color from '../../style/color';
import { sendActivity } from '../../actions';
import { LOG_VIEW, LOG_INSURANCE_PRODUCT } from '../../utils/constants';

export default class RecommendationInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  async componentDidMount() {
    const option = {
      method: 'get',
      url: '/api/insurance-recommendation/mobile/list?sort[title]=desc&limit=1000'
    };

    try {
      const {
        data: { data: docs }
      } = await API_CALL(option);

      this.setState({
        data: docs
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleOpenUrl = (item) => {
    this.logActivity(item._id);

    const url = item.url.includes('https://') || item.url.includes('http://') ? item.url : `http://${item.url}`;
    Linking.openURL(url);
  };

  logActivity = async (contentId) =>{
    sendActivity(LOG_VIEW, contentId, LOG_INSURANCE_PRODUCT);
  }

  render() {
    const { data } = this.state;

    // return nothing if empty
    const renderedData = filter(
      result(data, 'docs', []),
      item => item.insuranceId === this.props.insuranceId
    );

    if (renderedData.length === 0) {
      return null;
    }
    
    return (
      <View>
        <Text style={styles.h1}>Rekomendasi Asuransi</Text>
        <View style={styles.contentStyle}>
          {renderedData.map((item, idx) => (
            <TouchableOpacity
              style={styles.card}
              key={idx}
              onPress={() => this.handleOpenUrl(item)}
            >
              <Image source={{ uri: item.imageURL }} style={styles.image} resizeMode="contain" />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subTitle}>{item.description}</Text>
              </View>
              <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={styles.borderLine} />
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                  <Image
                    source={require('../../assets/icons/shopping_bag.png')}
                    style={styles.icon}
                    tintColor={color.blue}
                  />
                  <Text style={styles.text}>DAPATKAN</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const styles = {
  contentStyle: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  card: {
    paddingTop: Style.PADDING,
    paddingBottom: Style.PADDING,
    backgroundColor: '#fff',
    marginTop: 10,
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2.5
      }
    }),
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: Style.CARD_WIDTH / 1.35,
    width: Style.CARD_WIDTH / 2.1,
    margin: 5
  },
  image: {
    height: 108.26,
    width: Style.CARD_WIDTH / 2.1,
    alignSelf: 'center'
  },
  h1: {
    fontFamily: 'Montserrat',
    fontSize: Style.FONT_SIZE,
    marginLeft: 5,
    marginTop: 25
  },
  borderLine: {
    borderBottomColor: 'rgba(222,221,221,1)',
    borderBottomWidth: 1,
    width: '100%'
  },
  icon: {
    height: Platform.OS === 'android' ? 18 : 15,
    width: Platform.OS === 'android' ? 18 : 15,
    bottom: 2,
    marginRight: 22
  },
  text: {
    ...Platform.select({
      ios: {
        fontFamily: 'Montserrat'
      },
      android: {
        fontFamily: 'Montserrat-Regular'
      }
    }),
    ...Platform.select({
      ios: {
        fontSize: Style.FONT_SIZE_SMALLER * 0.7
      },
      android: {
        fontSize: Style.FONT_SIZE_SMALLER - 2
      }
    }),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(21,21,21,1)'
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: Style.FONT_SIZE_SMALL,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subTitle: {
    fontFamily: 'Montserrat',
    fontSize: Style.FONT_SIZE_SMALLER - 2,
    textAlign: 'center',
    color: '#afafaf'
  }
};
