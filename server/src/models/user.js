const { Schema, mongoose } = require("mongoose");

const userSchema = new Schema({
    name : {
        type: String,
        required: true,
        minLength: 6
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("User", userSchema);

