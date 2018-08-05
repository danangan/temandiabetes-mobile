import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Search from '../../assets/icons/search_dark.png';

export const SearchButton = ({ onPress, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      ...styles.searchButtonWrapper,
      ...style
    }}
  >
    <View
      style={{
        flex: 0.2,
        alignItems: 'center',
        padding: 5
      }}
    >
      <Image source={Search} style={{ width: 25, height: 25 }} />
    </View>
    <View style={{ flex: 2, alignItems: 'flex-start', paddingHorizontal: 5 }}>
      <Text>Cari post...</Text>
    </View>
  </TouchableOpacity>
)

const styles = {
	searchButtonWrapper: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#fff',
		borderRadius: 5,
    marginHorizontal: 5,
		elevation: 2.5,
    height: 50,
    backgroundColor: '#fff',
    marginTop: 12,
  },
}
