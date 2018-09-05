import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, AsyncStorage, Alert } from 'react-native';

import color from '../../../../style/color';
import Style from '../../../../style/defaultStyle';
import TabFamily from './TabFamily';
import TabRequest from './TabRequest';
import TabPending from './TabPending';
import { getInnerCircle } from '../../../../actions';
import { authToken } from '../../../../utils/constants';
import { SnackBar } from '../../../../components';

class InnerCircleList extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };

  constructor(props) {
    super(props);
    this.state = {
      tab: props.tab || 0,
      isProcess: false,
      showSnackBar: false,
      errorMessage: ''
    };
  }

  componentDidMount() {
    this.getInnerCircle();
  }

  componentDidUpdate() {
    const { status, message } = this.props.innerCircle;
    const { isProcess } = this.state;
    const acceptedOrRejected = 'Inner Circle status updated';
    const deleted = 'Inner circle successfully deleted';

    if (
      (status === 200 && message === acceptedOrRejected && isProcess) ||
      (status === 200 && message === deleted && isProcess)
    ) {
      this.setState(
        {
          isProcess: false
        },
        () => this.getInnerCircle()
      );
    }
  }

  onPushScreen(screen) {
    const { accepted } = this.props.innerCircle;
    if (accepted.length === 10) {
      return this.showSnackBar('Maaf, batas permintaan inner circle maksimal 10 orang.');
    }

    this.props.navigator.push({
      screen
    });
  }

  onChangeIsProcess = value => {
    this.setState({
      isProcess: value
    });
  };

  getInnerCircle = async () => {
    const { currentUser } = this.props.dataAuth;
    const idToken = await AsyncStorage.getItem(authToken);
    this.props.getInnerCircle(currentUser._id, idToken);
  };

  renderTabContent = () => {
    if (this.state.tab === 0) {
      return (
        <TabFamily
          innerCircle={this.props.innerCircle.accepted}
          onChangeIsProcess={this.onChangeIsProcess}
          navigator={this.props.navigator}
        />
      );
    }
    if (this.state.tab === 1) {
      return (
        <TabRequest
          innerCircle={this.props.innerCircle.pending}
          onChangeIsProcess={this.onChangeIsProcess}
          navigator={this.props.navigator}
        />
      );
    }
    if (this.state.tab === 2) {
      return (
        <TabPending
          innerCircle={this.props.innerCircle.requested}
          onChangeIsProcess={this.onChangeIsProcess}
          navigator={this.props.navigator}
        />
      );
    }
  };

  showSnackBar = message => {
    this.setState({ showSnackBar: true, errorMessage: message }, () => this.hideSnackBar());
  };

  hideSnackBar = () => {
    setTimeout(() => {
      this.setState({ showSnackBar: false });
    }, 2000);
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.navBarContainerStyle}>
          <TouchableOpacity
            style={styles.leftButtonStyle}
            onPress={() => this.props.navigator.pop()}
          >
            <Image
              resizeMode={'contain'}
              style={styles.iconStyle}
              tintColor={color.red}
              source={require('../../../../assets/icons/back.png')}
            />
          </TouchableOpacity>
          <Text style={styles.navBarTitleStyle}>INNER CIRCLE LIST</Text>
          <TouchableOpacity
            onPress={() => this.onPushScreen('TemanDiabetes.InnerCircle')}
            style={styles.rightButtonStyle}
          >
            <Image
              resizeMode={'contain'}
              style={styles.iconStyle}
              tintColor={color.red}
              source={require('../../../../assets/icons/username-dark.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.countContainerStyle}>
          <View style={styles.countContentStyle}>
            {this.props.innerCircle.tabs.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => this.setState({ tab: index })}>
                <Text
                  style={[
                    styles.countStyle,
                    {
                      fontWeight: this.state.tab === index ? '500' : 'normal',
                      color: this.state.tab === index ? color.black : color.gray
                    }
                  ]}
                >
                  {item.count.length}
                </Text>
                <Text style={styles.titleStyle}>{item.tab}</Text>
                <Text
                  style={[
                    styles.indicatorStyle,
                    {
                      borderBottomWidth: this.state.tab === index ? 3 : 0,
                      borderBottomColor: this.state.tab === index ? color.red : color.white
                    }
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flex: 5 }}>{this.renderTabContent()}</View>
        </View>
        <SnackBar
          visible={this.state.showSnackBar}
          textMessage={this.state.errorMessage}
          position="top"
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
    padding: Style.PADDING
  },
  countContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  countContentStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Style.PADDING * 1.5
  },
  countStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_TITLE * 1.5,
    textAlign: 'center'
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALL,
    color: 'rgba(74,74,74,1)',
    fontWeight: '300'
  },
  indicatorStyle: {
    width: '50%',
    borderBottomWidth: 3,
    borderBottomColor: color.red,
    alignSelf: 'center'
  },
  navBarContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftButtonStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 50
  },
  iconStyle: {
    width: 25,
    height: 25,
    tintColor: color.red
  },
  navBarTitleStyle: {
    fontSize: Style.FONT_SIZE,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    textAlign: 'center',
    color: color.red
  },
  rightButtonStyle: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: 50
  }
};

const mapStateToProps = state => ({
  dataAuth: state.authReducer,
  innerCircle: state.innerCircleReducer
});

const mapDispatchToProps = dispatch => ({
  getInnerCircle: (userID, idToken) => dispatch(getInnerCircle(userID, idToken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InnerCircleList);
