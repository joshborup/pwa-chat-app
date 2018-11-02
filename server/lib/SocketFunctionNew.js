const _ = require('lodash');

module.exports = class {
    constructor(){
        this.users = [];
        this.cleaner = setInterval(() => {
            // let newList = _.uniqBy(this.tempUserList, 'id')
        }, 4000);
    }

    addUser = (userList, user) => {
        if(!userList.includes(user)){
            userList.concat(user);
        }
    }
}