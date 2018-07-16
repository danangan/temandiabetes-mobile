import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  getThreadDetails,
  toFollowThread,
  toUnFollowThread,
  getCommentDetails
} from '../../../actions/threadActions';

import { CardSection, Spinner } from '../../../components';
import Closed from '../../../assets/icons/close_white.png';

import { ContentDetail } from './contentDetail';
import HeaderDetail from './headerDetail';
import color from '../../../style/color';
import Style from '../../../style/defaultStyle';

class ThreadDetails extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      idThread: this.props.item._id,
      isProcess: true,
      isLoadingSubscribe: false
    };
    this.requestFollowThread = this.requestFollowThread.bind(this);
    this.requestUnfollowThread = this.requestUnfollowThread.bind(this);
    this.toCommentDetails = this.toCommentDetails.bind(this);
  }

  componentDidMount() {
    this.props.getThreadDetails(this.state.idThread);
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() {
    const { listThreads, followThread } = this.props.dataThreads;
    if (listThreads.threadDetails !== null && this.state.isProcess) {
      this.setState({
        isProcess: false
      });
    } else if (followThread.status_code === 200 && this.state.isLoadingSubscribe) {
      setTimeout(() => {
        this.setState({
          isLoadingSubscribe: false
        });
      }, 1000);
    }
  }

  requestUnfollowThread() {
    this.setState(
      {
        isLoadingSubscribe: true
      },
      () => {
        this.props.toUnFollowThread(this.state.idThread);
      }
    );
  }

  requestFollowThread() {
    this.setState(
      {
        isLoadingSubscribe: true
      },
      () => {
        this.props.toFollowThread(this.state.idThread);
      }
    );
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

  toNavigateScreen(screen) {
    this.props.navigator.push({
      screen,
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: {}
    });
  }

  renderButtonFollow() {
    const { listThreads, followThread } = this.props.dataThreads;
    if (listThreads.threadDetails.author._id === this.props.dataAuth.currentUser._id) {
      return null;
    }
    if (followThread.isFetch) {
      return (
        <TouchableOpacity
          onPress={this.requestFollowThread}
          style={{
            justifyContent: 'center',
            minWidth: 100,
            height: 25,
            minHeight: 25,
            backgroundColor: '#252c68',
            marginRight: 10
          }}
        >
          <ActivityIndicator size="small" color="#8084a7" />
        </TouchableOpacity>
      );
    } else if (listThreads.threadDetails.isSubscriber) {
      return (
        <TouchableOpacity
          onPress={this.requestUnfollowThread}
          style={{
            justifyContent: 'center',
            minWidth: 100,
            height: 25,
            minHeight: 25,
            backgroundColor: '#252c68',
            marginRight: 10
          }}
        >
          <Text style={styles.buttonText}>Berhenti ikuti</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={this.requestFollowThread}
        style={{
          justifyContent: 'center',
          minWidth: 100,
          height: 25,
          minHeight: 25,
          backgroundColor: '#252c68',
          marginRight: 10
        }}
      >
        <Text style={styles.buttonText}>Ikuti</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { _id } = this.props.item;
    const { listThreads } = this.props.dataThreads;
    const { threadDetails } = listThreads;
    if (this.state.isProcess) {
      return (
        <Spinner containerStyle={{ backgroundColor: '#f2f4fd' }} color="#EF434F" size="large" />
      );
    } else if (threadDetails === null) {
      return (
        <Spinner containerStyle={{ backgroundColor: '#f2f4fd' }} color="#EF434F" size="large" />
      );
    }
    return (
      <View style={{ flex: 2, backgroundColor: color.solitude }}>
        {listThreads.threadDetails === null ? (
          <View>
            <Spinner containerStyle={{ backgroundColor: '#f2f4fd' }} color="#EF434F" size="small" />
          </View>
        ) : (
          <HeaderDetail
            threadType={threadDetails.threadType}
            categoryItem={threadDetails.category}
            date={threadDetails.createdAt}
            authorItem={threadDetails.author}
          />
        )}
        <ScrollView>
          {/* <ContentDetail /> */}
          <CardSection containerStyle={{ backgroundColor: color.solitude, margin: 0 }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingHorizontal: 15,
                borderRadius: 15
              }}
            >
              <Text style={{ fontSize: 22 }}>
                {listThreads.threadDetails === null ? 'Loading' : threadDetails.topic}
              </Text>
            </View>
          </CardSection>
          <CardSection containerStyle={{ backgroundColor: '#f2f4fd', margin: 0 }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderRadius: 15
              }}
            >
              {listThreads.threadDetails !== null ? this.renderButtonFollow() : null}
              <TouchableOpacity
                onPress={debounce(
                  () => {
                    this.props.navigator.push({
                      screen: 'TemanDiabetes.ModalPostComment',
                      navigatorStyle: {
                        navBarHidden: true
                      },
                      passProps: {
                        idThread: _id
                      }
                    });
                  },
                  500,
                  { leading: true, trailing: false }
                )}
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#252c68',
                  minWidth: 100,
                  height: 25,
                  minHeight: 25,
                  marginRight: 10
                }}
              >
                <Text style={styles.buttonText}>Balas</Text>
              </TouchableOpacity>
              {this.props.dataAuth.currentUser._id !== threadDetails.author._id &&
              threadDetails !== null ? (
                <TouchableOpacity
                  onPress={() => {
                    Navigation.showModal({
                      screen: 'TemanDiabetes.ModalReport',
                      title: 'Modal',
                      navigatorButtons: {
                        leftButtons: [{}]
                      },
                      passProps: {
                        idThread: _id
                      },
                      animationType: 'none'
                    });
                  }}
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#252c68',
                    minWidth: 100,
                    height: 25,
                    minHeight: 25
                  }}
                >
                  <Text style={styles.buttonText}>Lapor</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </CardSection>
          <ContentDetail
            threadItem={this.props.item}
            threadDetails={listThreads.threadDetails}
            navigator={this.toCommentDetails}
          />
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              isProcess: true
            });
            this.props.navigator.pop();
          }}
          style={styles.buttonBack}
        >
          <Image source={Closed} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  buttonBack: {
    width: '100%',
    backgroundColor: '#EF434F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  buttonText: {
    fontSize: Style.FONT_SIZE_SMALL,
    paddingHorizontal: 20,
    paddingVertical: 3,
    color: '#FFFFFF',
    textAlign: 'center'
  }
};

const mapStateToProps = state => ({
  dataThreads: state.threadsReducer,
  dataAuth: state.authReducer
});

const mapDispatchToProps = dispatch => ({
  getThreadDetails: idThread => dispatch(getThreadDetails(idThread)),
  toFollowThread: idThread => dispatch(toFollowThread(idThread)),
  toUnFollowThread: idThread => dispatch(toUnFollowThread(idThread)),
  getCommentDetails: idComment => dispatch(getCommentDetails(idComment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadDetails);
