import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ICoinId {
  coinId?: string;
}

interface IOhlcv {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const { state } = useLocation();
  const coinId = state as ICoinId;

  const { isLoading, data } = useQuery<IOhlcv[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  // console.log(isLoading, data);

  // console.log(data?.map((data) => data.close));
  return (
    <>
      {isLoading ? (
        "Loading.."
      ) : (
        <>
          <h1>Chart</h1>
          <ApexChart
            type="line"
            series={[
              {
                name: "종가",
                // data: data?.map((price) => Number(price.close)) as number[],
                data: [1, 2, 3, 4],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                height: 500,
                width: 500,
              },
            }}
          />
        </>
      )}
    </>
  );
}

export default Chart;
