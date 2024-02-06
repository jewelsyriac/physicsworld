const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
        type: 'string',
        base: joi.string(),
        messages: {
          'string.escapeHTML': '{{#label}} must not include HTML!'
        },
        rules: {
          escapeHTML: {
            validate(value, helpers) {
              const clean = sanitizeHtml(value, {
                allowedTags: [],
                allowedAttributes: {},
              });
              if (clean !== value) return helpers.error('string.escapeHTML', { value })
              return clean; // if the input is clean, return it
            }
          }
        }
      });
      
const Joi = BaseJoi.extend(extension);

module.exports.questionSchema = Joi.object({
    
        question: Joi.string().required().escapeHTML(),
        options: Joi.array().items(Joi.string().required().escapeHTML()).required(),
        answer: Joi.string().required().escapeHTML(),
        exam: Joi.string().escapeHTML(),
        subject: Joi.string().escapeHTML(),
        solution: Joi.string().allow('').escapeHTML(),
        comments: Joi.string().allow('').escapeHTML()
});

module.exports.ReviewSchema = Joi.object({
                comment:Joi.string().escapeHTML().required()
});


