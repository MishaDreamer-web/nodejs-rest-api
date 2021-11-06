const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { Subscription, HttpCode } = require('../../config/constants');

const patternPassword = '^[a-zA-Z0-9]{5,20}$';

const schemaUserRegistration = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).pattern(new RegExp(patternPassword)).required(),
  subscription: Joi.string()
    .valid(Subscription.START, Subscription.PRO, Subscription.BUSINESS)
    .optional(),
});

const schemaUserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).pattern(new RegExp(patternPassword)).required(),
});

const schemaSubscriptionUser = Joi.object({
  subscription: Joi.string()
    .valid(Subscription.START, Subscription.PRO, Subscription.BUSINESS)
    .required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: `Field ${err.message.replace(/"/g, '')}`,
    });
  }
};

module.exports.validateUserRegistration = async (req, res, next) => {
  return await validate(schemaUserRegistration, req.body, res, next);
};

module.exports.validateUserLogin = async (req, res, next) => {
  return await validate(schemaUserLogin, req.body, res, next);
};

module.exports.validateSubscriptionUser = async (req, res, next) => {
  return await validate(schemaSubscriptionUser, req.body, res, next);
};
