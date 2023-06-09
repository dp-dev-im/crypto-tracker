import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: pink;
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  font-size: 20px;
  a {
    display: flex;
    align-items: center;
    // padding 위치에 따라 클릭 위치가 달라짐 a or Coin
    padding: 20px;
    transition: color 0.3s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
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
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface IToggleDark {
  toggleDark: () => void;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("getCoins", fetchCoins);
  // console.log(isLoading, data)
  // const [coins, setCoins] = useState<ICoin[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     // console.log(json);
  //     setCoins(json.slice(0, 100));
  //     // console.log(coins);
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <>
      <Container>
        <Header>
          <Title>Coins</Title>
        </Header>
        {isLoading ? (
          <Loader>Loading..</Loader>
        ) : (
          <CoinsList>
            {data?.slice(0, 30).map((coin) => (
              <Coin key={coin.id}>
                {/* state 전달 */}
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <Img
                    src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                    alt={coin.name}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
}

export default Coins;
