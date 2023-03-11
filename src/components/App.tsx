import { Route, Routes } from 'react-router-dom';
import MainPage from '@/components/MainPage';
import SecondPage from '@/components/SecondPage';
import ErrorPage from '@/components/ErrorPage';

const App = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<MainPage />} />
        <Route path="second" element={<SecondPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
