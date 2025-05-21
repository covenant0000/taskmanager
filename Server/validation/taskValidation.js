const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
  }),
  description: Joi.string().optional(),
  completed: Joi.boolean().optional(),
  dueDate: Joi.date().optional(),
  priority: Joi.string().valid('high', 'medium', 'low').optional()
    .messages({
      'any.only': 'Priority must be one of high, medium, or low',
    }),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  completed: Joi.boolean().optional(),
  dueDate: Joi.date().optional(),
  priority: Joi.string().valid('high', 'medium', 'low').optional()
    .messages({
      'any.only': 'Priority must be one of high, medium, or low',
    }),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};