import App from '@/components/App';
import '@/index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={process.env.APP_PATH}>
    <App />
  </BrowserRouter>
);
