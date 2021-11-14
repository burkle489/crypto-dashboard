import React from 'react';
import './App.css';
import { CoinbaseTracker } from './components/CoinbaseTracker/CoinbaseTracker';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <CoinbaseTracker />
    </div>
  );
}

export default withAuthenticator(App);
