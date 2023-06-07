import React, { useState } from "react";
import "./Calendar.css";
import ScheduleForm from "./ScheduleForm";


const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);

  const currentDate = new Date();

  // Function to update the selected date
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const selectedActivities = tasks.filter(task => task.date && task.date.toDateString() === date.toDateString());
    setActivities(selectedActivities);
  };

  // Function to add a new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
    if (selectedDate && selectedDate.toDateString() === task.date.toDateString()) {
      setActivities([...activities, task]);
    }
  };

  // Function to get the number of days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the start day of the month
  const getStartDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Render the calendar grid
  const renderCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const startDayOfMonth = getStartDayOfMonth(year, month);

    const calendarGrid = [];

    // Render empty cells for the days before the start of the month
    for (let i = 0; i < startDayOfMonth; i++) {
      calendarGrid.push(<div key={`empty-${i}`} className="calendar-cell empty-cell"></div>);
    }

    // Render cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isCurrentDate = date.toDateString() === currentDate.toDateString();
      const isSelectedDate = selectedDate && date.toDateString() === selectedDate.toDateString();
      const hasTask = tasks.some(task => task.date && task.date.toDateString() === date.toDateString());

      const cellClassNames = ['calendar-cell'];
      if (isCurrentDate) cellClassNames.push('current-date');
      if (isSelectedDate) cellClassNames.push('selected-date');
      if (hasTask) cellClassNames.push('has-task');

      calendarGrid.push(
        <div
          key={date.toDateString()}
          className={cellClassNames.join(' ')}
          onClick={() => handleDateClick(date)}
        >
          <span className="day">{day}</span>
          {hasTask && <span className="task-indicator"></span>}
        </div>
      );
    }

    return calendarGrid;
  };

  return (
    <div>
      <h2>Calendar</h2>
      <p>Selected Date: {selectedDate ? selectedDate.toDateString() : 'None'}</p>
      <div className="calendar-grid">
        {renderCalendarGrid()}
      </div>
      {selectedDate && (
        <ScheduleForm selectedDate={selectedDate} addTask={addTask} />
      )}
      {selectedDate && activities.length > 0 && (
        <div>
          <h3>Activities for {selectedDate.toDateString()}</h3>
          <ul>
            {activities.map((activity, index) => (
              <li key={index}>
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};



export default Calendar;

