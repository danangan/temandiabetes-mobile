import React, { Component } from 'react';
import { View, Platform, Image, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { result } from 'lodash';

import Style from '../../style/defaultStyle';
import { API_CALL } from '../../utils/ajaxRequestHelper';
import color from '../../style/color';

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

  handleOpenUrl = item => {
    const url = item.includes('https://') || item.includes('http://') ? item : `http://${item}`;
    Linking.openURL(url);
  };

  render() {
    const { data } = this.state;

    return (
      <View>
        <Text style={styles.h1}>Rekomendasi Asuransi</Text>
        <View style={styles.contentStyle}>
          {result(data, 'docs', []).map((item, idx) => (
            <TouchableOpacity
              style={styles.card}
              key={idx}
              onPress={() => this.handleOpenUrl(item.url)}
            >
              <Image source={{ uri: item.imageURL }} style={styles.image} />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subTitle}>{item.description}</Text>
              </View>
              <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={styles.borderLine} />
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}
                >
                  <Image
                    source={require('../../assets/icons/shopping_bag.png')}
                    style={styles.icon}
                    tintColor={color.blue}
                  />
                  <Text style={styles.text}>PESAN SEKARANG</Text>
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
    padding: Style.PADDING,
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
    width: 108.08,
    alignSelf: 'center',
    borderRadius: 55,
    backgroundColor: color.gray1
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
    bottom: 2
  },
  text: {
    fontFamily: Platform.OS === 'android' ? 'Montserrat-Regular' : 'Montserrat',
    fontSize:
      Platform.OS === 'android' ? Style.FONT_SIZE_SMALLER - 2 : Style.FONT_SIZE_SMALLER * 0.7,
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
