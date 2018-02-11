import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import Button from './Button';

// deteksi screen yang render width dan height
const { width, height } = Dimensions.get('window');

export default class OnboardingScreens extends Component {

  // Props for ScrollView component
  static defaultProps = {
    horizontal: true,

    pagingEnabled: true,

    showsHorizontalScrollIndicator: false,

    showsVerticalScrollIndicator: false,

    bounces: false,

    scrollsToTop: false,
    // Remove offscreen child views
    removeClippedSubviews: true,

    automaticallyAdjustContentInsets: false,

    index: 0
  };

  state = this.initState(this.props);

  /**
  * Initialize the state
  */

  initState(props) {
    // Get the total number of slides passed as children
    const total = props.children ? props.children.length || 1: 0,
      // Current index
      index = total > 1 ? Math.min(props.index, total - 1) : 0,
      // Current offset
      offset = width * index;

      const state = {
        total,
        index,
        offset,
        width,
        height
      };

      // Component internals as a class property,
      // and not state to avoid component re-renders when updated
      this.internals = {
        isScrolling: false,
        offset
      };

      return state;
  }

  /**
   * Scroll begin handler
   * @param {object} e native event
   */
  onScrollBegin = (e) => {
    // Update internal isScrolling state
    this.internals.isScrolling = true;
  }

  /**
   * Scroll end handler
   * @param {object} e native event
   */

  onScrollEnd = (e) => {
    // Update internal isScrolling state
    this.internals.isScrolling = false;

    // Update index
    this.updateIndex(e.nativeEvent.contentOffset ? e.nativeEvent.contentOffset.x
      // When scrolled with .scrollTo() on Android there is no contentOffset
      : e.nativeEvent.position * this.state.width
    );
  }

  /*
   * Drag end handler
   * @param {object} e native event
   */
  onScrollDrag = (e) => {
    const { contentOffset: { x: newOffset } } = e.nativeEvent,
      { children } = this.props,
      { index } = this.state,
      { offset } = this.internals;

    // Update internal isScrolling state
    // if swiped right on the last slide
    // or left on the first one
    if (offset === newOffset &&
      (index === 0 || index === children.length - 1)) {
      this.internals.isScrolling = false;
    }
  }

  updateIndex = (offset) => {
    const state = this.state,
      diff = offset - this.internals.offset,
      step = state.width;
    let index = state.index;

    // Do nothing if offset didn't change
    if (!diff) {
      return;
    }

    // Make sure index is always an integer, brah..
    index = parseInt(index + Math.round(diff / step), 10);

    // Update internal offset
    this.internals.offset = offset;
    // Update index in the state
    this.setState({
      index
    });
  }

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
  }

  /**
   * Render ScrollView component
   * @param {array} slides to swipe through
   */

  renderScrollView = (pages) => {
    return (
      <ScrollView ref={component => { this.scrollView = component; }}
        {...this.props}
        contentContainerStyle={[styles.wrapper], this.props.style}
        onScrollBeginDrag={this.onScrollBeginDrag}
        onMomentumScrollEnd={this.onScrollEnd}
        onScrollEndDrag={this.onScrollEndDrag}
      >
        {
          pages.map((page, i) =>
            <View style={[styles.fullScreen, styles.slide]} key={i}>
              {page}
            </View>
          )
        }
      </ScrollView>
    )
  }

  /**
   * Render pagination indicators
   */

  renderPagination = () => {
    if (this.state.total <= 1) {
      return null;
    }
    const ActiveDot = <View style={[styles.dot, styles.activeDot]} />,
      Dot = <View style={styles.dot} />

    let dots = [];
    for (let key = 0; key < this.state.total; key++) {
      dots.push(key === this.state.index
        // Active dot
        ? React.cloneElement(ActiveDot, {key})
        // Other dot
        : React.cloneElement(Dot, { key })
      );
    }

    return (
      <View
        pointerEvents="none"
        style={[styles.pagination, styles.fullScreen]}
      >
        { dots }
      </View>
    )
  }

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
    console.log("APA IN PROPS ..", this.props);
    return (
      <View pointerEvents="box-none" style={[styles.buttonWrapper, styles.fullScreen]}>
        <Button
          text="Daftar"
          backGroundColor="#ef434f"
          colorText="#fff"
          actionBtn={() => this.props.navigation.push({
            screen: 'TemanDiabets.RegisterScreen',
            title: 'Daftar'
          })}
        />
        <Button
          text="Masuk"
          backGroundColor="#fff"
          colorText="#ef434f"
          actionBtn={() => this.props.navigation.push({
            screen: 'TemanDiabets.LoginScreen',
            title: 'Masuk Akun Anda'
          })}
        />
      </View>
    );
  }

  render = ({ children } = this.props) => {
    return (
      <View style={[styles.container, styles.fullScreen]}>
        {/* Render Screen */}
        { this.renderScrollView(children) }
        { /* Render pagination */ }
        { this.renderPagination() }
        { /* Render Continue or Done button */ }
        { this.renderButton() }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  // Set width and height to the screen size
  fullScreen: {
    width: width,
    height: height
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
    backgroundColor: '#ef434f',
  },
  // Button wrapper
  buttonWrapper: {
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 40,
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
});
