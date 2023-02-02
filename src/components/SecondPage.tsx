import Png from '@/icons/free-png.ru-187.png';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  background: url(${Png});
  height: 100px;
  background-size: contain;
  font-family: 'MyFont';
  font-size: 200pt;
`;

const SecondPage = () => <Wrapper>Second page</Wrapper>;
export default SecondPage;
