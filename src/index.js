import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql.bitquery.io',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': 'BQYc4emXFYipJGXiypNpejHOpIxzWCo5'
  },
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  return library;
}


root.render(
    <ApolloProvider client={client}>
  <Web3ReactProvider getLibrary={getLibrary}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Web3ReactProvider>
    </ApolloProvider>
);

reportWebVitals();
