const router = require('express').Router()
const newsCtrl = require('./../controllers/newsCtrl')
const { isAuthenticated, authorizeRoles } = require('./../middlewares/auth')

router.route('/')
  .get(newsCtrl.getNews)
  .post(isAuthenticated, authorizeRoles('admin'), newsCtrl.createNews)

router.route('/home').get(newsCtrl.getHomeNews)

router.route('/:id')
  .patch(isAuthenticated, authorizeRoles('admin'), newsCtrl.updateNews)
  .delete(isAuthenticated, authorizeRoles('admin'), newsCtrl.deleteNews)

module.exports = router