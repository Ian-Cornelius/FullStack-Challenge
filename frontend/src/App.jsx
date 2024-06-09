import { Container } from '@mui/material';
import './App.css'
import Navbar from './components/navbar/Navbar';
import MainSection from './components/main-section/MainSection';

function App() {

  return (
    <>
      <Container sx={{ bgcolor: "white", padding: "0 !important", mx: { xs: "0 !important", sm: "0 !important", md: "24px !important", lg: "24px !important" }, maxWidth: "100% !important", width: "auto !important" }}>
        <Navbar/>
        <MainSection/>
      </Container>
    </>
  )
}

export default App
