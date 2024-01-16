import React from "react";
import style from "./NewTask.module.scss";

const NewTask = ({ categoriesList, setTasks, tasks }) => {
  const [title, setTitle] = React.useState("");
  // const [currentCat, setCurrentCat] = React.useState(1);
  const currentCatRef = React.useRef(1);

  const onChange = (e) => {
    const indexCat = categoriesList.indexOf(
      categoriesList.find((cat) => cat.name === e.target.value)
    );
    currentCatRef.current = indexCat;
  };

  const onClickAddTask = () => {
    if (categoriesList.length === 1) {
      alert("At first you have to add minimun one category");
      return;
    }
    if (title !== "") {
      const addedTask = {
        title,
        category:
          currentCatRef.current === 1
            ? categoriesList[1].name
            : categoriesList[currentCatRef.current].name,
        isDone: false,
        id: tasks.length === 0 ? 0 : tasks[tasks.length - 1].id + 1,
      };
      setTasks((prev) => [...prev, addedTask]);
      setTitle("");
    } else {
      alert("You have to add a title for new Task");
    }
  };

  return (
    <div className={style.root}>
      <input
        type="text"
        placeholder="Type here new task's title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select onChange={(e) => onChange(e)}>
        {categoriesList.map((cat, idx) => {
          if (cat.name === "All Tasks") {
            return "";
          }
          return <option key={idx}>{cat.name}</option>;
        })}
      </select>

      <div className={style.add} onClick={() => onClickAddTask()}>
        ADD
      </div>
    </div>
  );
};

export default NewTask;
