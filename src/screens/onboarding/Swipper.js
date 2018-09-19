import React, { Component } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { debounce } from '../../utils/helpers';
import Button from './Button';

// deteksi screen yang render width dan height
// declaring new variables to avoid confusion with state
const dimension = Dimensions.get('window');
const screenHeight = dimension.height;
const screenWidth = dimension.width;

export default class OnboardingScreens extends Component {
  // Props for ScrollView component
  constructor(props) {
    super(props);

    this.state = {
      // button
      index: 0
    };

    // Component internals as a class property,
    // and not state to avoid component re-renders when updated
    this.internals = {
      offset: 0,
      isScrolling: false
    };
  }

  /**
   * Scroll begin handler
   * @param {object} e native event
   */
  onScrollBegin = e => {
    // Update internal isScrolling state
    this.internals.isScrolling = true;
  };

  /**
   * Scroll end handler
   * @param {object} e native event
   */

  onScrollEnd = e => {
    // Update internal isScrolling state
    this.internals.isScrolling = false;

    // Update index
    this.updateIndex(
      e.nativeEvent.contentOffset
        ? e.nativeEvent.contentOffset.x
        : // When scrolled with .scrollTo() on Android there is no contentOffset
          e.nativeEvent.position * this.state.width
    );
  };

  /*
   * Drag end handler
   * @param {object} e native event
   */
  onScrollDrag = e => {
    const {
      contentOffset: { x: newOffset }
    } = e.nativeEvent;
    const { index, total } = this.state;
    const { offset } = this.internals;

    // Update internal isScrolling state
    // if swiped right on the last slide
    // or left on the first one
    if (offset === newOffset && (index === 0 || index === total - 1)) {
      this.internals.isScrolling = false;
    }
  };

  updateIndex = offset => {
    const { index, width } = this.state;
    const diff = offset - this.internals.offset;
    // Do nothing if offset didn't change
    if (diff === 0) {
      return;
    }

    const totalPages = this.props.children.length;

    const totalScreenWidth = totalPages * screenWidth;

    let newIndex = 0;
    for (let i = 0; i < totalPages; i++) {
      const prevScreenOffset = i * screenWidth;
      const currentScreenOffset = (i + 1) * screenWidth;
      if (offset >= prevScreenOffset && offset < currentScreenOffset) {
        newIndex = i;
      }
    }

    // Update internal offset
    this.internals.offset = offset;
    // Update index in the state
    this.setState({
      index: newIndex
    });
  };

  /**
   * Swipe one slide forward
   */
  swipe = () => {
    // Ignore if already scrolling or if there is less than 2 slides
    if (this.internals.isScrolling || this.state.total < 2) {
      return;
    }

    const state = this.state,
      diff = this.state.index + 1,
      x = diff * state.width,
      y = 0;

    // Call scrollTo on scrollView component to perform the swipe
    this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });

    // Update internal scroll state
    this.internals.isScrolling = true;

    if (Platform.OS === 'android') {
      setImmediate(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff
          }
        });
      });
    }
  };

  /**
   * Render ScrollView component
   * @param {array} slides to swipe through
   */

  renderScrollView = pages => {
    const config = {
      horizontal: true,
      pagingEnabled: true,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      bounces: false,
      scrollsToTop: false,
      removeClippedSubviews: true,
      automaticallyAdjustContentInsets: false
    };
    return (
      <ScrollView
        ref={component => {
          this.scrollView = component;
        }}
        {...config}
        contentContainerStyle={([styles.wrapper], this.props.style)}
        onScrollBeginDrag={this.onScrollBeginDrag}
        onMomentumScrollEnd={this.onScrollEnd}
        onScrollEndDrag={this.onScrollEndDrag}
      >
        {pages.map((page, i) => (
          <View style={[styles.fullScreen, styles.slide]} key={i}>
            {page}
          </View>
        ))}
      </ScrollView>
    );
  };

  /**
   * Render pagination indicators
   */

  renderPagination = () => {
    if (this.props.children.length <= 1) {
      return null;
    }
    const ActiveDot = <View style={[styles.dot, styles.activeDot]} />,
      Dot = <View style={styles.dot} />;

    const dots = [];
    for (let key = 0; key < this.props.children.length; key++) {
      dots.push(
        key === this.state.index
          ? // Active dot
            React.cloneElement(ActiveDot, { key })
          : // Other dot
            React.cloneElement(Dot, { key })
      );
    }

    return (
      <View pointerEvents="none" style={[styles.pagination, styles.fullScreen]}>
        {dots}
      </View>
    );
  };

  /**
   * Render Continue or Done button
   */
  /*
   {lastScreen
     // Show this button on the last screen
     //  Add a handler that would send a user to your app after onboarding is complete
     ? <Button text="Start Now" onPress={() => console.log('Send me to the app')} />
     // Or this one otherwise
     : <Button text="Continue" onPress={() => this.swipe()} />
   }
   */
  renderButton = () => {
    const lastScreen = this.state.index === this.state.total - 1;
    return (
      <View pointerEvents="box-none" style={[styles.buttonWrapper, styles.fullScreen]}>
        <Button
          text="Daftar"
          backGroundColor="#ef434f"
          colorText="#fff"
          actionBtn={debounce(
            () =>
              this.props.navigation.push({
                screen: 'TemanDiabetes.RegisterScreen',
                navigatorStyle: {
                  navBarHidden: true
                },
                passProps: {
                  fcmToken: this.props.fcmToken
                }
              }),
            500,
            { leading: true, trailing: false }
          )}
        />
        <View style={{flex: 1}}/>
        <Button
          text="Masuk"
          backGroundColor="#fff"
          colorText="#ef434f"
          actionBtn={debounce(
            () =>
              this.props.navigation.push({
                screen: 'TemanDiabetes.LoginScreen',
                navigatorStyle: {
                  navBarHidden: true
                },
                passProps: {
                  fcmToken: this.props.fcmToken
                }
              }),
            500,
            { leading: true, trailing: false }
          )}
        />
      </View>
    );
  };

  render = ({ children } = this.props) => (
    <View style={[styles.container, styles.fullScreen]}>
      {/* Render Screen */}
      {this.renderScrollView(children)}
      {/* Render pagination */}
      {this.renderPagination()}
      {/* Render Continue or Done button */}
      {this.renderButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  // Set width and height to the screen size
  fullScreen: {
    width: screenWidth,
    height: screenHeight
  },
  // Main container
  container: {
    backgroundColor: 'transparent',
    position: 'relative'
  },
  // Slide
  slide: {
    backgroundColor: 'transparent'
  },
  // Pagination indicators
  pagination: {
    position: 'absolute',
    bottom: 110,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  // Pagination dot
  dot: {
    backgroundColor: 'rgba(0,0,0,.25)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  // Active dot
  activeDot: {
    backgroundColor: '#ef434f'
  },
  // Button wrapper
  buttonWrapper: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 40,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  }
});
