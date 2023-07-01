import { body, validationResult } from "express-validator";

export const validateRequest = async (req, config) => {
    const validations = config.map(({ field, validation, min }) =>
        body(field)
            .notEmpty()
            .withMessage(`${field} is required`)
            .isLength({ min })
            .withMessage(`${field} must be at least ${min} characters`)
            .custom((value, { req }) => validation(value, req))
    );

    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new Error(errors.array()[0].msg);
    }
};