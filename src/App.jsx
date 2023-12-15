import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { NewToDoForm } from "./NewToDoForm";
import { ToDoList } from "./ToDoList";
import { UserInfo } from "./UserInfo";

function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  const previousItem = useRef(
    (function () {
      const localValue = localStorage.getItem("CLICKED-TOTAL");
      if (localValue == null || isNaN(localValue)) return 0;
      return localValue;
    })()
  );

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addToDo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
    previousItem.current = previousItem.current + 1;
    localStorage.setItem("CLICKED-TOTAL", previousItem.current);
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((i) => i.id != id);
    });
  }

  return (
    <>
      <NewToDoForm onSubmit={addToDo} />
      <h1 className="header">ToDo List</h1>
      <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <hr />
      <h1 className="header">Totally Clicked Add button</h1>
      <p>{previousItem.current}</p>
      <hr />
      <UserInfo />
    </>
  );
}

export default App;
