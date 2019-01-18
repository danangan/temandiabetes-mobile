import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  RefreshControl
} from 'react-native';
import Config from 'react-native-config';

import { Card, Spinner } from '../../components';
import Style from '../../style/defaultStyle';
import color from '../../style/color';
import { getProductFromGOA, auditTrailPrePurchase, sendActivity } from '../../actions';
import { LOG_VIEW, LOG_ORDER, LOG_GOA_PRODUCT } from '../../utils/constants';
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      refreshing: false,
      searchKeyword: ''
    };
    this.changesKeyword = this.changesKeyword.bind(this);
  }

  componentWillMount() {
    let adjustConfig = new AdjustConfig("k08xj3mdm680", Config.ENV == 'development' ? AdjustConfig.EnvironmentSandbox : AdjustConfig.EnvironmentProduction);
    Adjust.create(adjustConfig);
  }

  componentWillUnmount() {
    Adjust.componentWillUnmount();
  }

  adjustTrack = (token) => {
    let adjustEvent = new AdjustEvent(token);
    Adjust.trackEvent(adjustEvent);
  }

  componentDidMount() {
    this.adjustTrack("m17aqv");
    this.adjustTrack("6foznc");
    this.props.getProductFromGOA();
  }

  onRefresh = () => {
    this.setState({
      refreshing: true
    });

    this.props.getProductFromGOA().then(() =>
      this.setState({
        refreshing: false
      })
    );
  };

  handleOpenUrl = async () => {
    try {
      const supported = await Linking.canOpenURL(this.state.url);
      if (supported) {
        this.props.navigator.dismissLightBox();
        Linking.openURL(this.state.url);
      }
    } catch (error) {
      throw error;
    }
  };

  handleClick = item => {
    sendActivity(LOG_ORDER, item.product_sku, LOG_GOA_PRODUCT);

    this.props.prePurchase(item.product_sku, item.product_name);
    this.handleOpenUrl();
  };

  gotoProductDetail = item => {
    sendActivity(LOG_VIEW, item.product_sku, LOG_GOA_PRODUCT);

    this.props.navigator.push({
      screen: 'TemanDiabetes.ProductDetail',
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: {
        product: item
      },
      animationType: 'none'
    });
  };

  showLightBox = item => {
    this.setState({ url: item.product_dl }, () => {
      this.props.navigator.showLightBox({
        screen: 'TemanDiabetes.LightBox',
        passProps: {
          title: item.product_name,
          content: 'Apakah Anda yakin akan membeli produk ini?',
          product: item,
          prePurchase: this.handleClick
        },
        style: {
          backgroundBlur: 'dark',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          tapBackgroundToDismiss: true
        }
      });
    });
  };

  changesKeyword = async searchKeyword => {
    this.setState({ searchKeyword }, () => {
      // this.props.searchThread(searchKeyword, this.props.threadType);
    });
  };

  formatMoney(n, c, d, t) {
    var c = isNaN((c = Math.abs(c))) ? 2 : c,
      d = d == undefined ? '.' : d,
      t = t == undefined ? ',' : t,
      s = n < 0 ? '-' : '',
      i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
      j = (j = i.length) > 3 ? j % 3 : 0;

    return (
      s +
      (j ? i.substr(0, j) + t : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${t}`) +
      (c
        ? d +
          Math.abs(n - i)
            .toFixed(c)
            .slice(2)
        : '')
    );
  }

  render() {
    const { products, message } = this.props.data;
    if (products === undefined) {
      return (
        <Spinner
          containerStyle={styles.spinnerStyle}
          textStyle={{ color: color.black }}
          color="#1a1a1a"
          text={''}
          size="large"
        />
      );
    }

    return (
      <View style={styles.containerStyle}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
        >
          <View style={styles.contentStyle}>
            {products.map((item, index) => (
              <Card containerStyle={styles.cardStyle} key={index}>
                <TouchableOpacity onPress={() => this.gotoProductDetail(item)}>
                  <Image source={{ uri: item.product_image }} style={styles.imageStyle} />
                  <Text style={styles.priceStyle}>Rp. {this.formatMoney(item.product_price)}</Text>
                  <Text style={styles.productNameStyle}>{item.product_name}</Text>
                </TouchableOpacity>
                <View style={styles.borderLineStyle} />
                <TouchableOpacity
                  onPress={() => this.showLightBox(item)}
                  style={styles.buttonOrderStyle}
                >
                  <View style={styles.orderContainerStyle}>
                    <Image
                      source={require('../../assets/icons/shopping_bag.png')}
                      style={styles.iconOrderStyle}
                      tintColor={color.blue}
                    />
                    <Text style={styles.textOrderStyle}>Pesan Sekarang</Text>
                  </View>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: color.solitude
  },
  wrapTextSearch: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10
  },
  contentStyle: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: Style.PADDING * 3.5
  },
  cardStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: Style.CARD_WIDTH / 2,
    paddingHorizontal: 5,
    paddingVertical: 5,
    margin: 5
  },
  imageStyle: {
    height: 108.26,
    width: 108.08,
    alignSelf: 'center'
  },
  priceStyle: {
    fontFamily: 'Montserrat-Regular',
    ...Platform.select({
      android: {
        fontSize: Style.FONT_SIZE_SMALLER
      },
      ios: {
        fontSize: Style.FONT_SIZE_SMALLER * 0.8
      }
    }),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(37,44,104,1)'
  },
  productNameStyle: {
    fontFamily: 'Montserrat-Regular',
    ...Platform.select({
      android: {
        fontSize: Style.FONT_SIZE_SMALLER
      },
      ios: {
        fontSize: Style.FONT_SIZE_SMALLER * 0.8
      }
    }),
    fontWeight: 'bold',
    lineHeight: 15,
    textAlign: 'center',
    color: 'rgba(55,55,56,1)'
  },
  orderContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 3
  },
  iconOrderStyle: {
    ...Platform.select({
      android: {
        height: 18
      },
      ios: {
        height: 15
      }
    }),
    ...Platform.select({
      android: {
        width: 18
      },
      ios: {
        width: 16
      }
    }),
    bottom: 2
  },
  textOrderStyle: {
    ...Platform.select({
      android: {
        fontFamily: 'Montserrat-Regular'
      },
      ios: {
        fontFamily: 'Montserrat'
      }
    }),
    ...Platform.select({
      android: {
        fontSize: Style.FONT_SIZE_SMALLER - 2
      },
      ios: {
        fontSize: Style.FONT_SIZE_SMALLER * 0.7
      }
    }),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(21,21,21,1)'
  },
  borderLineStyle: {
    borderBottomColor: 'rgba(222,221,221,1)',
    borderBottomWidth: 1,
    width: '100%'
  },
  spinnerStyle: {
    backgroundColor: 'transparent',
    paddingBottom: Style.DEVICE_WIDTH / 2
  },
  buttonOrderStyle: {
    width: '100%',
    height: '15%',
    padding: 10
  }
};

const mapStateToProps = state => ({
  data: state.ecommerceReducer
});

const mapDispatchToProps = dispatch => ({
  getProductFromGOA: () => dispatch(getProductFromGOA()),
  prePurchase: (productSku, productName) => dispatch(auditTrailPrePurchase(productSku, productName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);
