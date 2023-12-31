import React, { useState } from 'react';

const App = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [mainTask, setMainTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  const deleteHandler = (index) => {
    const updatedMainTasks = [...mainTask];
    updatedMainTasks.splice(index, 1);
    setMainTask(updatedMainTasks);
  };

  const doneHandler = (index) => {
    const updatedMainTasks = [...mainTask];
    const completed = updatedMainTasks.splice(index, 1)[0];
    setMainTask(updatedMainTasks);
    setCompletedTask([...completedTask, completed]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc }]);
    setTitle('');
    setDesc('');
  };

  let renderTask = <h2>No Task Available</h2>;
  let renderCompletedTask = <h2>No Task Completed</h2>;

  if (completedTask.length > 0) {
    renderCompletedTask = completedTask.map((task, index) => (
      <li key={index} className='flex items-center justify-between bg-gray-800 p-4 mb-2'>
        <div className='flex flex-col'>
          <h5 className='text-xl font-semibold text-white'>{task.title}</h5>
        </div>
      </li>
    ));
  }

  if (mainTask.length > 0) {
    renderTask = mainTask.map((task, index) => (
      <li key={index} className='flex items-center justify-between bg-gray-800 p-4 mb-2'>
        <div className='flex flex-col'>
          <h5 className='text-xl font-semibold text-white'>{task.title}</h5>
          <h6 className='text-l font-semibold text-gray-300'>{task.desc}</h6>
        </div>

        <div className="d-flex justify-content-around">
          <button
            className='bg-gray-600 text-white rounded font-bold px-2 py-1'
            onClick={() => deleteHandler(index)}>
            Delete
          </button>
          <button
            className='bg-gray-600 text-white rounded font-bold px-2 py-1'
            onClick={() => doneHandler(index)}>
            Done
          </button>
        </div>
      </li>
    ));
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <h1 className='text-center font-bold text-3xl p-4'>To Do List</h1>
      <form className='m-5 px-4 py-2' onSubmit={submitHandler}>
        <input
          className='m-2 p-2 w-full bg-gray-800 text-white rounded'
          type="text"
          placeholder='Enter task'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className='m-2 p-2 w-full bg-gray-800 text-white rounded'
          type="text"
          placeholder='Enter description'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className='bg-gray-600 text-white text-xl font-bold rounded p-2 mt-4'>
          Add Task
        </button>
      </form>
      <hr />
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <h3>To Do</h3>
            <ul className='list-unstyled'>{renderTask}</ul>
          </div>
          <div className="col">
            <h3>Completed</h3>
            <ul className='list-unstyled'>{renderCompletedTask}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
