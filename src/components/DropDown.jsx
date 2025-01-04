import React from "react";
import Select from "react-select";
import "./ViewBugBackArrow.css";

function DropDown({ options, onChange, value, def }) {
  return (
    <div className="drop-down">
      <Select
        options={options}
        value={options.value}
        onChange={onChange}
        placeholder={def}
      />
    </div>
  );
}

export default DropDown;
