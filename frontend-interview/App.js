import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MenuItems } from "@app/common/MenuItems";

const App = () => {
  return (
    <Router>
      <div style={{ position: "fixed", top: 8, right: 40, float: "right" }}>
        <Link to="/">Home</Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>QUESTS</h1>
              <ul>
                {MenuItems.map(item => (
                  <li key={`list-${item.itemName}`}>
                    <Link to={item.route}>{item.itemName}</Link>
                  </li>
                ))}
              </ul>
            </div>
          }
        />
        {MenuItems.map(item => (
          <Route
            key={`path-${item.itemName}`}
            path={item.route}
            element={item.component}
          />
        ))}
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
