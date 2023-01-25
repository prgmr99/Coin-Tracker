import styled from 'styled-components';
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import { Helmet } from 'react-helmet';
// 실시간 가격 helmet에 추가

interface ChartProps {
    coinId:string;
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
const PriceContainer = styled.div`
    padding: 0px 0px;
    max-width: 480px;
    margin: 0 auto;
`;
const PriceList = styled.ul`
`;
const PriceInfo = styled.li`
    background-color: ${props => props.theme.cartBgColor};
    color: ${props => props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    padding: 20px;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 500;
    align-items: center;
    border: 1px solid ${props => props.theme.accentColor};
`;
const PriceName = styled.span`
    font-size: 18px;
    font-weight: 500;
`;
const Prices = styled.span`
    color: ${props => props.theme.accentColor};
`;
const AbovePrice = styled.span`
    color: #4cd137;
`;
const BelowPrice = styled.span`
    color: red;
`;
function Price() {
    const { coinId } = useOutletContext<ChartProps>();
    const {isLoading, data} = useQuery<IPriceData>(
        ["ohlvc", coinId], 
        () => fetchCoinTickers(coinId),
    );
    return (
        <PriceContainer>
            { isLoading ? "Loading Price..." : 
                <PriceList>
                    <PriceInfo>
                        <PriceName>
                            Price
                        </PriceName>
                        <Prices>
                            : ${data?.quotes.USD.price.toFixed(3)} 
                        </Prices>
                    </PriceInfo>
                    <PriceInfo>
                        <PriceName>
                            Change 1h
                        </PriceName>
                        <Prices>
                            : {((data?.quotes.USD.percent_change_1h !== undefined) && (data?.quotes.USD.percent_change_1h >= 0)) ? 
                            <AbovePrice>
                                {data?.quotes.USD.percent_change_1h}% ⬆︎
                            </AbovePrice> : 
                            <BelowPrice>
                                {data?.quotes.USD.percent_change_1h}% ⬇︎
                            </BelowPrice>}
                        </Prices>
                    </PriceInfo>
                    <PriceInfo>
                        <PriceName>
                            Change 30m
                        </PriceName>
                        <Prices>
                            : {((data?.quotes.USD.percent_change_30m !== undefined) && (data?.quotes.USD.percent_change_30m >= 0)) ? 
                            <AbovePrice>
                                {data?.quotes.USD.percent_change_30m}% ⬆︎
                            </AbovePrice> : 
                            <BelowPrice>
                                {data?.quotes.USD.percent_change_30m}% ⬇︎
                            </BelowPrice>}
                        </Prices>
                    </PriceInfo>
                    <PriceInfo>
                        <PriceName>
                            Change 15m
                        </PriceName>
                        <Prices>
                            : {((data?.quotes.USD.percent_change_15m !== undefined) && (data?.quotes.USD.percent_change_15m >= 0)) ? 
                            <AbovePrice>
                                {data?.quotes.USD.percent_change_15m}% ⬆︎
                            </AbovePrice> : 
                            <BelowPrice>
                                {data?.quotes.USD.percent_change_15m}% ⬇︎
                            </BelowPrice>}
                        </Prices>
                    </PriceInfo>
                    <PriceInfo>
                        <PriceName>
                            Volume change in 24h
                        </PriceName>
                        <Prices>
                            : {((data?.quotes.USD.volume_24h_change_24h !== undefined) && (data?.quotes.USD.volume_24h_change_24h >= 0)) ? 
                            <AbovePrice>
                                {data?.quotes.USD.volume_24h_change_24h} ⬆︎
                            </AbovePrice> : 
                            <BelowPrice>
                                {data?.quotes.USD.volume_24h_change_24h} ⬇︎
                            </BelowPrice>}
                        </Prices>
                    </PriceInfo>
                </PriceList>
            }
        </PriceContainer>
    );
}

export default Price;