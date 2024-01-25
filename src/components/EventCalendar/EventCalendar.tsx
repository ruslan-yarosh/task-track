import { Calendar, globalizeLocalizer  } from 'react-big-calendar';
import globalize from 'globalize';
import { Task } from '../../types/Task';
import React from 'react';

type Props = {
  tasks: Task[];
}

export const EventCalendar: React.FC<Props> = ({ tasks }) => {
  const localizer = globalizeLocalizer(globalize);
  const eventStyleGetter = (event: { status: string; }) => {
    if (event.status === 'Completed') {
      return {
        style: {
          backgroundColor: 'green',
          color: 'white',
        },
      };
    }

    if (event.status === 'Deffered') {
      return {
        style: {
          backgroundColor: 'gray',
          color: 'white',
        },
      };
    }

    return {};
  };

  return (
    <div style={{ height: '100vh' }}>
      <h2 className="display-5 text-center mb-5 mt-5">Calendar</h2>
      <Calendar
        localizer={localizer}
        events={tasks.map(task => ({
          ...task,
          start: new Date(task.start),
          end: new Date(task.end),
        }))}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
      />
    </div>
  )
}