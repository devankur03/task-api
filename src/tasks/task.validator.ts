import { body } from 'express-validator';

export const createValidator = [
    body('title').not().isEmpty().withMessage("Title Can't be empty"),
    body('description')
        .not()
        .isEmpty()
        .withMessage("description Can't be empty"),
    body('date').not().isEmpty().withMessage("date Can't be empty"),
    body('status').not().isEmpty().withMessage("status Can't be empty"),
    body('priority').not().isEmpty().withMessage("priority Can't be empty"),
];
