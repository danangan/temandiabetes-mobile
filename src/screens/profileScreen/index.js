/**
 * LIKE A drawer open
 */
import React from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { onSignOut } from '../../actions/loginActions';
import { Avatar, Spinner } from '../../components';
import { authToken } from '../../utils/constants';
import { mainApp } from '../../../App';
import color from '../../style/color';
import Style from '../../style/defaultStyle';

class ProfileScreen extends React.Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    this.getToken();
  }

  componentDidUpdate() {
    const self = this;
    if (this.props.dataLogin.statusCode === 400 && this.state.isLoading) {
      setTimeout(() => {
        self.setState({ isLoading: false }, () => {
          this.props.navigator.resetTo({
            screen: 'TemanDiabetes.OnBoardingScreen',
            animated: true,
            animationType: 'fade',
            navigatorStyle: {
              navBarHidden: true
            }
          });
        });
      }, 1000);
    }
  }

  onDismissModal = () => {
    this.props.navigator.pop({
      animated: true,
      animationType: 'slide-down'
    });
  };

  onSignOut = () =>
    this.setState({ isLoading: true }, () => {
      this.props.navigator.resetTo({
        screen: 'TemanDiabetes.LoginScreen',
        navigatorStyle: {
          tabBarHidden: true,
          navBarHidden: true
        }
      });
      this.props.onSignOut({ userId: this.props.dataAuth._id });
    });

  onPushScreen(screen, navBarHidden = true) {
    this.props.navigator.push({
      screen,
      navigatorStyle: {
        navBarHidden,
        tabBarHidden: true
      }
    });
  }

  onHome(screen) {
    // non diabetesi dan ahli
    switch (this.props.dataAuth.tipe_user) {
      case 'ahli':
        mainApp(0);
        break;
      case 'non-diabetesi':
        mainApp(0);
        break;
      case 'diabetesi':
        mainApp(2);
        break;
      default:
        break;
    }

    this.props.navigator.dismissAllModals({
      animationType: 'none'
    });
  }

  getToken = async () => {
    const token = await AsyncStorage.getItem(authToken);
  };

  render() {
    const { nama, tipe_user, foto_profile, diabetesi_tipe } = this.props.dataAuth;
    const spinner = this.state.isLoading ? (
      <Spinner color={color.red} text="Logout..." size="large" />
    ) : (
      <View />
    );

    return (
      <View style={styles.container}>
        <View style={styles.wrapperTopLeft}>
          <View style={styles.itemTopLeft}>
            <TouchableOpacity onPress={this.onDismissModal}>
              <Image source={require('../../assets/icons/close.png')} style={styles.itemImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.itemTopRight}>
            <View style={{ marginRight: 10 }}>
              <Text style={styles.textNameStyle}>{nama || 'John Doe'}</Text>
              <Text style={styles.userDesc}>
                {tipe_user === 'diabetesi' ? diabetesi_tipe || tipe_user : tipe_user || 'Tipe User'}
              </Text>
            </View>
            <Avatar avatarSize="Small" imageSource={foto_profile} userName={nama} />
          </View>
        </View>
        <View style={styles.wrappCenter}>
          <TouchableOpacity onPress={() => this.onHome('TemanDiabetes.TabInputTracker')}>
            <Text style={styles.buttonText}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPushScreen('TemanDiabetes.ProfileDetails')}>
            <Text style={styles.buttonText}>PROFIL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPushScreen('TemanDiabetes.AboutScreen')}>
            <Text style={styles.buttonText}>TENTANG</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPushScreen('TemanDiabetes.FaqScreen')}>
            <Text style={styles.buttonText}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPushScreen('TemanDiabetes.Notification')}>
            <Text style={styles.buttonText}>NOTIFIKASI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigator.push({
                screen: 'TemanDiabetes.InviteFriends',
                navigatorStyle: {
                  navBarHidden: true
                }
              });
            }}
          >
            <Text style={styles.buttonText}>AJAK TEMAN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrappFooter}>
          <TouchableOpacity onPress={() => this.onPushScreen('TemanDiabetes.ProfileSettings')}>
            <Image source={require('../../assets/icons/setting.png')} style={styles.itemImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onSignOut}>
            <Image source={require('../../assets/icons/logout.png')} style={styles.itemImage} />
          </TouchableOpacity>
        </View>
        {spinner}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 25
  },
  wrapperTopLeft: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  itemTopLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  itemTopRight: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  buttonText: {
    fontSize: Style.FONT_SIZE_TITLE,
    fontFamily: 'Montserrat-Light',
    color: '#000'
  },
  itemImage: { width: 25, height: 25 },
  userDesc: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALL,
    alignSelf: 'flex-end'
  },
  wrappCenter: {
    flex: 5,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  wrappFooter: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textNameStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE
  }
};

const mapStateToProps = state => ({
  dataAuth: state.authReducer.currentUser,
  dataLogin: state.loginReducer,
  dataThreads: state.threadsReducer
});

const mapDispatchToProps = dispatch => ({
  onSignOut: (data) => dispatch(onSignOut(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
