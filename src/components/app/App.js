import { ThemeProvider } from '@mui/system';
import React from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import Home from '../home/Home';
import I18nDemo from '../i18nDemo/I18nDemo';
import KonvaDemo from '../knovaDemo/KonvaDemo';
import KonvaDemo2 from '../konvaDemo2/KonvaDemo2';
import KonvaDemo3 from '../konvaDemo3/KonvaDemo3';
import Layout from './Layout';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/i18n"
              element={<I18nDemo />}
            />
            <Route
              path="/konva"
              element={<KonvaDemo />}
            />
            <Route
              path="/konva2"
              element={<KonvaDemo2 />}
            />
            <Route
              path="/konva3"
              element={<KonvaDemo3 />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
