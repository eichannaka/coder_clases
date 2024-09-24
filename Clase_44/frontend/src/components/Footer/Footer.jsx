import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button
} from '@mui/material'
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material'
import { motion } from 'framer-motion'

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Contact form submitted', { email, message });
  };

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Sobre Nosotros
            </Typography>
            <Typography variant="body2">
              Somos tu tienda de confianza para todos los accesorios y periféricos de PC que necesitas para mejorar tu experiencia de computación.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contáctanos
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                variant="filled"
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              />
              <TextField
                fullWidth
                label="Mensaje"
                variant="filled"
                margin="normal"
                required
                multiline
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ 
                    mt: 2, 
                    backgroundColor: 'white', 
                    color: 'black',
                    '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                    }
                  }}
                >
                  Enviar
                </Button>
              </motion.div>
            </form>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Síguenos
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          © 2024 Marce Store. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  )
}