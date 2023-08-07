import {generateJWTToken, hashHmacString} from "../../common/helper.js";
import User from "../../models/User.js";

import { responseJsonByStatus } from "../../common/helper.js";
class AuthController{
    async login(req,res){
        const {phone, password} = req.body;
        const user = await User.findOne({
            phone
        })

        if (!user) {
            return responseJsonByStatus(res, 401, {
                errors: [
                    {
                        path: 'phone',
                        msg: 'Số điện thoại không hợp lệ',
                        value: phone
                    }
                ]
            })
        }

        if (user.password !== hashHmacString(password)) {
            return responseErrors(res, 401, {
                errors: [
                    {
                        path: 'password',
                        msg: 'Mật khẩu không chính xác',
                        value: password
                    }
                ]
            })
        }
        console.log(user);
        res.json({
            data: generateJWTToken(user._id)
        })
    }
}
export default AuthController;