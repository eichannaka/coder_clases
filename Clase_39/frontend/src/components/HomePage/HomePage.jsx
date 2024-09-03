import React, { useState, useEffect } from 'react'
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Typography, 
  Button,
  Box
} from '@mui/material'
import { motion } from 'framer-motion'
import Footer from '../Footer/Footer';

const featuredProducts = [
  { id: 1, name: 'Teclado Mecánico RGB', price: 129.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Mouse Gamer 16000 DPI', price: 79.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Auriculares 7.1 Surround', price: 99.99, image: '/placeholder.svg?height=200&width=200' },
];

const categories = [
  { id: 1, name: 'Teclados', image: '/placeholder.svg?height=150&width=150' },
  { id: 2, name: 'Ratones', image: '/placeholder.svg?height=150&width=150' },
  { id: 3, name: 'Auriculares', image: '/placeholder.svg?height=150&width=150' },
  { id: 4, name: 'Monitores', image: '/placeholder.svg?height=150&width=150' },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(featuredProducts);
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenido a Marce Store
      </Typography>
      
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        Productos Destacados
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Añadir al Carrito</Button>
                  <Button size="small">Ver Detalles</Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 6 }}>
        Categorías
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={6} sm={3}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="150"
                  image={category.image}
                  alt={category.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" align="center">
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
            
          </Grid>
        ))}
        
      </Grid>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 6 }}>
        Contacto
      </Typography>
      <Footer />
    </Box>
  )
}