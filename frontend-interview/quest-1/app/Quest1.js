import React from "react";
import Quest1Html from "@quest-1/question.html";

const Quest1 = () => (
  <div dangerouslySetInnerHTML={{ __html: Quest1Html }}></div>
);

export default Quest1;
