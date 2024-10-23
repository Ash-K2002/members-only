import { userQueries } from "../database/users.mjs";
import bcryptjs from 'bcryptjs';
import { validationResult } from "express-validator";
import {userValidator} from '../validator/userValidator.mjs';


const postSignup=[
    userValidator,
    async function (req, res, next){
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render('signup',{errors: errors.array()});
        }
    try{
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        const user = {
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            username: req.body.username,
            password: hashedPassword,
            role: 'user',
        }
        await userQueries.addUser(user);
        res.redirect("/");
    }
    catch(err){
        return next(err);
    }
}

]

function getSignup(req, res, next){
    res.render("signup");
}

export const usersController={
   getSignup,
   postSignup,

}