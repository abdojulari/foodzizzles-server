import Joi from "joi";

const create = Joi.object({
  name: Joi.string().required(),
  image: Joi.binary().encoding('base64'),
  description: Joi.string().required(),
  cuisine: Joi.string().required(),
  category: Joi.string().required(),
  duration: Joi.string().required(),
  date: Joi.string().required(),
});

export default { create };