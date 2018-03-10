import { AsyncStorage } from 'react-native';

import { startApp, mainApp } from '../../App';
import { authToken } from '../utils/constants';

const appInitialized = async () => {
	const token = await AsyncStorage.getItem(authToken);
	
	if (token) {
		startApp();
	} else {
		mainApp();
	}
};

export default appInitialized;
