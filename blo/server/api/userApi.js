const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const models = require('../db')

const $sql = require('../sqlMap')

//连接数据库
const conn = mysql.createConnection(models.mysql)
conn.connect()

//查询用户信息
router.post('/login', function(req, res) { //定义/get借口，以便可以通过http://localhost:3003/api/get访问

        let sql = $sql.user.userInfo
        let params = req.body
        conn.query(sql, [params.name, params.pass], function(result) {
            if (result == null) {
                res.json({
                    status: '1',
                    msg: '登录失败',
                    data: ''
                })
            } else {
                res.json({
                    status: '0',
                    msg: '登录成功',
                    data: result
                })
            }
        })
        conn.end()
    })
    //添加用户信息
router.post('/addUser', (req, res) => {
        let sql = $sql.user.addUser
        let params = req.body
        console.log(params.pass);
        conn.query(sql, [params.name, params.pass], (result) => {
            if (result == null) {
                res.json({
                    status: '1',
                    msg: '添加失败',
                    data: ''
                })
            } else {
                res.json({
                    status: '0',
                    msg: '添加成功',
                    data: result
                })
            }
        })
        conn.end()
    })
    //导出路由
module.exports = router