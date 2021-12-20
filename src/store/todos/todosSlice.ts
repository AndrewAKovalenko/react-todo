import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Todo} from '../../models/todo';
import {RootState} from '../store';
import {createNewTodo} from '../../utils/createNewTodo';
import {FilterStatus} from '../../enums/filterStatus';

interface TodosState {
  items: Todo[];
  filter: FilterStatus;
}

let initialTodos = [];

try {
  initialTodos = JSON.parse(localStorage.getItem('todos') || '[]');
} catch (e) {}

const initialState: TodosState = {
  items: initialTodos,
  filter: FilterStatus.All
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string }>) => {
      state.items = [...state.items, createNewTodo(action.payload.text)];
    },
    removeTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload.id);
    },
    updateTodo: (state, action: PayloadAction<{id: string, text?: string, completed?: boolean}>) => {
      state.items = state.items.map(
        todo => todo.id === action.payload.id
          ? {...todo, ...action.payload}
          : todo
      );
    },
    removeCompletedTodos: state => {
      state.items = state.items.filter(todo => !todo.completed);
    },
    setCompleteStatusForAll: (state, action: PayloadAction<{ completed: boolean }>) => {
      state.items = state.items.map(item => ({...item, completed: action.payload.completed}));
    },
    setFilterStatus: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    }
  }
});

export const {
  addTodo,
  removeTodo,
  updateTodo,
  removeCompletedTodos,
  setCompleteStatusForAll,
  setFilterStatus
} = todosSlice.actions;

export const selectFilteredTodos = (state: RootState) => {
  if (state.todos.filter === FilterStatus.Active) {
    return state.todos.items.filter(item => !item.completed);
  } else if (state.todos.filter === FilterStatus.Completed) {
    return state.todos.items.filter(item => item.completed);
  } else {
    return state.todos.items;
  }
}

export const selectFilterStatus = (state: RootState) => state.todos.filter;
export const selectUncompletedItemsCount = (state: RootState) => state.todos.items.reduce(
  (prev, curr) => curr.completed ? prev : prev + 1, 0
);
export const selectCompletedItemsCount = (state: RootState) => state.todos.items.reduce(
  (prev, curr) => curr.completed ? prev + 1 : prev, 0
);
export const selectAllItemsAreCompleted = (state: RootState) => state.todos.items.every(item => item.completed);

export const todosReducer = todosSlice.reducer;
