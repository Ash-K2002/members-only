import {pool} from '../config/db.mjs';

async function addUser(user){
    const {
        firstname,
        lastname,
        username,
        password,
        role,
        } = user;
    const queryString = `
    INSERT INTO users 
    (first_name, last_name, username, password,role)
    VALUES 
    ($1, $2, $3, $4, $5);
    `;
    try{
        await pool.query(queryString, [firstname, lastname, username, password,role]);
    }
    catch(err){
        console.error("While adding user, this error occurred: ",err);
        throw new Error(err);
    }

}

async function getUserByUsername(username){
    const queryString = `SELECT * FROM users WHERE username=$1`;
        const {rows} = await pool.query(queryString, [username]);
        return rows;
}

async function getUserById(id){
    const queryString =`SELECT * FROM users WHERE id=$1`;
    const {rows} = await pool.query(queryString, [id]);
    return rows;
}

export const userQueries={
    addUser,
    getUserByUsername,
    getUserById,
    
}
