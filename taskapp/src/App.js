import { useState, useEffect } from 'react';

import AddTask from './components/AddTask';
import ShowTask from './components/ShowTask';
import { loadTasksFromStorage } from './taskUtils';

function App() {
  const [tasks, setTasks] = useState(loadTasksFromStorage);

  const addTask = (newTask) => {
    const title = newTask.task.trim();
    if (!title) return false;

    const task = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `task-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      task: title,
      date: typeof newTask.date === 'string' ? newTask.date : '',
      status: newTask.status === 'complete' ? 'complete' : 'pending',
    };

    setTasks((prevTasks) => [...prevTasks, task]);
    return true;
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  };

  const updateTask = (updated) => {
    if (!updated || !updated.id) return;
    const title = String(updated.task ?? '').trim();
    if (!title) return;

    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === updated.id
          ? {
              ...updated,
              id: updated.id,
              task: title,
              date: typeof updated.date === 'string' ? updated.date : '',
              status: updated.status === 'complete' ? 'complete' : 'pending',
            }
          : t
      )
    );
  };

  const toggleTaskStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === 'complete' ? 'pending' : 'complete',
            }
          : t
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('TaskList', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className='App min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-primary/10'>
      <div className='mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8'>
        <header className='mb-10 text-center'>
          <p className='mb-2 text-sm font-semibold uppercase tracking-widest text-primary'>
            Taskify
          </p>
          <h1 className='text-3xl font-bold tracking-tight text-base-content sm:text-4xl'>
            Your daily tasks
          </h1>
          <p className='mx-auto mt-3 max-w-lg text-base text-base-content/70'>
            Add tasks with a due date, track status, and keep everything in one
            place.
          </p>
        </header>
        <div className='flex flex-col gap-8'>
          <AddTask addTask={addTask} />
          <ShowTask
            tasks={tasks}
            clearTask={clearAllTasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
            toggleTaskStatus={toggleTaskStatus}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
