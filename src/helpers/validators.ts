import * as Joi from 'joi';

import {BadRequestError} from '../errors';

export const validateLoginInput = (input: unknown): void => {
    const schema = Joi.object({
        id: Joi.string().uuid().required(),
    }).required();

    const {error} = schema.validate(input, {allowUnknown: true});
    if (error) throw new BadRequestError(error.message);
}
