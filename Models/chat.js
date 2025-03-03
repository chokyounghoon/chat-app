const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema(
    {
        chat :  String,
        user: {
     
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required
            },
            name: {
                type: String,
            },
        },
    },
    {
        timestamps: true    
    }

);

module.exports = mongoose.model('Chat', chatSchema);