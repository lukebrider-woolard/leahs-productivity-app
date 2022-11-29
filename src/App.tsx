import { Box, Container, ThemeProvider } from '@mui/material';
import { theme } from './Theme';
import HeadingBar from './components/HeadingBar/HeadingBar';
import DataPage from './components/DataPage/DataPage';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <HeadingBar></HeadingBar>
      <Container sx={{ marginTop: 4, maxWidth: '100%'}}>
        <Box sx={{ height: '84vh'}}>
          <DataPage />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
