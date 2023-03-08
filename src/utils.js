import Todo from "./components/Todo";

localStorage.setItem('listsToggle', JSON.stringify({ showTodos: false, showUsers: false }));

export function todoGenerator(data) {
  return (
    <Todo
      key={data.id}
      id={data.id}
      title={data.title}
      description={data.description}
      createdBy={data.createdBy}
    />
  );
}

export function todoDeleter(todos, id) {
  return todos.filter(e => e.id !== id);
}

export function todoUpdater(todos, id, title, description) {
  return todos.map(e => {
    if (e.id === id) {
      e.title = title;
      e.description = description;
    }

    return e;
  });
}