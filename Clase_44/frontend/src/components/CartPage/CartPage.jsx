import React, { useState } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container
} from '@mui/material'
import { Delete, ShoppingCart, Add, Remove } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

const initialCartItems = [
  { id: 1, name: 'Teclado Mecánico RGB', price: 129.99, quantity: 1 },
  { id: 2, name: 'Mouse Gamer 16000 DPI', price: 79.99, quantity: 2 },
];

function Ticket({ items, total }) {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Ticket de Compra
      </Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Cantidad: ${item.quantity}`}
            />
            <Typography variant="body2">
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
        <Typography variant="subtitle1">${total.toFixed(2)}</Typography>
      </Box>
    </Paper>
  )
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [showTicket, setShowTicket] = useState(false);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container maxWidth="md">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Tu Carrito
        </Typography>
        <Paper elevation={3} sx={{ p: 2, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
          <List>
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ListItem>
                    <ListItemText
                      primary={item.name}
                      secondary={`Precio: $${item.price.toFixed(2)}`}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <IconButton onClick={() => updateQuantity(item.id, -1)} size="small">
                        <Remove />
                      </IconButton>
                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <IconButton onClick={() => updateQuantity(item.id, 1)} size="small">
                        <Add />
                      </IconButton>
                    </Box>
                    <ListItemText
                      primary={`$${(item.price * item.quantity).toFixed(2)}`}
                      sx={{ textAlign: 'right', flexGrow: 0, flexBasis: '80px' }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item.id)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ color: 'white' }}>
              Total: ${total.toFixed(2)}
            </Typography>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<ShoppingCart />}
                onClick={() => setShowTicket(true)}
                sx={{ backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'black', color: 'white' } }}
              >
                Proceder al Pago
              </Button>
            </motion.div>
          </Box>
        </Paper>
        <Dialog open={showTicket} onClose={() => setShowTicket(false)}>
          <DialogTitle>Resumen de Compra</DialogTitle>
          <DialogContent>
            <Ticket items={cartItems} total={total} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowTicket(false)}>Cerrar</Button>
            <Button variant="contained" color="primary" onClick={() => setShowTicket(false)}>
              Confirmar Compra
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  )
}