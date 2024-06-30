import { useState, useEffect } from 'react';
// import './App.css';
import AddTask from './components/AddTask';
import ShowTask from './components/ShowTask';
import UpdateTaskForm from './components/UpdateTaskForm';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('TaskList');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const clearTask = () => {
    setTasks([]);
    localStorage.removeItem('TaskList');
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  // useEffect(() => {
  //   const storedTasks = JSON.parse(localStorage.getItem('TaskList'));
  //   if (storedTasks) setTasks(storedTasks);
  // }, []);

  useEffect(() => {
    localStorage.setItem('TaskList', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className='App p-6 bg-gray-100 min-h-screen'>
      <header className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Welcome to Taskify</h1>
      </header>
      <div className=' flex flex-col max-w-3xl mx-auto gap-10'>
        <AddTask addTask={addTask} />
        <ShowTask tasks={tasks} clearTask={clearTask} deleteTask={deleteTask} />
      </div>
      <UpdateTaskForm />
    </div>
  );
}

export default App;
