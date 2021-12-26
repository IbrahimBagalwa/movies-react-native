
import React from 'react';
import Navigation from './Navigation/Navigation';
import { Provider } from 'react-redux';
import store from './store/cofigStore';
import { StatusBar } from 'react-native';
export default class App extends React.Component {
  render(){
    return (
      <Provider store ={store}>
        <StatusBar barStyle='dark-content'/>
        <Navigation/>
      </Provider>
    )
  }
}