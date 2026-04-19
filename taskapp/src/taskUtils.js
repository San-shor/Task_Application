/** Load tasks from localStorage and assign stable ids to legacy entries (one-time migration). */
export function loadTasksFromStorage() {
  try {
    const raw = localStorage.getItem('TaskList');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    let migrated = false;
    const tasks = parsed.map((item) => {
      if (!item || typeof item !== 'object') {
        migrated = true;
        return null;
      }
      const id =
        item.id ??
        (typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `task-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`);
      if (!item.id) migrated = true;
      return {
        id,
        task: typeof item.task === 'string' ? item.task : '',
        date: typeof item.date === 'string' ? item.date : '',
        status: item.status === 'complete' ? 'complete' : 'pending',
      };
    }).filter(Boolean);

    if (migrated) {
      localStorage.setItem('TaskList', JSON.stringify(tasks));
    }
    return tasks;
  } catch {
    return [];
  }
}

/** Display a YYYY-MM-DD value without timezone surprises. */
export function formatDueDate(value) {
  if (!value || typeof value !== 'string') return '—';
  const d = new Date(`${value}T12:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(d);
}
