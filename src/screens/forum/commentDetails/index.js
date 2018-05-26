import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { NavigationBar, CardSection, Avatar, Spinner } from '../../../components';
import CommentChild from '../threadDetails/commentChild';
import { 
  commentToReply, 
  getCommentDetails, 
  getThreadDetails 
} from '../../../actions/threadActions';

class CommentDetails extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      params: 0,
      isComment: null,
      komentar: '',
      isSubmit: false
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

  componentDidUpdate() {
    const { status_code } = this.props.dataThreads.createComment.commentToReply;
    const { data } = this.props.dataThreads.commentDetails;
    if (status_code === 201 && this.state.isSubmit) {
      // get thread details again
      // this.props.getCommentDetails(data._id);

      this.setState({
        isSubmit: false
      }, () => {
        this.props.navigator.pop();
        this.props.getThreadDetails(this.props.idThread);
        // alert('Comment berhasil');
      });
    }
  }

  onSubmitComment() {
    const { currentUser } = this.props.dataAuth;
    const { data } = this.props.dataThreads.commentDetails;
    console.log('BERRREEE ', data);
    console.log('USER CURRENT ', currentUser);
   if (this.state.komentar !== '') {
    this.setState({
      isSubmit: true
    }, () => {
      const comment = {
        idComment: data._id,
        params: {
          user: currentUser._id,
          text: this.state.komentar
        }
      };
      this.props.commentToReply(comment);
    });
   } else {
    alert('Silahkan input komentar Anda.');
   }
  }

  renderCommentChild() {
    const { nama } = this.props.dataAuth;
    const { isComment } = this.state;

    return (
      <View style={{ flex: 1, width: '100%' }}>
        {
          isComment.replies.map((item, index) => <CommentChild key={index} containerStyle={styles.containerStyle} comment={item} />)
        }
        <View style={styles.innerContainer}>
          <Avatar
            avatarSize="ExtraSmall"
            userName={nama}
            // imageSource={isComment.user.foto_profile}
          />
          <TextInput 
            value={this.state.komentar}
            placeholder="Komentari"
            style={{ flex: 1, margin: 5 }}
            underlineColorAndroid={'#fff'}
            onChangeText={(komentar) => this.setState({ komentar })}
          />
          <TouchableOpacity
            style={{ backgroundColor: '#252c68' }}
            onPress={() => this.onSubmitComment()}
          >
            <Text
              style={{
                fontSize: 12,
                paddingHorizontal: 20,
                paddingVertical: 3,
                color: '#8084a7'
              }}
            >Balas</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    console.log('THIS PROPS = ', this.props);
    const { isComment } = this.state;
    const { commentDetails } = this.props.dataThreads;
    const { nama } = this.props.dataAuth;

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
              imageSource={isComment.user.foto_profile}
            />
            <View style={{ flex: 1, margin: 5 }}>
              <Text style={{ fontSize: 12 }}>{isComment.user.nama}</Text>
              <Text style={{ fontSize: 10 }}></Text>
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
          <View style={styles.containerCommentChild}>
              <View style={styles.innerContainer}>
              <Avatar
                avatarSize="ExtraSmall"
                userName={nama}
                // imageSource={isComment.user.foto_profile}
              />
              <TextInput 
                value={this.state.komentar}
                placeholder="Komentari"
                style={{ flex: 1, margin: 5 }}
                underlineColorAndroid={'#fff'}
                onChangeText={(komentar) => this.setState({ komentar })}
              />
              <TouchableOpacity
                style={{ backgroundColor: '#252c68' }}
                onPress={() => this.onSubmitComment()}
              >
                <Text
                  style={{
                    fontSize: 12,
                    paddingHorizontal: 20,
                    paddingVertical: 3,
                    color: '#8084a7'
                  }}
                >Balas</Text>
              </TouchableOpacity>
            </View>
          </View>
          
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
		paddingHorizontal: 15,
		borderRadius: 20
  },
  innerText: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 15,
		paddingHorizontal: 15,
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
    top: -20,
    paddingTop: 20,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    borderBottomColor: '#f3f3f4',
    borderBottomWidth: 1,
    borderRadius: 20
  }
};

const mapStateToProps = state => ({
  dataThreads: state.threadsReducer,
  dataAuth: state.authReducer
});

const mapDispatchToProps = dispatch => ({
  commentToReply: (comment) => dispatch(commentToReply(comment)),
  getCommentDetails: (idComment) => dispatch(getCommentDetails(idComment)),
  getThreadDetails: (idThread) => dispatch(getThreadDetails(idThread)),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentDetails);

