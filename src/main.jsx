import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  BrowserRouter as Router
} from 'react-router-dom'
// import './index.css'

import {

  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql 
  } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
//  connectToDevTools: true
})

const query = gql`
  query {
    allAuthors  {
      name,
      born,
      bookCount,
      id
    }
  }
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <Router> 
          <App />
        </Router> 
    </ApolloProvider>
)
