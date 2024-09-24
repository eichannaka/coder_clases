import React, { useState } from 'react'
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  IconButton,
  Container
} from '@mui/material'
import { Facebook, Twitter, Instagram, LinkedIn, Send } from '@mui/icons-material'
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
    <Container maxWidth="lg">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Contáctanos
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    margin="normal"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1 }}
                  />
                  <TextField
                    fullWidth
                    label="Correo Electrónico"
                    margin="normal"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1 }}
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
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'black', color: 'white' } }}
                    endIcon={<Send />}
                  >
                    Enviar Mensaje
                  </Button>
                </form>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Síguenos en Redes Sociales
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                    {[
                      { icon: <Facebook fontSize="large" />, url: "https://facebook.com", label: "Facebook" },
                      { icon: <Twitter fontSize="large" />, url: "https://twitter.com", label: "Twitter" },
                      { icon: <Instagram fontSize="large" />, url: "https://instagram.com", label: "Instagram" },
                      { icon: <LinkedIn fontSize="large" />, url: "https://linkedin.com", label: "LinkedIn" }
                    ].map((social, index) => (
                      <motion.div key={index} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                        <IconButton color="primary" aria-label={social.label} component="a" href={social.url} target="_blank">
                          {social.icon}
                        </IconButton>
                      </motion.div>
                    ))}
                  </Box>
                </Box>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Información de Contacto
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Email: info@marcestore.com
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Teléfono: +1 234 567 890
                  </Typography>
                  <Typography variant="body1">
                    Dirección: 123 Calle Principal, Ciudad, País
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  )
}