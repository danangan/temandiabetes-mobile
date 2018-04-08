import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

const EventCard = () => (
  <View 
    style={styles.cardEvent}
  >
    <View 
      style={styles.wrapperItem}
    >
      <Text />
    </View>
    <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
      <Text style={{ color: '#000', fontSize: 16, fontFamily: 'Montserrat-Medium' }}>Tour De Cure Jakarta 2017</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 10, color: '#000', marginRight: 10 }}>11 January 2018</Text>
        <Text style={{ fontSize: 10, color: '#000'}}>Kemang, Jakarta Selatan</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardEvent: {
    flex: 1, 
    height: 174, 
    backgroundColor: '#fff', 
    marginVertical: 10, 
    borderColor: '#b6b6b6', 
    borderWidth: 0.4,
    borderRadius: 5
  },
  wrapperItem: {
    flex: 2, 
    backgroundColor: '#9a9b9a', 
    height: 120, 
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  }
});

export default EventCard;
