import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { addTask } from "../../helpers/fetchTasks";
import { Task } from "../../types/Task";
import { isValid } from "../../helpers/isValid";

type Props = {
  setIsSubmited: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Form: React.FC<Props> = ({ setIsSubmited }) => {
  const [formValues, setFormValues] = useState({
    title: '',
    start: '',
    end: '',
  })

  const [isInvalid, setIsinvalid] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsinvalid(false);
    switch (event.target.name) {
      case 'taskName':
        setFormValues(state => (
          {
            ...state,
            title: event.target.value,
          }
        ));
        break;

      case 'startDate':
        setFormValues(state => (
          {
            ...state,
            start: event.target.value,
          }
        ));
        break;

      case 'endDate':
        setFormValues(state => (
          {
            ...state,
            end: event.target.value,
          }
        ));
        break;

      default:
        setFormValues({
          title: '',
          start: '',
          end: '',
        })
    }
  }

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTask: Task = {
      ...formValues,
      title: formValues.title.trim(),
      id: new Date().getTime().toString(),
      status: 'Active',
    }

    if (!isValid(newTask)) {
      setIsinvalid(true);
      return;
    }

    try {
      await addTask(newTask);
    } catch {
      console.log('Failed to add task');
    } finally {
      setIsSubmited(true);
      setFormValues({
        title: '',
        start: '',
        end: '',
      })
    }

  }, [formValues, setIsSubmited]);

  return (
    <>
      <h2 className="display-5 text-center mb-5 mt-5">Add a new task</h2>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label htmlFor="task-name" className="form-label">
            Task description
          </label>

          <input
            type="text"
            name="taskName"
            className="form-control"
            id="task-name"
            required
            value={formValues.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="start-date" className="form-label">
            Start date
          </label>

          <input
            type="datetime-local"
            name="startDate"
            className="form-control"
            required
            id="start-date"
            value={formValues.start}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="end-date" className="form-label">
            End date
          </label>

          <input
            type="datetime-local"
            name="endDate"
            className="form-control"
            required
            id="end-date"
            value={formValues.end}
            onChange={handleChange}
          />
        </div>

        {isInvalid && (
          <div className="text-danger mb-3">
            Whoops! There seems to be an issue. Double-check your entries and correct any mistakes.
          </div>
        )}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}