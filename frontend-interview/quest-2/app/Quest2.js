import React from "react";
import FetchApi from "@quest-2/FetchApi";

const API = (limit = 100, offset = 0) =>
  `https://hub.dummyapis.com/employee?noOfRecords=${limit}&idStarts=${offset}`;

const Quest2 = () => {
  return (
    <FetchApi
      apiUrl={API()}
      filterItem={emp => emp.age >= 50}
      renderItem={emp => (
        <div
          key={`emp-${emp.id}`}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}>
          <img
            src={emp.imageUrl}
            style={{ height: 30, width: 30, borderRadius: "100%" }}
          />
          <p style={{ fontWeight: "bolder", padding: 8 }}>
            {emp.firstName} {emp.lastName}
          </p>
        </div>
      )}
    />
  );
};

export default Quest2;
