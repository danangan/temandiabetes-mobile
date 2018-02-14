import { StyleSheet  } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ccc',
		paddingHorizontal: 20,
		justifyContent: 'space-between',
	},
	wrapTitle: {
		flex: 1,
		justifyContent: 'center',
    borderColor: '#ff1200',
    borderWidth: 5,
	},
	titles: {
		color: '#fff',
		fontSize: 32,
		paddingRight: 50,
    fontFamily: 'Montserrat-Regular'
	},
	wrapForm: {
		flex: 1,
    borderColor: 'aqua',
    borderWidth: 5,
		justifyContent: 'space-between',
		flexDirection: 'column',
	},
  textInputStyle: {
    backgroundColor: '#fff',
    color: '#ccc',
    borderColor: '#ccc',
    height: 50,
    borderWidth: 1,
    borderRadius: 5
  },
  btnNext: {
    backgroundColor: '#ef434f',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  }
});

export default styles;
