import React, { useState, useEffect } from 'react';
    import { FaTrash } from 'react-icons/fa';

    function App() {
      const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
          return JSON.parse(savedTodos);
        } else {
          return [];
        }
      });
      const [newTodo, setNewTodo] = useState('');

      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const addTodo = () => {
        if (newTodo.trim() !== '') {
          setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
          setNewTodo('');
        }
      };

      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          addTodo();
        }
      };

      const toggleTodo = (id) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      };

      const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
      };

      return (
        <div className="todo-list">
          <h1>Liste de tâches</h1>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ajouter une tâche"
          />
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(todo.id)}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default App;
