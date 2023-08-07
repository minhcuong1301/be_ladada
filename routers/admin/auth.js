import express from "express";
import AuthController from "../../app/Http/Controllers/AuthController.js";
const authRouter=(app)=>{
    const router=express.Router();
    const authController=new AuthController();
    router.post("/login",authController.login);
    app.use('/auth',router);
}
export default authRouter