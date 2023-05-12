import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchPriceData } from "../api";

interface IPriceLocation {
  state: string;
}
interface IPriceInfo {
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

const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: 5px 20px;
`;
const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 5px;
`;

const BoxDiv = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  background-color: ${(props) => props.theme.bgColor};
  margin-bottom: 7px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  /* justify-items: center; */
  background-color: rgba(0, 0, 0, 25);
  color: ${(props) => props.theme.textColor};
  padding: 30px 55px;
  margin-right: 1px;
  border-radius: 15px;
  span:first-child {
    font-size: 12px;
    margin-bottom: 8px;
    text-transform: uppercase;
    width: 60px;
  }
`;

function Price() {
  const { state } = useLocation() as IPriceLocation;
  console.log(state);
  const coinId = state;

  const { isLoading, data } = useQuery<IPriceInfo>(["price", coinId], () =>
    fetchPriceData(coinId)
  );

  return (
    <>
      {isLoading ? (
        <Title>Loading Pirce</Title>
      ) : (
        <>
          <Container>
            <Title>Price</Title>
            <>
              <BoxDiv>
                <Box>
                  <span>1 year</span>
                  <span>{data?.quotes.USD.percent_change_1y}</span>
                </Box>
                <Box>
                  <span>30 Days</span>
                  <span>{data?.quotes.USD.percent_change_30d}</span>
                </Box>
                <Box>
                  <span>7 Days</span>
                  <span>{data?.quotes.USD.percent_change_7d}</span>
                </Box>
              </BoxDiv>

              <BoxDiv>
                <Box>
                  <span>12 hours</span>
                  <span>{data?.quotes.USD.percent_change_12h}</span>
                </Box>
                <Box>
                  <span>6 hours</span>
                  <span>{data?.quotes.USD.percent_change_6h}</span>
                </Box>
                <Box>
                  <span>1 horus</span>
                  <span>{data?.quotes.USD.percent_change_1h}</span>
                </Box>
              </BoxDiv>
            </>
          </Container>
        </>
      )}
    </>
  );
}

export default Price;
