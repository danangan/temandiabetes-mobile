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

import {Button} from '../../../components/button/Button';

class RegisterScreenFourth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: ['Diabtesi', 'Ahli', 'Dokter']
    }
  }

  render () {
    return (
			<View style={ [styles.container, { paddingBottom: 50 }] }>
				<View style={ {
          flex: 1,
      		justifyContent: 'flex-start',
          marginTop: 50
        }}>
					<Text style={ styles.titles }>Siapakah Anda?</Text>
				</View>
        <View style={ {
          flex: 1,
      		justifyContent: 'center',
      		flexDirection: 'column'
        } }>
					<View style={{
            borderColor: 'aqua',
					  borderWidth: 1.5,
            backGroundColor: '#fff',
          }}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              {
                this.state.images.map((a, index) => (
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', borderColor: 'rgb(239, 67, 79)', borderWidth: 1.5, backgroundColor: '#fff', width: 150, height: 150, marginVertical: 5, marginHorizontal: 19, padding: 10,  }}>
                    <Image
                      resizeMode={'contain'}
                      style={{ width: '100%', height: '80%' }}
                      source={{ uri: URL_IMAGE }}
                    />
                    <Text style={{ fontSize: 12, color: '#000', textAlign: 'center' }}>{ a }</Text>
                  </View>
                ))
              }
            </ScrollView>
					</View>
          <TouchableOpacity
            style={ [styles.btnNext, { marginBottom: 40, marginTop: 10 }] }
            onPress={() => alert('KETIGA')}>
            <Text style={{ color: '#fff' }}>SELESAI</Text>
          </TouchableOpacity>
          {/* <Button
            children={'SELESAI'}
            onPress={() => alert('Ketiga')}
            textStyle={{ color: '#fff' }}
            // buttonStyles={ [styles.btnNext, { marginBottom: 30, marginTop: 10 }] }
          /> */}
					<View style={{
						borderColor: '#000',
						borderWidth: 1.5,
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
