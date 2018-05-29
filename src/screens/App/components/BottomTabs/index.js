import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import defaultStyle from '../../../../style/defaultStyle'

export default class BottomTabs extends Component {
  constructor(props) {
    super(props)
    // Initialize State
    this.state = {
      // First tab is active by default
      activeTab: 0
    }
  }

  // Pull children out of props passed from App component
  render({ children } = this.props) {
    return (
      <View style={styles.container}>
        {/* Content */}
        <View style={styles.contentContainer}>
          {children[this.state.activeTab]}
        </View>
        {/* Tabs row */}
        <View style={styles.tabsContainer}>
          {/* Pull props out of children, and pull title out of props */}
          {children.map(({ props: { title, icon, activeIcon } }, index) =>
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
              {/* active underline */}
              <View style={[styles.underline, index === this.state.activeTab ?  styles.underlineActive : {} ]}>
              </View>
              <Image
                style={styles.iconStyle}
                source={index === this.state.activeTab ? activeIcon : icon }
              />
              <Text style={styles.tabText}>
                {title}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Component container
  container: {
    flex: 1,                            // Take up all available space
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
    paddingBottom: 6,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  underline: {
    width: '30%',
    borderBottomWidth: 5,
    marginBottom: 6,
    borderBottomColor: 'transparent',
  },
  // Active tab container
  underlineActive: {
    borderBottomWidth: 5,
    width: '30%',
    borderBottomColor: '#EF434F',       // White bottom border for active tabs
  },
  // Tab text
  tabText: {
    color: '#afafaf',
    fontSize: defaultStyle.FONT_SIZE_SMALL*0.9,
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 3,
  },
  iconStyle: {
    height: 20,
    width: 20
  },
  // Content container
  contentContainer: {
    flex: 1                             // Take up all available space
  }
});
