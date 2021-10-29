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

router.get('/', getContacts);

router.get('/:contactId', validateId, getContact);

router.post('/', validateContact, saveContact);

router.delete('/:contactId', validateId, removeContact);

router.put('/:contactId', [validateId, validateContact], updateContact);

router.patch(
  '/:contactId/favourite/',
  [validateId, validateStatusContact],
  updateStatusFavouriteContact,
);

module.exports = router;
