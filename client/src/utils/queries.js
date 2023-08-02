import { gql } from '@apollo/client';

// ----- USER QUERIES ----- //

// Get User by ID //
export const GET_USER_QUERY = gql`
  query GetUser($_id: ID!) {
    getUser(_id: $_id) {
      id
      username
      email
    }
  }
`;

// Get All Users //
export const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    getAllUsers {
      id
      username
      email
      # Include other fields you need from the User type
    }
  }
`;

// ----- ENVIRONMENT QUERIES ----- //

// Get All Environments //
export const GET_ENVIRONMENTS_QUERY = gql`
  query GetEnvironments {
    getEnvironments {
      id
      name
      image
      description
      resources {
        id
        name
        type
      }
      monsters {
        id
        name
        baseHealth
        baseAttack
      }
    }
  }
`;

// Get Environment by ID //
export const GET_ENVIRONMENT_QUERY = gql`
  query GetEnvironment($_id: ID!) {
    getEnvironment(_id: $_id) {
      id
      name
      image
      description
      resources {
        id
        name
        type
      }
      monsters {
        id
        name
        baseHealth
        baseAttack
      }
    }
  }
`;

// ----- ITEM QUERIES ----- //

// Get All Items //
export const GET_ITEMS_QUERY = gql`
  query GetItems {
    getItems {
      id
      name
      type
      price
      description
    }
  }
`;

// Get Item by ID //
export const GET_ITEM_QUERY = gql`
  query GetItem($_id: ID!) {
    getItem(_id: $_id) {
      id
      name
      type
      price
      description
    }
  }
`;

// ----- MONSTER QUERIES ----- //

// Get All Monsters //
export const GET_MONSTERS_QUERY = gql`
  query GetMonsters {
    getMonsters {
      id
      name
      image
      baseHealth
      baseAttack
      loot {
        id
        name
        type
        price
      }
    }
  }
`;

// Get Monster by ID //
export const GET_MONSTER_QUERY = gql`
  query GetMonster($_id: ID!) {
    getMonster(_id: $_id) {
      id
      name
      image
      baseHealth
      baseAttack
      loot {
        id
        name
        type
        price
      }
    }
  }
`;

// ----- CHARACTER QUERIES ----- //

// Get Character By ID //
export const GET_CHARACTER_QUERY = gql`
  query GetCharacter($_id: ID!) {
    getCharacter(_id: $_id) {
      id
      class
      level
      experience
      baseHealth
      currentHealth
      damage
      gold
      gameboardState
      weapon {
        id
      }
      armor {
        id
      }
      inventory {
        item {
          id
        }
        quantity
      }
    }
  }
`;

// Get Characters By User ID //
export const GET_CHARACTERS_QUERY = gql`
  query GetCharacters($user: ID!) {
    getCharacters(user: $user) {
      id
      class
      level
      experience
      baseHealth
      currentHealth
      damage
      gold
      gameboardState
      weapon {
        id
      }
      armor {
        id
      }
      inventory {
        item {
          id
        }
        quantity
      }
    }
  }
`;