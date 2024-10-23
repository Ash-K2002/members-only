import express from 'express';
import appRouter from './routes/appRouters.mjs';
import { config } from 'dotenv';
import {pgSession} from './config/sessionConfig.mjs';

config();
const PORT = process.env.PORT || 3000;
const app= express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));

app.use(pgSession);

app.use('/',appRouter);


app.listen(PORT, ()=>{console.log('Listening at 3000',PORT)});