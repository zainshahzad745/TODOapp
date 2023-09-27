import React, { useState, useEffect } from 'react';
import './style.css'
export const DataFetch = () => {
  const [dataList, setDataList] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTodo, setNewTodo] = useState('');
  const [idCounter, setIdCounter] = useState(31);

  useEffect(() => {
    _getData();
  }, []);

  const _getData = () => {
    fetch('https://dummyjson.com/todos')
      .then((res) => res.json())
      .then((res) => {
        let todos = res.todos;
        setDataList(todos);
      });
  };

  const toggleFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const deleteTodo = (id) => {
    setDataList((prevDataList) => prevDataList.filter((item) => item.id !== id));
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: idCounter,
        todo: newTodo,
        completed: false,
      };
      setIdCounter(idCounter + 1);
      setDataList((prevDataList) => [...prevDataList, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleComplete = (id) => {
    setDataList((prevDataList) =>
      prevDataList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const filteredTodos = dataList.filter((item) => {
    switch (filter) {
      case 'completed':
        return item.completed === true;
      case 'incomplete':
        return item.completed === false;
      default:
        return true;
    }
  });

  const Todo = ({ item }) => (
    <div className="todo">
      <div className="todo-info">
        <div className="todo-id">{item.id}</div>
        <div className="todo-text">{item.todo}</div>
      </div>
      <div className="todo-buttons">
        <button onClick={() => deleteTodo(item.id)}>Delete</button>
        <button onClick={() => toggleComplete(item.id)}>
          {item.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
      </div>
    </div>
  );
  

  return (
    <div className="todo-app">
      <h3 style={{color:'white', textAlign: 'center'}}>Filter Todos</h3>
      <div className="filter-buttons">
        <button className={`filter-button ${filter === 'all' && 'active'}`} onClick={() => toggleFilter('all')}>All</button>
        <button className={`filter-button ${filter === 'completed' && 'active'}`} onClick={() => toggleFilter('completed')}>Completed</button>
        <button className={`filter-button ${filter === 'incomplete' && 'active'}`} onClick={() => toggleFilter('incomplete')}>Incomplete</button>
      </div>
      <h3 style={{color:'white'}}>TODO ID</h3>
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="todo-list">
        {filteredTodos.map((item) => (
          <Todo item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

