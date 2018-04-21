import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { Avatar, } from '../../components';

import BookMark from '../../assets/icons/bookmark.png';
import ShareBtn from '../../assets/icons/share.png';

class CardResult extends React.Component {
  render() {
    const { topic, author } = this.props.threads.item;
    console.log('PROPS CARD ', this.props.threads);
    return (
      <TouchableOpacity 
        onPress={() => {
          this.props.onNavigate(this.props.threads);
          this.props.toSaveUserSearch();
        }}
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
              <Text style={styles.currentSearch}>{topic}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar
                  avatarSize="ExtraSmall"
                  imageSource='http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg'
                />
                <View style={{ margin: 5 }}>
                  <Text style={{ fontSize: 10 }}>{author.nama}</Text>
                  <Text style={{ fontSize: 8 }}>{author.createdAt}</Text>
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

export default CardResult;
