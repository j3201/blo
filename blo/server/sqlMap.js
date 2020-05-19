module.exports = {
    user: {
        userInfo: 'select *from user where name=? and pass=?',
        addUser: 'insert into user(name,pass) values(?,?)'
    }
}