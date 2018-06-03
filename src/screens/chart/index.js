import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  RefreshControl
} from 'react-native';
import { Card, Spinner } from '../../components';
import Style from '../../style/defaultStyle';
import color from '../../style/color';
import { getProductFromGOA, auditTrailPrePurchase } from '../../actions';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      refreshing: false
    };
  }

  componentDidMount() {
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
    this.props.prePurchase(item.product_sku, item.product_name);
    this.handleOpenUrl();
  };

  ShowModal = item => {
    this.props.navigator.showModal({
      screen: 'TemanDiabets.ProductDetail',
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
        screen: 'TemanDiabets.LightBox',
        passProps: {
          title: item.product_name,
          content: 'Apakah Anda yakin akan membeli item ini?',
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

  render() {
    const { products } = this.props.data;
    if (products === undefined) {
      return (
        <Spinner
          containerStyle={styles.spinnerStyle}
          textStyle={{ color: color.black }}
          color="#FFDE00"
          text={'Loading...'}
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
                <TouchableOpacity onPress={() => this.ShowModal(item)}>
                  <Image source={{ uri: item.product_image }} style={styles.imageStyle} />
                  <Text style={styles.priceStyle}>Rp. {item.product_price}</Text>
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
                    <Text style={styles.textOrderStyle}>PESAN SEKARANG</Text>
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
  contentStyle: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cardStyle: {
    height: Style.CARD_WIDTH / 1.35,
    width: Style.CARD_WIDTH / 2,
    padding: Style.PADDING,
    margin: 5
  },
  imageStyle: {
    height: 108.26,
    width: 108.08,
    alignSelf: 'center'
  },
  priceStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(37,44,104,1)'
  },
  productNameStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALL - 2,
    fontWeight: 'bold',
    lineHeight: 15,
    textAlign: 'center',
    color: 'rgba(55,55,56,1)'
  },
  orderContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  iconOrderStyle: {
    height: 18,
    width: 18,
    bottom: 2
  },
  textOrderStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER - 2,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(21,21,21,1)'
  },
  borderLineStyle: {
    borderBottomColor: 'rgba(222,221,221,1)',
    borderBottomWidth: 1,
    width: Style.CARD_WIDTH,
    marginLeft: -30,
    marginTop: 23.2,
    marginBottom: 5
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
