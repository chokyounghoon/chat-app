const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        chat: String,
        user: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true // required 속성에 true 값을 설정
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

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;