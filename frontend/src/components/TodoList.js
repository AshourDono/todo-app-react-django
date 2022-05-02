import axios from 'axios';
import React, { useState } from 'react';

import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete, MdEdit } from 'react-icons/md';

import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';

function TodoList({ todos = [], setTodos }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

  const completedTodos = todos.filter(todo => todo.completed);
  const incompletedTodos = todos.filter(todo => !todo.completed);

  const handleClose = () => {
    setShow(false);
  };

  const handleUpdate = async (id, value) => {
    const res = await axios.patch(`/api/todos/${id}/`, value);
    const { data } = res;
    const newTodos = todos.map(todo => (todo.id === id ? data : todo));
    setTodos(newTodos);
  };

  const handleChange = e => {
    setData({ ...data, name: e.target.value });
  };

  const handleSave = async () => {
    await handleUpdate(data.id, { name: data.name });
    handleClose();
  };

  const handleDelete = id => {
    axios
      .delete(`/api/todos/${id}/`)
      .then(() => {
        const filtered = todos.filter(todo => todo.id !== id);
        setTodos(filtered);
      })
      .catch(() => {
        alert('aha');
      });
  };

  return (
    <>
      <div className='mb-2 mt-4'>Incompleted ({incompletedTodos.length})</div>
      <ListGroup>
        {incompletedTodos.map(todo => {
          return (
            <ListGroupItem
              key={todo.id}
              className='d-flex justify-content-between align-items-center'>
              <div className='d-flex justify-content-center'>
                <span
                  style={{ marginRight: '12px', cursor: 'pointer' }}
                  onClick={() => {
                    handleUpdate(todo.id, { completed: !todo.completed });
                  }}>
                  {todo.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </span>
                <span>{todo.name}</span>
              </div>
              <div>
                <MdEdit
                  style={{ cursor: 'pointer', marginRight: '12px' }}
                  onClick={() => {
                    setData(todo);
                    setShow(true);
                  }}
                />
                <MdDelete
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleDelete(todo.id);
                  }}
                />
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
      <div className='mb-2 mt-4'>Completed ({completedTodos.length})</div>
      <ListGroup>
        {completedTodos.map(todo => {
          return (
            <ListGroupItem
              key={todo.id}
              className='d-flex justify-content-between align-items-center'>
              <div className='d-flex justify-content-center'>
                <span
                  style={{ marginRight: '12px', cursor: 'pointer' }}
                  onClick={() => {
                    handleUpdate(todo.id, { completed: !todo.completed });
                  }}>
                  {todo.completed === true ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </span>
                <span>{todo.name}</span>
              </div>
              <div>
                <MdEdit
                  style={{ cursor: 'pointer', marginRight: '12px' }}
                  onClick={() => {
                    setData(todo);
                    setShow(true);
                  }}
                />
                <MdDelete
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleDelete(todo.id);
                  }}
                />
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl value={data ? data.name : ''} onChange={handleChange} />
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='success' onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TodoList;
