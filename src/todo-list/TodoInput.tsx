/** @format */

import React from "react";
import { useTodoContext } from "./TodoProvider";

function TodoInput() {
  const { newTodo, setNewTodo, addNewTodo } = useTodoContext();

  return (
    <div className="todo-list-header">
      <h1> todos </h1>
      <input
        type="text"
        className="todo-list-input"
        placeholder="What Needs To Be Done?"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => addNewTodo(e.key)}
      />
    </div>
  );
}

export default TodoInput;
