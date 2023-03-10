import styled from 'styled-components';
import { Link, useParams, useLocation, Outlet, useMatch, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoinTickers } from '../api';
import { fetchCoinInfo } from '../api';
import { Helmet } from "react-helmet";


interface IRouteState {
    name: string;
}

interface IInfoData {
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
    last_data_a: string;
}

interface IPriceData {
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
            percent_change_7d:number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: transparent;
  padding: 7px 0px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.accentColor};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
  &:hover{
        background-color: ${props => props.theme.accentColor};
        color: ${props => props.theme.bgColor};
        transition: background-color 0.4s ease-in;
  }
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.accentColor};
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
  border: 1px solid ${props => props.theme.accentColor};
  border-radius: 15px;
  padding: 12px 10px;
  span:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Title = styled.h1`
    font-size: 40px;
    color: ${props => props.theme.accentColor};
`;
const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;
const BackBtn = styled.button`
    display: flex;
    position: relative;
    top: 15px;
    justify-content: left;
    align-items: left;
    border-radius: 5px;
    border: 0.5px solid ${props => props.theme.textColor};
    background-color: ${props => props.theme.cartBgColor};
    color: ${props => props.theme.textColor};
    &:hover{
        background-color: ${props => props.theme.accentColor};
        color: ${props => props.theme.bgColor};
        transition: background-color 0.4s ease-in;
    }
`;


function Coin() {
    const {coinId} = useParams();
    const location = useLocation();
    const state = location.state as IRouteState;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const {isLoading: infoLoading, data: infoData} = useQuery<IInfoData>(["info",coinId], () => fetchCoinInfo(`${coinId}`));
    const {isLoading: tickersLoading, data: tickersData} = useQuery<IPriceData>(
        ["tickers",coinId], 
        () => fetchCoinTickers(`${coinId}`),
        {
            refetchInterval: 5000,
        }
    );
    // const [loading, setLoading] = useState(true);
    // const [info, setInfo] = useState<IInfoData>();
    // const [priceInfo, setPriceInfo] = useState<IPriceData>();
    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //         const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // }, []);
    const loading = infoLoading || tickersLoading;
    const navigate = useNavigate();
    const clickBackBtn = () => {
        navigate("/");
    };
    return ( 
    <Container>
        <Helmet>
            <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
        </Helmet>
        <BackBtn onClick={clickBackBtn}>Back</BackBtn>
        <Header>
            <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
            </Title>
        </Header>
            {loading ? <Loader>Loading...</Loader> :
                (<>
                <Overview>
                    <OverviewItem>
                      <span>Rank:</span>
                      <span>{infoData?.rank}</span> 
                    </OverviewItem>
                    <OverviewItem>
                      <span>Symbol:</span>
                      <span>{infoData?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                      <span>Price:</span>
                      <span>${tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
                    </OverviewItem>
                  </Overview>
                  <Description>
                    <span>Description:</span>
                    {infoData?.description}
                  </Description>
                  <Overview>
                    <OverviewItem>
                      <span>Total Suply:</span>
                      <span>{tickersData?.total_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                      <span>Max Supply:</span>
                      <span>{tickersData?.max_supply}</span>
                    </OverviewItem> 
                </Overview>
                <Tabs>
                    <Tab isActive={chartMatch !== null}>
                        <Link to="chart">Chart</Link>
                    </Tab>
                    <Tab isActive={priceMatch !== null}>
                        <Link to="price">Price</Link>
                    </Tab>
                </Tabs>
                <Outlet context={{coinId}}/>
                </>
              )}
    </Container>
    );
}

export default Coin;