const UserModel = require('./UserModel')
const User = new UserModel()

User.on("saved", (user) => {
    console.log(`New user saved: ${user.name} - ${user.occupation}`);
});
 
// Lưu thêm 2 thằng user mới.
let trungquandev04 = {id: 4, name: "Trungquandev04",  occupation: "Code xịn (─‿‿─)"};
let trungquandev05 = {id: 5, name: "Trungquandev05",  occupation: "Code lởm (-.-)"};
User.saveUser(trungquandev04);
User.saveUser(trungquandev05);
 
// Lấy ra toàn bộ users
let allUser = User.allUser();
console.log(allUser);

