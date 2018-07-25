import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  ScrollView
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { debounce } from 'lodash';
import Closed from '../../assets/icons/close.png';
import { Avatar } from '../../components';

import { userReport } from '../../actions/threadActions';
import Style from '../../style/defaultStyle';

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
      isSubmit: false
    };
    this.onSubmitThread = this.onSubmitThread.bind(this);
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyboardActive: true });
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardActive: false });
    });
  }

  componentWillReceiveProps({ dataThreads }) {
    const { reportThread } = dataThreads;
    if (reportThread.status_code === 201 && this.state.isSubmit) {
      Alert.alert(
        'Laporan Anda berhasil terkirim!',
        'Terimakasih atas partisipasi Anda',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      Navigation.dismissModal({
        animationType: 'slide-down'
      });
      this.setState({
        isSubmit: false
      });
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  async onSubmitThread() {
    if (this.state.reason !== '' && this.state.description !== '') {
      const dataThread = {
        id: this.props.idThread,
        reason: this.state.reason,
        description: this.state.description
      };
      this.setState(
        {
          isSubmit: true
        },
        () => {
          this.props.userReport(dataThread);
        }
      );
    } else {
      Alert.alert('Error', 'Lengkapi data terlebih dahulu');
    }
  }

  render() {
    const { reason } = this.state;
    const { currentUser } = this.props;
    if (this.state.isSubmit) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#f3f5fe',
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 20, color: '#000', fontFamily: 'Montserrat-ExtraLight' }}>
            Loading...
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.innerWrapper}>
          <View style={styles.wrapNav}>
            <TouchableOpacity
              onPress={() =>
                Navigation.dismissModal({
                  animationType: 'slide-down'
                })
              }
            >
              <Image source={Closed} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'flex-end', marginRight: 15 }}>
              <Text style={styles.titleForm}>Laporkan Thread</Text>
            </View>
          </View>

          <View style={styles.wrapTextInput}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 10
              }}
            >
              <Avatar
                avatarSize="ExtraSmall"
                imageSource={currentUser.foto_profile}
                userName={currentUser.nama}
              />
              <Text>{currentUser.nama}</Text>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 20
              }}
            >
              <TouchableOpacity onPress={() => this.setState({ reason: 'offensive' })}>
                <Text
                  style={{
                    color: '#4a4a4a',
                    fontFamily: reason === 'OFFENSIF' ? 'Montserrat-Bold' : 'Montserrat-ExtraLight'
                  }}
                >
                  OFFENSIVE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ reason: 'hoax' })}>
                <Text
                  style={{
                    color: '#4a4a4a',
                    fontFamily: reason === 'hoax' ? 'Montserrat-Bold' : 'Montserrat-ExtraLight'
                  }}
                >
                  HOAX
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <TextInput
                underlineColorAndroid={'#fff'}
                multiline
                style={styles.itemTextInput}
                placeholder={'Optional: masukkan link yang dapat mendukung laporan Anda'}
                onChangeText={description => this.setState({ description })}
              />
            </ScrollView>
          </View>
          <View style={styles.wrapFooter}>
            <TouchableOpacity
              style={styles.buttonReport}
              onPress={debounce(this.onSubmitThread, 300)}
            >
              <Text style={styles.titleButtonReport}>
                {this.state.isSubmit ? 'Loading...' : 'Laporkan'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f3f5fe',
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  innerWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 5,
    borderRadius: 10,
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
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    color: '#99a0c2',
    fontSize: 16
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
    marginVertical: 0,
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
    fontSize: 12
  },
  wrapFooter: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    borderTopColor: '#f2f3f7',
    elevation: 4,
    paddingVertical: 5
  },
  buttonReport: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262d67',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  titleButtonReport: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALL,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 5
  }
};

const mapStateToProps = state => ({
  dataThreads: state.threadsReducer,
  currentUser: state.authReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
  userReport: (dataThreads, token) => dispatch(userReport(dataThreads, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalReport);
