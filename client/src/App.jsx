import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
// import other pages as needed

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'http://your-graphql-api-endpoint',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
