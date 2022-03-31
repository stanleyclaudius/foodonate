const router = require('express').Router()
const eventCtrl = require('./../controllers/eventCtrl')
const { isAuthenticated, authorizeRoles } = require('./../middlewares/auth')

router.route('/')
  .get(eventCtrl.getEvent)
  .post(isAuthenticated, authorizeRoles('donatur'), eventCtrl.createEvent)

router.route('/ticket').get(isAuthenticated, authorizeRoles('pengguna'), eventCtrl.getEventByUser)

router.route('/search').get(eventCtrl.searchEvent)

router.route('/home').get(eventCtrl.getHomeEvents)

router.route('/filter').get(eventCtrl.getFilteredEvents)

router.route('/donator').get(isAuthenticated, authorizeRoles('donatur'), eventCtrl.getEventByDonator)

router.route('/edit/:id').patch(isAuthenticated, authorizeRoles('donatur'), eventCtrl.updateEvent)

router.route('/:id')
  .patch(isAuthenticated, authorizeRoles('pengguna'), eventCtrl.registerEvent)
  .delete(isAuthenticated, authorizeRoles('donatur', 'admin'), eventCtrl.deleteEvent)

module.exports = router