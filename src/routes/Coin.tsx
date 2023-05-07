import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  // mobile
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  //viewport hight == vh
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
  margin: 20px;
`;

const Img = styled.img`
  height: 50px;
  width: 50px;
  margin: 10px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 13px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  padding: 20px 15px;
`;
const LinkTabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 80px;
  text-align: center;
  text-transform: uppercase;
`;
const LinkTab = styled.div<{ isActive: Boolean }>`
  a {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 10px;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

interface IRouteState {
  state: { name: string };
}

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface IPrice {
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
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  // 전달 받은 state
  const { state } = useLocation() as IRouteState;
  // console.log(state?.name);
  const [info, setInfo] = useState<IInfo>();
  const [price, setPrice] = useState<IPrice>();
  const chartMatch = useMatch("/:coinId/chart");
  // console.log(chartMatch);
  const priceMatch = useMatch("/:coinId/price");
  // console.log(priceMatch);

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      // console.log(infoData);
      setInfo(infoData);

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      // console.log(priceData);
      setPrice(priceData);
    })();
    setLoading(false);
  }, [coinId]);

  return (
    <>
      <h1>Coin ID : {coinId}</h1>
      <Container>
        <Header>
          <Title>Coin - {state?.name || "Loading.."}</Title>
          <Title>
            Coin - {state?.name ? state.name : loading ? "Loading" : info?.name}
          </Title>
        </Header>
        {loading ? (
          <Loader>Loading..</Loader>
        ) : (
          <>
            <h1>babo coin</h1>
            <Img src={info?.logo} alt={info?.name} />
            <Overview>
              <OverviewItem>
                <span>rank 1</span>
                <span>{info?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>span 2</span>
                <span>span 2</span>
              </OverviewItem>
              <OverviewItem>
                <span>span 3</span>
                <span>span 3</span>
              </OverviewItem>
            </Overview>
            <Description>{info?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Price</span>
                <span>$ {price?.quotes?.USD?.price.toFixed(2)} USD</span>
              </OverviewItem>
              <OverviewItem>
                <span>span 2</span>
                <span>span 2</span>
              </OverviewItem>
            </Overview>
            <LinkTabs>
              <LinkTab isActive={chartMatch !== null}>
                <Link to="chart">Chart</Link>
              </LinkTab>
              <LinkTab isActive={priceMatch !== null}>
                <Link to="price">Price</Link>
              </LinkTab>
            </LinkTabs>
            <Outlet />
          </>
        )}
      </Container>
    </>
  );
}

export default Coin;
