const EventEmitter = require('events').EventEmitter

// fake dataa
const database = {
    users: [
        {
            id: 1, name: "nguyen van a", occupation: "dev cui"
        },
        {
            id: 2, name: "nguyen van b", occupation: "dev xin"
        },
        {
            id: 3, name: "nguyen van c", occupation: "dev trung binh"
        },
    ]
}

class UserModel extends EventEmitter {
    constructor() {
        super(); 
    }
 
    // Lưu user vào "database fake" ở trên.
    saveUser(user) {
        database.users.push(user);
        this.emit("saved", user); // sử dụng hàm .emit của thằng EventEmitter
    }
 
    // Liệt kê toàn bộ user hiện tại.
    allUser() {
        return database.users;
    }
}
 
module.exports = UserModel