import React, { Component } from 'react';
import './App.css';

import Popular from './components/Popular/Popular';
import Nav from './components/Nav/Nav';
import Battle from './components/Battle/Battle';
import Home from './components/Home/Home';
import Results from './components/Results/Results';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (    
      <Router>
        <div className='container'>
          <Nav />       
          <Switch>            
            <Route exact path='/' component={Home}/>
            <Route path='/popular' component={Popular}/>
            <Route exact path='/battle' component={Battle}/>                        
            <Route path='/battle/results' component={Results}/>
            <Route render={() => <p>Not Found!</p>}/>
          </Switch>
        </div>      
      </Router>
    );
  }
}

export default App;
