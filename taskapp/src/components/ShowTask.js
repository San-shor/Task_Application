import { useState } from 'react';
import UpdateTaskForm from './UpdateTaskForm';

const ShowTask = ({ tasks, clearTask, deleteTask, updateTask }) => {
  const [singleTask, setSingleTask] = useState([]);
  const [index, setIndex] = useState();

  const handleEdit = (index) => {
    setSingleTask(tasks[index]);
    setIndex(index);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center  justify-between  '>
        <h3 className='text-xl font-semibold text-gray-800 '>Task List</h3>

        <button
          className='btn btn-active btn-accent btn-sm text-white'
          onClick={clearTask}>
          Clear All
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr className='bg-gray-300 px-4 py-2 text-base'>
              <th></th>
              <th>Task Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr className='text-base ' key={index}>
                  <th>{index + 1}</th>
                  <td>{task.task}</td>
                  <td>{task.date}</td>
                  <td>{task.status}</td>
                  <td className=' flex gap-3'>
                    <div className='tooltip' data-tip='Edit'>
                      <button
                        className='btn btn-outline btn-info btn-sm '
                        onClick={() => {
                          handleEdit(index);
                          document.getElementById('my_modal_5').showModal();
                        }}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-6'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                          />
                        </svg>
                      </button>
                    </div>
                    <div className='tooltip' data-tip='Delete'>
                      <button
                        className='btn btn-outline btn-error btn-sm'
                        onClick={() => deleteTask(index)}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-6'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5'>No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <UpdateTaskForm task={singleTask} updateTask={updateTask} index={index} />
    </div>
  );
};

export default ShowTask;
