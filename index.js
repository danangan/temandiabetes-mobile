import { AppRegistry } from 'react-native';
import { appRegistry } from './App';

import bgMessaging from './src/utils/bgMessaging';

appRegistry();
// New task registration
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
