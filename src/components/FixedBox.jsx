import React from "react";
import "./ViewBugBackArrow.css";

function FixedBox({ title, content }) {
  return (
    <div className="fixed-box">
      <h5>{title}</h5>
      <div className="fixed-box-content">{content}</div>
    </div>
  );
}

export default FixedBox;
