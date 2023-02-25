import { client } from './';

export function usersGET() {
  return client.get('/users');
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