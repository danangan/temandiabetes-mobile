import React from 'react';
import { View, Text, Image } from 'react-native';

import color from '../../../../style/color';
import { Button } from '../../../../components';
import Style from '../../../../style/defaultStyle';

const StepTwo = props => (
  <View style={styles.containerStyle}>
    <View style={styles.contentStyle}>
      <Image
        source={require('../../../../assets/images/plugin_paper.gif')}
        style={styles.imageStyle}
      />
      <View steyl={styles.containerTextStyle}>
        <Text style={styles.titleStyle}>Pasang TestStrip</Text>
        <Text style={styles.descriptionStyle}>
          Pasang test strip pada DNurse,{'\n'}pastikan posisi sesuai
        </Text>
      </View>
    </View>
    <Button
      buttonStyle={styles.buttonStyle}
      textStyle={styles.textButtonStyle}
      onPress={() =>
        props.navigator.push({
          screen: 'TemanDiabetes.StepThree',
          navigatorStyle: { tabBarHidden: true, navBarHidden: true }
        })
      }
    >
      LANGKAH 2
    </Button>
  </View>
);

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: color.white
  },
  contentStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  imageStyle: {
    width: Style.DEVICE_WIDTH,
    height: Style.DEVICE_WIDTH
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_TITLE,
    fontWeight: '500',
    color: 'rgba(0,0,0,1)',
    textAlign: 'left',
    marginLeft: Style.PADDING * 5,
    marginBottom: 20.73
  },
  descriptionStyle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: Style.FONT_SIZE_SMALL,
    color: 'rgba(0,0,0,1)',
    textAlign: 'left',
    alignSelf: 'center'
  },
  buttonStyle: {
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0
  },
  textButtonStyle: {
    fontSize: Style.FONT_SIZE_SMALL,
    fontWeight: 'bold'
  }
};

export default StepTwo;
