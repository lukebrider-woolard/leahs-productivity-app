import { Box, Container, Typography } from '@mui/material';

interface Props {
  pageTitle: string;
  child: JSX.Element;
}

export default function PageLayout(props: Props) {
  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Typography variant="h4" sx={{ ml: 2 }}>
        {props.pageTitle}
      </Typography>
      <Container sx={{ marginTop: 2, maxWidth: '100%' }}>
        <Box sx={{ height: '82vh' }}>{props.child}</Box>
      </Container>
    </Box>
  );
}
