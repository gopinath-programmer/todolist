/** @format */

import React from "react";
import _ from "lodash";
import { useTodoContext } from "./TodoProvider";

function TodoItems() {
  const { filteredTodos, setCompletedTodos, removeTodo } = useTodoContext();

  return (
     <div>
     { _.size(filteredTodos) > 0 && <div className="lists-container">
      {_.map(filteredTodos, (item) => (
        <div key={item.id} className="todo-item">
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={item.completed}
            onChange={() => setCompletedTodos(item.id)}
          />
          <span className="todo-name" >{item.todo}</span>
          <button onClick={() => removeTodo(item.id)} className="todo-remove" >&#10006;</button>
        </div>
      ))}
    </div>}
    </div>
  );
}

export default TodoItems;
