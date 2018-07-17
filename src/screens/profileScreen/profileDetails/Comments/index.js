/*
  @daniel
  List Thread by user's id
*/
import React from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Platform, 
  FlatList, 
  Text 
} from 'react-native';
import Share from 'react-native-share';


import landingPageURL from '../../../../config/landingPageURL';
import { getThreads, makeBookmark } from '../../../../actions/threadActions';
import Style from '../../../../style/defaultStyle';
import ThreadItem from '../../../forum/components/threadItem';

class TabComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.onShareThread = this.onShareThread.bind(this);
    this.onPostBookmark = this.onPostBookmark.bind(this);
  }

  onShareThread(thread) {
    const options = {
      title: thread.topic,
      message: thread.topic,
      url: `${landingPageURL}/thread/${thread._id}`,
      subject: 'Article from Teman Diabetes' //  for email
    };
    Share.open(options).catch(err => {
      err && console.log(err);
    });
  }

  onPostBookmark = async (thread, threadIndex) => {
    console.log('thread thread ', thread);
    this.setState(
      {
        isProses: true
      },
      () => {
        this.props.makeBookmark(thread, threadIndex);
      }
    );
  };

  renderItem(comments) {
    const { nama, foto_profile } = this.props.dataAuth;
    const itemComments = {
      item: {
        _id: comments.item._id,
        topic: comments.item.text
      }
    };
    const idThread = comments.item.thread._id;
    const idComment = comments.item._id;
    return (
      <ThreadItem  
        threads={itemComments}
        toThreadDetails={() => {
          this.props.navi.push({
            screen: 'TemanDiabetes.CommentDetails',
            navigatorStyle: {
              navBarHidden: true
            },
            passProps: {
              idThread,
              commentId: idComment
            }
          });
        }}
        onPostBookmark={this.onPostBookmark}
        onShareThread={this.onShareThread}
      />
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        {
          this.props.listThreads.length === 0 ? 
          <View style={styles.messageEmpty}>
            <Text style={styles.textHistory}>Tidak ada riwayat komentar Anda</Text>
          </View>
          :
          <FlatList data={this.props.listThreads} renderItem={item => this.renderItem(item)} />
        }
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1, 
    backgroundColor: '#fff'
  },
  cardStyle: {
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2.5
      }
    })
  },
  wrapButonSearch: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 5,
    elevation: 2.5,
    height: 50
  },
  wrapPostThread: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 5,
    elevation: 2.5,
    height: 70,
    marginVertical: 10,
    paddingHorizontal: 10
  },
  messageEmpty: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHistory: { 
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: Style.FONT_SIZE
  }
};

const mapStateToProps = state => ({
  dataAuth: state.authReducer.currentUser,
  dataRegister: state.registerReducer,
  dataThreads: state.threadsReducer
});

const mapDispatchToProps = dispatch => ({
  getThreads: token => dispatch(getThreads(token)),
  makeBookmark: (thread, threadIndex) => dispatch(makeBookmark(thread, threadIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabComments);
