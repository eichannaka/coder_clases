import React from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Paper,
  Container,
  Grid,
  Box,
  Avatar,
  Divider,
  CircularProgress,
  Chip
} from '@mui/material';
import { Person, ShoppingCart, AdminPanelSettings, Person as PersonIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const { user, loading, error } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Typography>No user data available.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ mt: 4, p: 4, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main' }}>
                  <Person fontSize="large" />
                </Avatar>
                <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'white' }}>
                  {user.first_name} {user.last_name}
                </Typography>
                <Chip 
                  icon={user.role === 'admin' ? <AdminPanelSettings /> : <PersonIcon />} 
                  label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  color={user.role === 'admin' ? 'secondary' : 'default'}
                  sx={{ color: 'white', borderColor: 'white', '& .MuiChip-icon': { color: 'white' } }}
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Información Personal
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Email:</strong> {user.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Edad:</strong> {user.age}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Carrito
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" alignItems="center">
                  <ShoppingCart sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    ID del Carrito: {user.cart?._id || 'No disponible'}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Productos en el carrito: {user.cart?.products?.length || 0}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default UserProfile;