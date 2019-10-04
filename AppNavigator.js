import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Home';
import Game from './Game';

const AppNavigator = createStackNavigator({
  Home: {screen: Home},
  Game: {screen: Game}
});
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;