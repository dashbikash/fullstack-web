import { MantineProvider, MantineThemeOverride, Text } from '@mantine/core';
import MyShellV2 from './experiment/MyShellV2';

import { DeepPurpleTheme, DeepRedTheme, DefaultTheme, TealTheme } from "./Themes";

import { BrowserRouter, Routes, Route, HashRouter, Navigate } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import NotFound from './pages/errors';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import AuthGuard from './components/AuthGuard';

function App() {
  return (
    <MantineProvider theme={DefaultTheme}>
      <HashRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="/app" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/app" element={<AuthGuard component={<MyShellV2 />}/>}>
              <Route index element={<Dashboard />} />
              <Route path="settings/ui" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </MantineProvider>
  );
}

export default App;