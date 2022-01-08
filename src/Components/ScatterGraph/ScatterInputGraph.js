import { useContext, useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import AppContext from "../Context/AppContext";

export default function ScatterInputGraph() {
  let { value } = useContext(AppContext);
  let [data, setData] = value;
  let [dataPredict, setDataPredict] = useState([]);

  useEffect(() => {
    // let newDataPredict = [...dataPredict]
    // newDataPredict.map((d, index) => {
    //   newDataPredict[index].y = 100
    // })
    // setDataPredict(newDataPredict)
  }, []);

  useEffect(() => {
    let sumX = 0;
    let sumY = 0;
    let count = data.length;

    data.map((d) => {
      sumX += parseInt(d.x);
      sumY += parseInt(d.y);
    });

    let meanX = sumX / count;
    let meanY = sumY / count;

    let variance = 0;
    let covariance = 0;
    data.map((d) => {
      variance += Math.pow(d.x - meanX, 2);
      covariance += (d.x - meanX) * (d.y - meanY);
    });

    let b1 = covariance / variance;
    let b0 = meanY - b1 * meanX;
    console.log("result " + b0 + " " + b1);

    // use value to predict data
    let newDataPredict = [...dataPredict];

    data.map((d, index) => {
      newDataPredict[index] = {};
      newDataPredict[index].x = d.x;
      newDataPredict[index].y = b0 + b1 * d.x;
    });

    setDataPredict(newDataPredict);
  }, [data]);

  return (
    <>
      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <Tooltip />
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="stature" unit="cm" />
        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
        <Scatter name="A school" data={data} fill="#8884d8" />
        <Scatter name="Test" data={dataPredict} fill="#82ca9d" line />
      </ScatterChart>
    </>
  );
}
