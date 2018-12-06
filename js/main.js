import {showScreen, setGreetingElement} from './util.js';
import introElement from './screens/intro-screen.js';
import greetingElement from './screens/greeting-screen.js';

setGreetingElement(greetingElement);

showScreen(introElement);
