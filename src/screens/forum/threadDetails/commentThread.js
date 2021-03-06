import React from 'react';
import { debounce } from 'lodash';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { Avatar, TextWithClickableURL } from '../../../components';
import { formatDateTime } from '../../../utils/helpers';
import CommentChild from './commentChild';
import Style from '../../../style/defaultStyle';

class CommentThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCommentChild() {
    const { replies } = this.props.contentComment;
    return replies.slice(0, 2).map((item, index) => (
      <CommentChild
        key={index}
        comment={item}
        containerStyle={{
          flex: 0,
          flexDirection: 'row',
          paddingVertical: 10,
          alignItems: 'center',
          borderBottomColor: '#f3f3f4',
          borderBottomWidth: 1,
          width: '100%'
        }}
      />
    ));
  }

  renderInitialReply() {
    const { replies } = this.props.contentComment;
    const { nama, foto_profile } = this.props.dataAuth;
    const initialUser = {
      user: {
        nama,
        foto_profile
      },
      text: 'Komentari'
    };
    if (replies.length) {
      return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
          <Text
            style={{
              flexDirection: 'row',
              padding: 10,
              borderBottomColor: '#f3f3f4',
              borderBottomWidth: 1,
              width: '100%',
              textAlign: 'left',
              fontSize: 11
            }}
            onPress={debounce(() => this.props.navigator(this.props.idComment), 500, {
              leading: true,
              trailing: false
            })}
          >
            View {replies.length} reply.
          </Text>
          <CommentChild
            containerStyle={{
              flex: 0,
              flexDirection: 'row',
              paddingVertical: 10,
              alignItems: 'center',
              width: '100%'
            }}
            comment={initialUser}
          />
        </View>
      );
    }
    return null;
  }

  render() {
    const { _id, user, text, updatedAt, replies } = this.props.contentComment;
    if (this.props === null && user === null) {
      return null;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.props.navigator(this.props.idComment)}
      >
        <View style={styles.container}>
          <View style={styles.wrapperHeader}>
            <Avatar
              avatarSize="ExtraSmall"
              userName={user === null ? 'Author not found' : user.nama}
              imageSource={user === null ? '' : user.foto_profile}
            />
            <View style={{ flex: 1, margin: 5 }}>
              <Text style={{ fontSize: 12 }}>{user === null ? 'Author not found' : user.nama}</Text>
              <Text style={{ fontSize: 10 }}>Posted on {formatDateTime(updatedAt)}</Text>
            </View>
            <TouchableOpacity
              onPress={debounce(
                () => {
                  Navigation.showModal({
                    screen: 'TemanDiabetes.ModalReplyComment',
                    title: 'Modal',
                    passProps: {
                      idComment: _id,
                      idThread: this.props.threadId
                    },
                    navigatorButtons: {
                      leftButtons: [{}]
                    },
                    animationType: 'slide-up'
                  });
                },
                500,
                { leading: true, trailing: false }
              )}
              style={{ backgroundColor: '#252c68' }}
            >
              <Text
                style={{
                  fontSize: Style.FONT_SIZE_SMALLER,
                  paddingHorizontal: 20,
                  paddingVertical: 3,
                  color: '#FFFFFF',
                  textAlign: 'center'
                }}
              >
                Balas
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.commentContent}>
            <Text style={styles.wrapTextComment}>
              <TextWithClickableURL inputText={text} />
            </Text>
          </View>
        </View>
        <View style={styles.containerCommentChild}>
          {replies.length === 0 ? null : <View style={{ marginBottom: 25 }} />}
          {this.renderCommentChild()}
          {this.renderInitialReply()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#999',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.7,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 4,
    zIndex: 999
  },
  wrapperHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: 5,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15
  },
  commentContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    paddingBottom: 10
  },
  containerCommentChild: {
    flex: 1,
    position: 'relative',
    top: -20,
    flexDirection: 'column',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 0
  },
  wrapTextComment: { 
    fontSize: 14,
    marginTop: 10, 
    marginBottom: 15 
  }
};

const mapStateToProps = state => ({
  dataAuth: state.authReducer.currentUser
});

export default connect(
  mapStateToProps,
  null
)(CommentThread);
