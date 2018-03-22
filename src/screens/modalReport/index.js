import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, Text, TextInput, Keyboard, AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Closed from '../../assets/icons/close.png';
import { Avatar } from '../../components';
import { authToken } from '../../utils/constants';

import { userReport } from '../../actions/threadActions';

class ModalReport extends Component {
  static navigatorStyle = {
		navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      reason: '',
      description: '',
      keyboardActive: false,
      isSubmit: false,
    };
    this.onSubmitThread = this.onSubmitThread.bind(this);
  }

  componentDidUpdate() {
    const { reportThread  } = this.props.dataThreads;
    if (reportThread.status_code === 201 && this.state.isSubmit) {
      alert('Laporan Anda berhasil terkirim!');
      Navigation.dismissModal({
        animationType: 'slide-down' 
      });
      this.setState({
        isSubmit: false
      });
    }
  }

  componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			this.setState({ keyboardActive: true });
		});
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			this.setState({ keyboardActive: false });
		});
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
  }
  
  onSubmitThread() {
    this.getToken();
  }

  getToken = async () => {
    const token = await AsyncStorage.getItem(authToken);
    const dataThread = {
      id: this.props.idThread,
      reason: this.state.reason,
      description: this.state.description
    };
    this.setState({
      isSubmit: true
    }, () => {
      this.props.userReport(dataThread, token);
    });
	}

  render() {
    if (this.state.isSubmit) {
      return (
        <View 
        style={{
          flex: 1, 
          backgroundColor: '#f3f5fe', 
          paddingHorizontal: 10, 
          justifyContent: 'center', 
          alignItems: 'center'
        }}>
					<Text style={{ fontSize: 20, color: '#000', fontFamily: 'Montserrat-ExtraLight' }}>Loading...</Text>
				</View>
			);
    }
    return (
      <View style={styles.container}>
        <View style={styles.innerWrapper}>
          <View style={styles.wrapNav}>
            <TouchableOpacity 
              onPress={() => Navigation.dismissModal({
                animationType: 'slide-down' 
              })}
              style={{ flex: 0.5 }}
            >
                <Image 
                  source={Closed}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
              <View style={{ flex: 1.5 }}>
                <Text style={styles.titleForm}>Report Thread</Text>
              </View>
          </View>
          
          <View style={styles.wrapTextInput}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Avatar
                avatarSize="ExtraSmall"
                imageSource='http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg'
              />
              <Text>Elisabet Olsen</Text>
            </View>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
              <TouchableOpacity 
                onPress={() => this.setState({reason: 'offensive'})}
              >
                <Text style={{ color: '#4a4a4a', fontFamily: 'Montserrat-ExtraLight' }}>OFFENSIVE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                 onPress={() => this.setState({reason: 'hoax'})}
              >
                <Text style={{ color: '#4a4a4a', fontFamily: 'Montserrat-ExtraLight' }}>HOAX</Text>
            </TouchableOpacity>
            </View>
            <TextInput
              underlineColorAndroid={'#fff'}
              multiline
              maxHeight={200}
              style={styles.itemTextInput}
              placeholder={'Optional: masukkan link yang dapat mendukung konteks'}
              onChangeText={(description) => this.setState({ description })}
            />
          </View>
          <TouchableOpacity
            style={{ 
              display: !this.state.keyboardActive ? 'none' : null,
              position: 'absolute',
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 0,
              right: 10,
              backgroundColor: '#262d67',
              paddingHorizontal: 15,
              paddingVertical: 5
            }}
            onPress={this.onSubmitThread}
          >
            <Text style={{ color: '#fff' }}>Laporkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1, 
    backgroundColor: '#f3f5fe', 
    paddingHorizontal: 10, 
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  innerWrapper: {
    flex: 1, 
    backgroundColor: '#fff', 
    width: '100%', 
    paddingHorizontal: 5, 
    alignItems: 'center'
  },
  wrapNav: { 
    flex: 0.6, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'absolute',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    top: 0,
    borderBottomColor: '#000',
    backgroundColor: '#fff'
  },
  titleForm: {
    fontFamily: 'Montserrat-Bold', color: '#99a0c2', fontSize: 16 
  },
  wrapTextInput: { 
    flex: 2, 
    marginVertical: 40, 
    width: '100%', 
    height: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#f2f3f7'
  },
  wrapTextInputTitle: { 
    flex: 1, 
    marginVertical: 40, 
    width: '100%', 
    height: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#f2f3f7'
  },
  itemTextInputTitle: {
    flexWrap: 'wrap', 
    paddingHorizontal: 10, 
    fontFamily: 'Montserrat-ExtraLight', 
    color: '#4a4a4a', 
    fontSize: 14,
    height: '100%'
  },
  itemTextInput: {
    flexWrap: 'wrap', 
    paddingHorizontal: 10, 
    fontFamily: 'Montserrat-ExtraLight', 
    color: '#4a4a4a', 
    fontSize: 12,
  }
};

const mapStateToProps = state => ({
	dataThreads: state.threadsReducer,
});

const mapDispatchToProps = dispatch => ({
	userReport: (dataThreads, token) => dispatch(userReport(dataThreads, token )),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalReport);
