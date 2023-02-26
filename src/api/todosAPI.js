import { client } from '.';

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
  return client.delete(`/todos/${id}`);
}

export function todoPUT(id) {
  return client.put(`/todos/${id}`);
}