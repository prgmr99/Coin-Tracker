import { BrowserRouter, Routes, Route, useOutletContext } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';
import Chart from './routes/Chart';
import Price from './routes/Price';

interface IRouterProps {
    
}

interface ChartProps {
    coinId:string;
}

function Router({}:IRouterProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:coinId/" element={<Coin />}>
                    <Route path="chart" element={<Chart />}/>
                    <Route path="price" element={<Price />}/>    
                </Route>
                <Route path="/" element={<Coins />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;