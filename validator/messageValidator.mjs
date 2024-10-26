import { body } from "express-validator";

export const messageValidator =[
    body('heading').trim()
    .isLength({min:1, max:100})
    .withMessage("Heading should contain 1-100 characters"),

    body('content').trim()
    .isLength({max:300})
    .withMessage("Content should contain at most 300 characters"),
    
]