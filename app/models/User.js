import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { default as mongoosePaginate } from "mongoose-paginate";
import {USERS} from "../../config/constant.js"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Họ tên không được để trống'],
            maxLength: [50, 'Họ tên không được lớn hơn {MAXLENGTH} ký tự'],
        },
       
        mobile: {
            type: String,
            required: [true, 'Số điện thoại không được để trống'],
            unique: [true, 'Số điện thoại đã tồn tại'],
            maxLength: [11, 'Số điện thoại không được lớn hơn {MAXLENGTH} ký tự'],
            minLength: [10, 'Số điện thoại không được ít hơn {MINLENGTH} ký tự'],
        },
        birthday: {
            type: Date,
    
        },
        gender: {
            type: Number,
            enum: {
                values: Object.values(USERS.gender),
             
            },
            default: USERS.gender.male
            
        },
        address: {
            type: String,
            maxLength: [255, 'Địa chỉ không được lớn hơn {MAXLENGTH} ký tự'],
        },
        province_id:{
            type: Number,
        },
        district_id:{
            type: Number,
        },
        town_id:{
            type: Number,
        },
        password: {
            type: String,
            required: [true, 'Mật khẩu không được để trống'],
            maxLength: [255, 'Mật khẩu không được lớn hơn {MAXLENGTH} ký tự'],
            minLength: [6, 'Mật khẩu không được ít hơn {MINLENGTH} ký tự'],
        },
        email: {
            type: String,
            required: [true, 'Email không được để trống'],
            unique: [true, 'Email đã tồn tại'],
            maxLength: [50, 'Email không được lớn hơn {MAXLENGTH} ký tự'],
        },
        role: {
            type: Number,
            required: true,
            enum: {
                values: Object.values(USERS.role),
                message: 'Giá trị đã chọn trong trường phân quyền không hợp lệ.'
            },
            default: USERS.role.user
        },
        is_confirm_account: {
            type: Number,
            required: true,
            enum: {
                values: Object.values(USERS.is_confirm_account),
            },
            default: USERS.is_confirm_account.false
        },
        created_by: {
            type: ObjectId,
            required: false,
          },
          updated_by: {
            type: ObjectId,
            required: false,
          },
          created_at: {
            type: Date,
            required: false,
            timestamps: true,
          },
          updated_at: {
            type: Date,
            required: false,
            timestamps: true,
          },
          deleted_at: {
            type: Date,
            required: false,
          },
       
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);
userSchema.plugin(mongoosePaginate);
export default mongoose.model('Users', userSchema,"users");