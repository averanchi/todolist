import React from "react";
import style from "./Task.module.scss";
import readyTaskImg from "../../assets/tasks/readyTask.svg";
import CatSubtitle from "../CatSubtitle";
import classNames from "classnames";

const Task = ({
  title,
  category,
  id,
  isDone,
  categoriesList,
  setTasks,
  tasks,
  editTaskView,
}) => {
  const [inputValueTaskName, setInputValueTaskName] = React.useState(title);
  const [editCat, setEditCat] = React.useState(category);
  const [editView, setEditView] = React.useState(false);
  const thatCat = categoriesList.find((obj) => obj.name === category);
  const color = thatCat?.color;

  const [classStrOverlay, setClassStrOverlay] = React.useState(
    classNames(style.overlayEdit, style.animated)
  );

  const classNameTaskIsReady = isDone
    ? classNames(style.root, style.ready)
    : classNames(style.root);

  const onClickDone = (idx) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === idx && task.isDone === false) {
          return { ...task, isDone: true };
        } else if (task.id === idx && task.isDone === true) {
          return { ...task, isDone: false };
        }
        return task;
      })
    );
  };

  const onClickTaskRemove = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const onClickOpenEdit = () => {
    setClassStrOverlay(
      (prev) =>
        (prev = classNames(style.overlayEdit, style.animated, style.show))
    );
  };

  const onClickCloseEdit = () => {
    setClassStrOverlay(
      (prev) => (prev = classNames(style.overlayEdit, style.animated))
    );
  };

  const onChangeInput = (e) => {
    setEditCat(e.target.value);
  };

  const onClickSubmitChange = () => {
    // const newTask = {
    //   category: editCat,
    //   id: id,
    //   title: inputValueTaskName,
    //   isDone,
    // };

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          task.isDone = isDone;
          task.id = id;
          task.category = editCat;
          task.title = inputValueTaskName;
        }
        return task;
      })
    );
    onClickCloseEdit();
  };

  React.useEffect(() => {
    setInputValueTaskName(title);
    setEditCat(category);
  }, [title, category]);

  return (
    <div className={classNameTaskIsReady}>
      <div onClick={() => onClickDone(id)} className={style.square}>
        {isDone && (
          <img className={style.ready} src={readyTaskImg} alt="ready" />
        )}
      </div>
      <div className={style.title} onClick={() => onClickDone(id)}>
        {title}
      </div>
      <div>
        <CatSubtitle category={category} color={color} />
      </div>
      {editTaskView && (
        <>
          <svg
            onClick={() => onClickOpenEdit()}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className={style.svgEdit}>
            <title />
            <g data-name="Layer 18" id="Layer_18">
              <path d="M2,31a1,1,0,0,1-1-1.11l.9-8.17a1,1,0,0,1,.29-.6L21.27,2.05a3.56,3.56,0,0,1,5.05,0L30,5.68a3.56,3.56,0,0,1,0,5.05L10.88,29.8a1,1,0,0,1-.6.29L2.11,31Zm8.17-1.91h0ZM3.86,22.28l-.73,6.59,6.59-.73L28.54,9.31a1.58,1.58,0,0,0,0-2.22L24.91,3.46a1.58,1.58,0,0,0-2.22,0Z" />
              <path d="M26.52,13.74a1,1,0,0,1-.7-.29L18.55,6.18A1,1,0,0,1,20,4.77L27.23,12a1,1,0,0,1,0,1.41A1,1,0,0,1,26.52,13.74Z" />
              <rect
                height="2"
                transform="translate(-7.91 15.47) rotate(-45)"
                width="12.84"
                x="8.29"
                y="16.28"
              />
            </g>
          </svg>
          <svg
            onClick={() => onClickTaskRemove(id)}
            className={style.svgClose}
            version="1.1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink">
            <style type="text/css"></style>
            <g id="grid_system" />
            <g id="_icons">
              <path d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z" />
            </g>
          </svg>
        </>
      )}

      <div className={classStrOverlay}>
        <div className={style.modal}>
          <div className={style.modalContainer}>
            <div className={style.closeBtn} onClick={() => onClickCloseEdit()}>
              x
            </div>
            <div className={style.modalTitle}>Change task's name</div>
            <input
              className={style.modalInput}
              value={inputValueTaskName}
              onChange={(e) => setInputValueTaskName(e.target.value)}
            />
            <div className={style.modalTitle}>Change task's category</div>
            <select
              className={style.modalInput}
              value={editCat}
              onChange={(e) => onChangeInput(e)}>
              {categoriesList.map((cat, idx) => {
                if (cat.name === "All Tasks") {
                  return "";
                }
                return <option key={idx}>{cat.name}</option>;
              })}
            </select>
            <div
              className={style.saveBtn}
              onClick={() => onClickSubmitChange()}>
              Save changes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
