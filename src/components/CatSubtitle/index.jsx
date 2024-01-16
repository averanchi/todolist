import React from "react";
import style from "./CatSubtitle.module.scss";

const CatSubtitle = ({ category, color }) => {
  return (
    <div className={style.root} style={{ backgroundColor: `${color}` }}>
      {category}
    </div>
  );
};

export default CatSubtitle;
