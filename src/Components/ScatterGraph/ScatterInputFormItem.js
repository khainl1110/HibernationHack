import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";

export default function ScatterInputFormItem({ index }) {
  let { value } = useContext(AppContext);
  let [data, setData] = value;

  let [x, setX] = useState(data[index].x);
  let [y, setY] = useState(data[index].y);

  let deleteItem = () => {
    let newData = [...data];
    delete newData[index];
    setData(newData);
  };

  let inputFields = [
    {
      type: "number",
      value: x,
      onChange: (e) => setX(e.target.value)
    },
    {
      type: "number",
      value: y,
      onChange: (e) => setY(e.target.value)
    }
  ];

  useEffect(() => {
    let dataCopy = [...data];
    dataCopy[index].x = x;
    dataCopy[index].y = y;
    setData(dataCopy);
  }, [x, y]);

  return (
    <tr>
      {inputFields.map((input) => (
        <td>
          <input
            type={input.type}
            value={input.value}
            onChange={input.onChange}
          />
        </td>
      ))}
      {/* for now delete doesn't work, will cause error items not found */}
      {/* <button onClick={deleteItem}> Delete Item </button> */}
    </tr>
  );
}
