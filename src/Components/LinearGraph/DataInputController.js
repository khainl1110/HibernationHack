import { useState } from "react";
import DataInputForm from "./DataInputForm";
import DataInputLineGraph from "./DataInputLineGraph";

export default function DataInputController() {
  let [data, setData] = useState({
    sampleData: [4, 9, 10, 34],
    testData: [11, 5, 6]
  });

  return (
    <>
      <DataInputForm data={data} setData={setData} />
      <DataInputLineGraph data={data} lines={["d"]} />
    </>
  );
}
