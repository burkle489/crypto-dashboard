import React from 'react';
import './App.css';
import { CoinbaseTracker } from './components/CoinbaseTracker/CoinbaseTracker';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
      <CoinbaseTracker />
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
