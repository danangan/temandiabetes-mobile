import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { NavigationBar } from '../../../components';

class ProfileSettings extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };

  onPushScreen(screen) {
		this.props.navigator.push(
			{
				screen,
			},
			() =>
				this.props.navigator.dismissAllModals({
					animationType: 'none'
				})
		);
	}

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar onPress={() => this.props.navigator.pop()} title="PROFILE" />
        <View 
          style={{ flex: 2 }}
        >
          <TouchableOpacity 
            style={styles.buttonWrapper}
          >
            <Text style={{ color: '#ccc', fontSize: 12 }}>AKUN</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonWrapper}
            onPress={() => this.onPushScreen('TemanDiabets.EditProfile')}
          >
            <Text style={styles.buttonText}>SUNTING PROFILE</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonWrapper}
          >
            <Text style={styles.buttonText}>INNER CIRCLE LIST</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonWrapper}
          >
            <Text style={styles.buttonText}>AJAK TEMAN</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonWrapper}
          >
            <Text style={styles.buttonText}>PILIHAN TOPIK FORUM</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

const styles = {
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    paddingHorizontal: 10, 
    paddingVertical: 15 
  },
  buttonWrapper: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'flex-start', 
    borderBottomColor: '#303c45', 
    borderBottomWidth: 0.5, 
    marginHorizontal: 20
  },
  buttonText: { 
    color: '#303c45', 
    fontSize: 12 
  }
}

export default ProfileSettings;
