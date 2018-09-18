const expect = require('expect');
const { Users } = require('./users');

describe('users test', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: 'name1',
                room: 'some room'
            },
            {
                id: 2,
                name: 'name2',
                room: 'some room'
            },
            {
                id: 3,
                name: 'name3',
                room: 'some other room'
            }
        ]
    });

    it('should add a new users', () => {
        var user = {
            id: 123,
            name: 'ahmed',
            room: 'gogogo'
        }
        expect(users.users.length).toBe(3);
        users.addUser(user.id, user.name, user.room);
        expect(users.users.length).toBe(4);
        expect(users.users[3].id).toBe(user.id);
        expect(users.users[3].name).toBe(user.name);
        expect(users.users[3].room).toBe(user.room);
    });

    it('should return users of some room', () => {
        var theUsers=[
            {
                id: 1,
                name: 'name1',
                room: 'some room'
            },
            {
                id: 2,
                name: 'name2',
                room: 'some room'
            }
        ];

        var userList = users.getUsers(users.users[0].room);
        expect(userList.length).toBe(2);
        expect(userList).toEqual(theUsers);
    });
    it('should return all users', () => {
        var userList = users.getAllUsers();
        expect(userList.length).toBe(3);
        expect(userList).toEqual(users.users);
    });
    it('should remove a user',()=>{
        var user=users.removeUser(users.users[0].id);
        expect(users.users.length).toBe(2);
        expect(user.id).toBe(1);
    });
    it('should not remove a user',()=>{
        var user=users.removeUser(8);
        expect(users.users.length).toBe(3);
        expect(user).toBeFalsy();
    });
    it('should return user',()=>{
        var user=users.getUser(users.users[0].id);
        expect(user).toEqual(users.users[0]);
    });
    it('should not return user',()=>{
        var user=users.getUser(8);
        expect(user).toBeFalsy();
    });
});
