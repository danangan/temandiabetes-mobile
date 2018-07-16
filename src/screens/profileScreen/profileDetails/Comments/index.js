/*
  @daniel
  List Thread by user's id
*/
import React from 'react';
import { connect } from 'react-redux';
import { View, Platform, FlatList, TouchableOpacity, Text } from 'react-native';

import { getThreads } from '../../../../actions/threadActions';
import { Card, FooterThread, HeaderThread } from '../../../../components';
import ContentThread from '../../../../components/thread/contentThread';
import Style from '../../../../style/defaultStyle';

class TabComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toCommentDetails(idComment) {
    this.props.navigator.push({
      screen: 'TemanDiabetes.CommentDetails',
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: {
        idThread: this.state.idThread,
        commentId: idComment
      }
    });
  }

  renderItem(threads) {
    console.log('ID COMMENT', threads);
    const { nama, foto_profile } = this.props.dataAuth;
    return (
      <TouchableOpacity key={threads.index} onPress={() => this.toCommentDetails()}>
        <Card containerStyle={styles.cardStyle}>
          <HeaderThread source={foto_profile} name={this.props.user.nama} category={'Answer'} />
          <ContentThread title={threads.item.text} />
          <FooterThread
            numOfComments={17}
            isOpen={this.togleModal}
            saveBookmark={this.onPostBookmark}
            threadItem={threads.item}
          />
        </Card>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
    backgroundColor: '#ccc'
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
  getThreads: token => dispatch(getThreads(token))
  // makeBookmark: (idThread, token) => dispatch(makeBookmark(idThread, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabComments);
