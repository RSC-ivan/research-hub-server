"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
/*
  Handle the validation logic before proceeding to controller
*/
const validator = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "fail",
            errors: errors.array(),
        });
    }
    next();
};
exports.default = validator;
