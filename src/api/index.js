import axios from 'axios';

export const client = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3000/api/v1'
});

export function loginPOST(username, password) {
  const data = {
    "login": username,
    "password": password
  };

  return client.post('/login', data);
}

export function logoutPOST() {
  return client.post('/logout');
}

export function meGET() {
  return client.get('/me');
}

export function usersGET() {
  return client.get('/users');
}