import axios from "axios";
import { useEffect } from "react";
import ScatterInputController from "./Components/ScatterGraph/ScatterInputController";
import "./styles.css";

export default function App() {
  useEffect(() => {
    // fetch("us-central1-api-project-70002766628.cloudfunctions.net/api-ml")
    // //.then(response => response.json())
    // .then(data => console.log(data))
    // console.log(getMoviesFromApi());
    axios
      .get("us-central1-api-project-70002766628.cloudfunctions.net/api-ml")
      .then((res) => console.log(res));
  }, []);
  async function getMoviesFromApi() {
    try {
      let response = await fetch(
        "us-central1-api-project-70002766628.cloudfunctions.net/api-ml"
      );
      let responseJson = await response.json();
      return responseJson.x0;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <h2> Linear Regression One Variable </h2>
      <ScatterInputController />
    </>
  );
}
