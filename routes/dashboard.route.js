const router = require('express').Router()
const dashboardCtrl = require('./../controllers/dashboardCtrl')
const { isAuthenticated, authorizeRoles } = require('./../middlewares/auth')

router.route('/home').get(dashboardCtrl.getHomeDashboard)
router.route('/donator').get(isAuthenticated, authorizeRoles('donatur'), dashboardCtrl.getDonatorDashboard)

module.exports = router