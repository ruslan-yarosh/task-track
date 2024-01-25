import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Table } from './components/Table/Table';
import { Form } from './components/Form/Form';
import { useEffect, useState } from 'react';
import { Task } from './types/Task';
import { getTasks } from './helpers/fetchTasks';
import { EventCalendar } from './components/EventCalendar/EventCalendar';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    const handleGetTasks = async () => {
      try {
        const data: Task[] = await getTasks();
        setTasks(data);
      } catch {
        console.log('Failed to get tasks');
      }
    }

    handleGetTasks();
    setIsSubmited(false);
  }, [isSubmited]);

  return (
    <div className="container">
      <h1 className="display-3 text-left mb-5">Task Track App</h1>

      <Form setIsSubmited={setIsSubmited} />
      <Table tasks={tasks} setTasks={setTasks} />
      <EventCalendar tasks={tasks} />
    </div>
  )
}

export default App
