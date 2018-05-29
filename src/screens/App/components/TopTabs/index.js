import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import defaultStyle from '../../../../style/defaultStyle'

export default class TopTabs extends Component {
  constructor(props) {
    super(props)
    // Initialize State
    this.state = {
      // First tab is active by default
      activeTab: 0
    }
  }

  renderTabs() {
    const { children } = this.props
    if (Array.isArray(children)) {
      return children.map(({ props: { title } }, index) =>
            <TouchableOpacity
              style={[
                // Default style for every tab
                styles.tabContainer,
              ]}
              // Change active tab
              onPress={() => this.setState({ activeTab: index }) }
              // Required key prop for components generated returned by map iterator
              key={index}
            >
              <Text style={styles.tabText}>
                {title}
              </Text>
              {/* active underline */}
              <View style={[styles.underline, index === this.state.activeTab ?  styles.underlineActive : {} ]}>
              </View>
            </TouchableOpacity>
            )
    } else {
      return (
        <View style={styles.tabContainer}>
          <Text style={styles.tabText}>

            {children.props.title}
          </Text>
          {/* active underline */}
          <View style={[styles.underline, styles.underlineActive]}>
          </View>
        </View>
      )
    }
  }

  // Pull children out of props passed from App component
  render({ children } = this.props) {
    return (
      <View style={styles.container}>
        {/* Tabs row */}
        <View style={styles.tabsContainer}>
          {/* Pull props out of children, and pull title out of props */}

          {this.renderTabs()}
        </View>
        {/* Content */}
        <View style={styles.contentContainer}>
          {Array.isArray(children) ? children[this.state.activeTab] : children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Component container
  container: {
    flex: 1,
  },
  // Tabs row container
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 2
  },
  // Individual tab container
  tabContainer: {
    flex: 1,                            // Take up equal amount of space for each tab
    paddingTop: 6,
    alignItems: 'center',
  },
  underline: {
    width: 20,
    borderBottomWidth: 5,
    marginTop: 6,
    borderBottomColor: 'transparent',
  },
  // Active tab container
  underlineActive: {
    borderBottomWidth: 5,
    width: 20,
    borderBottomColor: '#EF434F',       // White bottom border for active tabs
  },
  // Tab text
  tabText: {
    color: '#EF434F',
    // fontFamily: 'Avenir',
    // height: 300,
    fontSize: defaultStyle.FONT_SIZE_SMALL,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  // Content container
  contentContainer: {
    flex: 1                             // Take up all available space
  }
});
