import {parserJWTToken, responseErrors} from "../../common/helper.js";

import User from "../../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const responseToken = parserJWTToken(req.headers.authorization);

  if (!responseToken.success) {
    return responseErrors(res, 401, responseToken.errors ?? '');
  }

  try {
    const userId = responseToken.payload.id;
 
    const user = await userRepository.findById(userId);

    if (!user) {
      return responseErrors(res, 401, 'User không tồn tại.');
    }

    if (user.is_confirm_account !== USERS.is_confirm_account.true) {
      return responseErrors(res, 401, 'User chưa xác thực tài khoản.');
    }
    res.locals.authUser = user;
    next()
  } catch (e) {
    return responseErrors(res, 500, e.message);
  }
}