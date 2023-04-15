import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import { theme } from './Theme';
import HeadingBar from './components/HeadingBar/HeadingBar';
import DataPage from './components/DataPage/DataPage';
import AddMagnetForm from './components/AddMagnetForm/AddMagnetForm';
import SalesPage from './components/SalesPage/SalesPage';
import Dashboard from './components/Dashboard/Dashboard';
import StockManagementPage from './components/StockManagementPage/StockManagement';

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <HeadingBar></HeadingBar>
        <Routes>
          <Route path="/data-page" element={<DataPage />} />
          <Route path="/add-magnet" element={<AddMagnetForm />} />
          <Route path="/sales-page" element={<SalesPage />} />
          <Route
            path="/stock-management-page"
            element={<StockManagementPage />}
          />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
