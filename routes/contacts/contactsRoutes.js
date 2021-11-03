const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContact,
  saveContact,
  removeContact,
  updateContact,
  updateStatusFavouriteContact,
} = require('../../controllers/contactsControllers');
const {
  validateContact,
  validateStatusContact,
  validateId,
} = require('./validation');
const guard = require('../../helpers/guard');
const role = require('../../helpers/role');
const wrapError = require('../../helpers/errorHandler');
const { Subscription } = require('../../config/constants');

router.get('/', guard, wrapError(getContacts));

router.get(
  '/test',
  guard,
  role(Subscription.PRO),
  wrapError((req, res, next) => {
    res.json({
      status: 'success',
      code: 200,
      data: { message: 'Only for pro' },
    });
  }),
);

router.get('/:contactId', guard, validateId, wrapError(getContact));

router.post('/', guard, validateContact, wrapError(saveContact));

router.delete('/:contactId', guard, validateId, wrapError(removeContact));

router.put(
  '/:contactId',
  guard,
  [(validateId, validateContact)],
  wrapError(updateContact),
);

router.patch(
  '/:contactId/favourite/',
  guard,
  [(validateId, validateStatusContact)],
  wrapError(updateStatusFavouriteContact),
);

module.exports = router;
