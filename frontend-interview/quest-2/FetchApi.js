import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const FetchApi = ({ apiUrl, renderItem, filterItem }) => {
  const [data, setData] = useState();
  const abortControllerRef = useRef();

  const fetchData = async () => {
    abortControllerRef.current = new AbortController();
    return axios
      .get(apiUrl, {
        signal: abortControllerRef.current.signal,
      })
      .then(response => response.data)
      .catch(err => console.log("Axios ERROR", err.name, err.message));
  };

  useEffect(() => {
    fetchData().then(data =>
      setData(filterItem ? data.filter(filterItem) : data),
    );
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return <div>{data ? data.map(item => renderItem(item)) : "Loading..."}</div>;
};

export default FetchApi;
