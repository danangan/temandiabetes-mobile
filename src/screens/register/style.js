import { StyleSheet } from 'react-native';
import color from '../../style/color';
import Style from '../../style/defaultStyle';

const styles = StyleSheet.create({
	container: {
		flex: 3,
		justifyContent: 'space-between'
	},
	imageBackground: {
		flex: 1,
		zIndex: 100,
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		color: color.white,
		fontFamily: 'Montserrat-Bold'
	},
	wrapTitle: {
    flex: 2,
    backgroundColor: 'transparent',
		justifyContent: 'center',
		width: '90%'
	},
	titles: {
		color: color.white,
		fontSize: Style.FONT_SIZE_TITLE * 2.3,
		paddingRight: 50,
		fontFamily: 'Montserrat-Regular'
	},
	wrapForm: {
		flex: 2,
		width: '90%',
		justifyContent: 'center'
	},
	textInputStyle: {
		backgroundColor: color.white,
		height: 50,
		borderRadius: 5,
		fontFamily: 'Montserrat-Regular'
	},
	btnNext: {
		backgroundColor: color.red,
		alignItems: 'center',
		justifyContent: 'center',
		height: 50
	},
	indicatorWrapper: {
		height: '30%',
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	wrapIconBack: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		alignSelf: 'flex-start'
	}
});

export default styles;
