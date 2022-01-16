import React from 'react';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import OrgScreen from './screens/OrgScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/org' exact component={OrgScreen} />
      </>
    </Router>
  );
};

export default App;
