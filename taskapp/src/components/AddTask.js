import { useState } from 'react';

const AddTask = ({ addTask }) => {
  const [task, setTask] = useState({ task: '', date: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);

    setTask({ task: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col'>
        <div className='flex  justify-center items-center space-x-4'>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text font-bold text-gray-700'>
                Add your daily task
              </span>
            </div>
            <input
              type='text'
              name='task'
              value={task.task}
              placeholder='Type here'
              className='input input-bordered w-full max-w-xs'
              onChange={handleChange}
            />
          </label>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text font-bold text-gray-700'>Date</span>
            </div>
            <input
              type='date'
              name='date'
              value={task.date}
              placeholder='Type here'
              className='input input-bordered w-full max-w-xs'
              onChange={handleChange}
            />
          </label>
          <button
            className='btn btn-active btn-success text-white  mt-9 '
            type='submit'>
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTask;
