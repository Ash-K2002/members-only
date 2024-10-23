import { pool } from "./db.mjs";
import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import { config } from "dotenv";
config();

export const pgSession = session({
    store: new (connectPgSimple(session))(
        {
            pool: pool,
            tableName: 'session',
        }
    ),
    secret: process.env.SECRET ,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 24*60*60*1000,
    } 
});


