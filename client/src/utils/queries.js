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
      _id
      name
      user
      class
      level
      experience
      baseHealth
      currentHealth
      basePhysicalAttack
      baseMagicalAttack
      skills
      weapon {
        id
        name
        type
        description
        price
      }
      armor {
        id
        name
        type
        description
        price
      }
      inventory {
        type {
          item
          quantity
        }
      }
      gold
      gameboardState
    }
  }
`;


// Get Characters By User ID //
export const GET_CHARACTERS_QUERY = gql`
  query GetCharactersByUserId($user: ID!) {
    getCharactersByUserID(user: $user) {
      _id
      name
      user
      class
      level
      experience
      baseHealth
      currentHealth
      basePhysicalAttack
      baseMagicalAttack
      gold
    }
  }
`;


// ----- GAMEBOARD QUERIES ----- //

// Get Gameboard By ID //
export const GET_GAMEBOARD_QUERY = gql`
  query GetGameboard($_id: ID!) {
    getGameboard(_id: $_id) {
      id
      name
      background
      terrainImages
      environments {
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
      monsters {
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
  }
`;

// Get All Gameboards //
export const GET_GAMEBOARDS_QUERY = gql`
  query GetGameboards {
    getGameboards {
      id
      name
      background
      terrainImages
      environments {
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
      monsters {
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
  }
`;
