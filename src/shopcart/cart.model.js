import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantityProducts:{
            type: Number,
            required: true
        }
    }],

    totalPrice:{
        type: Number,
        required: true
    }
});

CartSchema.methods.toJSON = function() {
    const { password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

export default mongoose.model("Cart", CartSchema)