import { MantineProvider, MantineThemeOverride, Text } from '@mantine/core';
import MyShellV2 from './experiment/MyShellV2';

import { DeepPurpleTheme, DeepRedTheme, DefaultTheme, TealTheme } from "./Themes";

import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import NotFound from './pages/errors';

function App() {
  return (
    <MantineProvider theme={DefaultTheme}>
       <HashRouter>
        <Routes>
          <Route path="/" element={<MyShellV2 />}>
            <Route index element={<Dashboard />} />
            <Route path="/settings/ui" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </MantineProvider>
  );
}

export default App;