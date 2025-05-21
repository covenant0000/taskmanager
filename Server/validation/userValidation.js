

// const loginUserSchema = Joi.object({
//   email: Joi.string().email().required().messages({
//     'string.email': 'email must be a valid email',
//     'any.required': 'email is required'
//   }),
//   password: Joi.string().min(6).required().messages({
//     'string.min': 'password must be at least 6 characters',
//     'any.required': 'password is required'
//   }),
// });

// module.exports = { createUserSchema, loginUserSchema };

const Joi = require('joi');

const createUserSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.base': 'username should be a type of \'text\'',
    'string.empty': 'username cannot be empty',
    'string.min': 'username should have a minimum length of {#limit}',
    'any.required': 'username is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'email must be a valid email',
    'any.required': 'email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'password should be a type of \'text\'',
    'string.min': 'password should have a minimum length of {#limit}',
    'any.required': 'password is required'
  }),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'email must be a valid email',
    'any.required': 'email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'password must be at least 6 characters',
    'any.required': 'password is required'
  }),
});

module.exports = { createUserSchema, loginUserSchema };



    