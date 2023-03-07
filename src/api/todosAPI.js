import { client } from '.';

export function getTodos() {
  return client.get('/todos');
}

export function postTodo(title, description) {
  const todo = {
    title,
    description
  };

  return client.post('/todos', todo);
}

export function deleteTodoById(id) {
  return client.delete(`/todos/${id}`);
}

export function getTodoById(id) {
  return client.get(`/todos/${id}`);
}

export function putTodoById(id, title, description) {
  const todo = {
    title,
    description
  };

  return client.put(`/todos/${id}`, todo);
}