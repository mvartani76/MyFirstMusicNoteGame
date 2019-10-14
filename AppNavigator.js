import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Home';
import Game from './Game';
import GameContainer from './GameContainer';

const AppNavigator = createStackNavigator({
  Home: {screen: Home},
  GameContainer: {screen: GameContainer},
  Game: {screen: Game}
});
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;