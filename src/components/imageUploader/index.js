import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import { View, TouchableOpacity } from 'react-native';
import ImageBrowser from './ImageBrowser'
import { randomizer } from '../../utils/helpers'
import { updateProfile } from '../../actions/profileActions'

const imagePickerOption = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class ImageUploader extends Component {
  constructor(props){
    super(props)
  }

  getImages() {
    ImagePicker.showImagePicker(imagePickerOption, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // not error and then checking the max file size
        const maxFileSize = 5*1024*1024 // 5MB
        if (response.fileSize <= maxFileSize)
        {
          this.props.updateLoadingState(true, () => {
            this.onSelectedImage(response.uri)
          })
        } else {
          alert('Maksimal ukuran file adalah 5MB')
        }
      }
    });
  }

  async onSelectedImage(imgURI) {
    // trigger the loading
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
      this.props.updateLoadingState(false)

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { style, children } = this.props
    // main content
    return (
      <View style={ style }>
        <TouchableOpacity
          onPress={ () => { this.getImages() } }
        >
          { children }
        </TouchableOpacity>
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

