import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

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
  const isDark = useRecoilValue(isDarkAtom);
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
      <div>
        {isLoading ? (
          "Loading.. Charts.."
        ) : (
          <ApexChart
            type="line"
            // type="line"
            series={[
              // {
              //   name: "test",
              //   data: [1, 2, 3, 4, 5, 6],
              // },
              // {
              //   name: "test2",
              //   data: [11, 12, 23, 14, 15, 16],
              // },
              {
                name: "price",
                data: data?.map((price) => Number(price.close)) as number[],
                // data: [11, 12, 23, 14, 15, 16],
              },
            ]}
            options={{
              theme: {
                // mode: "dark",
                // mode: "light"
                mode: isDark ? "dark" : "light",
              },
              chart: {
                width: 300,
                height: 500,
                toolbar: {
                  show: false,
                },
                background: "trasparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              xaxis: {
                labels: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(price?.time_close * 1000).toISOString()
                ),
              },
              yaxis: {
                labels: {
                  show: false,
                },
              },
              fill: {
                // colors: ["red" ],
                // colors: ["#000408", "#B32824"],
                type: "gradient",
                gradient: {
                  shade: "dark",
                  gradientToColors: ["white"],
                  stops: [0, 100],
                },
              },
              // 소수점
              tooltip: {
                y: {
                  formatter: (value) => `${value?.toFixed(2)}`,
                },
              },
              colors: ["pink"],
            }}
          />
        )}
        {/*
         */}
        <ApexChart
          type="candlestick"
          series={
            [
              {
                data: data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [price.open, price.high, price.low, price.close],
                  };
                }),
              },
            ] as unknown as number[]
          }
          options={{
            theme: {
              // mode: "dark",
              mode: isDark ? "dark" : "light",
            },
            chart: {
              width: 300,
              height: 500,
              toolbar: {
                show: false,
              },
              background: "trasparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                gradientToColors: ["white"],
                stops: [0, 100],
              },
            },
            // 소수점
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}`,
              },
            },
            colors: ["pink"],
          }}
        />
      </div>
    </>
  );
}

export default Chart;
