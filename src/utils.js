import Todo from "./components/Todo";

localStorage.setItem('listsToggle', JSON.stringify({ showTodos: false, showUsers: false }));

export function todoGenerator(id, title, description) {
  return <Todo key={id} id={id} title={title} description={description} />;
}

export function todoDeleter(todos, id) {
  return todos.filter(e => e.props.id !== id);
}

export function todoUpdater(todos, id, title, description) {
  return todos.map(e => {
    if (e.props.id === id) {
      e.props.title = title;
      e.props.description = description;
    }
    return e;
  });
}

export function todosAssigner(data) {
  return data.map(e => todoGenerator(e.id, e.title, e.description));
}