import React, { ChangeEvent, useCallback, useState } from "react";
import { Task } from "../../types/Task";
import { normalizeDate } from "../../helpers/normalizeDate";
import { removeTask, updateTask } from "../../helpers/fetchTasks";
import { isValid } from "../../helpers/isValid";

type Props = {
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
}

export const Table: React.FC<Props> = ({ tasks, setTasks }) => {
  const [editingId, setEditingId] = useState('-1');
  const [editingTask, setEditingTask] = useState<Task>({
    id: '',
    title: '',
    start: '',
    end: '',
    status: 'Active',
  });
  const [isInvalid, setIsinvalid] = useState(false);

  const handleEditClick = useCallback((task: Task) => {
    setEditingId(task.id)
    setEditingTask(task);
  }, []);

  const handleCancelClick = useCallback(() => {
    setEditingId('-1');
    setIsinvalid(false);
  }, []);

  const handleSaveClick = useCallback(async (task: Task) => {
    if (JSON.stringify(editingTask) === JSON.stringify(task)) {
      setEditingId('-1');
      return;
    }

    if (!isValid(editingTask)) {
      setIsinvalid(true);
      return;
    }

    try {
      await updateTask(editingTask, task.id);
    } catch {
      console.log('Failed to update task');
    } finally {
      setTasks(state => state.map(item => {
        if (item.id === editingTask.id) {
          return {
            ...item,
            ...editingTask,
          }
        }

        return item;
      }));
    }

    setEditingId('-1');
  }, [editingTask, setTasks]);

  const handleRemove = useCallback(async (id: string) => {
    try {
      await removeTask(id);
    } catch {
      console.log('Error');
    } finally {
      setTasks(state => state.filter(item => item.id !== id))
    }
  }, [setTasks]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIsinvalid(false);

    switch (event.target.name) {
      case 'taskName':
        setEditingTask(state => (
          {
            ...state,
            title: event.target.value,
          }
        ));
        break;

      case 'startDate':
        setEditingTask(state => (
          {
            ...state,
            start: event.target.value,
          }
        ));
        break;

      case 'endDate':
        setEditingTask(state => (
          {
            ...state,
            end: event.target.value,
          }
        ));
        break;

      default:
        setEditingTask({
          id: '',
          title: '',
          start: '',
          end: '',
          status: '',
        })
    }
  }, [])

  const handleSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setEditingTask(state => ({
      ...state,
      status: event.target.value,
    }));
  }, [])

  return (
    <>
      <h2 className="display-5 text-center mb-5 mt-5">Your tasks</h2>
      {!tasks.length ? (
        <div className="fw-bold fs-3 mb-3">
          There are no tasks in the list!
        </div>
      ) : (
        <table className="table table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th scope="col" className="col-4">Task</th>
              <th scope="col">Start date</th>
              <th scope="col">End date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                {editingId === task.id ? (
                  <>
                    <td className="text-break">
                      <input
                        type="text"
                        name="taskName"
                        className="form-control"
                        id="task-name"
                        required
                        value={editingTask.title}
                        onChange={handleChange}
                      />
                    </td>

                    <td>
                      <input
                        type="datetime-local"
                        name="startDate"
                        className="form-control"
                        required
                        id="start-date"
                        value={editingTask.start}
                        onChange={handleChange}
                      />
                    </td>

                    <td>
                      <input
                        type="datetime-local"
                        name="endDate"
                        className="form-control"
                        required
                        id="end-date"
                        value={editingTask.end}
                        onChange={handleChange}
                      />
                    </td>

                    <td>
                      <select name="status" id="status" value={editingTask.status} onChange={handleSelectChange}>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Deffered">Deffered</option>
                      </select>
                    </td>

                    <td className="col-2">
                      <button
                        type="button"
                        className="btn btn-primary w-50 me-1 mb-1"
                        onClick={() => handleSaveClick(task)}
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger w-50"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="text-break">
                      {task.title}
                    </td>

                    <td>
                      {normalizeDate(task.start)}
                    </td>

                    <td>
                      {normalizeDate(task.end)}
                    </td>

                    <td>
                      {task.status}
                    </td>

                    <td className="col-2">
                      <button
                        type="button"
                        className="btn btn-primary w-50 me-1 mb-1"
                        onClick={() => handleEditClick(task)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger w-50"
                        onClick={() => handleRemove(task.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

      )}

      {isInvalid && (
        <div className="text-danger mb-3">
          Whoops! There seems to be an issue. Double-check your entries and correct any mistakes.
        </div>
      )}
    </>
  )
}