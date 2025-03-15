/** @format */

import React, {
  PropsWithChildren,
  useReducer,
  createContext,
  useContext,
} from "react";
import { produce } from "immer";
import _ from "lodash";
import './todo.css';

interface TodoType {
  id: number;
  todo: string;
  completed: boolean;
}

interface StateType {
  newTodo: string;
  todos: TodoType[];
  filteredTodos: TodoType[];
  filter: Select;
}

type ActionType =
  | { type: "SET_NEW_TODO"; payload: string }
  | { type: "ADD_NEW_TODO" }
  | { type: "SET_FILTERED_TODO"; payload: Select }
  | { type: "SET_COMPLETED_TODOS"; payload: number }
  | { type: "REMOVE_TODO"; payload: number }
  | { type: "DELETE_COMPLETED" };

type Select = "All" | "Active" | "Completed";

interface TodoContextType {
  todos: TodoType[];
  newTodo: string;
  filteredTodos: TodoType[];
  setNewTodo: (value: string) => void;
  addNewTodo: (key: string) => void;
  setFilteredTodo: (value: Select) => void;
  setCompletedTodos: (id: number) => void;
  removeTodo: (id: number) => void;
  deleteCompletedTodos: () => void;
}

const initialState: StateType = {
  newTodo: "",
  todos: [],
  filteredTodos: [],
  filter: "All",
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const todoReducer = produce((state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_NEW_TODO":
      state.newTodo = action.payload;
      break;

    case "ADD_NEW_TODO":
      if(_.trim(state.newTodo) === ''){
        state.newTodo = "";
        return alert("YOUR TODO IS EMPTY")
      }
      const newTodoId = state.todos.length
        ? Math.max(...state.todos.map((todo) => todo.id)) + 1
        : 1;
      state.todos = [
        ...state.todos,
        { id: newTodoId, todo: state.newTodo, completed: false },
      ];
      state.newTodo = "";
      state.filteredTodos = state.todos;
      break;

    case "SET_COMPLETED_TODOS":
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      break;

    case "REMOVE_TODO":
      state.todos = state.todos.filter((item) => item.id !== action.payload);
      state.filteredTodos = state.todos;
      break;

    case "SET_FILTERED_TODO":
      state.filter = action.payload;
      switch (state.filter) {
        case "Active":
          state.filteredTodos = state.todos.filter((todo) => !todo.completed);
          break;
        case "Completed":
          state.filteredTodos = state.todos.filter((todo) => todo.completed);
          break;
        default:
          state.filteredTodos = state.todos;
      }
      break;

    case "DELETE_COMPLETED":
      _.remove(state.todos, { completed: true });
  }
});

const TodoProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [todolist, dispatch] = useReducer(todoReducer, initialState);

  const setNewTodo = (value: string): void => {
    dispatch({ type: "SET_NEW_TODO", payload: value });
  };

  const addNewTodo = (key: string): void => {
    if (key === "Enter") {
      dispatch({ type: "ADD_NEW_TODO" });
    }
  };

  const setFilteredTodo = (value: Select): void => {
    dispatch({ type: "SET_FILTERED_TODO", payload: value });
  };

  const setCompletedTodos = (id: number): void => {
    dispatch({ type: "SET_COMPLETED_TODOS", payload: id });
    dispatch({ type: "SET_FILTERED_TODO", payload: todolist.filter });
  };
  const removeTodo = (id: number): void => {
    dispatch({ type: "REMOVE_TODO", payload: id });
    dispatch({ type: "SET_FILTERED_TODO", payload: todolist.filter });
  };

  const deleteCompletedTodos = (): void => {
    dispatch({ type: "DELETE_COMPLETED" });
    dispatch({ type: "SET_FILTERED_TODO", payload: todolist.filter });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: todolist.todos,
        newTodo: todolist.newTodo,
        setNewTodo,
        addNewTodo,
        setFilteredTodo,
        filteredTodos: todolist.filteredTodos,
        setCompletedTodos,
        removeTodo,
        deleteCompletedTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("The Component Must Be Inside The Provider");
  }
  return context;
};

export { useTodoContext };
export default TodoProvider;
