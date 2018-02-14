import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import styles from '../style';
const URL_IMAGE = 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAqDAAAAJDNhMmVjZTMxLWYwMmYtNDkyMS05MWQ5LTQ5NGY1ZDQzNDc4OA.jpg'

class RegisterScreenFourth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: ['Diabtesi', 'Ahli', 'Dokter']
    }
  }

  render () {
    return (
			<View style={ styles.container }>
				<View style={ styles.wrapTitle }>
					<Text style={ styles.titles }>Siapakah Anda?</Text>
				</View>
        <View style={ styles.wrapForm }>
					<View style={{ borderColor: 'aqua',
					borderWidth: 1.5,}}>
            <ScrollView
              horizontal={true}
            >
              {
                this.state.images.map((a, index) => (
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', borderColor: 'red', borderWidth: 1, backGroundColor: '#fff', width: 200, height: 200, padding: 0, margin: 10 }}>
                    <Image
                      resizeMode={'contain'}
                      style={{ width: '100%', height: '60%' }}
                      source={{ uri: URL_IMAGE }}
                    />
                    <Text style={{ fontSize: 12, color: '#000', textAlign: 'center' }}>{ a }</Text>
                  </View>
                ))
              }
            </ScrollView>

					</View>
          <TouchableOpacity
            style={ [styles.btnNext, { marginBottom: 30, marginTop: 10 }] }
            onPress={() => alert('KETIGA')}>
            <Text style={{ color: '#fff' }}>SELESAI</Text>
          </TouchableOpacity>
					<View style={{
						borderColor: '#000',
						borderWidth: 1.5,
						marginBottom: 100,
						height: 20,
					  }}>
						<Text>Indicator</Text>
					</View>
				</View>
			</View>
		);
  }
}

export default RegisterScreenFourth;
