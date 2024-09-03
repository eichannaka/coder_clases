import React, { useState } from 'react'
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  IconButton
} from '@mui/material'
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Contact form submitted', { name, email, message });
    // Aquí iría la lógica para enviar el correo
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contáctanos
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nombre"
                margin="normal"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Correo Electrónico"
                margin="normal"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Mensaje"
                margin="normal"
                required
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Enviar Mensaje
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Síguenos en Redes Sociales
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
              <IconButton color="primary" aria-label="Facebook" component="a" href="https://facebook.com" target="_blank">
                <Facebook fontSize="large" />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter" component="a" href="https://twitter.com" target="_blank">
                <Twitter fontSize="large" />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram" component="a" href="https://instagram.com" target="_blank">
                <Instagram fontSize="large" />
              </IconButton>
              <IconButton color="primary" aria-label="LinkedIn" component="a" href="https://linkedin.com" target="_blank">
                <LinkedIn fontSize="large" />
              </IconButton>
            </Box>
            <Typography variant="body1" sx={{ mt: 4 }}>
              También puedes contactarnos en:
            </Typography>
            <Typography variant="body1">
              Email: info@marcestore.com
            </Typography>
            <Typography variant="body1">
              Teléfono: +1 234 567 890
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  )
}