import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Q1 from "@quest-1/question.html";

const App = () => {
  return (
    <div>
      <h1>QUESTIONS</h1>
      <Router>
        <Routes>
          <Route
            path="/quest-1"
            element={<div dangerouslySetInnerHTML={{ __html: Q1 }} />}
          />
        </Routes>
      </Router>
      <ul>
        <li>
          <a href="/quest-1">Quest - 1</a>
        </li>
      </ul>
    </div>
  );
};

export default App;
