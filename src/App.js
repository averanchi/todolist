import React from "react";
import Categories from "./components/Categories";
import "./style.scss";
import MainWindow from "./components/MainWindow";

// const categoriesList = [
//   { name: "All Tasks", color: "" },
//   { name: "Favourites", color: "#EB5757" },
//   { name: "Groceries", color: "#27AE60" },
//   { name: "Work", color: "#2F80ED" },
//   { name: "Study", color: "#F2994A" },
//   { name: "Sports", color: "#9B51E0" },
// ];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const isMounted = React.useRef(false);
  const [tasks, setTasks] = React.useState([
    {
      title: "Call Peter",
      category: "Work",
      isDone: false,
      id: 0,
    },
    {
      title: "To tank",
      category: "Favourites",
      isDone: false,
      id: 1,
    },
    { title: "To buy flowers", category: "Study", isDone: false, id: 2 },
    { title: "To buy bread", category: "Groceries", isDone: false, id: 3 },
    { title: "To go in Gym", category: "Sports", isDone: false, id: 4 },
  ]);

  const [categoriesList, setCategoriesList] = React.useState([
    { name: "All Tasks", color: "white", id: 0 },
    { name: "Favourites", color: "#EB5757", id: 1 },
    { name: "Groceries", color: "#27AE60", id: 2 },
    { name: "Work", color: "#2F80ED", id: 3 },
    { name: "Study", color: "#F2994A", id: 4 },
    { name: "Sports", color: "#9B51E0", id: 5 },
  ]);

  React.useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem(`tasksLocal`, JSON.stringify(tasks));
      localStorage.setItem(`catListLocal`, JSON.stringify(categoriesList));
    }
    isMounted.current = true;
  }, [tasks, categoriesList]);

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem("tasksLocal"))) {
      setCategoriesList(JSON.parse(localStorage.getItem("catListLocal")));
      setTasks(JSON.parse(localStorage.getItem("tasksLocal")));
    }
  }, []);

  return (
    <div className="App">
      <div className="main__container">
        <div className="main__container__left">
          <Categories
            tasks={tasks}
            setTasks={setTasks}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            categoriesList={categoriesList}
            setCategoriesList={setCategoriesList}
          />
        </div>
        <div className="main__container__right">
          <MainWindow
            categoriesList={categoriesList}
            tasks={tasks}
            setTasks={setTasks}
            categoryId={categoryId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
