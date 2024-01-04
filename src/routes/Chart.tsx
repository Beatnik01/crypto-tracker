import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

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
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "close",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{ chart: { height: 500, width: 500 } }}
        />
      )}
    </div>
  );
}

export default Chart;
