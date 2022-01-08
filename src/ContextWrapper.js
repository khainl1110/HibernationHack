import { useState } from "react";
import App from "./App";
import AppContext from "./Components/Context/AppContext";

export default function ContextWrapper() {
  // all data will be from this lever
  let [test, setTest] = useState("test");

  let [data, setData] = useState([
    { x: 1, y: 2, z: 200 },
    { x: 3, y: 7, z: 260 },
    { x: 7, y: 11, z: 400 },
    { x: 14, y: 23, z: 280 },
    { x: 15, y: 25, z: 500 },
    { x: 11, y: 21, z: 200 }
  ]);

  return (
    <AppContext.Provider value={{ value: [data, setData] }}>
      <App />
    </AppContext.Provider>
  );
}
