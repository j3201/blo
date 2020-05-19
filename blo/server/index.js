//express服务器入口
const fs = require('fs')
const express = require('express')
const app = express()
const bodyParser = require('body-parser') ///加载body-parser处理post提交的数据
const userApi = require('./api/userApi')

app.all('*', function(res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

//对请求进行全局拦截，，所有的请求都进行body处理,以下方式二选一
app.use(bodyParser.json()); //解析json数据
app.use(bodyParser.urlencoded({ extended: false })); //支持UTF-8解析，false:支持queryString

app.use('/api', userApi)

app.listen(3000, function() {
    console.log("监听中")
})