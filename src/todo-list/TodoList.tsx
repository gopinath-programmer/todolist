/** @format */

import React from "react";
import TodoProvider from "./TodoProvider";
import TodoInput from "./TodoInput";
import TodoItems from "./TodoItems";
import TodoFooter from "./TodoFooter";

function TodoList() {
  return (
    <div>
      <TodoProvider>
        <TodoInput />
        <TodoItems />
        <TodoFooter />
      </TodoProvider>
    </div>
  );
}

export default TodoList;
