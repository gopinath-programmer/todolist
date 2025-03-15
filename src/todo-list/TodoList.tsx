/** @format */

import React from "react";
import TodoProvider from "./TodoProvider";
import TodoInput from "./TodoInput";
import TodoItems from "./TodoItems";
import TodoFooter from "./TodoFooter";

function TodoList() {
  return (
    <div  className = 'todo-main'>
      <div className="todo-container">
      <TodoProvider>
        <TodoInput />
        <TodoItems />
        <TodoFooter />
      </TodoProvider>
      </div>
    </div>
  );
}

export default TodoList;
