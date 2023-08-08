import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CHARACTER_QUERY } from '../utils/queries';
import { BUY_ITEM_MUTATION } from '../utils/mutations';

function Trader() {
  const [error, setError] = useState('');
  const [characterId, setCharacterId] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('DD_session');
    const character = session ? JSON.parse(session).character : null;

    if (character) {
      setCharacterId(character._id);
    }
  }, []);

  const { loading, data } = useQuery(GET_CHARACTER_QUERY, {
    variables: { id: characterId },
  });

  console.log('data:', data); // console log

  const [buyItem] = useMutation(BUY_ITEM_MUTATION, {
    onError: (error) => {
      setError(error.message);
      setTimeout(() => {
        setError('');
      }, 3000);
    },
  });

  const handleBuyItem = async (itemId, price) => {
    console.log('handleBuyItem data:', data); // console log

    if (data && data.getCharacter && data.getCharacter.gold >= price) {
      try {
        await buyItem({
          variables: { characterId, itemId },
        });
      } catch (error) {
        console.error('Error buying item:', error.message);
      }
    } else {
      setError("You don't have enough gold to buy this item.");
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const { getCharacter: character } = data;

  console.log('character:', character); // console log

  return (
    <div>
      <h2>Trader</h2>
      {character ? (
        <div>
          <p>Your Gold: {character.gold}</p>
          <h3>Items for Sale</h3>
          <ul>
            {character.traderItems.map((item) => (
              <li key={item.id}>
                <p>Name: {item.name}</p>
                <p>Type: {item.type}</p>
                <p>Description: {item.description}</p>
                <p>Price: {item.price} Gold</p>
                <button onClick={() => handleBuyItem(item.id, item.price)}>Buy</button>
              </li>
            ))}
          </ul>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : null}
      <Link to="/tavern">Back to Tavern</Link>
    </div>
  );
}

export default Trader;
