import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import { theme } from './Theme';
import HeadingBar from './components/HeadingBar/HeadingBar';
import DataPage from './components/DataPage/DataPage';
import AddMagnetForm from './components/AddMagnetForm/AddMagnetForm';
import Dashboard from './components/Dashboard/Dashboard';

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <HeadingBar></HeadingBar>
        <Routes>
          <Route path="/datapage" element={<DataPage />} />
          <Route path="/add-magnet" element={<AddMagnetForm />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
