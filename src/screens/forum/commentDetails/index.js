import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  NavigationBar,
  CardSection,
  Avatar,
  Spinner,
  TextWithClickableURL
} from '../../../components';
import CommentChild from '../threadDetails/commentChild';
import {
  commentToReply,
  getCommentDetails
} from '../../../actions/threadActions';

class CommentDetails extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      params: 0,
      isComment: true,
      komentar: '',
      isSubmit: false,
      count: 1,
    };
    this.handleNavigate = this.handleNavigate.bind(this);
    this.dismisModal = this.dismisModal.bind(this);
  }

  componentDidMount() {
    this.props.getCommentDetails(this.props.commentId);
  }

  componentWillReceiveProps(nextProps) {
    const { status_code } = nextProps.createComment.commentToReply;
    const { commentDetails } = nextProps;
    if (status_code === 201 && this.state.isSubmit) {
      // get thread details again
      this.setState({
        isSubmit: false,
        komentar: ''
      })
    }
  }

  onSubmitComment() {
    const { _id } = this.props.dataAuth;
    const { commentDetails } = this.props;
   if (this.state.komentar !== '') {
    this.setState({
      isSubmit: true
    }, async () => {
      const comment = {
        idThread: this.props.idThread,
        idComment: commentDetails._id,
        params: {
          user: _id,
          text: this.state.komentar
        }
      };
      await this.props.commentToReply(comment);
      this.props.getCommentDetails(this.props.commentId);
    });
   } else {
    alert('Silakan input komentar Anda.');
   }
  }

  renderCommentChild() {
    const { nama, foto_profile } = this.props.dataAuth;
    const { commentDetails } = this.props;
    return (
      <View style={{ flex: 1, width: '100%' }}>
        {commentDetails
          ? commentDetails.replies.map((item, index) => (
              <CommentChild key={index} containerStyle={styles.containerStyle} comment={item} />
            ))
          : commentDetails}
        <View style={[styles.innerContainer, Platform.OS === 'ios' ? {padding: 10, marginLeft: 5} : {}]}>
          <Avatar avatarSize="ExtraSmall" userName={nama} imageSource={foto_profile} />
          <TextInput
            value={this.state.komentar}
            blurOnSubmit={false}
            placeholder="Komentari"
            style={{ flex: 1, margin: 5 }}
            underlineColorAndroid={'#fff'}
            onChangeText={komentar => this.setState({ komentar })}
            onSubmitEditing={() => {
              this.onSubmitComment();
            }}
          />
          <TouchableOpacity
            style={{ backgroundColor: '#252c68' }}
            disabled={this.state.isSubmit}
            onPress={() => {
              this.state.isSubmit ? null : this.onSubmitComment();
            }}
          >
            <Text
              style={{
                fontSize: 12,
                paddingHorizontal: 20,
                paddingVertical: 3,
                color: '#8084a7'
              }}
            >
              Balas
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  dismisModal() {
    Navigation.dismissModal({
      animationType: 'slide-down'
    });
  }

  async handleNavigate() {
    if (this.props.itemThread === undefined) {
      this.props.navigator.pop();
    } else {
      const { threads } = this.props.itemThread;
      const paramsToDetails = {
        item: { ...threads }
      };
      if (this.state.count === 0) {
        this.props.navigator.pop();
      } else {
        this.props.navigator.push({
          screen: 'TemanDiabetes.ThreadDetails',
          navigatorStyle: {
            navBarHidden: true
          },
          passProps: paramsToDetails
        });
        await this.setState({ count: 0 });
      }
    }
  }

  render() {
    const { isComment } = this.state;
    const { commentDetails } = this.props;
    const { nama, foto_profile } = this.props.dataAuth;
    if (commentDetails === null) {
      return (
        <View style={styles.container}>
          <Spinner containerStyle={{ backgroundColor: '#f2f4fd' }} color="#EF434F" size="large" />
        </View>
      );
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1, height: '100%' }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
          <View
            style={{
              flex: 1,
              backgroundColor: '#f3f5fe',
              paddingHorizontal: 10,
              paddingVertical: 15
          }}
          >
            <NavigationBar onPress={() => this.handleNavigate()} title="KOMENTAR" />
            <CardSection
              containerStyle={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#fff',
                marginTop: 20,
                marginHorizontal: 20,
                elevation: 3,
                shadowColor: '#999',
                shadowOffset: { width: 1, height: 3 },
                shadowOpacity: 0.7,
                maxHeight: '50%',
                paddingBottom: 20,
                borderRadius: 20,
                zIndex: 999
              }}
            >
              <View style={styles.innerContainer}>
                <Avatar
                  avatarSize="Small"
                  userName={commentDetails.user.nama}
                  imageSource={commentDetails.user.foto_profile}
                />
                <View style={{ flex: 1, margin: 5 }}>
                  <Text style={{ fontSize: 12 }}>{commentDetails.user.nama}</Text>
                  <Text style={{ fontSize: 10 }} />
                </View>
              </View>
              <ScrollView style={styles.innerText}>
                <Text style={{ fontSize: 22 }}>
                  <TextWithClickableURL inputText={commentDetails.text} />
                </Text>
              </ScrollView>
            </CardSection>
            {commentDetails.replies.length ? (
              <ScrollView style={{ marginTop: -50 }} keyboardShouldPersistTaps>
                <View style={styles.containerCommentChild}>{this.renderCommentChild()}</View>
              </ScrollView>
            ) : (
              <View style={styles.containerEmptyCommentChild}>
                <View style={styles.innerContainerEmptyComment}>
                  <Avatar avatarSize="ExtraSmall" userName={nama} imageSource={foto_profile} />
                  <TextInput
                    value={this.state.komentar}
                    placeholder="Komentari"
                    style={{ flex: 1, margin: 5 }}
                    underlineColorAndroid={'#fff'}
                    onChangeText={komentar => this.setState({ komentar })}
                  />
                  <TouchableOpacity
                    style={{ backgroundColor: '#252c68' }}
                    onPress={() => this.onSubmitComment()}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        paddingHorizontal: 20,
                        paddingVertical: 3,
                        color: '#8084a7'
                      }}
                    >
                      Balas
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
    paddingVertical: 15
  },
  innerContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 20
  },
  innerContainerEmptyComment: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingTop: Platform.OS === 'ios' ? 10 : 0,
    padding: Platform.OS === 'ios' ? 10 : 0,
    paddingHorizontal: 15,
    borderRadius: 20
  },
  innerText: {
    paddingHorizontal: 15
  },
  wrapperButton: {
    marginVertical: 5,
    marginHorizontal: 1,
    alignItems: 'center',
    backgroundColor: '#252c68',
    borderRadius: 10
  },
  titleButton: {
    fontSize: 12,
    color: '#8084a7',
    paddingHorizontal: 10
  },
  containerCommentChild: {
    flex: 1,
    position: 'relative',
    paddingTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20
  },
  containerEmptyCommentChild: {
    flex: 0,
    position: 'relative',
    top: -20,
    paddingTop: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    borderBottomColor: '#f3f3f4',
    borderBottomWidth: 1,
    borderRadius: 20
  }
};

const mapStateToProps = state => ({
  commentDetails: state.threadsReducer.commentDetails.data,
  createComment: state.threadsReducer.createComment,
  dataAuth: state.authReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
  commentToReply: (comment) => dispatch(commentToReply(comment)),
  getCommentDetails: (idComment) => dispatch(getCommentDetails(idComment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentDetails);
