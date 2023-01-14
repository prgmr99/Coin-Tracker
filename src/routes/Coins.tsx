import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

interface ICoinsProp {
    
}

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

const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;
const CoinsList = styled.ul`

`;

const Coin = styled.li`
    background-color: ${props => props.theme.cartBgColor};
    color: ${props => props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid white;
    a {
        padding: 20px;
        transition: color 0.2s ease-in;
        align-items: center;
        display: flex;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;


interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
} 

function Coins({}:ICoinsProp) {
    /*const [coins, setCoins] = useState<ICoin[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,100));
            setLoading(false);
        })();
    }, []);
    console.log(coins);*/
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);
    return (
    <Container>
        <Helmet>
            <title>Crytocurrencies</title>
        </Helmet>
        <Header>
            <Title>Crytocurrencies</Title>
            <button onClick={toggleDarkAtom}>Toggle Mode</button>
        </Header>
        {isLoading ? <Loader>Loading...</Loader> : (
        <CoinsList>
            {data?.slice(0,100).map((coin) => 
                <Coin key={coin.id}>
                    <Link to={`/${coin.id}`} state={coin}>
                        <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                        {coin.name} &rarr;
                    </Link>
                </Coin>
            )}
        </CoinsList>
        )}
    </Container>
    );
}

export default Coins;