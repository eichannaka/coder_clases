import React, { useState } from 'react'
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Tabs,
  Tab
} from '@mui/material'
import { motion } from 'framer-motion'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login attempt', { email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Correo Electrónico"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Contraseña"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Iniciar Sesión
      </Button>
    </form>
  );
}

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Register attempt', { name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Nombre Completo"
        name="name"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Correo Electrónico"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Contraseña"
        type="password"
        id="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Registrarse
      </Button>
    </form>
  );
}

export default function LoginPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Acceso de Usuario
        </Typography> 
        
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Iniciar Sesión" />
          <Tab label="Registro" />
        </Tabs>
        
        <Box sx={{ mt: 3 }}>
          {tabValue === 0 && <LoginForm />}
          {tabValue === 1 && <RegisterForm />}
        </Box>
        
      </Paper>
      
    </motion.div>
    );
}
