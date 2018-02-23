import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';

import styles from '../style';
const URL_IMAGE = 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAqDAAAAJDNhMmVjZTMxLWYwMmYtNDkyMS05MWQ5LTQ5NGY1ZDQzNDc4OA.jpg'

import {Button} from '../../../components/button/Button';
import { Indicator } from '../../../components/indicator/Indicator';

class RegisterScreenFourth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: ['Diabtesi', 'Ahli', 'Dokter'],
      selected: '',
    }
  }

  static navigatorStyle = {
    navBarHidden: true
  }

  render () {
    return (
			<View style={ [styles.container, { paddingBottom: 50 }] }>
        <View style={ styles.wrapTitle }>
					<Text style={ styles.titles }>Siapakah Anda?</Text>
				</View>
        <View style={ stylesLocal.wrapperScroll }>
					<View style={{ backGroundColor: '#fff' }}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >

              {
                this.state.images.map((item, index) => (
                  <TouchableOpacity
                    style={
                      this.state.selected === item ? [stylesLocal.imagesWrapper, {borderColor: 'rgb(239, 67, 79)', borderWidth: 1.5 }] : stylesLocal.imagesWrapper
                    }
                    onPress={() => this.setState({ selected: item })}>
                    <Image
                      resizeMode={'contain'}
                      style={ stylesLocal.images }
                      source={{ uri: URL_IMAGE }}
                    />
                    <Text style={{ fontSize: 12, color: '#000', textAlign: 'center' }}>{ item }</Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
					</View>
          <TouchableOpacity
            style={ [styles.btnNext, { marginBottom: 40, marginTop: 10 }] }
            onPress={() => alert('Thank You')}>
            <Text style={{ color: '#fff' }}>SELESAI</Text>
          </TouchableOpacity>
          <View style={ styles.indicatorWrapper }>
						<Indicator
							persentase={{ width: '80%' }}
						/>
					</View>
				</View>
			</View>
		);
  }
}

const stylesLocal = StyleSheet.create({
  imagesWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 10,
  },
  wrapperScroll: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  images: { width: '100%', height: '80%' }
})

export default RegisterScreenFourth;
