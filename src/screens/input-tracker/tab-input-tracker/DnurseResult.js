import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, NativeModules, PermissionsAndroid } from 'react-native';
import moment from 'moment';

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
    this.requestAudioPermission();
  }

  onNavigation = () => {
    this.props.updateTopTab(2);
    this.props.navigator.resetTo({
      screen: 'TemanDiabetes.AppContainer',
      navigatorStyle: {
        navBarHidden: true
      }
    });
  };

  onHandleClick = async blood => {
    try {
      const option = {
        method: 'POST',
        url: 'api/blood-glucose-tracker',
        data: {
          // using moment and format to normalize utc
          waktuInput: new moment().format('YYYY-MM-DDTHH:mm:ss'),
          gulaDarah: blood
        }
      };

      const {
        data: {
          data: { message }
        }
      } = await API_CALL(option);

      if (message === 'successfully input blood glucose !!') {
        this.onNavigation();
      }
    } catch (error) {
      throw error;
    }
  };

  requestAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'App Audio Permission',
          message: 'App needs access to your Audio.'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // return this.onStart();
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
      }
    } catch (err) {
      console.warn(err);
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
            {bloodSugarLevels === null ? 'mulai' : bloodSugarLevels}
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

const mapDispatchToProps = dispatch => ({
  updateTopTab: activeTab => dispatch({ type: 'UPDATE_ACTIVE_TOP_TAB', payload: activeTab })
});

export default connect(
  null,
  mapDispatchToProps
)(DnurseResult);
