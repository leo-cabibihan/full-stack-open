import React from "react";
import { setTextFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
  const handleChange = (event) => {
    props.setTextFilter(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  setTextFilter,
};

const connectedFilter = connect(null, mapDispatchToProps)(Filter);

export default connectedFilter;
