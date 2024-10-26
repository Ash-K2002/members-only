import { Router } from "express";
const appRouter= Router();
import { usersController } from "../controllers/userscontroller.mjs";

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
appRouter.get('/main-content', usersController.ensureAuthenticated, (req, res)=>{
    res.render('mainContent',{
        user: req.user,
    });
});
appRouter.get('/manage-account/:id',usersController.getManageUser);
appRouter.post("/login",usersController.postLogin);


export default appRouter;