import { gql } from '@apollo/client';

// ----- USER MUTATIONS ----- //

// Login //
export const LOGIN_MUTATION = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        id
        email
        password
      }
    }
  }
`;

// Logout // 
export const LOGOUT_MUTATION = gql`
  mutation logoutUser {
    logoutUser {
      success
    }
  }
`;

// Create User // 
export const CREATE_USER_MUTATION = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
      password
    }
  }
`;

// ----- CHARACTER MUTATIONS ----- //

// Create New Character //
export const CREATE_CHARACTER_MUTATION = gql`
  mutation CreateCharacter($user: ID!, $class: String!, $baseHealth: Int!, $currentHealth: Int!) {
    createCharacter(user: $user, class: $class, baseHealth: $baseHealth, currentHealth: $currentHealth) {
      id
      class
      level
      experience
      baseHealth
      currentHealth
      damage
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
      gold
    }
  }
`;

// Update Character //
export const UPDATE_CHARACTER_MUTATION = gql`
  mutation UpdateCharacter($_id: ID!, $class: String, $level: Int, $experience: Int, $baseHealth: Int, $currentHealth: Int, $damage: Int, $gold: Int, $gameboardState: String) {
    updateCharacter(_id: $_id, class: $class, level: $level, experience: $experience, baseHealth: $baseHealth, currentHealth: $currentHealth, damage: $damage, gold: $gold, gameboardState: $gameboardState) {
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

// Delete Character //
export const DELETE_CHARACTER_MUTATION = gql`
  mutation DeleteCharacter($_id: ID!) {
    deleteCharacter(_id: $_id) {
      id
    }
  }
`;

// Equip Weapon //
export const EQUIP_WEAPON_MUTATION = gql`
  mutation EquipWeapon($characterId: ID!, $itemId: ID!) {
    equipWeapon(characterId: $characterId, itemId: $itemId) {
      id
    }
  }
`;

// Equip Armor //
export const EQUIP_ARMOR_MUTATION = gql`
  mutation EquipArmor($characterId: ID!, $itemId: ID!) {
    equipArmor(characterId: $characterId, itemId: $itemId) {
      id
    }
  }
`;

// Loot Item To Inventory //
export const ADD_ITEM_TO_INVENTORY_MUTATION = gql`
  mutation AddItemToInventory($characterId: ID!, $itemId: ID!) {
    addItemToInventory(characterId: $characterId, itemId: $itemId) {
      id
    }
  }
`;

// Remove Item From Inventory //
export const REMOVE_ITEM_FROM_INVENTORY_MUTATION = gql`
  mutation RemoveItemFromInventory($characterId: ID!, $itemId: ID!) {
    removeItemFromInventory(characterId: $characterId, itemId: $itemId) {
      id
    }
  }
`;

// Save Game State //
export const UPDATE_GAME_STATE_MUTATION = gql`
  mutation UpdateGameState($characterId: ID!, $gameState: String!) {
    updateGameState(characterId: $characterId, gameState: $gameState) {
      id
    }
  }
`;

// ------ ITEM MUTATIONS ------ //

// Create Item //
export const CREATE_ITEM_MUTATION = gql`
  mutation CreateItem(
    $name: String!
    $type: String!
    $price: Int!
  ) {
    createItem(name: $name, type: $type, price: $price) {
      id
      name
      type
      price
    }
  }
`;

// Update Item //
export const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItem(
    $_id: ID!
    $name: String
    $type: String
    $price: Int
  ) {
    updateItem(_id: $_id, name: $name, type: $type, price: $price) {
      id
      name
      type
      price
    }
  }
`;

// Delete Item //
export const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItem($_id: ID!) {
    deleteItem(_id: $_id)
  }
`;

// Buy Item //
export const BUY_ITEM_MUTATION = gql`
  mutation BuyItem($characterId: ID!, $itemId: ID!) {
    buyItem(characterId: $characterId, itemId: $itemId) {
      id
      gold
      inventory {
        item {
          id
          name
        }
        quantity
      }
    }
  }
`;

// Sell Item //
export const SELL_ITEM_MUTATION = gql`
  mutation SellItem($characterId: ID!, $itemId: ID!) {
    sellItem(characterId: $characterId, itemId: $itemId) {
      id
      gold
      inventory {
        item {
          id
          name
        }
        quantity
      }
    }
  }
`;

// ----- ENVIRONMENT MUTATIONS ----- //

// Create Environment //
export const CREATE_ENVIRONMENT_MUTATION = gql`
  mutation CreateEnvironment(
    $name: String!
    $image: String!
    $description: String!
    $resources: [ID!]!
    $badOutcomes: [String!]!
    $monsters: [ID!]!
  ) {
    createEnvironment(
      name: $name
      image: $image
      description: $description
      resources: $resources
      badOutcomes: $badOutcomes
      monsters: $monsters
    ) {
      id
      name
      image
      description
      resources {
        id
      }
      badOutcomes
      monsters {
        id
      }
    }
  }
`;

// Update Environment //
export const UPDATE_ENVIRONMENT_MUTATION = gql`
  mutation UpdateEnvironment(
    $_id: ID!
    $name: String
    $image: String
    $description: String
    $resources: [ID!]
    $badOutcomes: [String!]
    $monsters: [ID!]
  ) {
    updateEnvironment(
      _id: $_id
      name: $name
      image: $image
      description: $description
      resources: $resources
      badOutcomes: $badOutcomes
      monsters: $monsters
    ) {
      id
      name
      image
      description
      resources {
        id
      }
      badOutcomes
      monsters {
        id
      }
    }
  }
`;

// Delete Environment //
export const DELETE_ENVIRONMENT_MUTATION = gql`
  mutation DeleteEnvironment($_id: ID!) {
    deleteEnvironment(_id: $_id)
  }
`;

// ----- MONSTER MUTATIONS ----- //

// Create Monster //
export const CREATE_MONSTER_MUTATION = gql`
  mutation CreateMonster(
    $name: String!
    $image: String!
    $baseHealth: Int!
    $baseAttack: Int!
    $loot: [ID!]!
  ) {
    createMonster(
      name: $name
      image: $image
      baseHealth: $baseHealth
      baseAttack: $baseAttack
      loot: $loot
    ) {
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

// Update Monster //
export const UPDATE_MONSTER_MUTATION = gql`
  mutation UpdateMonster(
    $_id: ID!
    $name: String
    $image: String
    $baseHealth: Int
    $baseAttack: Int
    $loot: [ID!]
  ) {
    updateMonster(
      _id: $_id
      name: $name
      image: $image
      baseHealth: $baseHealth
      baseAttack: $baseAttack
      loot: $loot
    ) {
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

// Delete Monster //
export const DELETE_MONSTER_MUTATION = gql`
  mutation DeleteMonster($_id: ID!) {
    deleteMonster(_id: $_id)
  }
`;

// ----- GAMEBOARD MUTATIONS ----- //

// Create Gameboard //
export const CREATE_GAMEBOARD_MUTATION = gql`
  mutation CreateGameboard(
    $name: String!
    $background: String!
    $terrainImages: [String!]!
    $environments: [ID!]!
    $monsters: [ID!]!
  ) {
    createGameboard(
      name: $name
      background: $background
      terrainImages: $terrainImages
      environments: $environments
      monsters: $monsters
    ) {
      id
      name
      background
      terrainImages
      environments {
        id
      }
      monsters {
        id
      }
    }
  }
`;

// Update Gameboard //
export const UPDATE_GAMEBOARD_MUTATION = gql`
  mutation UpdateGameboard(
    $_id: ID!
    $name: String
    $background: String
    $terrainImages: [String!]
    $environments: [ID!]
    $monsters: [ID!]
  ) {
    updateGameboard(
      _id: $_id
      name: $name
      background: $background
      terrainImages: $terrainImages
      environments: $environments
      monsters: $monsters
    ) {
      id
      name
      background
      terrainImages
      environments {
        id
      }
      monsters {
        id
      }
    }
  }
`;

// Delete Gameboard //
export const DELETE_GAMEBOARD_MUTATION = gql`
  mutation DeleteGameboard($_id: ID!) {
    deleteGameboard(_id: $_id)
  }
`;