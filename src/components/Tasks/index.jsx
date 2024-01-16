import React from "react";
import Task from "../Task";
import style from "./Tasks.module.scss";

const Tasks = ({
  tasks,
  categoriesList,
  categoryId,
  setTasks,
  editTaskView,
}) => {
  return (
    <div className={style.root}>
      {tasks
        .filter((task) => {
          if (categoriesList[categoryId].name === task.category) {
            return task;
          } else if (categoriesList[categoryId].name === "All Tasks") {
            return task;
          }
        })
        .map((task, idx) => (
          <Task
            editTaskView={editTaskView}
            {...task}
            categoriesList={categoriesList}
            key={idx}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}
    </div>
  );
};

export default Tasks;
