import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/App';
import './config/i18n/i18n';
import './index.css';
import reportWebVitals from './reportWebVitals';

function Main() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
