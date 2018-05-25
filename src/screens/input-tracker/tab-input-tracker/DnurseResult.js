import React from 'react';
import { View, Image, Text, NativeModules } from 'react-native';

import color from '../../../style/color';
import { Button } from '../../../components';
import Style from '../../../style/defaultStyle';
import { API_CALL } from '../../../utils/ajaxRequestHelper';

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
    dNurse.openRequest('null').then(result => this.setState({ bloodSugarLevels: result }));
  };

  onNavigation = () => {
    this.props.navigator.resetTo({
      screen: 'TemanDiabets.TabHistory',
      title: 'Teman Diabetes',
      navigatorStyle: {
        topBarCollapseOnScroll: true,
        navBarHideOnScroll: true,
        navBarHidden: false,
        topTabsScrollable: true
      },
      navigatorButtons: {
        rightButtons: [
          {
            icon: require('../../../assets/icons/notification.png'),
            id: 'notification'
          }
        ],
        leftButtons: [
          {
            icon: require('../../../assets/icons/menu.png'),
            id: 'sideMenu'
          }
        ]
      },
      topTabs: [
        {
          screenId: 'TemanDiabets.TabInputTracker',
          title: 'MASUKAN PELACAK'
        },
        {
          screenId: 'TemanDiabets.TabHistory',
          title: 'RIWAYAT DAN ESTIMASI'
        }
      ]
    });
  };

  onHandleClick = async blood => {
    try {
      const option = {
        method: 'POST',
        url: 'api/blood-glucose-tracker',
        data: {
          waktuInput: new Date(),
          gulaDarah: blood
        }
      };

      await API_CALL(option);
      this.onNavigation();
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { bloodSugarLevels } = this.state;
    const bloodSugar = this.state.bloodSugarLevels * 18.018018;
    const result = () => {
      if (bloodSugar < 0.5) {
        return Math.floor(bloodSugar);
      }

      if (bloodSugar > 0.51) {
        return Math.ceil(bloodSugar);
      }
    };

    return (
      <View style={styles.containerStyle}>
        <View style={styles.contentStyle}>
          <Image
            source={
              bloodSugarLevels === null
                ? require('../../../assets/images/dnurse-start.gif')
                : bloodSugarLevels === 0 || bloodSugarLevels <= 70 || bloodSugarLevels > 200
                  ? require('../../../assets/images/red.png')
                  : bloodSugarLevels > 71 || bloodSugarLevels <= 140
                    ? require('../../../assets/images/green.png')
                    : bloodSugarLevels >= 141 || bloodSugarLevels <= 199
                      ? require('../../../assets/images/yellow.png')
                      : require('../../../assets/images/result_dnurse.png')
            }
            style={styles.imageStyle}
          />
          <Text style={styles.resultStyle}>
            {this.state.bloodSugarLevels === null ? 'start' : result()}
            {'\n'}
          </Text>
          <Text style={styles.formatStyle}>
            {this.state.bloodSugarLevels === null ? '' : 'mg/dL'}
          </Text>
        </View>
        <Button
          buttonStyle={styles.buttonStyle}
          textStyle={styles.textButtonStyle}
          onPress={() => this.onHandleClick(result())}
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
