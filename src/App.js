import React, { useRef, useState } from 'react'
import './main.css'
import Home from './home';
import TodosContext from './todoContext';

const App = () => {
  const [todos, setTodos] = useState([]);

  const [category, setCategory] = useState("All");

  const CATEGORY_FILTER = {
    All: (item) => item,
    Active: (item) => !item.checked,
    Completed: (item) => item.checked
  };

  const todoInputRef = useRef();

  const todoItemInputRef = useRef();


  return (
    <TodosContext.Provider 
      value={{ 
        todos, 
        setTodos, 
        category, 
        setCategory, 
        todoInputRef, 
        CATEGORY_FILTER, 
        todoItemInputRef 
      }}>
      <Home />
    </TodosContext.Provider>
  )
}

export default App;
