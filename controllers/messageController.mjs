import { validationResult } from 'express-validator';
import {messageQueries} from '../database/messages.mjs';
import {messageValidator} from '../validator/messageValidator.mjs';

async function postDeleteMessage(req, res){
    await messageQueries.deleteMessage(req.params.id);
    res.redirect('/main-content');
}

async function getCreateMessage(req, res){
    res.render('messages/createMessage',{
        userId: req.params.userId,
    });
}

const postCreateMessage=[
    messageValidator,
    async function (req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render('messages/createMessage',{
                userid: req.params.userId,
                errors: errors.array(),
            });
        }
        const message={
            heading :  req.body.heading,
            content: req.body.content,
            userId: req.params.userId
        }
        await messageQueries.createMessage(message);
        res.redirect('/main-content');
    }
];

export const messageController ={
postDeleteMessage,
getCreateMessage,
postCreateMessage,

}