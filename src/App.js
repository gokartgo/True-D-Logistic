import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Aux from './hoc/Auxiliary/Auxiliary'
import Header from './components/Header/Header'
import MainPage from './containers/MainPage/MainPage'
class App extends Component {
  render() {
    return (
      <Aux>
        <Header />
        <MainPage />
      </Aux>
    );
  }
}

export default App;
