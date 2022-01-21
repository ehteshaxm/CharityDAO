import React from 'react';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import UserScreen from './screens/UserScreen';
import CreateScreen from './screens/CreateScreen';
import StartScreen from './screens/StartScreen';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={StartScreen} />
        <>
          <Header />
          <Route path='/home' exact component={HomeScreen} />
          <Route path='/org' exact component={UserScreen} />
          <Route path='/create' exact component={CreateScreen} />
        </>
      </Switch>
    </Router>
  );
};

export default App;
