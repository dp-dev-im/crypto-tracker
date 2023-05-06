import { useParams } from "react-router-dom";

function Coin() {
  const { coinId } = useParams();
  return (
    <>
      <h1>Coin ID : {coinId}</h1>
    </>
  );
}

export default Coin;
