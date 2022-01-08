import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function DataInputLineGraph({ data, lines }) {
  let [transformedData, setTransformedData] = useState([]);
  useEffect(() => {
    /* transform from 
      {d: 1,2,3,4}
      to [{d:1}, {d:2}, {d:3}, {d:4}]

    */

    let newTransformedData = [...transformedData];

    for (const [key, value] of Object.entries(data)) {
      let index = 0;
      value.map((val) => {
        let tempObject = newTransformedData[index];
        if (!tempObject) tempObject = {};

        tempObject[key] = val;
        // assign back
        newTransformedData[index] = tempObject;

        // increase counter
        index++;
      });
    }

    // assign newTransformedData back to TransformedData
    setTransformedData(newTransformedData);

    // test
    console.log(transformedData);
  }, [data]);

  return (
    <>
      <h1>hello</h1>
      <LineChart
        width={500}
        height={300}
        data={transformedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(data).map((key) => (
          <Line
            type="monotone"
            dataKey={key}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </>
  );
}
