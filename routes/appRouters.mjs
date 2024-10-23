import { Router } from "express";
const appRouter= Router();
import { usersController } from "../controllers/userscontroller.mjs";
import { userValidator } from "../validator/userValidator.mjs";

appRouter.get("/", (req, res)=>{res.render("index")});
appRouter.get("/signup", usersController.getSignup);
appRouter.post("/signup",usersController.postSignup);

export default appRouter;