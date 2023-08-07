import  express  from "express";
import UserController from "../../app/Http/Controllers/UserController.js";
import {validateStoreOrUpdateUser} from '../../app/Http/Requests/UserRequest.js';
import authMiddleware from "../../app/Http/Middlewares/AuthMiddleware.js";
const userRouter=(app)=>{
    const router=express.Router();
    const userController=new UserController();
    router.use(authMiddleware)
    router.post('', validateStoreOrUpdateUser, userController.store);
    router.put("/:userId",userController.update);
    router.get("/:userId",userController.show);

    router.delete("/:userId",userController.destroy);

    app.use("/users",router);
}
export default userRouter;