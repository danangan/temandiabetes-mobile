import React from 'react';

import { View, ScrollView } from 'react-native';

import { ThreeNavBar } from '../../../components/NavigationBar/threeNavBar';
import CardInnerCircle from '../../../components/card/CardInnerCircle';

class InnerCircle extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };
  
  constructor(props) {
    super(props);
    this.state = {
      init: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ThreeNavBar onPress={() => this.props.navigator.pop()} title="INNER CIRCLE LIST" />
        <ScrollView>
          {
            this.state.init.map((item, index) => (
              <CardInnerCircle key={index} />
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,  
    backgroundColor: '#fff',
    paddingVertical: 10, 
    paddingHorizontal: 15
  }
};

export default InnerCircle;
