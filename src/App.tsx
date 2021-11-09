import React from 'react';
import './App.css';
import { CoinbaseTracker } from './components/CoinbaseTracker/CoinbaseTracker';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
      <AmplifySignOut />
      <h1>Financiall</h1>
      <CoinbaseTracker />
    </div>
  );
}

export default withAuthenticator(App);
