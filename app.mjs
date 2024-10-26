import express from 'express';
import appRouter from './routes/appRouters.mjs';
import { config } from 'dotenv';
import {pgSession} from './config/sessionConfig.mjs';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { userQueries } from './database/users.mjs';
import bcryptjs from 'bcryptjs';

config();
const PORT = process.env.PORT || 3000;
const app= express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));

app.use(pgSession);
app.use(passport.session());
app.use('/',appRouter);



app.listen(PORT, ()=>{console.log('Listening at 3000',PORT)});