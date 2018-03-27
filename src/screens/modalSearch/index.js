import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { searchThread } from '../../actions/threadActions';
import { TextField, Avatar } from '../../components';
import searchIcon from '../../assets/icons/close.png';
import Blood from '../../assets/icons/explorer_icon.png';
import BookMark from '../../assets/icons/bookmark.png';
import ShareBtn from '../../assets/icons/share.png';
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
  }

  changesKeyword = async (e) => {
    const token = await AsyncStorage.getItem(authToken);
    this.setState({ searchKeyword: e }, () => {
      this.props.searchThread(e, token);
    });
  }

  toRenderHeader() {
    const { searchResult } = this.props.dataThreads;
    return (
      <View>
        <View 
          style={{ 
            flex: 1, 
            width: '100%',
            height: 70,
            justifyContent: 'flex-start',
            alignItems: 'center', 
            elevation: 4,
            position: 'absolute',
            borderWidth: 1,
            borderColor: '#ccc',
            paddingHorizontal: 20,
            margin: 0
          }}
        >
          <TextField
            onChangeText={this.changesKeyword}
            autoFocus
            leftIcon={Blood}
            rightIcon={searchIcon}
            onPressRight={() => Navigation.dismissModal({
              animationType: 'slide-down' 
            })}
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
          searchResult.data.length === 0 && this.state.searchKeyword === '' ?
            <View style={{ flex: 2, paddingHorizontal: 20, paddingTop: 20, marginVertical: 60 }}>
              <Text style={styles.titleElement}>Pencarian Terakhir</Text>
              <View style={{ paddingVertical: 10, marginVertical: 0 }}>
                <Text style={styles.currentSearch}>Diabetes</Text>
                <Text style={[styles.currentSearch, { paddingVertical: 5 }]}>Gula</Text>
                <Text style={styles.currentSearch}>DNurse</Text>
              </View>
              <Text style={[styles.titleElement, { paddingVertical: 10 }]}>Rekomendasi Untuk Anda</Text>
            </View>
            :
            <FlatList 
              data={searchResult.data}
              renderItem={(item) => this.toRenderItem(item)}
            />
          }
      </View>
    );
  }

  toRenderItem(res) {
    console.log("ITEM INI", res)
    return (
      <TouchableOpacity 
        key={res.index}
        onPress={() =>
					this.props.navigator.push({
						screen: 'TemanDiabets.ThreadDetails',
						navigatorStyle: {
							navBarHidden: true,
						},
						passProps: res
					})
				}
        style={{ flex: 2, paddingHorizontal: 20, paddingTop: 20 }}>
        <View 
          style={{ 
            flex: 1, 
            flexDirection: 'row', 
            borderRadius: 5,
            elevation: 4,
            borderBottom: 0.5, 
            borderBottomColor: '#b6b6b6', 
            justifyContent: 'flex-start', 
            alignItems: 'center', 
            marginVertical: 5,
            height: 120
          }}
        >
          <View style={{ height: 100, width: 100 }}>
            {/* <Image 
              resizeMode={'center'}
              style={{ width: '100%', height: '100%' }}
              source={{ uri: 'https://johnkoessler.files.wordpress.com/2014/04/blackbox2.jpg' }}
            /> */}
            <View style={{ width: '100%', height: '100%', backgroundColor: '#000' }}/>
          </View>
          <View style={{ width: '75%', padding: 20 }}>
            <View>
              <Text style={styles.currentSearch}>{res.item.topic}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar
                  avatarSize="ExtraSmall"
                  imageSource='http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg'
                />
                <View style={{ margin: 5 }}>
                  <Text style={{ fontSize: 10 }}>{res.item.author.nama}</Text>
                  <Text style={{ fontSize: 8 }}>12 January 2018</Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <View style={{ height: 20, width: 20 }}>
                  <Image 
                    resizeMode={'center'}
                    style={{ width: '100%', height: '100%' }}
                    source={ShareBtn}
                  />
                </View>
                <View style={{ height: 20, width: 20 }}>
                  <Image 
                    resizeMode={'center'}
                    style={{ width: '100%', height: '100%' }}
                    source={BookMark}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  handleExtraData() {
    const { searchResult } = this.props.dataThreads;
    if (searchResult.data.length === 0 && this.state.searchKeyword === '') {
      return this.state.nums;
    } 
    return searchResult.data;
  }
  
  render() {   
   
    return (
      <View 
        style={styles.container}
      >
        {this.toRenderHeader()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 3, 
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
