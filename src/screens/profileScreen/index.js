import React from 'react';
import { connect } from 'react-redux';

import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { userLogout } from '../../actions/loginActions';

import { Avatar } from '../../components/avatar';


class ProfileScreen extends React.Component {

  static navigatorStyle = {
		navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidUpdate() {
    if (this.props.dataLogin.statusCode === 400 && this.state.isLoading) {
      this.setState({
        isLoading: false
      }, () => {
        this.props.navigator.resetTo({
          screen: 'TemanDiabets.OnBoardingScreen',
          navigatorStyle: {
            navBarHidden: true
          }
        });
      });
    }
  }

  handleLogout() {
    this.setState({
      isLoading: true
    }, () => {
      this.props.userLogout();
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading.... logout</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.wrapperTopLeft}>
          <View style={styles.itemTopLeft}>
            <TouchableOpacity
              onPress={() => Navigation.dismissModal({
                animationType: 'none' 
              })}
            >
              <Image 
                source={require('../../assets/icons/close.png')}
                style={styles.itemImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.itemTopRight}>
            <View style={{ marginRight: 10 }}>
              <Text style={styles.buttonText}>Ryan Wilson</Text>
              <Text style={styles.userDesc}>Diabetes Type II</Text>
            </View>
            <Avatar
              avatarSize="Small"
              imageSource="http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg"
            />
          </View>
        </View>
        <View style={styles.wrappCenter}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigator.push({
                screen: 'TemanDiabets.ProfileDetails',
                title: 'PROFILE',
              }, () => {
                Navigation.dismissAllModals({
                  animationType: 'none' 
                })
              })
            }}
          >
            <Text style={styles.buttonText}>PROFIL</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.buttonText}>TENTANG</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.buttonText}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.buttonText}>NOTIFIKASI</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.buttonText}>AJAK TEMAN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrappFooter}>
          <TouchableOpacity>
            <Image 
              source={require('../../assets/icons/setting.png')}
              style={styles.itemImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleLogout}
          >
            <Image 
              source={require('../../assets/icons/logout.png')}
              style={styles.itemImage}
            />
          </TouchableOpacity>
        </View>
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
    fontSize: 18,
    fontFamily: 'Montserrat-Light',
    color: '#000'
  },
  itemImage: {width: 25, height: 25},
  userDesc: {
    fontSize: 10, 
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
  }
};

const mapStateToProps = state => ({
	dataLogin: state.loginReducer,
	dataThreads: state.threadsReducer,
});

const mapDispatchToProps = dispatch => ({
	userLogout: () => dispatch(userLogout()),
	// makeBookmark: (idThread, token) => dispatch(makeBookmark(idThread, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
