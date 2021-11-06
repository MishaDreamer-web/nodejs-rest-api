const express = require('express');
const router = express.Router();
const {
  validateUserRegistration,
  validateUserLogin,
  validateSubscriptionUser,
} = require('./validationUsers');
const {
  registration,
  login,
  logout,
  current,
  updateSubscription,
  userStarter,
  userPro,
  userBusiness,
  uploadAvatar,
} = require('../../controllers/usersControllers');
const guard = require('../../helpers/guard');
const { Subscription } = require('../../config/constants');
const role = require('../../helpers/role');
const loginLimit = require('../../helpers/rate-limit-login');
const upload = require('../../helpers/uploads');

router.patch('/', guard, validateSubscriptionUser, updateSubscription);

router.get('/starter', guard, role(Subscription.START), userStarter);
router.get('/pro', guard, role(Subscription.PRO), userPro);
router.get('/business', guard, role(Subscription.BUSINESS), userBusiness);

router.post('/registration', validateUserRegistration, registration);
router.post('/login', loginLimit, validateUserLogin, login);
router.post('/logout', guard, logout);

router.get('/current', guard, current);

router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar);

module.exports = router;
