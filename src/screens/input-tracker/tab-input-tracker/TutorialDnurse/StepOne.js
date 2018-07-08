import React from 'react';
import { View, Text, Image } from 'react-native';

import color from '../../../../style/color';
import { Button } from '../../../../components';
import Style from '../../../../style/defaultStyle';

const StepOne = props => (
  <View style={styles.containerStyle}>
    <View style={styles.contentStyle}>
      <Image
        source={require('../../../../assets/images/plugin_device.gif')}
        style={styles.imageStyle}
      />
      <View steyl={styles.containerTextStyle}>
        <Text style={styles.titleStyle}>Pasang DNurse</Text>
        <Text style={styles.descriptionStyle}>
          Pasang alat dnurse pada 3.5mm{'\n'}jack headset Anda
        </Text>
      </View>
    </View>
    <Button
      buttonStyle={styles.buttonStyle}
      textStyle={styles.textButtonStyle}
      onPress={() =>
        props.navigator.push({
          screen: 'TemanDiabetes.StepTwo',
          navigatorStyle: { tabBarHidden: true, navBarHidden: true }
        })
      }
    >
      LANGKAH 1
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

export default StepOne;
