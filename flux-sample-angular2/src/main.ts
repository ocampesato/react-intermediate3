//main entry point
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';

import {App} from './app';
import {createStore} from 'redux';
import {rootReducer} from './rootReducer';
import {TodoActions} from './todoActions';

const appStore = createStore(rootReducer);

bootstrap(App, [
  provide('AppStore', { useValue: appStore }),
  TodoActions 
])
  .catch(err => console.error(err));