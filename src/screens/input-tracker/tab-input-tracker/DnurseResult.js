import React from 'react';
import { View, Image, Text, NativeModules } from 'react-native';

import color from '../../../style/color';
import { Button } from '../../../components';
import Style from '../../../style/defaultStyle';
import { API_CALL } from '../../../utils/ajaxRequestHelper';
import gif from '../../../assets/images/dnurse-start.gif';
import red from '../../../assets/images/red.png';
import green from '../../../assets/images/green.png';
import yellow from '../../../assets/images/yellow.png';
import placeholder from '../../../assets/images/result_dnurse.png';

const dNurse = NativeModules.DnurseModule;

class DnurseResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bloodSugarLevels: null
    };
  }

  componentDidMount() {
    this.onStart();
  }

  onStart = () => {
    dNurse.openRequest('null').then(res => {
      const bloodSugar = res * 18.018018;
      const calculate = () => {
        if (bloodSugar < 0.5) {
          return Math.floor(bloodSugar);
        }

        if (bloodSugar > 0.51) {
          return Math.ceil(bloodSugar);
        }
      };

      const result = calculate();
      this.setState({ bloodSugarLevels: result });
    });
  };

  onNavigation = () => {
    this.props.navigator.resetTo({
      screen: 'TemanDiabets.TabHistory',
      navigatorStyle: {
        navBarHidden: false
      }
    });
  };

  onHandleClick = async blood => {
    try {
      const option = {
        method: 'POST',
        url: 'api/blood-glucose-tracker',
        data: {
          waktuInput: new Date().toUTCString(),
          gulaDarah: blood
        }
      };

      await API_CALL(option);
    } catch (error) {
      throw error;
    }
  };

  sourceImage = () => {
    const { bloodSugarLevels } = this.state;

    if (bloodSugarLevels === null) {
      return gif;
    } else if (bloodSugarLevels === 0 || bloodSugarLevels <= 69 || bloodSugarLevels > 200) {
      return red;
    } else if (bloodSugarLevels >= 70 || bloodSugarLevels <= 139) {
      return green;
    } else if (bloodSugarLevels >= 140 || bloodSugarLevels <= 199) {
      return yellow;
    }
    return placeholder;
  };

  render() {
    const { bloodSugarLevels } = this.state;

    return (
      <View style={styles.containerStyle}>
        <View style={styles.contentStyle}>
          <Image source={this.sourceImage()} style={styles.imageStyle} />
          <Text style={styles.resultStyle}>
            {bloodSugarLevels === null ? 'start' : bloodSugarLevels}
            {'\n'}
          </Text>
          <Text style={styles.formatStyle}>{bloodSugarLevels === null ? '' : 'mg/dL'}</Text>
        </View>
        <Button
          buttonStyle={styles.buttonStyle}
          textStyle={styles.textButtonStyle}
          onPress={() => this.onHandleClick(this.state.bloodSugarLevels)}
        >
          GUNAKAN
        </Button>
      </View>
    );
  }
}

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
    width: Style.DEVICE_WIDTH / 1.1,
    height: Style.DEVICE_WIDTH / 1.1,
    alignSelf: 'center',
    zIndex: 0
  },
  buttonStyle: {
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0
  },
  textButtonStyle: {
    fontSize: Style.FONT_SIZE_SMALL,
    fontWeight: 'bold'
  },
  resultStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_TITLE * 4.5,
    fontWeight: 'bold',
    color: color.white,
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    padding: 12,
    marginTop: Style.PADDING * 4
  },
  formatStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE * 2,
    fontWeight: 'bold',
    color: color.white,
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: Style.PADDING * 10
  }
};

export default DnurseResult;
