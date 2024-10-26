import {messageQueries} from '../database/messages.mjs';

async function postDeleteMessage(req, res){
    await messageQueries.deleteMessage(req.params.id);
    res.redirect('/main-content');
}

export const messageController ={
postDeleteMessage,

}