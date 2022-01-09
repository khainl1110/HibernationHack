import { useContext, useEffect, useState } from "react";
import axios from "axios";
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
  let [b0, setB0] = useState(1);
  let [b1, setB1] = useState(1);

  // coefficient get from gradient descent
  let [data1, setData1] = useState([]);
  let [dataPredict1, setDataPredict1] = useState([]);
  
  // for hide red line
  let [show, setShow] = useState(true);

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

    let nb1 = covariance / variance;
    let nb0 = meanY - b1 * meanX;

    setB0(nb0);
    setB1(nb1);
    
    // use value to predict data
    let newDataPredict = [...dataPredict];


    data.map((d, index) => {

      newDataPredict[index] = {};
      newDataPredict[index].x = d.x;
      newDataPredict[index].y = nb0 + nb1 * d.x;
    });

    setDataPredict(newDataPredict);

  }, [data]);

  useEffect(() => {
    // get data from google cloud
    axios
      .get("https://us-central1-api-project-70002766628.cloudfunctions.net/api-ml")
      .then((res) => {
        console.log(res.data)
        setData1(res.data)
        });
    let newDataPredict1 = [...dataPredict1];

    data.map((d, index) => {

      newDataPredict1[index] = {};
      newDataPredict1[index].x = d.x;
      newDataPredict1[index].y = parseInt(data1.x0) + parseInt(data1.x1) * d.x;
    });
    setDataPredict1(newDataPredict1)

  }, [data])

  return (
    <>
      <p>
        Function: y = {b0} + {b1}x{" "}
      </p>
      <button onClick = {() => setShow(!show)}> Toggle hide/show red line</button>
      <p> Initial coefficient from Google Cloud Function with gradient descent y = {data1.x0}  + {data1.x1} *x</p>
      <p> If any data is changed, red line from Google Cloud will appear for initial dataset, but it's not really correct </p>
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
        {show && <Scatter name="Test" data={dataPredict1} fill="#BB0231" line />}
      </ScatterChart>
    </>
  );
}
