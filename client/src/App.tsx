import React from 'react';
import './App.scss';
import {Header, Main} from './components';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Main product={{name: 'Jordan'}} />
    </div>
  );
};

export default App;
