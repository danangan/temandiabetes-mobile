import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Style from '../../../style/defaultStyle';
import color from '../../../style/color';

import { NavigationBar } from '../../../components';

const AboutScreen = props => (
	<View style={styles.containerStyle}>
		<NavigationBar onPress={() => props.navigator.pop()} title={'TENTANG'} />
		<ScrollView>
			<Text style={styles.textStyle}>
				Teman Diabetes adalah aplikasi yang memudahkan diabetisi, keluarga dan 
				ahli medis bekerjasama untuk memastikan diabetisi hidup lebih sehat.  
				Terhubung dengan DNurse, sebuah alat kesehatan untuk mengukur gula darah, 
				Teman Diabetes mampu mengukur gula darah secara otomatis dan menganalisa 
				kesehatan diabetisi dengan cepat. Aplikasi Teman Diabetes siap menemani 
				diabetisi dan keluarga sejak pertama kali didiagnosa. 
				Teman Diabetes menjawab kekhawatiran diabetisi mengenai cara hidup sehat 
				dan nyaman dengan diabetes, mendapatkan informasi terpercaya, 
				serta mencari dukungan sesama diabetisi. {'\n'}
				{'\n'}
				
				Pengguna dapat belajar cara hidup sehat dan nyaman dengan diabetes dengan terus 
				memonitor gula darah, makanan yang dikonsumsi, kegiatan yang dilakukan, 
				serta obat-obatan yang diminum. Informasi ini juga dapat dikirim ke keluarga, maupun 
				ahli medis sesuai dengan kebutuhan. Via fitur artikel, Teman Diabetes memberikan 
				informasi terpercaya yang telah diverifikasi dokter. Dukungan juga bisa didapatkan 
				secara maya dengan ikut serta di forum Teman Diabetes yang dimoderasi ahli medis. 
				Sebaliknya, pengguna juga bisa ikut serta event-event yang terdaftar di fitur event. 
			</Text>
		</ScrollView>
	</View>
);

const styles = {
	containerStyle: {
		flex: 1,
		backgroundColor: color.white,
		padding: Style.PADDING
	},
	textStyle: {
		textAlign: 'auto',
		fontFamily: 'OpenSans-Regular',
		fontSize: Style.FONT_SIZE_SMALL,
		paddingTop: Style.PADDING
	}
};

export default AboutScreen;
