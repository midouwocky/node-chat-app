class Users{
    constructor(){
        this.users=[];
    }

    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
    }
    removeUser(id){
        var userToRemove;
        this.users=this.users.filter((user)=>{
            if(user.id===id){
                userToRemove=user;
                return false
            }
            return true;
        });
        return userToRemove;
    }
    getUser(id){
        return this.users.find((user)=>user.id===id)
    }

    getUsers(room){
        var roomUsers = this.users.filter((user)=>user.room===room);
        return roomUsers;
    }
    getAllUsers(){
        return this.users;
    }
}

module.exports = {
    Users
}
