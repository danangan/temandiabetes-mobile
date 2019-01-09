import React from 'react';
import { connect } from 'react-redux';
import { debounce, result } from 'lodash';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { CardSection, Spinner } from '../../../components';
import Closed from '../../../assets/icons/close_white.png';

import { ContentDetail } from './contentDetail';
import HeaderDetail from './headerDetail';
import color from '../../../style/color';
import Style from '../../../style/defaultStyle';

import { API_CALL } from '../../../utils/ajaxRequestHelper';

class ThreadDetails extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      threadDetail: null,
      commentList: {
        list: [],
        page: 1
      },
      isProcess: true,
      isLoadingSubscribe: false,
      isLoadMore: true
    };

    this.threadSubscription = this.threadSubscription.bind(this);
    this.toCommentDetails = this.toCommentDetails.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.getCommentList = this.getCommentList.bind(this);
    this.nextPageCommentList = this.nextPageCommentList.bind(this);
  }

  componentDidMount() {
    this.fetchThreadDetails();
    this.getCommentList();
  }

  shouldComponentUpdate() {
    return true;
  }

  async getCommentList({ nextPage = false, refresh = false } = {}) {
    try {
      const page = this.state.commentList.page + (nextPage ? 1 : 0);

      const url = `api/threads/${this.props.item._id}/comment/list?limit=${10}&page=${page}`;

      const option = {
        method: 'GET',
        url
      };

      const request = await API_CALL(option);

      if (request.data.data.comments.length > 0) {
        this.setState({
          commentList: {
            page,
            list: refresh ?
              request.data.data.comments :
              [...this.state.commentList.list, ...request.data.data.comments]
          }
        });
      }
    } catch (error) {
      console.log(error);
    }

    this.setState({
      isProcess: false
    });
  }

  async fetchThreadDetails() {
    try {
      const option = {
        method: 'get',
        url: `api/threads/${this.props.item._id}`
      };

      const request = await API_CALL(option);

      const threadDetail = {
        ...request.data.data.thread,
        isSubscriber: request.data.data.isSubscriber
      };

      this.setState({
        threadDetail,
        isProcess: false
      });
    } catch (error) {
        console.log(error);
    }
  }

  refreshPage(cb = () => {}) {
    this.setState({
      commentList: {
        ...this.state.commentList,
        page: 1
      }
    }, async () => {
      await this.getCommentList({ refresh: true });
      cb();
    });
  }

  nextPageCommentList() {
    this.getCommentList({ nextPage: true });
  }

  threadSubscription(type = 'follow') {
    let method;
    if (type === 'follow') {
      method = 'POST';
    } else {
      method = 'DELETE';
    }
    return () => {
      this.setState({
        isLoadingSubscribe: true
      }, async () => {
        try {
          const option = {
            method,
            url: `api/threads/${this.props.item._id}/threadsubscribers`
          };

          await API_CALL(option);

          this.setState({
            threadDetail: {
              ...this.state.threadDetail,
              isSubscriber: !this.state.threadDetail.isSubscriber
            }
          });
        } catch (error) {
          console.log(error);
        }
        this.setState({
          isLoadingSubscribe: false
        });
      });
    };
  }

  toCommentDetails(idComment) {
    this.props.navigator.push({
      screen: 'TemanDiabetes.CommentDetails',
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: {
        idThread: this.props.item._id,
        commentId: idComment,
        refreshThreadDetail: this.refreshPage
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
    const { threadDetail } = this.state;
    if (result(threadDetail, 'author._id') === this.props.dataAuth.currentUser._id) {
      return null;
    }
    if (this.state.isLoadingSubscribe) {
      return (
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            height: 25,
            minHeight: 25,
            backgroundColor: '#252c68',
            marginRight: 10
          }}
        >
          <ActivityIndicator color="#fff" size={Platform.OS === 'ios' ? 'small' : 1} />
        </View>
      );
    } else if (result(threadDetail, 'isSubscriber')) {
      return (
        <TouchableOpacity
          onPress={this.threadSubscription('unfollow')}
          style={{
            justifyContent: 'center',
            flex: 1.5,
            height: 25,
            minHeight: 25,
            backgroundColor: '#252c68',
            marginRight: 10
          }}
        >
          <Text
            style={{
            ...styles.buttonText,
            paddingHorizontal: 0
          }}
          >
            Berhenti Ikuti
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={this.threadSubscription('follow')}
        style={{
          justifyContent: 'center',
          flex: 1,
          height: 25,
          minHeight: 25,
          backgroundColor: '#252c68',
          marginRight: 10,
          padding: 0,
        }}
      >
        <Text style={styles.buttonText}>Ikuti</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { _id } = this.props.item;
    const { threadDetail, isProcess, commentList } = this.state;

    if (isProcess) {
      return (
        <Spinner containerStyle={{ backgroundColor: '#f2f4fd' }} color="#EF434F" size="large" />
      );
    }
    return (
      <View style={{ flex: 2, backgroundColor: color.solitude }}>
        {threadDetail === null ? (
          <View>
            <Spinner containerStyle={{ backgroundColor: '#f2f4fd' }} color="#EF434F" size="small" />
          </View>
        ) : (
          <HeaderDetail
            threadType={result(threadDetail, 'threadType')}
            categoryItem={result(threadDetail, 'category')}
            date={result(threadDetail, 'createdAt')}
            authorItem={result(threadDetail, 'author')}
          />
        )}
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
              {threadDetail === null ? 'Loading' : result(threadDetail, 'topic')}
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
            {threadDetail !== null ? this.renderButtonFollow() : null}
            <TouchableOpacity
              onPress={debounce(
                () => {
                  this.props.navigator.push({
                    screen: 'TemanDiabetes.ModalPostComment',
                    navigatorStyle: {
                      navBarHidden: true
                    },
                    passProps: {
                      idThread: _id,
                      refreshThreadDetail: this.refreshPage
                    }
                  });
                },
                500,
                { leading: true, trailing: false }
              )}
              style={{
                justifyContent: 'center',
                backgroundColor: '#252c68',
                height: 25,
                flex: 1,
                minHeight: 25,
                marginRight: 10
              }}
            >
              <Text style={styles.buttonText}>Balas</Text>
            </TouchableOpacity>
            {this.props.dataAuth.currentUser._id !== result(threadDetail, 'author._id') &&
            threadDetail !== null ? (
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
                  height: 25,
                  flex: 1,
                  minHeight: 25
                }}
              >
                <Text style={styles.buttonText}>Lapor</Text>
              </TouchableOpacity>
            ) : <View style={{ flex: 2 }} />}
          </View>
        </CardSection>
        <View style={{ flex: 1, paddingBottom: 0 }}>
          <ContentDetail
            threadId={this.props.item._id}
            threadItem={threadDetail}
            navigator={this.toCommentDetails}
            commentList={commentList.list}
            nextPageCommentList={this.nextPageCommentList}
            refreshPage={this.refreshPage}
            isLoadMore={this.state.isLoadMore}
          />
        </View>
        <View style={{ height: 40 }}>
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
    padding: 10,
    marginBottom: 0
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
  dataAuth: state.authReducer
});

export default connect(
  mapStateToProps,
  null
)(ThreadDetails);
