const User = require('../Models/user');

const userController = {};
  
userController.saveUser = async (userName, sid) => {
    let user = await User.findOne({ name: userName });

    // 없으면 새로 유저 정보 만들기
    if (!user) {
        user = new User({
            name: userName,
            token: sid,
            online: true
        });
    } else {
        // 이미 있으면 유저 정보 token 값만 업데이트
        user.token = sid;
        user.online = true;
    }
    
    await user.save();
    
    return user;
}
userController.checkUser = async (sid) => {
    const user
     = await User.findOne({ token: sid });
    
     if(!user) {
         throw new Error('User not found');
     }
    
     return user;


 }
    
module.exports = userController;