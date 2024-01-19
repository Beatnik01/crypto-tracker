import { useOutletContext } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 30px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  text-align: center;
  gap: 15px;
  background-color: ${(props) => props.theme.divColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const Percent = styled.div`
  display: flex;
  flex-direction: column;
`;

const PercentTitle = styled.span`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const PercentValue = styled.span<{ $value: number }>`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => (props.$value < 0 ? "red" : "green")};
`;

interface ICoinID {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price() {
  const { coinId } = useOutletContext<ICoinID>();
  const { isLoading: trickersLoading, data: trickersData } = useQuery<PriceData>(
    ["ohlcv", coinId],
    () => fetchCoinTickers(coinId)
  );
  const loading = Boolean(trickersLoading);
  return (
    <Container>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Percent>
            <PercentTitle>15m</PercentTitle>
            <PercentValue $value={Number(trickersData?.quotes?.USD?.percent_change_15m ?? 0)}>
              {trickersData?.quotes?.USD?.percent_change_15m ?? 0}
            </PercentValue>
          </Percent>
          <Percent>
            <PercentTitle>30m</PercentTitle>
            <PercentValue $value={Number(trickersData?.quotes?.USD?.percent_change_30m ?? 0)}>
              {trickersData?.quotes?.USD?.percent_change_30m ?? 0}
            </PercentValue>
          </Percent>
          <Percent>
            <PercentTitle>1h</PercentTitle>
            <PercentValue $value={Number(trickersData?.quotes?.USD?.percent_change_1h ?? 0)}>
              {trickersData?.quotes?.USD?.percent_change_1h ?? 0}
            </PercentValue>
          </Percent>
          <Percent>
            <PercentTitle>6h</PercentTitle>
            <PercentValue $value={Number(trickersData?.quotes?.USD?.percent_change_6h ?? 0)}>
              {trickersData?.quotes?.USD?.percent_change_6h ?? 0}
            </PercentValue>
          </Percent>
          <Percent>
            <PercentTitle>12h</PercentTitle>
            <PercentValue $value={Number(trickersData?.quotes?.USD?.percent_change_12h ?? 0)}>
              {trickersData?.quotes?.USD?.percent_change_12h ?? 0}
            </PercentValue>
          </Percent>
          <Percent>
            <PercentTitle>24h</PercentTitle>
            <PercentValue $value={Number(trickersData?.quotes?.USD?.percent_change_24h ?? 0)}>
              {trickersData?.quotes?.USD?.percent_change_24h ?? 0}
            </PercentValue>
          </Percent>
          <Percent>
            <PercentTitle>7d</PercentTitle>
            <PercentValue $value={Number(trickersData?.quotes?.USD?.percent_change_7d ?? 0)}>
              {trickersData?.quotes?.USD?.percent_change_7d ?? 0}
            </PercentValue>
          </Percent>
          <Percent>
            <PercentTitle>30d</PercentTitle>
            <PercentValue $value={Number(trickersData?.quotes?.USD?.percent_change_30d ?? 0)}>
              {trickersData?.quotes?.USD?.percent_change_30d ?? 0}
            </PercentValue>
          </Percent>
        </>
      )}
    </Container>
  );
}

export default Price;
