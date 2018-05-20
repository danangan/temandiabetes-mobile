import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, Text, TextInput, Keyboard } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { commentToReply, getThreadDetails } from '../../../actions/threadActions';
import Closed from '../../../assets/icons/close.png';

class ModalReplyComment extends Component {
  static navigatorStyle = {
		navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      komentar: '',
      keyboardActive: false,
      isSubmit: false,
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

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
  }

  componentDidUpdate() {
    const { status_code } = this.props.dataThreads.createComment.commentToReply;
    if (status_code === 201 && this.state.isSubmit) {
      // get thread details again
      this.props.getThreadDetails(this.props.idThread);

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

    this.setState({
      isSubmit: true
    }, () => {
      const comment = {
        idComment: this.props.idComment,
        params: {
          user: currentUser._id,
          text: this.state.komentar
        }
      };
      this.props.commentToReply(comment);
    });
  }

  render() {
    // console.log('PROPS comment -- ', this.props);
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
                <Text style={styles.titleForm}>Tambah Komentar</Text>
              </View>
          </View>
          <View style={styles.wrapTextInput}>
            <TextInput
              multiline
              underlineColorAndroid="transparent"
              onChangeText={(komentar) => this.setState({ komentar })}
              style={styles.itemTextInput}
              placeholder="Tambahkan komen disini"
            />
          </View>
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
            paddingVertical: 15
          }}
          onPress={this.state.isSubmit ? null : this.onSubmitComment}
        >
          <Text style={{ color: '#fff' }}>{this.state.isSubmit ? 'Loading' : 'Kirim'}</Text>
        </TouchableOpacity>
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
  itemTextInput: {
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-ExtraLight',
    color: '#b7bbd2',
    fontSize: 14
  }
};

const mapStateToProps = state => ({
  dataAuth: state.authReducer,
  dataThreads: state.threadsReducer
});

const mapDispatchToProps = dispatch => ({
  commentToReply: (comment) => dispatch(commentToReply(comment)),
  getThreadDetails: (idThread) => dispatch(getThreadDetails(idThread))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalReplyComment);
