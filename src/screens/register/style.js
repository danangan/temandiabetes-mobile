import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 3,
		backgroundColor: '#ccc',
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
		color: '#fff',
		fontFamily: 'Montserrat-Bold'
	},
	wrapTitle: {
		flex: 2,
		justifyContent: 'center',
		width: '90%'
	},
	titles: {
		color: '#4a4a4a',
		fontSize: 32,
		paddingRight: 50,
		fontFamily: 'Montserrat-Regular'
	},
	wrapForm: {
		flex: 2,
		width: '90%',
		justifyContent: 'center'
	},
	textInputStyle: {
		backgroundColor: '#fff',
		color: '#ccc',
		height: 50,
		borderRadius: 5,
		fontFamily: 'Montserrat-Bold'
	},
	btnNext: {
		backgroundColor: '#ef434f',
		alignItems: 'center',
		justifyContent: 'center',
		height: 40
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
