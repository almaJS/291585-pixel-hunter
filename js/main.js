import {showScreen} from './util.js';
import IntroView from './view/intro-view.js';
import greetingScreen from './screens/greeting-screen.js';

const introView = new IntroView();

introView.onClick = () => greetingScreen();

showScreen(introView.element);
