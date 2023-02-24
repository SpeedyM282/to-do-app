import axios from 'axios';


const client = axios.create({
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

export function todosGET() {
  return client.get('/todos');
}

export function todosPOST(title, description) {
  const todo = {
    title,
    description
  }

  return client.post('/todos', todo);
}

export function todoDELETE(id) {
  client.delete(`/todos/${id}`);
}