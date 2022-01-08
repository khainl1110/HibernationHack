import { useContext } from "react";
import AppContext from "../Context/AppContext";
import ScatterInputFormItem from "./ScatterInputFormItem";

export default function ScatterInputForm() {
  let { value } = useContext(AppContext);
  let [data, setData] = value;

  let addRow = () => {
    let count = data.length;
    let newData = [...data];
    newData[count] = { x: 1, y: 1, z: 1 };
    setData(newData);
  };

  return (
    <>
      <table>
        <tr>
          <td>
            <p>x</p>
          </td>

          <td>
            <p>y</p>
          </td>
        </tr>
        {data.map((d, index) => (
          <ScatterInputFormItem index={index} />
        ))}
      </table>
      <button onClick={addRow}>Add row </button>
    </>
  );
}
