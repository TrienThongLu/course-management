import { validationResult } from "express-validator";

let checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let extractedErrors = {};
    errors.array().map((err) => {
      extractedErrors = {
        ...extractedErrors,
        [err.param]: extractedErrors[err.param]
          ? [...extractedErrors[err.param], err.msg]
          : [err.msg],
      };
    });

    return res.status(422).json({
      errors: extractedErrors,
    });
  }
  next();
};

export default { checkValidation };
