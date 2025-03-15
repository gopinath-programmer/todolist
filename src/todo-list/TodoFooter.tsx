/** @format */

import React from "react";
import { useTodoContext } from "./TodoProvider";
import _ from "lodash";

function TodoFooter() {
  const { todos,setFilteredTodo , deleteCompletedTodos } = useTodoContext();
  const count  = _.size(_.filter(todos,{completed: false}))
  return (
    <div className="todo-footer">
      <span>{count} items left! </span>
      <button className="todo-button" onClick={() => setFilteredTodo("All")}>All</button>
      <button className="todo-button"  onClick={() => setFilteredTodo("Active")}>Active</button>
      <button className="todo-button"  onClick={() => setFilteredTodo("Completed")}>Completed</button>
      <button className="todo-button"  onClick={deleteCompletedTodos}>Clear Completed</button>
    </div>
  );
}
export default TodoFooter;
