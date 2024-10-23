import { body } from "express-validator";

export const userValidator =[
    body('firstName')
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isAlpha()
    .withMessage('First name must contain only alphabets.')
    .isLength({max:100})
    .withMessage("First name cannot be longer than 100 characters"),
    
    body('lastName')
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isAlpha()
    .withMessage('Last name must contain only alphabets.')
    .isLength({max: 100})
    .withMessage("Last name cannot be longer than 100 characters"),
    
    body('username')
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({max: 200})
    .withMessage("Username cannot be longer than 200 characters"),

    body('password')
    .notEmpty()
    .withMessage("Password must not be empty")
    .isLength({min:4, max: 200})
    .withMessage("Password must contain 4-200 characters"),
    

]