import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Modal, FlatList, AsyncStorage, ScrollView, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { searchThread } from '../../actions/threadActions';
import { TextField, Avatar } from '../../components';
import CardResult from './CardResult';
import searchIcon from '../../assets/icons/close.png';
import Blood from '../../assets/icons/explorer_icon.png';

import { authToken } from '../../utils/constants';

class ModalSearch extends React.Component {
  static navigatorStyle = {
		navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      nums: [1, 2, 3, 4, 5, 6],
      searchKeyword: '',
    };
    this.changesKeyword = this.changesKeyword.bind(this);
    this.toThreadDetails = this.toThreadDetails.bind(this);
  }

  changesKeyword = async (e) => {
    const token = await AsyncStorage.getItem(authToken);
    this.setState({ searchKeyword: e }, () => {
      this.props.searchThread(e, token);
    });
  }

  // toRenderHeader() {
  //   const { searchResult } = this.props.dataThreads;
  //   return (
  //     <View>
        
        
  //     </View>
  //   );
  // }

  toRenderItem(res) {
    console.log("ITEM INI", res)
    
  }

  handleExtraData() {
    const { searchResult } = this.props.dataThreads;
    if (searchResult.data.length === 0 && this.state.searchKeyword === '') {
      return this.state.nums;
    } 
    return searchResult.data;
  }

  // renderRecentSearch() {
  //   return (
      
  //   )
  // }

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
        <View style={{ flex: 2, paddingHorizontal: 20, marginVertical: 60 }}>
          <Text style={styles.titleElement}>Pencarian Terakhir</Text>
          <View style={{ paddingVertical: 10, marginVertical: 0 }}>
            <Text style={styles.currentSearch}>Diabetes</Text>
            <Text style={[styles.currentSearch, { paddingVertical: 5 }]}>Gula</Text>
            <Text style={styles.currentSearch}>DNurse</Text>
          </View>
          <Text style={[styles.titleElement, { paddingVertical: 10 }]}>Rekomendasi Untuk Anda</Text>
        </View>
      );
    } else if (searchResult.data.length === 0) {
      if (searchResult.status_code === 200) {
        return (
          <View>
            <Text>Opppss.. Pencarian Anda tidak ditemukan.</Text>
          </View>
        );
      } else {
        return (
          <View>
            <Text>Mohon menunggu....</Text>
          </View>
        );
      }
    }
    return (
      <View>
        <ScrollView>
          {
            searchResult.data.map((item, index) => (
              <CardResult 
                key={index} 
                result={item}
                onNavigate={this.toThreadDetails} 
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
  
  render() {   
    console.log('PROPS SEARCH INDEX', this.props);
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
            padding: 15
          }}
        >
          <TextField
            onChangeText={this.changesKeyword}
            autoFocus
            leftIcon={Blood}
            rightIcon={searchIcon}
            // onPressRight={() => Navigation.dismissModal({
            //   animationType: 'slide-down' 
            // })}
            onPressRight={() => this.props.navigator.pop()}
            placeholder={'Cari post, pengguna'}
            underlineColorAndroid={'#fff'}
            sectionStyle={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 5,
              margin: 0
            }}
            inputStyle={{ color: '#b6b6b6', fontSize: 12, backgroundColor: '#fff' }}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalSearch);
