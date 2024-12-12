import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({

    username : {
        type: String,
        required: true
    },

    vendor : {
        type: String,
        required: true
    },

    propiedad : {
        type: String,
        required: true
    },

    mensaje : {
        type: String,
        required: true
    },

    date : {
        type: Date,
        required: false
    },

    estado : {
        type: String
    }



})


const userModel = mongoose.model("mensajes",userSchema);

export default userModel;