import {useWebsocket} from './hooks/use-websocket';

import './App.css';

const wssBTCUSDT = 'wss://stream.binance.com:9443/ws/btcusdt@depth10@1000ms';
const wssETHUSDT = 'wss://stream.binance.com:9443/ws/ethusdt@depth10@1000ms';

export function App() {
  return (
    <div className="app">
      <Depth symbol="btcusdt" wss={wssBTCUSDT}/>
      <Depth symbol="ethusdt" wss={wssETHUSDT}/>
    </div>
  );
}

function Depth({symbol, wss}) {
  const [data, closeWebsocket, openWebsocket] = useWebsocket(wss);

  return (
    <div className="wrapper">
      <div className="symbol">{symbol}</div>
      <div className="lists-group">
        <ul className="list">
          <li className="list__line">
            <span className="list__line-caption">Price</span>
            <span className="list__line-caption">Amount</span>
          </li>
          {data?.asks && data.asks.map((item, key) =>
            <Line key={key} item={item} ask={true}/>)}
        </ul>

        <ul className="list">
          {data?.bids && data.bids.map((item, key) =>
            <Line key={key} item={item}/>)}
        </ul>
      </div>
      <div className="buttons-group">
        <button className="btn" onClick={closeWebsocket}>off</button>
        <button className="btn" onClick={openWebsocket}>on</button>
      </div>
    </div>

  )
}

function Line({item, ask = false}) {
  const cls = `list__line-cost${ask ? ' list__line-cost--ask' : ''}`;

  return (
    <li className="list__line">
      <span className={cls}>{item[0]}</span>
      <span className="list__line-qty">{item[1]}</span>
    </li>
  )
}
