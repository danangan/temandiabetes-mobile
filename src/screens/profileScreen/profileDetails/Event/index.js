import React from 'react';

import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
// import EventCard from '../../../../components/card/EventCard';
import Style from '../../../../style/defaultStyle';
import color from '../../../../style/color';

// const initialEvent = ['Tour', 'Yoga', 'USS'];

class Event extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 1, width: '100%', borderRadius: 20 }}>
          {/* <ScrollView>
          {
            initialEvent.map((item, index) => (
              <EventCard key={index} />
            ))
          }
          </ScrollView> */}
          <View style={styles.containerStyle}>
            <View style={styles.iconContainerStyle}>
              <Image
                source={require('../../../../assets/icons/event_active.png')}
                style={styles.iconStyle}
              />
              <Text style={styles.subTitleStyle}>Event</Text>
            </View>
            <Text style={styles.titleStyle}>Segera Hadir!</Text>
            <Text style={styles.descStyle}>
              Ikut event kesehatan seputar diabetes dan dapatkan jadwal dengan mudah
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.solitude,
    padding: Style.PADDING
  },
  iconContainerStyle: {
    flexDirection: 'column',
    alignSelf: 'center'
  },
  iconStyle: {
    width: 50,
    height: 55,
    alignSelf: 'center'
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_TITLE * 2,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: color.black,
    alignSelf: 'center',
    opacity: 0.6,
    marginTop: Style.PADDING * 1.7,
    marginBottom: Style.PADDING
  },
  descStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    justifyContent: 'center',
    textAlign: 'center'
  },
  subTitleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    justifyContent: 'center',
    color: color.red,
    marginTop: 3,
    textAlign: 'center'
  }
});

export default Event;
