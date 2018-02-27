import { StyleSheet  } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 3,
		backgroundColor: '#ccc',
		justifyContent: 'space-between',
	},
	imageBackground: {
		flex: 1,
		zIndex:100,
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	wrapTitle: {
		flex: 2,
		justifyContent: 'center',
		width: '90%',
	},
	titles: {
		color: '#fff',
		fontSize: 32,
		paddingRight: 50,
    fontFamily: 'Montserrat-Regular'
	},
	wrapForm: {
		flex: 2,
		width: '90%',
		justifyContent: 'center',
	},
  textInputStyle: {
    backgroundColor: '#fff',
    color: '#ccc',
    height: 50,
    borderRadius: 5,
  },
  btnNext: {
    backgroundColor: '#ef434f',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
	indicatorWrapper: {
		height: '30%',
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default styles;
