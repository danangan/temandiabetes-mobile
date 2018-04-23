import React, { Component } from 'react';
import { Spinner } from '../Spinner';
import { NavigationBar } from '../NavigationBar';
import {
  Modal,
  View,
  ScrollView,
  Button,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Image } from 'react-native';
const { width } = Dimensions.get('window')
import color from '../../style/color';

// SET THE IMAGE PROPERTY HERE
const IMAGE_MARGIN = 1;
const WRAPPER_WIDTH = 5;
const IMAGE_BORDER_WIDTH = 0;

class ImageBrowser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: null
    }
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }

  render() {
    const { modalVisible, closeModal, photos, isLoading } = this.props
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => console.log('closed')}
      >
        <View style={styles.modalContainer}>
          {
            isLoading &&
            <Spinner
              color="red"
              text="Uploading image..."
              size="large"
            />
          }
          <View style={ { marginLeft: 10, marginRight: 10, marginBottom: 10 } }>
            <NavigationBar
              onPress={closeModal}
              title="Browse Images" />
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollView}>
            {
              photos.map((p, i) => {
                return (
                  <TouchableHighlight
                    style={[styles.images, {opacity: i === this.state.index ? 0.5 : 1}]}
                    key={i}
                    underlayColor='transparent'
                    onPress={() => this.setIndex(i)}
                  >
                    <Image
                      style={{
                        width: width/3 - 2*IMAGE_MARGIN - WRAPPER_WIDTH*2/3 - IMAGE_BORDER_WIDTH*2,
                        height: width/3 - 2*IMAGE_MARGIN - WRAPPER_WIDTH*2/3 - IMAGE_BORDER_WIDTH*2
                      }}
                      source={{uri: p.node.image.uri}}
                    />
                  </TouchableHighlight>
                )
              })
            }
          </ScrollView>
          {
            this.state.index !== null  && (
              <View style={styles.selectButton}>
                <Button
                  disabled={isLoading}
                  color={color.red}
                  title='Select Image'
                  onPress={ () => { this.props.onSelectedImage(this.state.index); this.setState({ index: null }) } }
                />
              </View>
            )
          }
        </View>
      </Modal>
    )
  }
}

styles = StyleSheet.create({
  modalContainer: {
    paddingTop: 20,
    flex: 1
  },
  images: {
    margin: IMAGE_MARGIN,
    borderColor: 'gray',
    borderWidth: IMAGE_BORDER_WIDTH,
  },
  scrollView: {
    padding: WRAPPER_WIDTH,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

})

export default ImageBrowser
