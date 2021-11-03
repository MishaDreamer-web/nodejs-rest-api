const Contact = require('../model/contact');

const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    isFavourite = null,
    limit = 5,
    offset = 0,
  } = query;
  const searchOptions = { owner: userId };
  if (searchOptions !== null) {
    console.log(typeof isFavourite);
    searchOptions.isFavourite = isFavourite;
  }
  const results = await Contact.paginate(searchOptions, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'email subscription createdAt updatedAt',
    },
  });
  const { docs: contacts } = results;
  delete results.docs;
  return { ...results, contacts };
};

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'email subscription createdAt updatedAt',
  });
  return result;
};

const removeContact = async (contactId, userId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });

  return result;
};

const addContact = async body => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
  );

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
