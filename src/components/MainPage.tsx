import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import MySVG from '@/icons/syeta123.svg';

const Wrapper = styled.div`
  text-align: center;
  h1 {
    color: #12acdb;
  }
`;

const MainPage = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = useCallback(() => {
    setCounter((counter) => (counter += 1));
  }, []);
  const [data, setData] = useState<string>();

  useEffect(() => {
    fetch('/api/todos/1')
      .then((response) => response.json())
      .then((json) => setData(json.title));
  }, []);

  return (
    <Wrapper>
      <h1>{counter}</h1>
      <button onClick={handleClick}>click</button>
      {process.env.TEST}
      <MySVG />
      <div>From fake api: {data ?? 'Loading...'}</div>
    </Wrapper>
  );
};

export default MainPage;
