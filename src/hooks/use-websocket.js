import {useCallback, useEffect, useRef, useState} from 'react';

export function useWebsocket(url) {
  const ws = useRef(null);
  const [data, setData] = useState(null);

  const openWebsocket = useCallback(() => {
    ws.current = new WebSocket(url);
    ws.current.onmessage = msg => {
      const msgData = JSON.parse(msg.data);
      setData(msgData);
    }
  }, []);

  const closeWebsocket = () => {
    ws.current.close();
  }

  useEffect(() => {
    openWebsocket();
  }, []);

  return [data, closeWebsocket, openWebsocket];
}