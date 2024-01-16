import React from "react";
import style from "./Categories.module.scss";
import classNames from "classnames";

const Categories = ({
  tasks,
  setTasks,
  categoryId,
  setCategoryId,
  categoriesList,
  setCategoriesList,
}) => {
  const onClickCat = (idx) => {
    setCategoryId(idx);
  };

  const [inputValue, setInputValue] = React.useState("");
  const [colorValue, setColorValue] = React.useState("#80BDFF");
  const [classStr, setClassStr] = React.useState(
    classNames(style.overlay, style.animated)
  );
  const [viewRemove, setViewRemove] = React.useState(false);
  const [viewEdit, setViewEdit] = React.useState(false);
  const [currentEdit, setCurrentEdit] = React.useState(0);
  const currentEditRef = React.useRef(0);

  React.useEffect(() => {}, [currentEditRef]);

  const onClickOverlayShow = () => {
    setClassStr(
      (prev) => (prev = classNames(style.overlay, style.animated, style.show))
    );
  };
  const onClickOverlayHidden = () => {
    setClassStr((prev) => (prev = classNames(style.overlay, style.animated)));
  };
  const onClickAddCat = () => {
    const lastItem = categoriesList[categoriesList.length - 1];
    if (inputValue !== "") {
      const findByName = categoriesList.find((cat) => cat.name === inputValue);
      if (findByName) {
        alert("You have allready a category with the same name");
        return;
      }

      const addedCat = {
        name: inputValue,
        color: colorValue,
        id: lastItem.id + 1,
      };

      setCategoriesList((prev) => [...prev, addedCat]);
      onClickOverlayHidden();
      setInputValue("");
    } else {
      alert(`You have to add a new Category's name`);
    }
  };

  const onClickRemoveCat = (id) => {
    const findById = categoriesList.find((cat) => cat.id === id);
    const indexOfFind = categoriesList.indexOf(findById);

    const activeCat = categoriesList[categoryId];
    const indexActive = categoriesList.indexOf(activeCat);

    setTasks(tasks.filter((task) => task.category !== findById.name));
    setCategoriesList(categoriesList.filter((cat) => cat.id !== id));

    if (categoryId !== 0 && indexOfFind < indexActive) {
      setCategoryId((prev) => prev - 1);
    } else if (categoryId !== 0 && indexOfFind === indexActive) {
      setCategoryId((prev) => (prev = indexOfFind - 1));
    }
  };

  const onClickOpenEdit = (id) => {
    // currentEditRef.current = categoriesList.find((cat) => cat.id === id);
    setCurrentEdit((prev) => (prev = id));
    setViewEdit((prev) => (prev = true));
    setCurrentEdit((prev) => (prev = id));
    const findById = categoriesList.find((cat) => cat.id === id);
    setInputValue((prev) => (prev = findById.name));
    setColorValue((prev) => (prev = findById.color));
    onClickOverlayShow();
  };

  const onClickCloseEdit = () => {
    setViewEdit(false);
    setInputValue((prev) => (prev = ""));
    setColorValue((prev) => (prev = "#80BDFF"));
    onClickOverlayHidden();
  };

  const onClickEdtiCat = () => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.category === categoriesList[currentEdit].name) {
          task.category = inputValue;
        }
        return task;
      })
    );

    setCategoriesList(
      categoriesList.map((cat) => {
        if (cat.id === currentEdit) {
          cat.name = inputValue;
          cat.color = colorValue;
        }
        return cat;
      })
    );

    onClickCloseEdit();
  };

  return (
    <div className={style.root}>
      <div className={style.main}>
        <ul>
          {categoriesList.map((cat, idx) => (
            <li key={idx} className={idx === categoryId ? style.active : ""}>
              <span onClick={() => onClickCat(idx)}>{cat.name}</span>
              {idx > 0 && viewRemove && (
                <>
                  <svg
                    onClick={() => onClickOpenEdit(cat.id)}
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
                    onClick={() => onClickRemoveCat(cat.id)}
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
            </li>
          ))}
        </ul>
        <div className={style.new} onClick={() => onClickOverlayShow()}>
          + New category
        </div>
        <div className={style.new} onClick={() => setViewRemove(!viewRemove)}>
          {!viewRemove
            ? "open category's settings"
            : "close category's settings"}
        </div>

        <div className={classStr}>
          <div className={style.modal}>
            <div className={style.modal_container}>
              <div className={style.firstRow}>
                <div className={style.label}>
                  {!viewEdit
                    ? `New category's name`
                    : `Here you can change category's name`}
                </div>
                <input
                  className={style.inputName}
                  type="text"
                  placeholder="Type here"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div className={style.secondRow}>
                <div className={style.label}>
                  {!viewEdit ? `Select a colormark` : `And here change a color`}
                </div>
                <div className={style.forColor}>
                  <input
                    className={style.inputColor}
                    type="color"
                    name="favcolor"
                    value={colorValue}
                    onChange={(e) => setColorValue(e.target.value)}
                  />
                </div>
              </div>
              <div
                className={style.addBtn}
                onClick={() => (viewEdit ? onClickEdtiCat() : onClickAddCat())}>
                {viewEdit ? "EDIT" : "ADD"}
              </div>
              <div
                className={style.closeBtn}
                onClick={() =>
                  viewEdit ? onClickCloseEdit() : onClickOverlayHidden()
                }>
                x
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
