import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import { theme } from './Theme';
import HeadingBar from './components/HeadingBar/HeadingBar';
import DataPage from './components/DataPage/DataPage';
import AddMagnetForm from './components/AddMagnetForm/AddMagnetForm';
import SalesPage from './components/SalesPage/SalesPage';
import Dashboard from './components/Dashboard/Dashboard';
import StockManagementPage from './components/StockManagementPage/StockManagement';
import PreviousOrdersPage from './components/PreviousOrdersPage/PreviousOrdersPage';

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <HeadingBar></HeadingBar>
        <Routes>
          <Route path="/magnet-data" element={<DataPage />} />
          <Route path="/add-magnet" element={<AddMagnetForm />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/stock-management" element={<StockManagementPage />} />
          <Route path="/previous-orders" element={<PreviousOrdersPage />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
