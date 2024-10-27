import { Router } from "express";
const appRouter= Router();
import { usersController } from "../controllers/userscontroller.mjs";
import { messageQueries } from "../database/messages.mjs";
import {messageController} from '../controllers/messageController.mjs';

appRouter.get("/", (req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/main-content');
    }
    res.render('index');
});

appRouter.get("/signup", usersController.getSignup);
appRouter.post("/signup",usersController.postSignup);
appRouter.get("/logout",usersController.getLogout);
appRouter.get("/login", (req, res, next)=>{
    res.render("user/login");
});
appRouter.get('/main-content', usersController.ensureAuthenticated, async (req, res)=>{
    const messages = await messageQueries.readAllMessages();   
    res.render('mainContent',{
        user: req.user,
        messages: messages,
    });
});
appRouter.get('/manage-account/:id',usersController.getManageUser);
appRouter.post("/login",usersController.postLogin);
appRouter.post('/message/delete/:id',messageController.postDeleteMessage);
appRouter.get('/message/create/:userId',messageController.getCreateMessage);
appRouter.post('/message/create/:userId',messageController.postCreateMessage);
appRouter.get('/upgrade/member/:userId',usersController.getUpgradeMember);
appRouter.post('/upgrade/member/:userId',usersController.postUpgradeMember);
appRouter.get('/upgrade/admin/:userId',usersController.getUpgradeAdmin);
appRouter.post('/upgrade/admin/:userId',usersController.postUpgradeAdmin);

export default appRouter;