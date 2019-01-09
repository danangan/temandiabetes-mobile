import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  RefreshControl
} from 'react-native';

import HistoryBloodSugarLevels from './HistoryBloodSugarLevels';
import HistoryInputTracker from './HistoryInputTracker';
import HistoryFoods from './HistoryFoods';
import color from '../../../style/color';
import Style from '../../../style/defaultStyle';
import { Card } from '../../../components';
import {
  getHistoryHba1c,
  getHistoryActivity,
  getHistoryBloodPressure,
  getHistoryWeight,
  getHistoryFoods,
  getHistoryBloodSugarLevels,
  resetStateHistory
} from '../../../actions';

class TabHistoryEstimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentDidMount() {
    this.setState({ refreshing: true }, () => this.getMakeRequest());
  }

  componentDidUpdate() {
    const { status, isFood } = this.props.historyEstimation;
    const { refreshing } = this.state;
    if (status === 200 && refreshing && isFood) {
      this.setState({ refreshing: false }, () => this.props.resetState());
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.props.resetHistoryBloodSugar();
      this.getMakeRequest();
    });
  };

  getMakeRequest = () => {
    try {
      Promise.all([
        this.props.getHistoryBloodSugarLevels(),
        this.props.getHistoryHba1c(),
        this.props.getHistoryActivity(),
        this.props.getHistoryBloodPressure(),
        this.props.getHistoryWeight(),
        this.props.getHistoryFoods()
      ]);
    } catch (error) {
      throw error;
    }
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
        }
      >
        <View style={styles.containerStyle}>
          <HistoryBloodSugarLevels />
          <HistoryInputTracker />
          <HistoryFoods />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              this.props.navigator.push({
                screen: 'TemanDiabetes.DrugReminder',
                navigatorStyle: {
                  navBarHidden: true
                }
              });
            }}
          >
            <View style={{ alignSelf: 'center', right: 20 }}>
              <Card containerStyle={styles.cardTitleStyle}>
                <Text style={styles.titleStyle}>PENGINGAT OBAT</Text>
              </Card>
            </View>
            <Card containerStyle={styles.cardIconStyle}>
              <Image
                source={require('../../../assets/icons/pills_reminder.png')}
                style={styles.iconStyle}
              />
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: color.solitude,
    padding: Style.PADDING
  },
  cardTitleStyle: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingTop: 10.31,
    paddingBottom: 10.31,
    paddingLeft: 20.72,
    paddingRight: 15.83,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
      },
      android: {
        elevation: 3.5
      }
    })
  },
  cardIconStyle: {
    position: 'absolute',
    borderRadius: 50,
    marginLeft: Style.DEVICE_WIDTH / 2 + 11,
    marginRight: 0,
    marginTop: 0,
    bottom: 2,
    padding: Style.PADDING / 2,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
      },
      android: {
        elevation: 3.5
      }
    })
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER - 1.5,
    fontWeight: '900',
    color: '#556299'
  },
  iconStyle: {
    width: 37,
    height: 36
  },
  buttonStyle: {
    height: 56,
    paddingTop: 10,
    marginBottom: 30
  }
};

const mapStateToProps = state => ({
  historyEstimation: state.historyEstimationReducer
});

const mapDispatchToProps = dispatch => ({
  getHistoryHba1c: () => dispatch(getHistoryHba1c()),
  getHistoryActivity: () => dispatch(getHistoryActivity()),
  getHistoryBloodPressure: () => dispatch(getHistoryBloodPressure()),
  getHistoryWeight: () => dispatch(getHistoryWeight()),
  getHistoryFoods: () => dispatch(getHistoryFoods()),
  getHistoryBloodSugarLevels: () => dispatch(getHistoryBloodSugarLevels()),
  resetHistoryBloodSugar: () => dispatch({ type: 'RESET_GRAPH' }),
  resetState: () => dispatch(resetStateHistory())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabHistoryEstimation);
