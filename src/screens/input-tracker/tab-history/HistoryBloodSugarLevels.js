import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Platform, ScrollView, TouchableOpacity } from 'react-native';

import DotsInfo from './DotsInfo';
import Style from '../../../style/defaultStyle';
import { Card } from '../../../components';
import color from '../../../style/color';

const LineHorizontal = ({ item }) => (
  <View
    style={{
      flex: 1,
      borderBottomColor: color.solitude,
      borderBottomWidth: 1,
      marginLeft: item === 0 ? 20 : item === 70 ? 13 : 5,
      marginBottom: Style.PADDING - 14.5
    }}
  />
);

const LineVertical = () => (
  <View
    style={{
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: Style.CARD_HEIGHT - 35,
      borderLeftColor: color.solitude,
      borderLeftWidth: 1
    }}
  />
);

const Dots = ({ dotsStyle, onPress }) => (
  <Text style={[styles.dotsStyle, dotsStyle]} onPress={onPress} />
);

class HistoryBloodSugarLevels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      x: 0,
      y: 0,
      data: null
    };
  }

  toolTip() {
    const { data } = this.state;
    if (this.state.isActive) {
      return (
        <View
          style={[
            styles.toolTipContainerStyle,
            {
              top: this.state.x,
              left: this.state.y
            }
          ]}
        >
          <Text style={styles.textToolTipStyle}>{data === null ? '00:00' : data.waktuInput}</Text>
          <Text style={[styles.textToolTipStyle, { color: color.red }]}>
            {data === null ? 0 : data.gulaDarah}mg/dL
          </Text>
          <Text style={styles.textToolTipStyle}>{data === null ? '-' : data.level}</Text>
        </View>
      );
    }
    return null;
  }

  showToolTip = item => {
    this.setState({
      isActive: true,
      x: -Style.CARD_WIDTH / 14,
      y: Style.CARD_WIDTH / 6,
      data: item
    });
  };

  dotColor(gulaDarah) {
    switch (true) {
      case gulaDarah >= 200:
        return '#FACBCA';
      case gulaDarah >= 140 && gulaDarah < 200:
        return '#FFEFBE';
      case gulaDarah >= 70 && gulaDarah < 140:
        return '#B2DFDB';
      case gulaDarah < 70:
        return '#FFACAA';
      default:
        break;
    }
  }

  dotTop(gulaDarah) {
    switch (true) {
      case gulaDarah >= 400:
        return 31 - (38 * (gulaDarah - 400)) / 200;
      case gulaDarah >= 200 && gulaDarah < 400:
        return 69 - (38 * (gulaDarah - 200)) / 200;
      case gulaDarah >= 140 && gulaDarah < 200:
        return 107 - (38 * (gulaDarah - 140)) / 60;
      case gulaDarah >= 70 && gulaDarah < 140:
        return 145 - (38 * (gulaDarah - 70)) / 70;
      case gulaDarah < 70:
        return 183 - (38 * gulaDarah) / 70;
      default:
        break;
    }
  }

  render() {
    const data = this.props.history.bloodSugar;
    const ranges = [600, 400, 200, 140, 70, 0];
    const bloodSugar = data === undefined ? [] : data;

    return (
      <View style={styles.containerStyle}>
        <Text style={styles.titleStyle}>Kadar Gula Darah</Text>
        <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ isActive: false })}>
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.corYContainerStyle}>
              {ranges.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.textCorYStyle}>{item}</Text>
                  <LineHorizontal item={item} />
                </View>
              ))}
            </View>
            <View style={styles.corXContainerStyle}>
              {this.toolTip()}
              <ScrollView horizontal>
                {bloodSugar.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      marginLeft: 15
                    }}
                  >
                    <LineVertical />
                    <Dots
                      dotsStyle={{
                        backgroundColor: this.dotColor(item.gulaDarah),
                        top: this.dotTop(item.gulaDarah)
                      }}
                      onPress={() => this.showToolTip(item)}
                    />
                    <Text style={styles.textCorXStyle}>{item.date}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </Card>
        </TouchableOpacity>
        <View style={styles.infoDotsContainerStyle}>
          <DotsInfo />
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  infoDotsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  titleStyle: {
    fontFamily: 'Montserrat',
    fontSize: Style.FONT_SIZE,
    fontWeight: '900',
    marginBottom: 5.94,
    color: '#252C68'
  },
  cardStyle: {
    paddingLeft: 9.37,
    paddingRight: 9,
    paddingBottom: 20.37,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginLeft: 0,
    marginRight: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
      },
      android: {
        elevation: 0.05
      }
    })
  },
  corYContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textCorYStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    color: '#556299',
    marginTop: Style.PADDING
  },
  corXContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    marginLeft: 73,
    marginTop: 32
  },
  textCorXStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    color: '#556299',
    marginTop: Style.PADDING - 15,
    marginRight: Style.PADDING,
    right: Style.PADDING - 4
  },
  dotsStyle: {
    position: 'absolute',
    left: -7,
    height: 15,
    width: 15,
    borderRadius: 7.5
  },
  toolTipContainerStyle: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    position: 'absolute',
    height: 50,
    backgroundColor: color.white,
    zIndex: 999,
    borderWidth: 1,
    borderColor: color.solitude,
    elevation: 0.25,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  textToolTipStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER - 2,
    color: '#556299'
  }
};

const mapStateToProps = state => ({
  history: state.historyEstimationReducer
});

export default connect(
  mapStateToProps,
  null
)(HistoryBloodSugarLevels);
