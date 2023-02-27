import { client } from '.';

export function todosGET() {
  return client.get('/todos');
}

export function todoPOST(title, description) {
  const todo = {
    title,
    description
  };

  return client.post('/todos', todo);
}

export function todoDELETE(id) {
  return client.delete(`/todos/${id}`);
}

export function todoByIdGET(id) {
  return client.get(`/todos/${id}`);
}

export function todoPUT(id, title, description) {
  const todo = {
    title,
    description
  };

  return client.put(`/todos/${id}`, todo);
}