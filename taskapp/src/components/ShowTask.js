import { useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import UpdateTaskForm from './UpdateTaskForm';
import { formatDueDate } from '../taskUtils';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'complete', label: 'Complete' },
];

const ShowTask = ({
  tasks,
  clearTask,
  deleteTask,
  updateTask,
  toggleTaskStatus,
}) => {
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');

  const visibleTasks = useMemo(() => {
    if (filter === 'all') return tasks;
    return tasks.filter((t) => t.status === filter);
  }, [tasks, filter]);

  const handleEdit = (task) => {
    flushSync(() => {
      setEditingTask(task);
    });
    document.getElementById('my_modal_5').showModal();
  };

  const openClearAllModal = () => {
    document.getElementById('modal_clear_all')?.showModal();
  };

  const handleConfirmClearAll = () => {
    clearTask();
    document.getElementById('modal_clear_all')?.close();
  };

  const statusBadge = (status) =>
    status === 'complete' ? (
      <span className='badge badge-success badge-outline gap-1 font-medium'>
        Complete
      </span>
    ) : (
      <span className='badge badge-warning badge-outline gap-1 font-medium'>
        Pending
      </span>
    );

  return (
    <section className='card border border-base-300/80 bg-base-100 shadow-xl shadow-primary/5'>
      <div className='card-body gap-6 p-6 sm:p-8'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
          <div className='min-w-0 flex-1'>
            <h2 className='text-lg font-semibold text-base-content'>Task list</h2>
            <p className='mt-1 text-sm text-base-content/60'>
              {tasks.length === 0
                ? 'No tasks yet — add one above.'
                : `${tasks.length} task${tasks.length === 1 ? '' : 's'} saved`}
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <div className='join border border-base-300 bg-base-100'>
              {FILTERS.map(({ value, label }) => (
                <button
                  key={value}
                  type='button'
                  className={`btn join-item btn-sm ${
                    filter === value ? 'btn-primary' : 'btn-ghost'
                  }`}
                  onClick={() => setFilter(value)}
                  aria-pressed={filter === value}>
                  {label}
                </button>
              ))}
            </div>
            <button
              className='btn btn-outline btn-sm border-base-300'
              onClick={openClearAllModal}
              disabled={tasks.length === 0}
              type='button'>
              Clear all
            </button>
          </div>
        </div>
        <div className='overflow-x-auto rounded-xl border border-base-200'>
          <table className='table table-zebra'>
            <thead>
              <tr className='bg-base-200/80 text-sm uppercase tracking-wide text-base-content/70'>
                <th className='w-12'>#</th>
                <th>Task</th>
                <th>Due date</th>
                <th>Status</th>
                <th className='text-right'>Actions</th>
              </tr>
            </thead>
            <tbody>
            {visibleTasks.length > 0 ? (
              visibleTasks.map((task, index) => (
                <tr className='text-base' key={task.id}>
                  <th className='font-medium text-base-content/60'>{index + 1}</th>
                  <td className='font-medium'>{task.task}</td>
                  <td className='whitespace-nowrap text-base-content/80'>
                    {formatDueDate(task.date)}
                  </td>
                  <td>
                    <div className='flex flex-wrap items-center gap-2'>
                      {statusBadge(task.status)}
                      <input
                        type='checkbox'
                        className='toggle toggle-success toggle-sm'
                        checked={task.status === 'complete'}
                        onChange={() => toggleTaskStatus(task.id)}
                        title={
                          task.status === 'complete'
                            ? 'Mark as pending'
                            : 'Mark as complete'
                        }
                        aria-label={
                          task.status === 'complete'
                            ? 'Mark as pending'
                            : 'Mark as complete'
                        }
                      />
                    </div>
                  </td>
                  <td className='flex justify-end gap-2'>
                    <div className='tooltip' data-tip='Edit'>
                      <button
                        type='button'
                        className='btn btn-ghost btn-square btn-sm text-primary'
                        onClick={() => handleEdit(task)}>
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
                        type='button'
                        className='btn btn-ghost btn-square btn-sm text-error'
                        onClick={() => deleteTask(task.id)}>
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
            ) : tasks.length > 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className='py-12 text-center text-base-content/60'>
                  No tasks match this filter.
                </td>
              </tr>
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className='py-16 text-center text-base-content/50'>
                  <div className='mx-auto flex max-w-sm flex-col items-center gap-2'>
                    <span className='text-lg font-medium text-base-content/70'>
                      Nothing here yet
                    </span>
                    <span className='text-sm'>
                      Create your first task using the form above.
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        <dialog id='modal_clear_all' className='modal modal-bottom sm:modal-middle'>
          <div className='modal-box max-w-md border border-base-300/80 bg-base-100 p-0 shadow-2xl'>
            <div className='border-b border-base-200 px-6 pb-4 pt-6'>
              <h3 className='text-lg font-semibold tracking-tight'>
                Clear all tasks?
              </h3>
              <p className='mt-2 text-sm text-base-content/70'>
                This will remove every task from your list. You cannot undo this
                action.
              </p>
            </div>
            <div className='modal-action border-t border-base-200 bg-base-200/40 px-6 py-4'>
              <form method='dialog' className='flex flex-wrap justify-end gap-2'>
                <button type='submit' className='btn btn-ghost'>
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-error'
                  onClick={handleConfirmClearAll}>
                  Clear all
                </button>
              </form>
            </div>
          </div>
        </dialog>

        <UpdateTaskForm
          task={editingTask}
          updateTask={updateTask}
          onRequestClose={() => setEditingTask(null)}
        />
      </div>
    </section>
  );
};

export default ShowTask;
