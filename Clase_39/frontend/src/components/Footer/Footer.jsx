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
        backgroundColor: 'primary.main',
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
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
              >
                Enviar
              </Button>
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
          © 2023 PC Accessories Shop. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  )
}