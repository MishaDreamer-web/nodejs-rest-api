const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { ValidInfoContact } = require('../../config/constant');

const patternPhone =
  '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}';

const schemaContact = Joi.object({
  name: Joi.string()
    .min(ValidInfoContact.MIN_NAME_LENGTH)
    .max(ValidInfoContact.MAX_NAME_LENGTH)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).required(),
  isFavourite: Joi.boolean().optional(),
});

const schemaStatusContact = Joi.object({
  isFavourite: Joi.boolean().required(),
});

const schemaId = Joi.object({
  contactId: Joi.objectId().required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'error',
      code: 400,
      message: `Field ${err.message.replace(/"/g, '')}`,
    });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};

module.exports.validateStatusContact = async (req, res, next) => {
  return await validate(schemaStatusContact, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};
