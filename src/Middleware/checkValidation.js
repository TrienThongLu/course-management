import { validationResult } from "express-validator";

let checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    next();
  }
  next();
};

export default { checkValidation };
