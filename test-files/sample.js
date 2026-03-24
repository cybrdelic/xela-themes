/**
 * JavaScript/TypeScript Test File
 * Tests syntax highlighting for JS/TS tokens
 */

import { useState, useEffect } from 'react';
import axios from 'axios';

// Constants and variables
const API_URL = 'https://api.example.com';
let counter = 0;
var legacyVar = 'deprecated';

// Class definition
class UserService {
  #privateField = 42;

  constructor(apiKey) {
    this.apiKey = apiKey;
    this.users = new Map();
  }

  async fetchUsers(limit = 10) {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        params: { limit },
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
      throw new Error(`API Error: ${error.status}`);
    }
  }

  static formatUser(user) {
    return {
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
      isActive: user.status === 'active'
    };
  }
}

// Arrow functions and callbacks
const multiply = (a, b) => a * b;
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);

// Async/await and promises
async function processData(items) {
  const results = await Promise.all(
    items.map(async (item) => {
      const processed = await transform(item);
      return { id: item.id, result: processed };
    })
  );
  return results;
}

// Destructuring and spread
const { name, age, ...rest } = user;
const merged = { ...defaults, ...options };
const [first, second, ...remaining] = array;

// Template literals
const message = `Hello, ${name}! You have ${count} notifications.`;
const multiline = `
  This is a multiline
  template literal with ${interpolation}
`;

// Regular expressions
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

// Symbols and iterators
const uniqueKey = Symbol('unique');
const iterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};

// Export
export { UserService, processData };
export default UserService;
