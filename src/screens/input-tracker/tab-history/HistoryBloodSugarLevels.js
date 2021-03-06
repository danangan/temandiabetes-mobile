import React from 'react';
import { connect } from 'react-redux';
import { result } from 'lodash';
import {
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import DotsInfo from './DotsInfo';
import Style from '../../../style/defaultStyle';
import color from '../../../style/color';
import { formatTimeFromDate } from '../../../utils/helpers';

const ranges = [600, 400, 200, 140, 70, 0];
const graphContainerPadding = 10;
const graphContainerHeight = Style.DEVICE_HEIGHT / 2.5;
const graphHeight = graphContainerHeight - 4 * graphContainerPadding - ranges.length * 2;
const yItemHeight = graphHeight / (ranges.length - 1);

const LineHorizontal = props => (
  <View
    style={{
      width: '100%',
      borderBottomColor: color.solitude,
      borderBottomWidth: 1,
      top: 9 + (props.lineNumber - 1) * yItemHeight,
      position: 'absolute'
    }}
  />
);

const LineVertical = () => (
  <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      borderLeftColor: color.solitude,
      borderLeftWidth: 1,
      marginTop: 10,
      marginBottom: 5
    }}
  />
);

class Dots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showToolTip: false
    };
  }

  render() {
    const { dotsStyle, item } = this.props;
    const { showToolTip } = this.state;
    return (
      <View style={[styles.dotContainer, { top: dotsStyle.top }]}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (this.state.showToolTip) {
              this.setState({ showToolTip: !this.state.showToolTip });
            }
          }}
        >
          <View
            style={[
              styles.toolTipContainerStyle,
              {
                opacity: showToolTip ? 1 : 0
              },
              result(item, 'nilai', 0) >= 400
                ? {
                    top: 20
                  }
                : {}
            ]}
          >
            <Text style={styles.textToolTipStyle}>
              {formatTimeFromDate(result(item, 'waktuInput'), ':', { isUTC: true })}
            </Text>
            <Text style={[styles.textToolTipStyle, { color: color.red }]}>
              {result(item, 'nilai', 0)}
              mg/dL
            </Text>
            <Text style={styles.textToolTipStyle}>{result(item, 'level')}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={() => {
            this.setState({ showToolTip: !this.state.showToolTip });
          }}
        >
          <View style={styles.dotsWrapper}>
            <View style={[styles.dotsStyle, { backgroundColor: dotsStyle.backgroundColor }]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

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

  dotColor(gulaDarah) {
    switch (true) {
      case gulaDarah >= 200:
        return '#FFACAA';
      case gulaDarah >= 140 && gulaDarah < 200:
        return '#FFEFBE';
      case gulaDarah >= 70 && gulaDarah < 140:
        return '#B2DFDB';
      case gulaDarah < 70:
        return '#FACBCA';
      default:
        break;
    }
  }

  dotTop(gulaDarah) {
    switch (true) {
      case gulaDarah >= 400:
        return yItemHeight - (yItemHeight * (gulaDarah - 400)) / 200;
      case gulaDarah >= 200 && gulaDarah < 400:
        return yItemHeight * 2 - (yItemHeight * (gulaDarah - 200)) / 200;
      case gulaDarah >= 140 && gulaDarah < 200:
        return yItemHeight * 3 - (yItemHeight * (gulaDarah - 140)) / 60;
      case gulaDarah >= 70 && gulaDarah < 140:
        return yItemHeight * 4 - (yItemHeight * (gulaDarah - 70)) / 70;
      case gulaDarah < 70:
        return yItemHeight * 5 - (yItemHeight * gulaDarah) / 70;
      default:
        break;
    }
  }

  render() {
    const data = this.props.history.bloodSugar;
    const bloodSugar = data === undefined ? [] : data;

    return (
      // Graph Container
      <View>
        <Text style={styles.titleStyle}>Kadar Gula Darah</Text>
        <View style={styles.graphContainer}>
          {/* y Axis */}
          <View style={styles.yAxisContainer}>
            {/* y Axis Item*/}
            {ranges.map((item, index) => (
              <View style={styles.yAxisItem} key={index}>
                <Text style={styles.yAxisItemText}>{item}</Text>
              </View>
            ))}
          </View>
          {/* x Axis */}
          <View style={styles.xAxisContainer}>
            <ScrollView
             horizontal
              ref={ref => this.scrollView = ref}
              onContentSizeChange={() => {
                this.scrollView.scrollToEnd({ animated: true });
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <LineHorizontal lineNumber={item} key={index} />
              ))}
              {/* x axis dots item */}
              {bloodSugar.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    marginLeft: index === 0 ? 45 : 15
                  }}
                >
                  <LineVertical />
                  {item.gulaDarah.map((gulaDarahItem, idx) => (
                    <Dots
                      dotsStyle={{
                        backgroundColor: this.dotColor(gulaDarahItem.nilai),
                        top: this.dotTop(gulaDarahItem.nilai)
                      }}
                      item={gulaDarahItem}
                      key={idx}
                    />
                  ))}
                  <Text style={styles.textCorXStyle}>{item.date}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        {/* dots info */}
        <View style={styles.infoDotsContainerStyle}>
          <DotsInfo />
        </View>
      </View>
    );
  }
}

const styles = {
  graphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.white,
    padding: graphContainerPadding,
    height: graphContainerHeight,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2
      },
      android: {
        elevation: 0.05
      }
    })
  },
  yAxisContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: graphContainerPadding * 2
  },
  xAxisContainer: {
    marginHorizontal: 10
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
  yAxisItemText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    color: '#556299',
    textAlign: 'right'
  },
  textCorXStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    color: '#556299',
    marginTop: Style.PADDING - 15,
    marginRight: Style.PADDING,
    right: Style.PADDING - 4
  },
  dotContainer: {
    position: 'absolute',
    height: 100,
    width: 50,
    left: -25
  },
  dotsWrapper: {
    width: 30,
    height: 30,
    left: 12,
    bottom: 10
  },
  dotsStyle: {
    left: 6,
    height: 15,
    width: 15,
    borderRadius: 15 / 2,
    bottom: -10
  },
  toolTipContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
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
    borderTopRightRadius: 5,
    bottom: 105,
    left: -15
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
