import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CharacterCreate from './pages/CharacterCreate.jsx';
import Introduction from './pages/Introduction.jsx';
import GameLayout from './pages/GameLayout.jsx';
import PageNotFound from './pages/404.jsx';
import './assets/css/gameboard.css';


// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'http://your-graphql-api-endpoint',
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

//<Route exact path="/gameplay" element={<Gameplay />} />
export default App;
