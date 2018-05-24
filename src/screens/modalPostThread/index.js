import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, Text, TextInput, Keyboard, AsyncStorage, Picker } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Closed from '../../assets/icons/close.png';
import { Avatar } from '../../components';
import { authToken } from '../../utils/constants';
import { API_CALL } from '../../utils/ajaxRequestHelper'
import { capitalize } from '../../utils/helpers'

import { userPostThread } from '../../actions/threadActions';

class ModalPostThred extends Component {
  static navigatorStyle = {
		navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      description: '',
      keyboardActive: false,
      isSubmit: false,
      selectedCategory: '',
      categories: []
    };
    this.onSubmitThread = this.onSubmitThread.bind(this);
  }

  componentDidUpdate() {
    const { submitThreads  } = this.props.dataThreads;
    if (submitThreads.status_code === 201 && this.state.isSubmit) {
      Navigation.dismissModal({
        animationType: 'slide-down'
      });
      this.setState({
        isSubmit: false
      });
    }
  }

  async fetchCategories() {
    const option = {
      method: 'get',
      url: '/api/categories?limit=100',
    };

    try {
      const { data: { data : { categories: { docs }}} } = await API_CALL(option);

      this.setState({
        categories: docs,
      })
    } catch (error) {
      console.log(error)
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

  componentDidMount() {
    this.fetchCategories()
  }

  onSubmitThread() {
    this.getToken();
  }

  getToken = async () => {
    const token = await AsyncStorage.getItem(authToken);
    const dataThreads = {
      category: [{
        _id: this.state.selectedCategory
      }],
      threadType: 'sharing',
      topic: this.state.topic,
      description: this.state.description
    };
    this.setState({
      isSubmit: true
    }, () => {
      this.props.userPostThread(token, dataThreads);
    });
	}

  render() {
    const { currentUser } = this.props;
    if (this.state.isSubmit) {
      return (
				<View style={{
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
            >
                <Image
                  source={Closed}
                  style={{ width: 15, height: 15 }}
                />
              </TouchableOpacity>
              <View style={{ flex: 1, justifyContent: 'flex-end', marginRight: 15 }}>
                <Text style={styles.titleForm}>Tanyakan atau bagikan sesuatu</Text>
              </View>
          </View>
          <View style={styles.titleInputWrapper}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Avatar
                avatarSize="ExtraSmall"
                imageSource={currentUser.foto_profile}
                userName={currentUser.nama}
              />
              <Text>{ currentUser.nama }</Text>
            </View>
            <TextInput
              multiline
              underlineColorAndroid={'#fff'}
              style={styles.titleInput}
              placeholder="Judul Threads"
              onChangeText={(topic) => this.setState({ topic })}
              returnKeyType={'done'}
            />
          </View>
          <View style={styles.contentInputWrapper}>
            <TextInput
              underlineColorAndroid={'#fff'}
              multiline
              style={styles.contentInput}
              placeholder={'Optional: masukkan link yang dapat mendukung konteks'}
              onChangeText={(description) => this.setState({ description })}
            />
          </View>
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderTopWidth: 1,
            borderTopColor: '#f2f3f7',
          }}>
            <Picker
              style={{
                flex:1,
                width: 150,
              }}
              selectedValue={this.state.selectedCategory}
              prompt="Pilih Kategori"
              mode="dropdown"
              onValueChange={itemValue => {
                console.log(itemValue)
                this.setState({selectedCategory: itemValue})
              }
              }>
              <Picker.Item label="Pilih kategori" value="" />
              {
                this.state.categories.map((item) => (
                  <Picker.Item label={capitalize(item.category)} value={item._id} />
                ))
              }
            </Picker>
            <TouchableOpacity
              style={{
                // display: !this.state.keyboardActive ? 'none' : null,
                backgroundColor: '#262d67',
                width: 70,
                paddingHorizontal: 15,
                paddingVertical: 5,
                height: 33
              }}
              onPress={this.onSubmitThread}
            >
              <Text style={{ color: '#fff', textAlign: 'center' }}>Kirim</Text>
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
    fontSize: 13
  },
  contentInputWrapper: {
    flex: 1,
    marginVertical: 40,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#f2f3f7'
  },
  titleInputWrapper: {
    marginTop: 40,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#f2f3f7',
    paddingTop: 5
  },
  titleInput: {
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-ExtraLight',
    color: '#4a4a4a',
    fontSize: 14,
  },
  contentInput: {
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-ExtraLight',
    color: '#4a4a4a',
    fontSize: 12,
  }
};

const mapStateToProps = state => ({
  dataThreads: state.threadsReducer,
  currentUser: state.authReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
	userPostThread: (token, dataThreads) => dispatch(userPostThread(token, dataThreads)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalPostThred);
