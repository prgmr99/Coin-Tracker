import { useQuery } from "react-query";
import { fetchCoinHistory, } from "../api";
import { useOutletContext } from "react-router-dom";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";

interface ChartProps {
    coinId:string;
}
interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}
const Hr = styled.hr`
    background-color: ${props => props.theme.accentColor};
    height: 1px;
    border: 0;
`;

function Chart() {
    const {coinId} = useOutletContext<ChartProps>();
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading:isHistoryLoading, data:HistoryData } = useQuery<IHistorical[]>(
        ["ohlcv", coinId], 
        () => fetchCoinHistory(coinId),
        {
            //refetchInterval: 10000,
        }
    );
    console.log(coinId);
    console.log(isDark);
    return <div>{isHistoryLoading ? "Loading chart..." : 
    <div>
    <ApexCharts 
        type="line" 
        series={[
            {
                name: "price",
                data: HistoryData?.map((price) => parseFloat(price.close)) ?? [], 
            }
        ]}
        options={{
            theme:{
                mode: isDark ? "dark" : "light",
            },
            chart:{
                height: 500,
                width: 500,
                toolbar: {
                    show: false,
                },
                background: "transparent",
            },
            grid: { show: false },
            title: {
                text: 'Line Chart',
                align: 'left'
            },
            stroke:{
                curve: "smooth",
                width: 4,
            },
            yaxis: {
                show: true,
            },
            xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: HistoryData?.map((price) => new Date(price.time_close * 1000).toUTCString()),
            },
            fill: {
                type: "gradient",
                gradient: {gradientToColors:["blue"], stops:[0,100]}
            },
            colors: ["#0fbcf9"],
            tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
            },
        }}/>
        <Hr/>
        <ApexCharts 
            type="candlestick"
            series={[
                {
                    data: HistoryData?.map((price) => ({
                        x: price.time_close * 1000,
                        y: [price.open, price.high, price.low, price.close],
                    })) ?? [],
                },
            ]}
            options= {{
                theme:{
                    mode: isDark ? "dark" : "light",
                },
                chart: {
                    type: 'candlestick',
                    height: 350,
                    toolbar: {
                        show: false,
                    },
                    background: "transparent",
                },
                grid: { show: false },
                title: {
                    text: 'CandleStick Chart',
                    align: 'left'
                },
                xaxis: {
                    type: 'datetime',
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    labels: { show: false },
                },
                yaxis: {
                  
                  
                }
              }}/>
        </div>
        }
    </div>;
}

export default Chart;