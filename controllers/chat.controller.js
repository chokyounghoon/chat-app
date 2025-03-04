const Chat = require('../Models/chat');
const mongoose = require('mongoose');

const chatController = {};

chatController.saveChat = async (user, message) => {
 

    const chat = new Chat({
        chat: message,
        user: {
            id: user._id,
            name: user.name
        }
    });

    await chat.save();
    return chat;
};

module.exports = chatController;