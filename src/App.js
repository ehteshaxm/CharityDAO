import React from 'react';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import UserScreen from './screens/UserScreen';
import CreateScreen from './screens/CreateScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/org' exact component={UserScreen} />
        <Route path='/create' exact component={CreateScreen} />
      </>
    </Router>
  );
};

export default App;
