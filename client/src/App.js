import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CharacterCreate from './pages/CharacterCreate.jsx';
import Introduction from './pages/Introduction.jsx';
import GameLayout from './pages/GameLayout.jsx';
import PageNotFound from './pages/404.jsx';
import './assets/css/gameboard.css';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://fathomless-brook-62747-69ac2fbd8802.herokuapp.com/graphql', // deploy with this
  // uri: 'http://localhost:3002/graphql', // test locally with this
});


const authLink = setContext((_, { headers }) => {
  
  const token = localStorage.getItem('JWT');
 
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/charactercreate" element={<CharacterCreate />} />
        <Route exact path="/introduction" element={<Introduction />} />
        <Route exact path='/gameplay' element={<GameLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
