
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User must type name"],
        unique: true, 

    },
    token: {
        type: String,
      
    },
    //유저가 온라인인지 아닌지
    online: {
        type: Boolean,
        default: false,
    },
    room: {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
    }
});
module.exports = mongoose.model('User', UserSchema);



    
