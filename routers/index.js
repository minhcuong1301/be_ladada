// import express  from "express"
import authRouter from "./admin/auth.js"
import userRouter from "./admin/users.js"
const routers=(app)=>{
    authRouter(app);
    userRouter(app);
}
export default routers