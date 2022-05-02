import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get('/api/todos/')
      .then(res => {
        setTodos(res.data);
      })
      .catch(() => {
        alert('Something went wrong');
      });
  }, []);

  return (
    <>
      <Navbar className='bg-dark mb-5'>
        <Container>
          <Navbar.Brand href='#' className='text-white'>
            To-Do App
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <TodoForm todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </Container>
    </>
  );
}

export default App;
