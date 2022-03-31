const router = require('express').Router()
const userCtrl = require('./../controllers/userCtrl')
const { isAuthenticated, authorizeRoles } = require('./../middlewares/auth')

router.route('/').get(isAuthenticated, authorizeRoles('admin'), userCtrl.getUser)

router.route('/:id').delete(isAuthenticated, authorizeRoles('admin'), userCtrl.deleteUser)

module.exports = router