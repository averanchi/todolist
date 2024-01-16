import React from "react";
import style from "./MainWindow.module.scss";
import NewTask from "../NewTask";
import Tasks from "../Tasks";

const MainWindow = ({ categoriesList, tasks, setTasks, categoryId }) => {
  const [editTaskView, setEditTaskView] = React.useState(false);

  const findCatById = categoriesList.find((cat) => cat.id === categoryId);
  const currentCat = categoriesList[categoryId]
    ? categoriesList[categoryId].name
    : categoriesList[0].name;

  const onClickShowEditTasks = () => {
    setEditTaskView(!editTaskView);
  };

  return (
    <div className={style.root}>
      <div className={style.catName}>{currentCat}</div>
      <NewTask
        categoriesList={categoriesList}
        setTasks={setTasks}
        tasks={tasks}
      />
      <div className={style.editTasks} onClick={() => onClickShowEditTasks()}>
        {editTaskView ? `close task's settings` : "edit tasks"}
      </div>
      <Tasks
        editTaskView={editTaskView}
        setTasks={setTasks}
        tasks={tasks}
        categoriesList={categoriesList}
        categoryId={categoryId}
      />
    </div>
  );
};

export default MainWindow;
