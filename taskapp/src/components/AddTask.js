import { useState } from 'react';

const initialState = {
  task: '',
  date: '',
  status: 'pending',
};

const AddTask = ({ addTask }) => {
  const [task, setTask] = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = addTask(task);
    if (!ok) {
      setError('Enter a task name before adding.');
      return;
    }
    setTask(initialState);
    setError('');
  };

  return (
    <section className='card border border-base-300/80 bg-base-100 shadow-xl shadow-primary/5'>
      <div className='card-body gap-6 p-6 sm:p-8'>
        <div>
          <h2 className='text-lg font-semibold text-base-content'>New task</h2>
          <p className='mt-1 text-sm text-base-content/60'>
            Describe what you need to do and pick a date.
          </p>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6' noValidate>
          <div className='grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end'>
            <label className='form-control w-full'>
              <div className='label pt-0'>
                <span className='label-text font-medium'>Task</span>
              </div>
              <input
                type='text'
                name='task'
                value={task.task}
                placeholder='e.g. Review project brief'
                className={`input input-bordered w-full bg-base-100 ${
                  error ? 'input-error' : ''
                }`}
                onChange={handleChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'add-task-error' : undefined}
              />
              {error ? (
                <div id='add-task-error' className='label' role='alert'>
                  <span className='label-text-alt text-error'>{error}</span>
                </div>
              ) : null}
            </label>
            <label className='form-control w-full'>
              <div className='label pt-0'>
                <span className='label-text font-medium'>Due date</span>
              </div>
              <input
                type='date'
                name='date'
                value={task.date}
                className='input input-bordered w-full bg-base-100'
                onChange={handleChange}
              />
            </label>
            <button
              className='btn btn-primary w-full shrink-0 sm:w-auto sm:min-w-[9rem]'
              type='submit'>
              Add task
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTask;
