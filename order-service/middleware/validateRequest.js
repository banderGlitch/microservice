import { validationResult } from 'express-validator';


export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
};

// order to order service  
// or REST requests to product-service
// OR: internal service-to-service call

