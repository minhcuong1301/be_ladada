import { hashHmacString, responseErrors, responseJsonByStatus, responseSuccess } from "../../common/helper.js";
import User from "../../models/User.js";
class UserController {
    async store(req, res) {
        try {
            const data = {
                ...req.body
            }
            data.password = hashHmacString('12345678');
            const user = await User.create(data);

            return responseJsonByStatus(
                res,
                responseSuccess(user)
            )
        } catch (e) {
            return responseJsonByStatus(
                res,
                responseErrors(500,e.message)
            )
        }
    }

    async update(req, res) {
        try{
            const { userId } = req.params;
            const data = { ...req.body };
            const userUpdated = await User.findByIdAndUpdate(
                userId,
                data
            )
            return responseJsonByStatus(
                res,
                responseSuccess(true)
            )
        }
        catch(e){
            return responseJsonByStatus(
                res,
                responseErrors(500,e.message)
            )
        }
       

       
    }
    show(req,res){
        const{userId}=req.params;
        console.log(userId);
        User.findById(userId)
        .then(user=>responseJsonByStatus(res,responseSuccess(user))
        .catch(e=>responseJsonByStatus(res,responseErrors(500,e.message)))
        )
      
    }
    async destroy(req,res)
    {
        try{
            const {userId}=req.params
            const userDeleted=await User.deleteOne({_id:userId})
           if(userDeleted.deletedCount===0){
            return responseJsonByStatus(res,responseErrors(400,"Xoa user that bai"))
           }
            return responseJsonByStatus(
                res,
                responseSuccess(true)
            )
        }catch(e){
            return responseJsonByStatus(
                res,
                responseErrors(500,e.message)
            )
        }
    }
   
    
}
export default UserController