import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import Style from '../../style/defaultStyle';
import { Button } from '../../components';
import color from '../../style/color';

const lightBox = ({ title, content, navigator, product, prePurchase }) => (
  <View style={styles.containerStyle}>
    <View style={{ flex: 8 }}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.contentStyle}>{content}</Text>
    </View>
    <View style={styles.buttonContainerStyle}>
      <Button
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
        onPress={() => prePurchase(product)}
      >
        Beli
      </Button>
      <Button
        buttonStyle={[styles.buttonStyle, { backgroundColor: color.white }]}
				textStyle={[styles.textStyle, { color: color.red }]}
        onPress={() => navigator.dismissLightBox()}
      >
        Tutup
      </Button>
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.3,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_TITLE,
    fontWeight: '700',
    textAlign: 'center'
  },
  contentStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Style.PADDING
  },
  buttonContainerStyle: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonStyle: {
    width: Style.DEVICE_WIDTH / 3.5
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALL,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 5
  }
});

export default lightBox;
