import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { CardSection } from '../../../components';
import Style from '../../../style/defaultStyle';
import color from '../../../style/color';

const ContentFeatured = () => (
	<ScrollView>
		<CardSection style={styles.cardSectionStyle}>
			<Text style={styles.titleStyle}>
				Tips Merawat dan Menjaga Kesehatan Bagi Para Penderita Diabetes
			</Text>
		</CardSection>
		<View style={styles.borderLine} />
		<CardSection>
			<Text style={styles.textStyle}>
				Saat ini, diabetes melitus tengah menjadi salah satu fokus perhatian dalam dunia kedokteran.
				Hal ini dikarenakan penyakit yang ditandai dengan naiknya kadar gula didalam darah
			</Text>
		</CardSection>
		<CardSection containerStyle={{ paddingLeft: 10 }}>
			<Image
				source={{ uri: 'https://i.imgur.com/zHd5A.jpg' }}
				style={styles.imageContent}
				resizeMode={'stretch'}
			/>
		</CardSection>
		<CardSection>
			<Text style={styles.textStyle}>
				merupakan penyakit komplikasi yang paling banyak dan jumlah penderita yang setipa tahun
				terus mengalami peningkatan. memang kebanyakan diderita oleh mereka paraorang dewasa dan
				telah lanjut usia penyebab utama dari kondisi penyakit ini yang umum adalah kegemukan atau
				obesitas, tidak pernah berolahraga dan tidak menjaga pola makan dengan baik.
			</Text>
		</CardSection>
	</ScrollView>
);

const styles = {
	cardSectionStyle: {
		backgroundColor: color.solitude,
		margin: 0
	},
	titleStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_TITLE,
		fontStyle: 'normal',
		paddingLeft: 10,
		paddingRight: 5,
		textAlign: 'justify'
	},
	borderLine: {
		borderBottomColor: color.midGray,
		borderBottomWidth: 2,
		opacity: 0.2,
		width: '90%',
		alignSelf: 'center',
		marginTop: 10
	},
	textStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE * 1.1,
		fontStyle: 'normal',
		padding: 10,
		textAlign: 'justify'
	},
	imageContent: {
		height: Style.DEVICE_WIDTH / 1.7,
		width: Style.DEVICE_WIDTH - 20
	}
};

export default ContentFeatured;
