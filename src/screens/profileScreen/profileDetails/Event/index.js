import React from 'react';

import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import EventCard from '../../../../components/card/EventCard';

const initialEvent = ['Tour', 'Yoga', 'USS'];

class Event extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 1, width: '100%', borderRadius: 20 }}>
          <ScrollView>
          {
            initialEvent.map((item, index) => (
              <EventCard key={index} />
            ))
          }
          </ScrollView>
        </View>
      </View>
    );
  }
}


export default Event;
