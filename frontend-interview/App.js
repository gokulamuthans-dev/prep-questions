import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quest1 from "@quest-1/app/Quest1";

const App = () => {
  return (
    <>
      <div style={{ position: "absolute", top: 8, right: 40 }}>
        <a href="/">Home</a>
      </div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>QUESTS</h1>
                <ul>
                  <li>
                    <a href="/quest-1">Quest - 1</a>
                  </li>
                </ul>
              </div>
            }
          />
          <Route path="/quest-1" element={<Quest1 />} />
          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
