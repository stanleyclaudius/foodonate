const router = require('express').Router()
const donatorCtrl = require('./../controllers/donatorCtrl')
const { isAuthenticated, authorizeRoles } = require('./../middlewares/auth')

router.route('/').post(isAuthenticated, authorizeRoles('donatur'), donatorCtrl.completeProfile)
router.route('/unverified').get(isAuthenticated, authorizeRoles('admin'), donatorCtrl.getUnverifiedDonator)
router.route('/verified').get(isAuthenticated, authorizeRoles('admin'), donatorCtrl.getVerifiedDonator)
router.route('/user').get(isAuthenticated, donatorCtrl.getDonatorByUser)

router.route('/accept/:id').patch(isAuthenticated, authorizeRoles('admin'), donatorCtrl.verifiedDonator)
router.route('/reject/:id').delete(isAuthenticated, authorizeRoles('admin'), donatorCtrl.rejectDonator)

router.route('/:id').delete(isAuthenticated, authorizeRoles('admin'), donatorCtrl.deleteDonator)

module.exports = router