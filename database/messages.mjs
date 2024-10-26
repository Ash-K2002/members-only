import {pool} from '../config/db.mjs';

//create
async function createMessage(message){
    const {heading,
        content, 
        createdAt,
        updatedAt,
        userId,
    }=message;

    const queryString=`
    INSERT INTO messages 
    (heading, content, created_at, updated_at, user_id)
    VALUES
    ($1, $2, $3, $4, $5);
    `;
    try{
        await pool.query(queryString,
        [heading,
            content,
            createdAt,
            updatedAt,
            userId,
        ]
    );
    console.log('successfully created message');
    }
    catch(err){
        console.err(err);
        throw new Error(err);
    }
    
}

// read

async function readMessageById(id){
    const queryString =`
    SELECT * FROM messages WHERE id=$1;
    `;

    try {
       const {rows}=await pool.query(queryString, [id]);
       return rows[0];
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
}

async function readAllMessages(){
    try {
        const {rows}= await pool.query("SELECT * FROM messages");
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
}

//delete

async function deleteMessage(id){
    try {
        await pool.query('DELETE FROM messages WHERE id=$1',[id]);
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
}

//update
async function updateMessage(id, newHeading, newContent) {
    const queryText = `
        UPDATE messages 
        SET 
            heading = $1,
            content = $2,
            updated_at = NOW()
        WHERE 
            id = $3
        RETURNING *;`;

    try {
        const result = await pool.query(queryText, [newHeading, newContent, id]);
        return result.rows[0]; // Return the updated message if needed
    } catch (error) {
        console.error('Error updating message:', error);
        throw error;
    }
}


export const messageQueries={
    createMessage,
    readAllMessages,
    readMessageById,
    deleteMessage,
    updateMessage,
};