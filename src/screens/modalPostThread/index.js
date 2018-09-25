import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  Alert,
  ActionSheetIOS,
  KeyboardAvoidingView,
  Picker }
from 'react-native';
import { Navigation } from 'react-native-navigation';
import Closed from '../../assets/icons/close.png';
import { Avatar } from '../../components';
import { API_CALL } from '../../utils/ajaxRequestHelper'
import { capitalize } from '../../utils/helpers'

import { userPostThread } from '../../actions/threadActions';

const tipeForum = [
 {
   label: 'Sharing',
   value: 'sharing'
 },
 {
   label: 'Pertanyaan',
   value: 'question'
 }
]

const getLabelByVal = (options, val) => {
  let result
  options.forEach((item) => {
    if (item.value === val) {
      result = item.label
    }
  })
  return result
}

class ModalPostThread extends Component {
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
      threadType: '',
      categories: [],
      errors: {
        title: false,
        description: false
      },
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

  isValid() {
    return !this.state.errors.topic && !this.state.errors.description
  }

  validate(cb) {
    const { topic, description } = this.state
    let isTopicError = false
    let isDescriptionError = false

    if (topic.trim() === '') {
      isTopicError = true
    }

    if (description.trim() === '') {
      isDescriptionError = true
    }

    this.setState({
      errors: {
        description: isDescriptionError,
        topic: isTopicError
      }
    }, cb)
  }

  async onSubmitThread() {
    this.validate(() => {
      const { threadType, selectedCategory } = this.state;
      if (this.isValid() && threadType !== '' && selectedCategory !== '') {
        const dataThreads = {
          category: [{
            _id: this.state.selectedCategory
          }],
          threadType: this.state.threadType,
          topic: this.state.topic,
          description: this.state.description
        };
        this.setState({
          isSubmit: true
        }, () => {
          this.props.userPostThread(dataThreads, () => {
            this.props.navigator.pop()
            // this.setState({
            //   isSubmit: false,
            //   topic: '',
            //   description: '',
            // })
          });
        });
      } else {
        // only alert if is valid
        if (this.isValid()) {
          if (threadType === '' && selectedCategory === '') {
            Alert.alert('Error','Pilih tipe dan kategori thread terlebih dahulu')
          } else {
            if (threadType === '') {
              Alert.alert('Error', 'Pilih tipe terlebih dahulu')
            } else if (selectedCategory === '') {
              Alert.alert('Error', 'Pilih kategori terlebih dahulu')
            }
          }
        }
      }
    });
	}

  openIOSPicker(options = [], title, onSelect) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [ ...options.map(item => item.label), 'Batal'],
      title,
      destructiveButtonIndex: options.length
    },
    (buttonIndex) => {
      if (options[buttonIndex]) {
        onSelect(options[buttonIndex].value)
      }
    });
  }

  render() {
    const { currentUser } = this.props;
    const { errors } = this.state;
    let content
    if (this.state.isSubmit) {
      content = (
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
    } else {
      content =
      <View style={styles.container}>
        <View style={styles.innerWrapper}>
          <View style={styles.wrapNav}>
            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={() => {this.props.navigator.pop()}}
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
              maxLength={60}
              focus
              autoFocus
              ref="TextInput"
              multiline
              underlineColorAndroid={'#fff'}
              style={styles.titleInput}
              placeholder="Judul Threads"
              onChangeText={(topic) => {
                if (topic.length > 60) {
                  this.setState({ topic });
                }
              }}
            />
            <Text
              style={{
                position: 'absolute',
                right: 10,
                bottom: 0,
                fontSize: 12,
                border: '1px solid #ccc',
                fontFamily: 'Montserrat-ExtraLight',
              }}
            >
              { this.state.topic.length }/60 karakter
            </Text>
          </View>
          {
            errors.topic &&
            <Text style={styles.errorText}>Judul thread tidak boleh kosong</Text>
          }
          <View style={styles.contentInputWrapper}>
            <TextInput
              underlineColorAndroid={'#fff'}
              multiline
              style={styles.contentInput}
              placeholder={'Deskripsikan thread Anda'}
              onChangeText={(description) => this.setState({ description })}
            />
            {
              // <Text
              //   style={{
              //     position: 'absolute',
              //     right: 10,
              //     bottom: 0,
              //     fontSize: 12,
              //     border: '1px solid #ccc',
              //     fontFamily: 'Montserrat-ExtraLight',
              //   }}
              // >
              //     { this.state.description.length }/200 karakter
              //   </Text>
            }
          </View>
          {
            errors.description &&
            <Text style={styles.errorText}>Konten thread tidak boleh kosong</Text>
          }
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'flex-end',
              borderTopWidth: 1,
              borderTopColor: '#f2f3f7'
          }}>
            {
              Platform.OS === 'android' &&
              <Picker
              style={{
                flex:1,
              }}
                selectedValue={this.state.threadType}
                mode="dropdown"
                onValueChange={itemValue => {
                  this.setState({threadType: itemValue})
                }
                }>
                <Picker.Item label="Tipe" value="" />
                <Picker.Item label="Sharing" value="sharing" />
                <Picker.Item label="Pertanyaan" value="question" />
              </Picker>
            }
            {
              Platform.OS === 'ios' &&
              <TouchableOpacity
                style={{ height: 35, marginLeft: 0, flex: 1 }}
                onPress={() => {
                  const option = tipeForum
                  const title = 'Tipe forum'
                  const onSelect = val => this.setState({'threadType': val})
                  this.openIOSPicker(option, title, onSelect)
                }}
              >
                <Text style={[styles.textInput, { marginTop: 9 }]}>{this.state.threadType !== '' ? getLabelByVal(tipeForum, this.state.threadType) : 'Pilih tipe'}</Text>
              </TouchableOpacity>
            }
            {
              Platform.OS === 'android' &&
              <Picker
                style={{
                  flex:1.2,
                }}
                selectedValue={this.state.selectedCategory}
                mode="dropdown"
                onValueChange={itemValue => {
                  this.setState({selectedCategory: itemValue})
                }
                }>
                <Picker.Item label="Kategori" value="" />
                {
                  this.state.categories.map((item, id) => (
                    <Picker.Item key={id} label={capitalize(item.category)} value={item._id} />
                  ))
                }
              </Picker>
            }
            {
              Platform.OS === 'ios' &&
              <TouchableOpacity
                style={{ height: 35, marginLeft: 0, flex: 1.4 }}
                onPress={() => {
                  const option = this.state.categories.map((item) => ({
                    label: item.category,
                    value: item._id
                  }))
                  const title = 'Kategori forum'
                  const onSelect = val => this.setState({'selectedCategory': val})
                  this.openIOSPicker(option, title, onSelect)
                }}
              >
                <Text style={[styles.textInput, { marginTop: 9 }]}>
                  {this.state.selectedCategory !== '' ? getLabelByVal(this.state.categories.map(item => ({ value: item._id, label: item.category })), this.state.selectedCategory) : 'Pilih kategori'}
                </Text>
              </TouchableOpacity>
            }
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
    }

    if (Platform.OS === 'ios') {
      return <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>{content}</KeyboardAvoidingView>
    } else {
      return content
    }
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
    // paddingHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  wrapNav: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingVertical: 10,
    borderBottomWidth: 1,
    top: -8,
    borderBottomColor: '#000',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  titleForm: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    color: '#99a0c2',
    fontSize: 13
  },
  contentInputWrapper: {
    flex: 2,
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f2f3f7'
  },
  titleInputWrapper: {
    flex: 0.6,
    marginTop: 30,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f2f3f7',
    paddingVertical: 15
  },
  titleInput: {
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-ExtraLight',
    fontSize: 14,
    color: '#000'
  },
  contentInput: {
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-ExtraLight',
    color: '#000',
    fontSize: 12
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    marginHorizontal: 5
  }
};

const mapStateToProps = state => ({
  dataThreads: state.threadsReducer,
  currentUser: state.authReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
	userPostThread: (dataThreads, cb) => dispatch(userPostThread(dataThreads, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalPostThread);
