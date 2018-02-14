import { StyleSheet  } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ccc',
		padding: 20,
		justifyContent: 'space-between',
	},
	wrapTitle: {
		flex: 2,
		justifyContent: 'flex-start',
    marginTop: 50
	},
	titles: {
		color: '#fff',
		fontSize: 32,
		paddingRight: 50,
    fontFamily: 'Montserrat-Regular'
	},
	wrapForm: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'column'
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
    height: 50,
  }
});

export default styles;
