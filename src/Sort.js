import React from "react";

const Sort = ({ setSort }) => {
  return (
    <section className="sort_bar">
      <h4>Sort: </h4>
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Default</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </section>
  );
};

export default Sort;
