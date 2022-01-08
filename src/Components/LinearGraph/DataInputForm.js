import { useState } from "react";

export default function DataInputForm({ data, setData }) {
  // this get all the key from sampleData
  let [keys, setKeys] = useState([]);
  let alarm = () => {
    alert("hi");
  };

  useState(() => {
    for (const [key] of Object.entries(data)) {
      let newKeys = [...keys];
      newKeys.push(key);
      setKeys(newKeys);
    }
  }, [data]);

  return (
    <div>
      {Object.keys(data).map((key) => (
        <>
          <p>{key} </p>
          <p>{data[key]} </p>
        </>
      ))}
      <h2>Input your data here</h2>
      <input type="text" placeholder="new line name" />
      <button onClick={alarm}>Add new line</button>
    </div>
  );
}
