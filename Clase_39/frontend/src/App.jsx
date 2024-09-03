import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  Container,
  useScrollTrigger,
  Fab,
  Zoom
} from '@mui/material'
import { ShoppingCart, Rocket, Home, Login, ContactMail } from '@mui/icons-material'
import { motion } from 'framer-motion'

import HomePage from './components/HomePage/HomePage'
import CartPage from './components/CartPage/CartPage'
import LoginPage from './components/LoginPage/LoginPage'
import ContactPage from './components/ContactPage/ContactPage'


function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = document.querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" style={{ position: 'fixed', bottom: 16, right: 16 }}>
        {children}
      </div>
    </Zoom>
  );
}

export default function Component() {
  return (
    <Router>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Marce Store
            </Typography>
            <Button color="inherit" component={Link} to="/" startIcon={<Home />}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/cart" startIcon={<ShoppingCart />}>
              Cart
            </Button>
            <Button color="inherit" component={Link} to="/login" startIcon={<Login />}>
              Login
            </Button>
            <Button color="inherit" component={Link} to="/contact" startIcon={<ContactMail />}>
              Contact
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Container>
      
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <Rocket />
          </Fab>
        </ScrollTop>
      </motion.div>
    </Router>
  )
}