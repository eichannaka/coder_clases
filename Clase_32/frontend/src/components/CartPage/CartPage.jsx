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
  DialogActions
} from '@mui/material'
import { Delete, ShoppingCart } from '@mui/icons-material'
import { motion } from 'framer-motion'

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

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tu Carrito
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {cartItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText
                  primary={item.name}
                  secondary={`Cantidad: ${item.quantity}`}
                />
                <ListItemText
                  primary={`$${(item.price * item.quantity).toFixed(2)}`}
                  align="right"
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item.id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Total: ${total.toFixed(2)}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<ShoppingCart />}
            onClick={() => setShowTicket(true)}
          >
            Proceder al Pago
          </Button>
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
  )
}