import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { View, Image, TouchableOpacity, Text, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { commentToReply, getThreadDetails } from '../../../actions/threadActions';
import Closed from '../../../assets/icons/close.png';
import Style from '../../../style/defaultStyle';

class ModalReplyComment extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      komentar: '',
      isSubmit: false
    };
    this.onSubmitComment = this.onSubmitComment.bind(this);
  }

  componentDidUpdate() {
    const { status_code } = this.props.dataThreads.createComment.commentToReply;
    if (status_code === 201 && this.state.isSubmit) {
      // get thread details again
      this.setState({
        isSubmit: false
      }, () => {
        Navigation.dismissModal({
          animationType: 'slide-down'
        });
      });
    }
  }

  onSubmitComment() {
    const { currentUser } = this.props.dataAuth;

    if (this.state.komentar === '') {
      alert('Silakan masukkan komentar Anda');
    } else {
      this.setState({
        isSubmit: true
      }, () => {
        const comment = {
          idThread: this.props.idThread,
          idComment: this.props.idComment,
          params: {
            user: currentUser._id,
            text: this.state.komentar
          }
        };
        this.props.commentToReply(comment);
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
        <View style={styles.container}>
          <View style={styles.innerWrapper}>
            <View style={styles.wrapNav}>
              <TouchableOpacity
                onPress={() =>
                  Navigation.dismissModal({
                    animationType: 'slide-down'
                  })
                }
                style={{ flex: 0.5 }}
              >
                <Image source={Closed} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
              <View style={{ flex: 1.5 }}>
                <Text style={styles.titleForm}>Tambahkan Komentar</Text>
              </View>
            </View>
            <View style={styles.wrapTextInput}>
              <TextInput
                multiline
                underlineColorAndroid="transparent"
                onChangeText={komentar => this.setState({ komentar })}
                style={styles.itemTextInput}
                placeholder="Tambahkan komentar di sini"
              />
            </View>
          </View>
          <View style={styles.wrapFooter}>
            <TouchableOpacity
              style={styles.buttonSend}
              disabled={this.state.isSubmit}
              onPress={debounce(this.onSubmitComment, 200)}
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
  commentToReply: comment => dispatch(commentToReply(comment)),
  getThreadDetails: idThread => dispatch(getThreadDetails(idThread))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalReplyComment);
