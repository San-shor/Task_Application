import { useState, useEffect } from 'react';
// import './App.css';
import AddTask from './components/AddTask';
import ShowTask from './components/ShowTask';

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
  useEffect(() => {
    localStorage.setItem('TaskList', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className='App p-6 bg-gray-100 min-h-screen'>
      <header className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Welcome to Taskify</h1>
      </header>
      <div className='max-w-3xl mx-auto'>
        <AddTask addTask={addTask} />
        <ShowTask tasks={tasks} clearTask={clearTask} />
      </div>
    </div>
  );
}

export default App;
