import React from 'react';

import {
  View,
  Text,
  Platform,
  FlatList,
  ActivityIndicator
} from 'react-native';

import {
  dateFormateName,
  formatTimeFromDate
} from '../../utils/helpers';

import { 
  getUserRecentThread, 
  getUserRecentComment,
  getUserRecentActivityResponse 
} from '../../actions/recentActivityAction';

class TabRecentActivityResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      refreshing: false,
      isLoadMorePage: false
    };
  }

  renderPreviewResponse(response) {
    switch (response.activityType) {
      case 'comment':
        return `Anda telah memberikan komentar pada ${response.comment.text}`; 
      case 'reply_comment':
        return `Anda telah membalas komentar pada ${response.comment.text}`;
      case 'follow':
        return `Anda telah mengikuti ${response.thread.topic}`;
      case 'unfollow':
        return 'Anda berhenti mengikuti...';
      case 'drug_reminder': 
        return 'Anda telah membuat pengingat obat';
      case 'sender_innercircle':
        return 'Anda telah mengirimkan permintaan pertemanan ke';
      default:
        return '';
    }
  }

  renderItem(dataResponse) {
    // console.log('dataResponse ', dataResponse);
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
              { dateFormateName(dataResponse.item.createdAt) }
            </Text>
            <Text 
              style={{
                color: '#AFAFAF'
              }}
            >
              
              { formatTimeFromDate(dataResponse.item.createdAt, '.') }
            </Text>
          </View>
          <Text 
            style={{
              marginTop: 5
            }}
          >
            { this.renderPreviewResponse(dataResponse.item) }
          </Text>
        </View>
      </View>
    );
  }

  renderFooter() {
    // const { page, pages } = this.props.dataThreads.listThreads.item;

    const Loader = (
      <View style={styles.loadMoreContent}>
        <ActivityIndicator color="#EF434F" size={25} />
      </View>
    );

    return (
      <View style={styles.loadMoreContainer}>
        { this.state.isLoadMorePage ? Loader : <View /> }
      </View>
    );
  }

  onEndReached() {
    this.setState({
      isLoadMorePage: true,
      page: this.state.page + 1
    }, () => {
      // const { page, pages } = this.props.dataThreads.item
      this.props.getThreadStatic(this.state.page);
    });
  }

  render() {
    const { listActivity } = this.props;
    
    return (
      <FlatList
        // ListEmptyComponent={this.renderEmptySection}
        // ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        data={listActivity}
        renderItem={item => this.renderItem(item)}
        refreshing={this.state.refreshing}
        // onRefresh={this.handleRefresh}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.3}
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
		backgroundColor: '#fff',
  },
  loadMoreContent: {
    marginVertical: 10,
    height: 25
  },
};

export default TabRecentActivityResponse;
