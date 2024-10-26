import { userQueries } from "../database/users.mjs";
import bcryptjs from 'bcryptjs';
import { validationResult } from "express-validator";
import {userValidator} from '../validator/userValidator.mjs';
import passport from "passport";
import LocalStrategy from 'passport-local';
import { application } from "express";


const postSignup=[
    userValidator,
    async function (req, res, next){
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render('user/signup',{errors: errors.array()});
        }
        const rows=await userQueries.getUserByUsername(req.body.username);
        if(rows.length>0){
            return res.status(400).render('user/signup',{errors: [{
                msg: 'username already exists',
            }]});
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
    res.render("user/signup");
}

function getLogout(req, res, next){
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/");
    });
}

async function getManageUser(req, res){
    const users = await userQueries.getUserById(req.params.id);
    const {password, ...user}=users[0];
    res.render("user/manageAccount",{user: user});
}

const postLogin=
    passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/",
        failureFlash: true,
    }
);


passport.use(
    new LocalStrategy(
        async function(username, password, done){
            try{
                const rows = await userQueries.getUserByUsername(username);
                const user = rows[0];
                
                if(!user){
                    return done(null, false, {message: "Incorrect username"});
                }

                const match = await bcryptjs.compare(password, user.password);
                if(!match){
                    return done(null, false, {message: "Incorrect password"});
                }

                return done(null, user);
            }
            catch(err){
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
    try{
        const rows = await userQueries.getUserById(id);
        const user = {
            first_name: rows[0].first_name,
            id: rows[0].id,
            role: rows[0].role,
        };
        done(null, user);
    }
    catch(err){
        done(err);
    }
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

export const usersController={
   getSignup,
   postSignup,
   getLogout,
   postLogin,
   getManageUser,
   ensureAuthenticated,
   
}