import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Style from '../../../style/defaultStyle';

const DotsInfo = () => (
  <View style={styles.containerStyle}>
    <View style={styles.dotsContainerStyle}>
      {/* 0-69 hipoglikemia */}
      <View style={styles.dotsContentStyle}>
        <View style={[styles.dotsStyle, { backgroundColor: '#FACBCA' }]} />
        <Text style={styles.textStyle}> 0-69 hipoglikemia</Text>
      </View>

      {/* 70 - 139 normal */}
      <View style={styles.dotsContentStyle}>
        <View style={[styles.dotsStyle, { backgroundColor: '#B2DFDB' }]} />
        <Text style={[styles.textStyle, { right: Style.PADDING - 8 }]}>70 - 139 normal</Text>
      </View>
    </View>

    <View style={styles.dotsContainerStyle}>
      {/* 140 - 199 prediabetes */}
      <View style={styles.dotsContentStyle}>
        <View style={[styles.dotsStyle, { backgroundColor: '#FFEFBE' }]} />
        <Text style={styles.textStyle}> 140 - 199 pre-diabetes</Text>
      </View>

      {/* >= 200 diabetes */}
      <View style={styles.dotsContentStyle}>
        <View style={[styles.dotsStyle, { backgroundColor: '#FFACAA' }]} />
        <Text style={[styles.textStyle, { right: Style.PADDING * 2 }]}>>= 200 diabetes</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10.43
  },
  dotsStyle: {
    height: 15,
    width: 15,
    borderRadius: 7.5
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    color: '#556299'
  },
  dotsContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  dotsContentStyle: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default DotsInfo;
