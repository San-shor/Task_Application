import React from 'react';

const UpdateTaskForm = () => {
  const handleUpdate = () => {};
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
                placeholder='Type here'
                className='input input-bordered w-full max-w-xs'
              />
            </label>
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text font-bold text-gray-700'>Date</span>
              </div>
              <input
                type='date'
                name='date'
                placeholder='Type here'
                className='input input-bordered w-full max-w-xs'
              />
            </label>
          </div>

          <div className='flex flex-row gap-4 mt-4'>
            <label className='cursor-pointer label gap-1'>
              <span className='label-text'>Pending</span>
              <input type='checkbox' className='checkbox checkbox-error ' />
            </label>
            <label className='cursor-pointer label gap-1'>
              <span className='label-text'>Complete</span>
              <input type='checkbox' className='checkbox  checkbox-success ' />
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
