const Joi = require('joi')

exports.add = (req, res, next) => {
    const rules = Joi.object().keys({
        comment: Joi.string().required().max(500).options({
            language: {
                any: {required: 'is required'},
                string: {max: 'can\'t be more than 500 characters'}
            }
        }),

        movie_id: Joi.number().required().options({
            language: {
                any: {required: 'is required'}
            }
        })
    })

    Joi.validate(req.body, rules, (err, result) => {
        if (err) {
            return res.status(422).json({
                message: err.message,
                error: err.message,
                data: req.body
            })
        } else {
            next();
        }
    })
}