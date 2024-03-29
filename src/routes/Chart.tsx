import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ICoinID {
  coinId: string;
}

interface IHistorycal {
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
  const { coinId } = useOutletContext<ICoinID>();
  const { isLoading, data } = useQuery<IHistorycal[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          series={[
            {
              name: "Line",
              type: "line",
              data: Array.isArray(data)
                ? data?.map((price) => ({
                    x: new Date(price.time_close),
                    y: [price.high],
                  }))
                : [],
            },
            {
              name: "Candle",
              type: "candlestick",
              data: Array.isArray(data)
                ? data?.map((price) => ({
                    x: new Date(price.time_close),
                    y: [price.open, price.high, price.low, price.close],
                  }))
                : [],
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: { show: false },
              type: "datetime",
            },
            tooltip: {
              shared: false,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
