import React from 'react';
import { connect } from 'react-redux';
import { result } from 'lodash';
import { View, Text, Platform, FlatList } from 'react-native';

import { dateFormateName, formatTimeFromDate } from '../../utils/helpers';
import Style from '../../style/defaultStyle';
import { getUserRecentActivityResponse } from '../../actions/recentActivityAction';
import { Spinner } from '../../components';

class TabRecentActivityResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      refreshing: false,
      isLoadMorePage: false
    };
    this.renderFooter = this.renderFooter.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }

  componentDidMount() {
    this.toGetRecenteResponse();
  }

  onEndReached() {
    const { page } = this.state;
    const { userId } = this.props;
    const { recentResponse } = this.props.dataActivity;

    if (recentResponse.status_code !== 400) {
      this.setState(
        {
          isLoadMorePage: true,
          page: this.state.page + 1
        },
        () => {
          // const { page, pages } = this.props.dataThreads.item
          this.props.getUserRecentActivityResponse(userId, page, 10);
        }
      );
    }
  }

  async toGetRecenteResponse(cb = () => {}) {
    const { userId } = this.props;
    const { page } = this.state;
    await this.props.getUserRecentActivityResponse(userId, page, 10);
    cb();
  }

  renderFooter() {
    const { recentResponse } = this.props.dataActivity;
    const Loader = (
      <View style={styles.loadMoreContent}>
        <Spinner color="#EF434F" size="large" />
      </View>
    );

    return (
      <View style={styles.loadMoreContainer}>
        {recentResponse.status_code !== 400 ? Loader : <View />}
      </View>
    );
  }

  renderItem(dataResponse) {
    return (
      <View style={{ padding: 1 }}>
        <View style={styles.notificationWrapper}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={{
                color: '#354052',
                fontWeight: 'bold'
              }}
            >
              {dateFormateName(dataResponse.item.createdAt)}
            </Text>
            <Text
              style={{
                color: '#AFAFAF'
              }}
            >
              {formatTimeFromDate(dataResponse.item.createdAt, '.')}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 5
            }}
          >
            {this.renderPreviewResponse(dataResponse.item)}
          </Text>
        </View>
      </View>
    );
  }

  renderPreviewResponse(response) {
    switch (response.activityType) {
      case 'comment':
        return `Anda telah membuat komentar "${response.comment.text}"`;
      case 'reply_comment':
        return `Anda telah membalas komentar dengan "${result(response.replyComment, 'text')}"`;
      case 'follow':
        return `Anda telah mengikuti thread "${response.thread.topic}"`;
      case 'unfollow':
        return `Anda telah berhenti mengikuti thread "${response.thread.topic}"`;
      case 'drug_reminder':
        return 'Anda telah membuat pengingat obat';
      case 'sender_innercircle':
        return `Anda telah mengirimkan permintaan pertemanan ke "${response.innerCircle.name}"`;
      default:
        return '';
    }
  }

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
        page: 1
      },
      () => {
        this.toGetRecenteResponse(() => {
          this.setState({
            refreshing: false
          });
        });
      }
    );
  };

  render() {
    const { recentResponse } = this.props.dataActivity;
    // recentResponse.status_code === 201 &&
    if (recentResponse.data.length === 0) {
      return (
        <View style={styles.messageEmpty}>
          <Text style={styles.textHistory}>Tidak ada riwayat aktivittas Anda</Text>
        </View>
      );
    }

    return (
      <FlatList
        // ListFooterComponent={this.renderFooter}
        data={recentResponse.data}
        renderItem={item => this.renderItem(item)}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={1}
      />
    );
  }
}

const styles = {
  notificationWrapper: {
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2.5
      }
    }),
    marginHorizontal: 10,
    marginBottom: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: '#fff'
  },
  loadMoreContent: {
    marginVertical: 10,
    height: 25
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
  dataActivity: state.recentActivityReducer,
  dataAuth: state.authReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
  getUserRecentActivityResponse: (idUser, page, limit) =>
    dispatch(getUserRecentActivityResponse(idUser, page, limit))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabRecentActivityResponse);
