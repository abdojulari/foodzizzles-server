import Joi from "joi";

const create = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  cuisine: Joi.string().required(),
  category: Joi.string().required(),
  duration: Joi.number().required(),
  date: Joi.string().required(),
});

export default { create };