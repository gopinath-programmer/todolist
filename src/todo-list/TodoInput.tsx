/** @format */

import React from "react";
import { useTodoContext } from "./TodoProvider";

function TodoInput() {
  const { newTodo, setNewTodo, addNewTodo } = useTodoContext();

  return (
    <div className="todo-header">
      <div className="todo-title"> todos </div>
      <input
        type="text"
        className="todo-input"
        placeholder="What Needs To Be Done?"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => addNewTodo(e.key)}
      />
    </div>
  );
}

export default TodoInput;
