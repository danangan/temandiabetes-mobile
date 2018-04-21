import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';
import { searchThread, saveUserSearch  } from '../../actions/threadActions';
import { TextField } from '../../components';
import CardResult from './CardResult';
import searchIcon from '../../assets/icons/close.png';
import Blood from '../../assets/icons/explorer_icon.png';

import { authToken, keywordRecent } from '../../utils/constants';

class ModalSearch extends React.Component {
  static navigatorStyle = {
		navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      nums: [1, 2, 3, 4, 5, 6],
      searchKeyword: '',
      recentSearch: []
    };
    this.changesKeyword = this.changesKeyword.bind(this);
    this.toThreadDetails = this.toThreadDetails.bind(this);
    this.toSaveUserSearch = this.toSaveUserSearch.bind(this);
  }

  componentDidMount() {
    this.getSearchRecent();
  }

  getSearchRecent = async () => {
    const keyword = await AsyncStorage.getItem(keywordRecent);
    if (keyword !== null) {
      const toArray = keyword.split(',');
      this.setState({
        recentSearch: toArray
      });
    }
  }

  changesKeyword = async (e) => {
    const token = await AsyncStorage.getItem(authToken);
    this.setState({ searchKeyword: e }, () => {
      this.props.searchThread(e, token);
    });
  }

  toSaveUserSearch() {
    this.props.saveUserSearch(this.state.searchKeyword);
  }

  toRenderItem(threads) {
    return (
      <CardResult 
        // key={index} 
        threads={threads}
        onNavigate={this.toThreadDetails} 
        toSaveUserSearch={this.toSaveUserSearch}
      />
    );
  }

  handleExtraData() {
    const { searchResult } = this.props.dataThreads;
    if (searchResult.data.length === 0 && this.state.searchKeyword === '') {
      return this.state.nums;
    } 
    return searchResult.data;
  }

  toThreadDetails(threads) {
    this.props.navigator.push({
      screen: 'TemanDiabets.ThreadDetails',
      navigatorStyle: {
        navBarHidden: true,
      },
      passProps: threads
    });
  }

  renderSearch() {
    const { searchResult } = this.props.dataThreads;
    if (this.state.searchKeyword === '') {
      return (
        <View style={{ flex: 2, paddingHorizontal: 20, marginVertical: 10 }}>
          <Text style={styles.titleElement}>Pencarian Terakhir</Text>
          <View style={{ paddingVertical: 10, marginVertical: 0 }}>
            {
              this.state.recentSearch.length === 0 ? <Text>Loading...</Text> :
              this.state.recentSearch.map((recent, index) => (
                <Text 
                  key={index} 
                  style={[styles.currentSearch, index === 1 ? { paddingVertical: 5 } : '']}
                >
                  {recent}
                </Text>
              ))
            }
            {/* <Text style={[styles.currentSearch, ]}>Gula</Text>
            <Text style={styles.currentSearch}>DNurse</Text> */}
          </View>
          <Text style={[styles.titleElement, { paddingVertical: 10 }]}>Rekomendasi Untuk Anda</Text>
        </View>
      );
    } else if (searchResult.data.length === 0) {
      if (searchResult.status_code === 200) {
        return (
          <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Light', fontSize: 14 }}>Opppss.. Pencarian Anda tidak ditemukan.</Text>
          </View>
        );
      } else {
        return (
          <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="rgb(239, 67, 79)" />
          </View>
        );
      }
    }
    return (
      <View>
        <FlatList 
          data={searchResult.data}
          renderItem={item => this.toRenderItem(item)}
        />
      </View>
    );
  }
  
  render() {   
    console.log('STATE SEARCH RECENT', this.state.recentSearch);
    return (
      <View 
        style={styles.container}
      >
        <View 
          style={{ 
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingVertical: 10,
            paddingHorizontal: 15,
            elevation: 8,
          }}
        >
          <TextField
            onChangeText={this.changesKeyword}
            autoFocus
            leftIcon={Blood}
            rightIcon={searchIcon}
            onPressRight={() => this.props.navigator.pop()}
            placeholder={'Cari post, pengguna'}
            underlineColorAndroid={'#fff'}
            sectionStyle={{
              marginTop: 10,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 5,
              margin: 0
            }}
            inputStyle={{ fontFamily: 'OpenSans-Regular', color: '#b6b6b6', fontSize: 14, backgroundColor: '#fff' }}
          />
        </View>
        {
          this.renderSearch()
        }
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1, 
    backgroundColor: '#fff', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start' 
  },
  titleElement: { 
    color: '#ccc', 
    fontSize: 16, 
    fontFamily: 'Montserrat-Light' 
  },
  currentSearch: {
    color: '#000', 
    fontSize: 16, 
    fontFamily: 'Montserrat-Light' 
  }
};

const mapStateToProps = state => ({
	dataThreads: state.threadsReducer,
});

const mapDispatchToProps = dispatch => ({
  searchThread: (keyword, token) => dispatch(searchThread(keyword, token)),
  saveUserSearch: (keyword) => dispatch(saveUserSearch(keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalSearch);
