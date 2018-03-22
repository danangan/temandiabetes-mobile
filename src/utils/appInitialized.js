import { AsyncStorage } from 'react-native';

import { startApp, mainApp } from '../../App';
import { authToken } from '../utils/constants';

const appInitialized = async () => {
	// const tokenRemove = await AsyncStorage.removeItem(authToken);  
	const token = await AsyncStorage.getItem(authToken);
	console.log("APA INI TOKEN ", token);
	if (!token) {
		startApp();
	} else {
		mainApp();
	}
};

export default appInitialized;
