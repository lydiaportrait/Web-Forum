import './assets/index.css';
import { Box } from '@chakra-ui/react';
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
  return (
    <Box bg="var(--darkblue)" maxW="760px" mx="auto" borderRadius="lg" px={5} py={2}>
      <Header />
      <MainContent />
    </Box>
  );
}

export default App;
