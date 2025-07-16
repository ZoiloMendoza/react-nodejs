const Joi = require('joi');

const orderSchema = Joi.object({
    customer_name: Joi.string().required(),
    favorite_coffee: Joi.string().required(),
    size: Joi.string().required(),
    milk_type: Joi.string().required(),
    payment_method: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
});

module.exports = function validateOrder(req, res, next) {
    const { error, value } = orderSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json("Por favor, completa todos los campos.");
    }
    req.input = value;
    next();
};