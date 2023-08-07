import mongoose from "mongoose";
import { Double, ObjectId } from "mongodb";

import { default as mongoosePaginate } from "mongoose-paginate";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên sản phẩm không được để trống'],
            maxLength: [255, 'Họ tên không được lớn hơn {MAXLENGTH} ký tự'],
        },
        price: {
            type: Double,
            required: [true, 'Giá sản phẩm không được để trống'],
        },
        discount: {
            type: Number,
            enum: [0, 100],
            default: 0
        },
        category_id : {
            type: Number,
        },
        brand_id : {
            type: Number,
        },
        province_id:{
            type: Number,
        },
        thumbnail :{
            type: String,
        },
        description :{
            type: String,
        },
        status :{
            type: Number,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);
productSchema.plugin(mongoosePaginate);
export default mongoose.model('Products', productSchema,'products');