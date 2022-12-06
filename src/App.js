import React from 'react';
import './App.css';
import { FullLayoutApp } from './components/FullLayoutApp';
import 'bootstrap/dist/css/bootstrap.css';
import MessengerCustomerChat from 'react-messenger-customer-chat';

function App() {
  return (
    <div className='app'>
      <FullLayoutApp></FullLayoutApp>
      <MessengerCustomerChat
        pageId="105768935696664"
        appId="1171088433793483"
      />

    </div>
  );
}

export default App;
