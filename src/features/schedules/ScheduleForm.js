import { useState } from "react";
import { Button } from "react-bootstrap";

const ScheduleForm = ({ selectedDate, addTask }) => {
  const [task, setTask] = useState({ title: "", description: "" });
  const [showStatus, setShowStatus] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = { ...task, date: selectedDate };
    addTask(newTask);
    setTask({ title: "", description: "" });
  };

  const handleShowStatus = () =>{
    setShowStatus(!showStatus);
  }

  return (
    <div>
      {showStatus && (
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Add Task</button>
        </form>
      )}
      <Button onClick={handleShowStatus} >{showStatus ? 'Close Section': 'Schedule Service'}</Button>
    </div>
  );
};

export default ScheduleForm;
