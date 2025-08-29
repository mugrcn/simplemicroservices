import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Catalog from './pages/Catalog'
import { ApplicationPaths } from './components/Constants'
import Navbar from './components/Navbar'
import Container from '@mui/material/Container';
import Footer from './components/Footer'


function App() {

  return (
    <div>
      <Navbar />
      <Container maxWidth={false} sx={{ px: 2 }}>
        <Routes>
          <Route path={ApplicationPaths.HomePath} element={<Home />} />
          <Route path={ApplicationPaths.CatalogPath} element={<Catalog />} />
          <Route path={ApplicationPaths.InventoryPath} element={<Inventory />} />
        </Routes>
      </Container>
      <Footer />
    </div >
  )
}

export default App
