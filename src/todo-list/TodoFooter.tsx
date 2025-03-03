/** @format */

import React from "react";
import { useTodoContext } from "./TodoProvider";
import _ from "lodash";

function TodoFooter() {
  const { todos,setFilteredTodo , deleteCompletedTodos } = useTodoContext();
  const count  = _.size(_.filter(todos,{completed: false}))
  return (
    <div>
      <span>{count} items left </span>
      <button onClick={() => setFilteredTodo("All")}>All</button>
      <button onClick={() => setFilteredTodo("Active")}>Active</button>
      <button onClick={() => setFilteredTodo("Completed")}>Completed</button>
      <button onClick={deleteCompletedTodos}>Clear Completed</button>
    </div>
  );
}
export default TodoFooter;
