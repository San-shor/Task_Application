import React, { useEffect, useState } from 'react';

const UpdateTaskForm = ({ task, index, updateTask }) => {
  const [formValue, setFormValue] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (status) => {
    setFormValue((prevValue) => ({
      ...prevValue,
      status,
    }));
  };

  const handleUpdate = () => {
    updateTask(formValue, index);
    document.getElementById('my_modal_5').close();
  };

  useEffect(() => {
    setFormValue(task);
  }, [task]);

  return (
    <div>
      <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Update your task</h3>
          <div className=' mt-5 '>
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text font-bold text-gray-700'>
                  Task Name
                </span>
              </div>
              <input
                type='text'
                name='task'
                value={formValue.task}
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
                value={formValue.date}
                placeholder='Type here'
                className='input input-bordered w-full max-w-xs'
                onChange={handleChange}
              />
            </label>
          </div>

          <div className='flex flex-row gap-4 mt-4'>
            <label className='cursor-pointer label gap-1'>
              <span className='label-text'>Pending</span>
              <input
                type='checkbox'
                value={formValue.status}
                checked={
                  formValue.status === 'pending' ? formValue.status : null
                }
                onChange={() => handleCheckboxChange('pending')}
                className='checkbox checkbox-error '
              />
            </label>
            <label className='cursor-pointer label gap-1'>
              <span className='label-text'>Complete</span>
              <input
                type='checkbox'
                value={formValue.status}
                className='checkbox  checkbox-success '
                checked={formValue.status === 'complete'}
                onChange={() => handleCheckboxChange('complete')}
              />
            </label>
          </div>
          <div className='mt-4 cursor-pointer'>
            <button
              className='btn btn-success text-white btn-sm'
              onClick={handleUpdate}>
              Save
            </button>
          </div>

          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn btn-sm btn-warning text-white font-bold'>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateTaskForm;
