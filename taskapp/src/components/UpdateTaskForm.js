import React, { useEffect, useState } from 'react';

const defaultTask = { id: '', task: '', date: '', status: 'pending' };

const normalizeTask = (t) => {
  if (!t || typeof t !== 'object' || Array.isArray(t)) {
    return { ...defaultTask };
  }
  return {
    id: t.id ?? '',
    task: String(t.task ?? ''),
    date: String(t.date ?? ''),
    status: t.status === 'complete' ? 'complete' : 'pending',
  };
};

const UpdateTaskForm = ({ task, updateTask, onRequestClose }) => {
  const [formValue, setFormValue] = useState(() => normalizeTask(task));
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setFormValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const setStatus = (status) => {
    setFormValue((prevValue) => ({
      ...prevValue,
      status,
    }));
  };

  const handleUpdate = () => {
    const title = formValue.task.trim();
    if (!title) {
      setError('Task name cannot be empty.');
      return;
    }
    if (!formValue.id) return;

    updateTask({
      ...formValue,
      task: title,
      status: formValue.status === 'complete' ? 'complete' : 'pending',
    });
    document.getElementById('my_modal_5').close();
    onRequestClose?.();
  };

  useEffect(() => {
    setFormValue(normalizeTask(task));
    setError('');
  }, [task]);

  return (
    <div>
      <dialog
        id='my_modal_5'
        className='modal modal-bottom sm:modal-middle'
        onClose={() => onRequestClose?.()}>
        <div className='modal-box max-w-lg border border-base-300/80 bg-base-100 p-0 shadow-2xl'>
          <div className='border-b border-base-200 px-6 pb-4 pt-6'>
            <h3 className='text-lg font-semibold tracking-tight'>
              Edit task
            </h3>
            <p className='mt-1 text-sm text-base-content/60'>
              Update the details and status for this task.
            </p>
          </div>

          <div className='space-y-5 px-6 py-6'>
            <label className='form-control w-full'>
              <div className='label pt-0'>
                <span className='label-text font-medium'>Task</span>
              </div>
              <input
                type='text'
                name='task'
                value={formValue.task}
                placeholder='Task name'
                className={`input input-bordered w-full bg-base-100 ${
                  error ? 'input-error' : ''
                }`}
                onChange={handleChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'edit-task-error' : undefined}
              />
              {error ? (
                <div id='edit-task-error' className='label' role='alert'>
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
                value={formValue.date}
                className='input input-bordered w-full bg-base-100'
                onChange={handleChange}
              />
            </label>

            <div>
              <span className='label-text mb-3 block font-medium'>Status</span>
              <div className='flex flex-col gap-3 sm:flex-row'>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    formValue.status === 'pending'
                      ? 'border-primary bg-primary/10'
                      : 'border-base-300 hover:border-base-content/20'
                  }`}>
                  <input
                    type='radio'
                    name='status'
                    className='radio radio-primary'
                    checked={formValue.status === 'pending'}
                    onChange={() => setStatus('pending')}
                  />
                  <span className='text-sm font-medium'>Pending</span>
                </label>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    formValue.status === 'complete'
                      ? 'border-primary bg-primary/10'
                      : 'border-base-300 hover:border-base-content/20'
                  }`}>
                  <input
                    type='radio'
                    name='status'
                    className='radio radio-primary'
                    checked={formValue.status === 'complete'}
                    onChange={() => setStatus('complete')}
                  />
                  <span className='text-sm font-medium'>Complete</span>
                </label>
              </div>
            </div>
          </div>

          <div className='modal-action border-t border-base-200 bg-base-200/40 px-6 py-4'>
            <form method='dialog' className='flex w-full flex-wrap items-center justify-end gap-2'>
              <button
                type='button'
                className='btn btn-ghost'
                onClick={() => {
                  document.getElementById('my_modal_5').close();
                  onRequestClose?.();
                }}>
                Cancel
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleUpdate}>
                Save changes
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateTaskForm;
