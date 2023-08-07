import { baseRequest } from "./BaseRequest.js";
import { body, query } from 'express-validator';
import { USERS } from "../../../config/constant.js";

const validationsStoreOrUpdateUser = [
    body('name').custom( async  nameValue => {
        if (typeof nameValue !== 'string') {
            throw new Error('Họ tên phải là kiểu chuỗi');
        }
        if (nameValue.length > 50) {
            throw new Error('Họ tên không được lớn hơn 50 ký tự');
        }
    }),
    body('mobile').custom( async phoneValue => {
        if (typeof phoneValue !== 'string') {
            throw new Error('Số điện thoại phải là kiểu chuỗi')
        }

        if (phoneValue.length > 11) {
            throw new Error('Số điện thoại không được lớn hơn 11 ký tự')
        }

        if (phoneValue.length < 10) {
            throw new Error('Số điện thoại không được ít hơn 10 ký tự')
        }
    }),
    body('role').isIn(Object.values(USERS.role)).withMessage('Giá trị đã chọn trong trường phân quyền không hợp lệ.'),
    body('email').custom( async  emailValue => {
        if (typeof emailValue !== 'string') {
            throw new Error('Email phải là kiểu chuỗi');
        }
        if (emailValue.length > 50) {
            throw new Error('Email không được lớn hơn 50 ký tự');
        }
    })
        .isEmail()
        .withMessage('Email không đúng định dạng'),
];

export const validateStoreOrUpdateUser = baseRequest(validationsStoreOrUpdateUser);