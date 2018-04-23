import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { View, TouchableOpacity, CameraRoll } from 'react-native';
import ImageBrowser from './ImageBrowser'
import randomizer from '../../utils/randomizer'
import { updateProfile } from '../../actions/profileActions'

class ImageUploader extends Component {
  constructor(props){
    super(props)
    this.state = {
      photos: [],
      modalVisible: false,
      isLoading: false
    }
  }

  getImages() {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
    .then(res => {
      this.setState({ photos: res.edges, modalVisible: true });
    })
    .catch((err) => {
      console.log(err)
       //Error Loading Images
    });
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  async onSelectedImage(idx) {
    // trigger the loading
    this.setState({ isLoading: true })
    const imgURI = this.state.photos[idx].node.image.uri
    try {
      // generate random image name
      const filename = `${randomizer()}.png`;
      // uploading to firebase storage
      const result = await firebase.storage().ref().child(`users/${filename}`).putFile(imgURI);

      const payload = {
        _id: this.props.currentUserId,
        foto_profile: result.downloadURL
      }
      // update the redux
      await this.props.updateProfile(payload)
      // turn off the loader and closing modal
      this.setState({ isLoading: false, modalVisible: false,  })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { style, children } = this.props
    const { modalVisible, photos, isLoading} = this.state
    // main content
    return (
      <View style={ style }>
        <TouchableOpacity
          onPress={ () => { this.getImages() } }
        >
          { children }
        </TouchableOpacity>
        <ImageBrowser
          isLoading={ isLoading }
          photos={ photos }
          modalVisible={ modalVisible }
          onSelectedImage={ (idx) => { this.onSelectedImage(idx) } }
          closeModal={ () => { this.toggleModal() } }
        >
        </ImageBrowser>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
	updateProfile: userData => dispatch(updateProfile(userData))
});

const mapStateToProps = state => ({
	currentUserId: state.authReducer.currentUser._id
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);

