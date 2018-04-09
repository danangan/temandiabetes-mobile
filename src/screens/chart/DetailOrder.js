import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import color from '../../style/color';
import { Card } from '../../components';
import Style from '../../style/defaultStyle';

const OrderDetail = props => (
	<View style={styles.containerStyle}>
		<ScrollView>
			<Card>
				<TouchableOpacity
					onPress={() => props.navigator.dismissAllModals({ animationType: 'none' })}
					style={styles.buttonCloseStyle}
				>
					<Image
						source={require('../../assets/icons/close.png')}
						style={styles.iconCloseStyle}
						tintColor={color.red}
					/>
					<Text style={styles.textCloseStyle}>Close</Text>
				</TouchableOpacity>
				<View style={styles.contentStyle}>
					<Image source={{ uri: 'https://goo.gl/oqvwhS' }} style={styles.imageStyle} />
					<TouchableOpacity onPress={() => null} style={styles.buttonTabStyle}>
						<Text style={styles.titleTabStyle}>DESKRIPSI PRODUK</Text>
						<Text style={styles.indicatorStyle} />
					</TouchableOpacity>
					<View style={styles.descriptionContainerStyle}>
						<Text style={styles.titleStyle}>Kegunaan : </Text>
						<Text style={styles.textStyle}>
							Digunakan sebagai terapi nutrisi penunjang untuk diabetes melitus bersama dengan diet,
							olahraga dan terapi obat.
						</Text>

						<Text style={styles.titleStyle}>Kandungan : </Text>
						<Text style={styles.textStyle}>
							Tiap kapsul mengandung Chromium 200 mcg, Magnesium 100 mg, Zink 15 mg, copper 1 mg,
							manganese 2 mg, Ferum 8 mg, iodine 100 mcg, selenium 100 mcg, vitamin C 120 mg,
							vitamin E 30 mg, vitamin A 700 mcg, vitamin D3 5 mcg, vitamin B1 15 mg, vitamin B2 5
							mg, ni.
						</Text>

						<Text style={styles.titleStyle}>Dosis : </Text>
						<Text style={styles.textStyle}>1 kapsul perhari</Text>

						<Text style={styles.titleStyle}>Cara Pemakaian : </Text>
						<Text style={styles.textStyle}>
							Dapat diberikan bersama atau tanpa makanan. Dapat diberikan bersama makanan agar
							diabsorpsi lebih baik atau jika timbul rasa tidak nyaman pada saluran pencernaan.
						</Text>

						<Text style={styles.titleStyle}>Kemasan : </Text>
						<Text style={styles.textStyle}>Dus, 5 x 6 kapsul</Text>

						<Text style={styles.titleStyle}>Golongan : </Text>
						<Text style={styles.textStyle}>Obat Bebas</Text>

						<Text style={styles.titleStyle}>Perlu Resep : </Text>
						<Text style={styles.textStyle}>Tidak</Text>
					</View>
				</View>
			</Card>
		</ScrollView>
	</View>
);

const styles = {
	containerStyle: {
		flex: 1,
		backgroundColor: color.solitude
	},
	contentStyle: {
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	imageStyle: {
		height: Style.CARD_WIDTH / 2,
		width: Style.CARD_WIDTH / 1.5,
		alignSelf: 'center'
	},
	buttonCloseStyle: {
		margin: 10
	},
	iconCloseStyle: {
		height: 20,
		width: 20
	},
	textCloseStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_SMALLER,
		color: color.red
	},
	textStyle: {
		fontFamily: 'OpenSans-Regular',
		fontSize: Style.FONT_SIZE_SMALL,
		textAlign: 'justify',
		marginLeft: Style.PADDING
	},
	buttonTabStyle: {
		flex: 0,
		flexWrap: 'wrap',
		marginHorizontal: 1,
		justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
	},
	indicatorStyle: {
		width: '10%',
		borderBottomWidth: 3,
		borderBottomColor: color.red
	},
	titleTabStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE
	},
	titleStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE - 1.1
	},
	descriptionContainerStyle: {
		flex: 0,
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: Style.PADDING - 6,
	}
};

export default OrderDetail;
