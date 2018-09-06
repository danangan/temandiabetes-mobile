import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { View, Image, TouchableOpacity, Text, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native';

import { createComment } from '../../actions/threadActions';
import Closed from '../../assets/icons/close.png';
import Style from '../../style/defaultStyle';

class ModalPostComponent extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      komentar: '',
      keyboardActive: false,
      isSubmit: false
    };
    this.onSubmitComment = this.onSubmitComment.bind(this);
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyboardActive: true });
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardActive: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { status_code } = nextProps.dataThreads.createComment;
    if (status_code === 201 && this.state.isSubmit) {
      this.setState(
        {
          isSubmit: false
        },
        () => {
          this.props.navigator.pop();
        }
      );
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onSubmitComment() {
    if (this.state.komentar === '') {
      alert('Komentar tidak boleh kosong');
    } else {
      const { currentUser } = this.props.dataAuth;
      this.setState(
        {
          isSubmit: true
        },
        () => {
          const comment = {
            idThread: this.props.idThread,
            params: {
              user: currentUser._id,
              text: this.state.komentar
            }
          };
          this.props.createComment(comment);
        }
      );
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, height: '100%' }} behavior="padding" enabled>
        <View style={styles.container}>
          <View style={styles.innerWrapper}>
            <View style={styles.wrapNav}>
              <TouchableOpacity onPress={() => this.props.navigator.pop()} style={{ flex: 0.5 }}>
                <Image source={Closed} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
              <View style={{ flex: 1.5 }}>
                <Text style={styles.titleForm}>Tambah Komentar cui</Text>
              </View>
            </View>
            <View style={styles.wrapTextInput}>
              <TextInput
                multiline
                underlineColorAndroid="transparent"
                onChangeText={komentar => this.setState({ komentar })}
                style={styles.itemTextInput}
                placeholder="Tambahkan komen di sini"
              />
            </View>
          </View>

          <View style={styles.wrapFooter}>
            <TouchableOpacity
              style={styles.buttonSend}
              onPress={this.state.isSubmit ? null : debounce(this.onSubmitComment, 200)}
            >
              <Text style={styles.titleButtonSend}>{this.state.isSubmit ? 'Loading' : 'Kirim'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    flex: 1,
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
  itemTextInput: {
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-ExtraLight',
    color: '#000',
    fontSize: 14
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
    paddingVertical: 10
  },
  buttonSend: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262d67',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 33
  },
  titleButtonSend: {
    fontSize: Style.FONT_SIZE_SMALL,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 5
  }
};

const mapStateToProps = state => ({
  dataAuth: state.authReducer,
  dataThreads: state.threadsReducer
});

const mapDispatchToProps = dispatch => ({
  createComment: comment => dispatch(createComment(comment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalPostComponent);
