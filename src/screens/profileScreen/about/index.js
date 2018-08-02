import React from 'react';
import { View, Text, ScrollView, Linking, Image } from 'react-native';
import Style from '../../../style/defaultStyle';
import color from '../../../style/color';

import { NavigationBar } from '../../../components';

const AboutScreen = props => (
  <View style={styles.containerStyle}>
    <NavigationBar onPress={() => props.navigator.pop()} title={'TENTANG'} />
    <ScrollView>
      <Text style={styles.textStyle}>
        Teman Diabetes adalah aplikasi yang memudahkan diabetisi, keluarga dan ahli medis
        bekerjasama untuk memastikan diabetisi hidup lebih sehat. Terhubung dengan DNurse, sebuah
        alat kesehatan untuk mengukur gula darah, Teman Diabetes mampu mengukur gula darah secara
        otomatis dan menganalisa kesehatan diabetisi dengan cepat. Aplikasi Teman Diabetes siap
        menemani diabetisi dan keluarga sejak pertama kali didiagnosa. Teman Diabetes menjawab
        kekhawatiran diabetisi mengenai cara hidup sehat dan nyaman dengan diabetes, mendapatkan
        informasi terpercaya, serta mencari dukungan sesama diabetisi. {'\n'}
        {'\n'}
        Pengguna dapat belajar cara hidup sehat dan nyaman dengan diabetes dengan terus memonitor
        gula darah, makanan yang dikonsumsi, kegiatan yang dilakukan, serta obat-obatan yang
        diminum. Informasi ini juga dapat dikirim ke keluarga, maupun ahli medis sesuai dengan
        kebutuhan. Via fitur artikel, Teman Diabetes memberikan informasi terpercaya yang telah
        diverifikasi dokter. Dukungan juga bisa didapatkan secara maya dengan ikut serta di forum
        Teman Diabetes yang dimoderasi ahli medis. Sebaliknya, pengguna juga bisa ikut serta
        event-event yang terdaftar di fitur event.
      </Text>
      {/* <Text onPress={() => Linking.openURL('mailto:example@gmail.com?subject=example&body=example')}>CP : cstemandiabetes@gmail.com</Text> */}
      <Text style={styles.textStyle}>
        Jika anda memiliki pertanyaan, keluhan dan saran seputar Teman Diabetes dan membutuhkan informasi kerjasama dengan Teman Diabetes, silakan menghubungi salah satu email di bawah :
      </Text>
      <View style={styles.mainViewContactUs}>
        <View style={styles.viewContactUs}>
            <Image
              resizeModa={'contain'}
              style={styles.images}
              source={require('../../../assets/icons/contact_us.png')}/>
            <View style={styles.viewTextContactUs}>
                <Text style={styles.textContactUs}>Untuk pertanyaan umum seputar Teman Diabetes dan pengguna mobile application, kirimkan email anda di : </Text>
                <Text style={[styles.textContactUs, {marginTop : 5}]}>cs@temandiabetes.com</Text>
            </View>  
        </View>

        <View style={styles.viewContactUs}>
            <Image
              resizeModa={'contain'}
              style={styles.images}
              source={require('../../../assets/icons/partnership.png')}/>
            <View style={styles.viewTextContactUs}>
                <Text style={styles.textContactUs}>Untuk membahas seputar informasi kerjasama dengan Teman Diabetes, kirimkan email anda di :</Text>
                <Text style={[styles.textContactUs, {marginTop : 5}]}>partnership@temandiabetes.com</Text>
            </View>  
        </View>

      </View>
    </ScrollView>
  </View>
);

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
    paddingTop: Style.PADDING
  },
  textStyle: {
    textAlign: 'justify',
    fontFamily: 'OpenSans-Regular',
    fontSize: Style.FONT_SIZE_SMALL,
    padding: Style.PADDING
  },
  textContactUs: {
    textAlign: 'justify',
    fontFamily: 'OpenSans-Regular',
    fontSize: Style.FONT_SIZE_SMALL,
    fontWeight: 'bold',
  },
  mainViewContactUs: {
    flex : 1, 
    // flexDirection : 'row', 
    paddingHorizontal : Style.PADDING
  },
  viewContactUs: { 
    flex:  1, 
    flexDirection : 'row',
    justifyContent : 'center', 
    alignItems: 'center',
    marginBottom: Style.PADDING,
  },
  images: { 
    width: 60, 
    height: 60,
  },
  viewTextContactUs: {
    flex : 1, 
    justifyContent : 'center', 
    paddingLeft : 10
  },
};

export default AboutScreen;
