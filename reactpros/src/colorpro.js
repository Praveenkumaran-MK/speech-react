import React, { useState, useEffect, useRef } from "react";
import "./colorpro.css";

const Colorpro = () => {
  const [col, setCol] = useState("red");
  const [bg, setBg] = useState("white");

  const API_URL = "http://localhost:3500/comments";
  const [data, setData] = useState(null);

  const handleBgChange = (e) => {
    setBg(e.target.value);
  };

  const toggleColor = () => {
    setCol((prevCol) => (prevCol === "black" ? "red" : "black"));
    bgInputRef.current.focus();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const jsonData = await response.json();
        console.log(jsonData); // Logs the entire JSON array
        setData(jsonData);
      } catch (e) {
        console.error("Error thrown:", e);
      }
    };
    fetchData();
  }, []);

  const [info, setInfo] = useState(null);
  const [columnValue, setColumnValue] = useState(null);

  const displayInfo = (e) => {
    const index = parseInt(e.target.value, 10);
    if (data && index < data.length && index >= 0) {
      setInfo(data[index]);
      console.log("ok");
    } else {
      console.log("error see it");
      setInfo(null);
    }
  };

  const displayColumn = (e) => {
    const column = e.target.value;
    if (info && (column === "id" || column === "text" || column === "postId")) {
      setColumnValue(info[column]);
      console.log(info[column]);
    } else {
      console.log("error see it");
      setColumnValue(null);
    }
  };

  const bgInputRef = useRef();

  return (
    <div>
      <div
        style={{
          color: col,
          backgroundColor: bg,
          marginTop: "20vh",
          width: "50vw",
          height: "27vh",
        }}
      >
        toggled color
      </div>
      <input
        type="text"
        placeholder="Enter index"
        onChange={displayInfo}
      />
      <input
        ref={bgInputRef}
        type="text"
        placeholder="Add your bg color"
        onChange={handleBgChange}
      />
      <br />
      <input 
        type="text"
        placeholder="Enter column (id, text, postId)"
        onChange={displayColumn}
      />
      <button onClick={toggleColor}>toggle color</button>
      <div style={{ backgroundColor: "black", color: "white" }}>
        {info && (
          <div>
            <div>{`ID: ${info.id}`}</div>
            <div>{`Text: ${info.text}`}</div>
            <div>{`Post ID: ${info.postId}`}</div>
          </div>
        )}
        {columnValue !== null && (
          <div>
            {`Column value: ${columnValue}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Colorpro;
