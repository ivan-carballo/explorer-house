import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({

    tipo : {
        type: String,
        required: true
    },

    ciudad : {
        type: String,
        required: true
    },

    descripcion : {
        type: String,
        required: true
    },

    habitaciones : {
        type: Number,
        required: true
    },

    metros : {
        type: Number,
        required: true
    },

    altura : {
        type: Number,
        required: true
    },

    precio : {
        type: Number,
        required: true
    },
})


const userModel = mongoose.model("propiedades",userSchema);

export default userModel;