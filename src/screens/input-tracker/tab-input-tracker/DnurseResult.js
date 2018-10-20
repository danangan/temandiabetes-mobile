import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Platform,
  Image,
  Text,
  NativeModules,
  PermissionsAndroid,
  Alert,
  ToastAndroid
} from 'react-native';
import moment from 'moment';

import color from '../../../style/color';
import { Button } from '../../../components';
import Style from '../../../style/defaultStyle';
import { API_CALL } from '../../../utils/ajaxRequestHelper';
import gif from '../../../assets/images/dnurse-start.gif';
import red from '../../../assets/images/dnurse_result_red.png';
import pink from '../../../assets/images/dnurse_result_pink.png';
import green from '../../../assets/images/dnurse_result_green.png';
import yellow from '../../../assets/images/dnurse_result_yellow.png';
import placeholder from '../../../assets/images/result_dnurse.png';

const dNurse = NativeModules.DnurseModule;

const VIEW_DNURSE = {
  INPUT_DNURSE: 'INPUT_DNURSE',
  INPUT_TESTSTRIP: 'INPUT_TESTSTRIP',
  DROPS_BLOOD: 'DROPS_BLOOD',
  CALCULATING: 'CALCULATING'
};

class DnurseResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bloodSugarLevels: null,
      statusView: VIEW_DNURSE.INPUT_DNURSE
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
      if (this.state.statusView == VIEW_DNURSE.CALCULATING) {
        if (blood !== 0 && blood !== undefined && blood !== null && blood !== '') {
          this.onNavigation();
        } else {
          Alert.alert(
            'Maaf',
            'Terjadi kegagalan dalam mendapatkan gula darah. Apakah anda ingin mencoba lagi?',
            [
              {
                text: 'Tidak',
                onPress: () => {
                  this.props.updateTopTab(1);
                  this.props.navigator.resetTo({
                    screen: 'TemanDiabetes.AppContainer',
                    navigatorStyle: {
                      navBarHidden: true
                    }
                  });
                }
              },
              {
                text: 'Ya',
                onPress: () => {
                  this.requestAudioPermission();
                  this.setState({ statusView: VIEW_DNURSE.INPUT_DNURSE, bloodSugarLevels: null });
                }
              }
            ],
            { cancelable: false }
          );
        }
      }
    } catch (error) {
      throw error;
    }
  };

  doSaveData = async blood => {
    if (blood !== 0 && blood !== undefined && blood !== null && blood !== '') {
      const option = {
        method: 'POST',
        url: 'api/blood-glucose-tracker',
        data: {
          // using moment and format to normalize utc
          waktuInput: new moment().format('YYYY-MM-DDTHH:mm:ss'),
          gulaDarah: blood,
          tipeInput: 'dnurse'
        }
      };

      const { data } = await API_CALL(option);

      if (data.message === 'successfully input blood glucose !!') {
        ToastAndroid.show('Pengecekan gula darah berhasil', ToastAndroid.SHORT);
      }
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
      if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === true) {
        this.doExecuteDnurse('wakeup');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  doExecuteDnurse = type => {
    dNurse.openRequest(type).then(res => {
      this.doExecuteDnurse('null');

      if (
        res == VIEW_DNURSE.INPUT_DNURSE ||
        res == VIEW_DNURSE.INPUT_TESTSTRIP ||
        res == VIEW_DNURSE.DROPS_BLOOD ||
        res == VIEW_DNURSE.CALCULATING
      ) {
        this.setState({ statusView: res, bloodSugarLevels: null });
      } else if (!isNaN(res)) {
        const bloodSugar = res * 18.018018;
        const calculate = () => {
          if (bloodSugar < 0.5) {
            return Math.floor(bloodSugar);
          }
          return Math.ceil(bloodSugar);
        };
        const result = calculate();
        this.doSaveData(result);
        this.setState({ bloodSugarLevels: result, statusView: VIEW_DNURSE.CALCULATING });
      } else {
        this.setState({ statusView: VIEW_DNURSE.INPUT_DNURSE, bloodSugarLevels: null });
      }
    });
  };

  sourceImage = () => {
    const { bloodSugarLevels } = this.state;

    switch (true) {
      case bloodSugarLevels === null:
        return gif;
      case bloodSugarLevels <= 69:
        return pink;
      case bloodSugarLevels > 69 && bloodSugarLevels <= 139:
        return green;
      case bloodSugarLevels > 139 && bloodSugarLevels <= 199:
        return yellow;
      case bloodSugarLevels > 199:
        return red;
      default:
        return placeholder;
    }
  };

  switchView = () => {
    if (this.state.statusView == VIEW_DNURSE.INPUT_TESTSTRIP) {
      return (
        <View style={styles.contentStyle}>
          <Image
            source={require('../../../assets/images/plugin_paper.gif')}
            style={styles.imageStyleStep}
          />
          <View steyl={styles.containerTextStyle}>
            <Text style={styles.titleStyle}>Pasang TestStrip</Text>
            <Text style={styles.descriptionStyle}>
              Pasang test strip pada DNurse,
              {'\n'}
              pastikan posisi sesuai instruksi.
            </Text>
          </View>
        </View>
      );
    } else if (this.state.statusView == VIEW_DNURSE.DROPS_BLOOD) {
      return (
        <View style={styles.contentStyle}>
          <Image
            source={require('../../../assets/images/drop_blood.gif')}
            style={styles.imageStyle}
          />
          <View steyl={styles.containerTextStyle}>
            <Text style={styles.titleStyle}>Tetes Darah</Text>
            <Text style={styles.descriptionStyle}>
              Tusuk jari Anda menggunakan
              {'\n'}
              alat yang telah disediakan dan
              {'\n'}
              teteskan pada test strip
            </Text>
          </View>
        </View>
      );
    } else if (this.state.statusView == VIEW_DNURSE.CALCULATING) {
      const { bloodSugarLevels } = this.state;

      if (bloodSugarLevels != null) {
        return (
          <View style={styles.contentStyle}>
            <Image source={this.sourceImage()} style={styles.imageStyle} />
            <Text style={styles.resultStyle}>
              {bloodSugarLevels === null ? 'tunggu' : bloodSugarLevels}
              {'\n'}
            </Text>
            <Text style={styles.formatStyle}>{bloodSugarLevels === null ? '' : 'mg/dL'}</Text>
          </View>
        );
      }
      return (
        <View style={styles.contentStyle}>
          <Image source={this.sourceImage()} style={styles.imageStyle} />
          <Text style={styles.resultEmptyStyle}>
            {'\n'}
            {'Harap'}
            {'\n'}
            {'Menunggu'}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.contentStyle}>
        <Image
          source={require('../../../assets/images/plugin_device.gif')}
          style={styles.imageStyleStep}
        />
        <View steyl={styles.containerTextStyle}>
          <Text style={styles.titleStyle}>Pasang DNurse</Text>
          <Text style={styles.descriptionStyle}>
            Pasang alat Dnurse pada 3.5mm
            {'\n'}
            jack headset Anda
          </Text>
        </View>
      </View>
    );
  };

  switchButton = () => {
    if (this.state.statusView == VIEW_DNURSE.INPUT_TESTSTRIP) {
      return (
        <View style={[styles.viewBottom, styles.buttonStyle]}>
          <Text style={[styles.textBottom, styles.textButtonStyle]}>LANGKAH 2</Text>
        </View>
      );
    } else if (this.state.statusView == VIEW_DNURSE.DROPS_BLOOD) {
      return (
        <View style={[styles.viewBottom, styles.buttonStyle]}>
          <Text style={[styles.textBottom, styles.textButtonStyle]}>LANGKAH 3</Text>
        </View>
      );
    } else if (this.state.statusView == VIEW_DNURSE.CALCULATING) {
      if (this.state.bloodSugarLevels != null) {
        return (
          <Button
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textButtonStyle}
            onPress={() => this.onHandleClick(this.state.bloodSugarLevels)}
          >
            SELESAI
          </Button>
        );
      }
      return (
        <View style={[styles.viewBottom, styles.buttonStyle]}>
          <Text style={[styles.textBottom, styles.textButtonStyle]}>SEDANG MEMPROSES</Text>
        </View>
      );
    }
    return (
      <View style={[styles.viewBottom, styles.buttonStyle]}>
        <Text style={[styles.textBottom, styles.textButtonStyle]}>LANGKAH 1</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        {this.switchView()}
        {this.switchButton()}
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
  resultEmptyStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_TITLE * 2,
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
  },
  imageStyleStep: {
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
    fontFamily: Platform.OS === 'android' ? 'OpenSans-Regular' : 'OpenSans',
    fontSize: Style.FONT_SIZE_SMALL,
    color: 'rgba(0,0,0,1)',
    textAlign: 'left',
    alignSelf: 'center'
  },
  viewBottom: {
    alignSelf: 'stretch',
    backgroundColor: color.red,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.red,
    marginLeft: 5,
    marginRight: 5
  },
  textBottom: {
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular',
    color: color.white,
    fontSize: Style.FONT_SIZE_TITLE,
    paddingTop: 10,
    paddingBottom: 10
  }
};

const mapDispatchToProps = dispatch => ({
  updateTopTab: activeTab => dispatch({ type: 'UPDATE_ACTIVE_TOP_TAB', payload: activeTab })
});

export default connect(
  null,
  mapDispatchToProps
)(DnurseResult);
