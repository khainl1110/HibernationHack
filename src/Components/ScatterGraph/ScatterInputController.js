import ScatterInputForm from "./ScatterInputForm";
import ScatterInputGraph from "./ScatterInputGraph";

export default function ScatterInputController() {
  return (
    <>
      <p> Change x and y value below to see how the best fit line changes </p>
      <ScatterInputForm />
      <ScatterInputGraph />
    </>
  );
}
