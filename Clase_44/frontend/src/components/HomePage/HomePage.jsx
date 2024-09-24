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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(featuredProducts);
  }, []);

  return (
    <Box>
      <Box
        sx={{
          height: '50vh',
          backgroundImage: 'url(/placeholder.svg?height=500&width=1000)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ zIndex: 1 }}
        >
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
            Bienvenido a Marce Store
          </Typography>
          <Typography variant="h5" sx={{ color: 'white', textAlign: 'center' }}>
            Tu destino para accesorios de PC de alta gama
          </Typography>
        </motion.div>
      </Box>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, textAlign: 'center' }}>
          Productos Destacados
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <motion.div variants={itemVariants}>
                <Card sx={{
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                  }
                }}>
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
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="small" variant="contained" color="primary">Añadir al Carrito</Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="small" variant="outlined">Ver Detalles</Button>
                    </motion.div>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, textAlign: 'center' }}>
          Categorías
        </Typography>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={6} sm={3}>
              <motion.div variants={itemVariants}>
                <Card sx={{
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 15px rgba(255, 105, 180, 0.5)',
                  }
                }}>
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
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, textAlign: 'center' }}>
          Contacto
        </Typography>
        <Footer />
      </motion.div>
    </Box>
  )
}