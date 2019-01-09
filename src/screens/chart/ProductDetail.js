import React from 'react';
import { Platform, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import { Card } from '../../components';
import color from '../../style/color';
import Style from '../../style/defaultStyle';

const ProductDetail = ({ product, navigator }) => (
  <View style={styles.containerStyle}>
    <ScrollView>
      <Card containerStyle={styles.cardStyle}>
        <TouchableOpacity
          onPress={() => navigator.pop({ animationType: 'none' })}
          style={styles.buttonCloseStyle}
        >
          <Image
            source={require('../../assets/icons/close.png')}
            style={styles.iconCloseStyle}
            tintColor={color.red}
          />
          <Text style={styles.textCloseStyle}>Close</Text>
        </TouchableOpacity>
        <View style={styles.contentStyle}>
          <View onPress={() => null} style={styles.descriptionContainerStyle}>
            <Text style={styles.titleTabStyle}>DESKRIPSI PRODUK</Text>
            <Text style={styles.indicatorStyle} />
          </View>
          <Image source={{ uri: product.product_image }} style={styles.imageStyle} />
        </View>
        <View style={{ flexDirection: 'column', margin: 8.5 }}>
          {product.product_description.map((item, index) => (
            <View style={styles.tableStyle} key={index}>
              <View style={styles.labelContainerStyle}>
                <Text style={styles.labelStyle}>{item.lable}</Text>
              </View>
              <View style={{ borderLeftWidth: 1, borderColor: color.solid }} />
              <View style={styles.valueContainerStyle}>
                <Text style={styles.valueStyle}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.footerStyle}>
          <Text style={styles.poweredStyle}>powered by</Text>
          <Image style={styles.iconGoaStyle} source={require('../../assets/icons/goapotik.jpg')} />
        </View>
      </Card>
    </ScrollView>
  </View>
);

const styles = {
  containerStyle: {
    flex: 1,
    padding: Style.PADDING - 10,
    paddingBottom: Style.PADDING,
    backgroundColor: color.white
  },
  contentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  imageStyle: {
    height: Style.CARD_WIDTH / 2,
    width: Style.CARD_WIDTH / 1.5,
    alignSelf: 'center'
  },
  buttonCloseStyle: {
    position: 'absolute',
    zIndex: 1,
    margin: 5
  },
  iconCloseStyle: {
    height: 20,
    width: 20
  },
  textCloseStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    color: color.red
  },
  textStyle: {
    fontFamily: Platform.OS === 'android' ? 'OpenSans-Regular' : 'OpenSans',
    fontSize: Style.FONT_SIZE_SMALL,
    textAlign: 'justify',
    marginLeft: Style.PADDING
  },
  indicatorStyle: {
    width: '7%',
    borderBottomWidth: 4,
    borderBottomColor: color.red,
    alignSelf: 'center'
  },
  titleTabStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    fontWeight: 'bold',
    lineHeight: 15,
    textAlign: 'center',
    color: color.red
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE - 1.1
  },
  descriptionContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: Style.PADDING - 6
  },
  cardStyle: {
    zIndex: 0,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  tableStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 0.2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopColor: color.solid,
    borderBottomColor: color.solid,
    borderLeftColor: color.solid,
    borderRightColor: color.solid,
    padding: 5
  },
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 8.5
  },
  poweredStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: '500',
    lineHeight: 10,
    color: color.red
  },
  iconGoaStyle: {
    height: 19,
    width: 66,
    bottom: 5
  },
  labelStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: 'bold'
  },
  valueStyle: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    flexWrap: 'wrap'
  },
  valueContainerStyle: {
    flexDirection: 'column',
    flex: 2,
    paddingLeft: 5
  },
  labelContainerStyle: {
    width: Style.DEVICE_WIDTH / 3.5,
    flexWrap: 'wrap'
  }
};

export default ProductDetail;
