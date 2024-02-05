const usersController = require('../controllers/users.controller')
const petsController = require('../controllers/pets.controller')
const router = app => {
    app.use('/api/users', usersController)
    app.use('/api/pets', petsController)
}
module.exports = router