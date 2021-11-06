const { updateContact } = require('../controllers/contactsControllers');
const Contacts = require('../repository/index');
const { CustomError } = require('../helpers/customError');

jest.mock('../repository/index');

describe('Unit test controller updateContact', function () {
  let req, res, next;

  beforeEach(() => {
    Contacts.updateContact = jest.fn();
    req = { params: { id: 3 }, body: {}, user: { _id: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(data => data),
    };
    next = jest.fn();
  });

  it('Contact exist', async () => {
    const contact = { id: 3, name: 'Misha Dreamer', phone: '(063)777-77-77' };
    Contacts.updateContact = jest.fn(() => {
      return contact;
    });
    const result = await updateContact(req, res, next);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('data');
    expect(result.data.contact).toEqual(contact);
  });

  it('Contact not exist v1.0', async () => {
    await expect(updateContact(req, res, next)).rejects.toEqual(
      new CustomError(404, 'Not found'),
    );
  });

  it('Contact not exist v1.1', () => {
    return updateContact(req, res, next).catch(e => {
      e => expect(e.status).toEqual(404);
      expect(e.message).toEqual('Not found');
    });
  });
});
