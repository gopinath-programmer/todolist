/** @format */

import React from "react";
import _ from "lodash";
import { useTodoContext } from "./TodoProvider";

function TodoItems() {
  const { filteredTodos, setCompletedTodos, removeTodo } = useTodoContext();

  return (
    <div>
      {_.map(filteredTodos, (item) => (
        <div key={item.id} className="todo-item">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => setCompletedTodos(item.id)}
          />
          <span>{item.todo}</span>
          <button onClick={() => removeTodo(item.id)}>X</button>
        </div>
      ))}
    </div>
  );
}

export default TodoItems;
