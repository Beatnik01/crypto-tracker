import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accectColor};
`;

const TitleBtn = styled.a``;

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 30px;
`;

const Img = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 10px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  text-align: justify;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  position: relative;
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 600;
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.$isActive ? props.theme.accectColor : props.theme.textColor)};
  text-decoration: ${(props) => (props.$isActive ? "solid underline 3px" : "none")};
  transition: color 0.2s ease-in;
  a {
    display: block;
  }
`;

interface RouteState {
  state: { name: string };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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

function Coin() {
  const { coinId } = useParams<"coinId">();
  if (!coinId) throw new Error("Failed to find the coinId!");
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () =>
    fetchCoinInfo(coinId)
  );
  const { isLoading: trickersLoading, data: trickersData } = useQuery<PriceData>(
    ["trickers", coinId],
    () => fetchCoinTickers(coinId)
  );
  const loading = infoLoading || trickersLoading;
  return (
    <Container>
      <Helmet>
        <title>{state?.name || infoData?.name}</title>
      </Helmet>
      <Header>
        <TitleBtn>←</TitleBtn>
        <Title>
          <Img src={`https://cryptocurrencyliveprices.com/img/${coinId}.png`} />
          {state?.name || infoData?.name}
        </Title>
        <TitleBtn></TitleBtn>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>${trickersData?.quotes.USD.price.toFixed(0)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{trickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply</span>
              <span>{trickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>

          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
}
export default Coin;
