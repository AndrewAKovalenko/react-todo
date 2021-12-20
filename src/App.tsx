import React from 'react';
import './App.scss';
import {TextField} from './components/TextField/TextField';
import {TodoList} from './components/TodoList/TodoList';
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';
import {Filters} from './components/Filters/Filters';

function App() {
  return (
    <div className="App">
      <Header />
      <TextField />
      <TodoList />
      <Filters />
      <Footer />
    </div>
  );
}

export default App;
