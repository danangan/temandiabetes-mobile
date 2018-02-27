import { StyleSheet  } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 3,
		backgroundColor: '#ccc',
		paddingHorizontal: 20,
		justifyContent: 'space-between',
	},
	wrapTitle: {
		flex: 2,
		justifyContent: 'center',
	},
	titles: {
		color: '#fff',
		fontSize: 32,
		paddingRight: 50,
    fontFamily: 'Montserrat-Regular'
	},
	wrapForm: {
		flex: 2,
		justifyContent: 'space-between',
		flexDirection: 'column',
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
