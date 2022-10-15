import React from "react";
import Quest1Html from "@quest-1/question.html";
import "@quest-1/question.css";
import { quest1Render } from "@quest-1/question.js";

const Quest1 = () => {
  quest1Render();
  return (
    <div id="quest-1" dangerouslySetInnerHTML={{ __html: Quest1Html }}></div>
  );
};

export default Quest1;
