/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

// Toggle between Storybook and main app
const enableStorybook = process.env.STORYBOOK_ENABLED === 'true';

if (enableStorybook) {
  const StorybookApp = require('./App.storybook').default;
  AppRegistry.registerComponent(appName, () => StorybookApp);
} else {
  const App = require('./App').default;
  AppRegistry.registerComponent(appName, () => App);
}
