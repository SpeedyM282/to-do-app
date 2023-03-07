import axios from 'axios';

export const client = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3000/api/v1'
});

export function postLogin(username, password) {
  const data = {
    "login": username,
    "password": password
  };

  return client.post('/login', data);
}

export function postLogout() {
  return client.post('/logout');
}

export function getMe() {
  return client.get('/me');
}

export function getUsers() {
  return client.get('/users');
}