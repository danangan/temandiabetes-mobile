import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  ScrollView
} from 'react-native';
import { NavigationBar, CardSection, Avatar, Spinner } from '../../../components';
import CommentChild from '../threadDetails/commentChild';

class CommentDetails extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      params: 0,
      isComment: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const { commentDetails } = nextProps.dataThreads;
    if (commentDetails.data && this.state.isComment === null) {
      this.setState({
        isComment: commentDetails.data
      });
    }
  }

  renderCommentChild() {
    const { nama } = this.props.dataAuth;
    const { isComment } = this.state;
    const initialUser = {
			user: nama,
			text: 'Komentari'
    };
    
    return (
      <View stylw={{ flex: 1, width: '100%' }}>
        {
          isComment.replies.map((item, index) => <CommentChild key={index} containerStyle={styles.containerStyle} comment={item} />)
        }
        <CommentChild 
          containerStyle={{ 
            flex: 1, 
            flexDirection: 'row', 
            padding: 2, 
            alignItems: 'center',
            marginTop: 20, 
            marginHorizontal: 20, 
            borderBottomColor: '#f3f3f4', 
            borderBottomWidth: 1, 
            width: '100%' 
          }}
          comment={initialUser} 
        />
      </View>
    );
  }

  render() {
    // console.log('THIS STATE = ', this.state);
    const { isComment } = this.state;
    const { commentDetails } = this.props.dataThreads;
    
    if (commentDetails.data === null) {
      return (
        <View style={styles.container}>
          <Spinner 
            containerStyle={{ backgroundColor: '#f2f4fd' }}
            color="#FFDE00" 
            size="large"
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <NavigationBar
          onPress={() => this.props.navigator.pop()} title="COMMENTS"
        />
        <CardSection 
          containerStyle={{ 
            flex: 1, 
            flexDirection: 'column', 
            backgroundColor: '#fff', 
            marginTop: 20,
            marginHorizontal: 20,
            elevation: 3, 
            maxHeight: '50%',
            borderRadius: 20 
          }}
        >
          <View style={styles.innerContainer}>
            <Avatar
              avatarSize="Small"
              userName={isComment.user.nama}
              // imageSource='https://cdn-images-1.medium.com/fit/c/200/200/1*ulfSFHKUwRjNdueNEZbmog@2x.jpeg'
            />
            <View style={{ flex: 1, margin: 5 }}>
              <Text style={{ fontSize: 12 }}>{isComment.user.nama}</Text>
              <Text style={{ fontSize: 10 }}>a minutes ago</Text>
            </View>
          </View>
          <View style={styles.innerText}>
            <Text style={{ fontSize: 22 }}>
              { isComment.text }
            </Text>
          </View>
        </CardSection>
        {
          isComment.replies.length ?
          <ScrollView>
            <View style={styles.containerCommentChild}>
              {this.renderCommentChild()}
            </View>
          </ScrollView>
          :
          null
        }
        {/* <View style={{ 
          backgroundColor: '#fff',  
          }}
        >
          
        </View> */}
      </View>
    );
  }
}

const styles = {
  container: { 
    flex: 1, 
    backgroundColor: '#f3f5fe',
    paddingHorizontal: 10, 
    paddingVertical: 15 
  },
  innerContainer: {
		flex: 0.5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
    paddingTop: 15,
    // borderWidth: 1,
    // borderColor: '#000',
		paddingHorizontal: 15,
		borderRadius: 15
  },
  innerText: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 15,
    // borderWidth: 1,
    // borderColor: '#000',
		paddingHorizontal: 15,
		borderRadius: 15
	},
  wrapperButton: {
		marginVertical: 5,
		marginHorizontal: 1,
		alignItems: 'center',
    backgroundColor: '#252c68',
    borderRadius: 10,
	},
	titleButton: {
		fontSize: 12,
		color: '#8084a7',
		paddingHorizontal: 10
  },
  containerCommentChild: {
    flex: 1,
    position: 'relative',
    top: -45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20
  }, 
  containerStyle: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 2, 
    // backgroundColor: '#ff1200',
    marginTop: 20, 
    paddingVertical: 2,
    marginHorizontal: 25, 
    // borderBottomColor: '#f3f3f4', 
    // borderBottomWidth: 1, 
    width: '100%',
    borderRadius: 20
  }
};

const mapStateToProps = state => ({
  dataThreads: state.threadsReducer,
  dataAuth: state.authReducer.currentUser
});

export default connect(mapStateToProps, null)(CommentDetails);

