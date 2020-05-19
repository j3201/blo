<template>
    <div class='form'>
        <div class="form-head">
            <span type="text" :class="show===true?'active':''" @click="show=!show" >帐号登录</span>
            <span type="text" :class="show===true?'':'active'" @click="show=!show" >用户注册</span>
        </div>
        <div>
            <el-form ref="loginForm" :model="loginForm" id="login" v-show="show" >
                <el-form-item >
                    <el-input  v-model="loginForm.name" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-input  v-model="loginForm.password" placeholder="请输入密码"  :show-password="true"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-link href='#'>忘记密码</el-link></el-form-item>
                <el-form-item >
                    <el-button type="primary"   @click="submitForm()">登录</el-button>
                </el-form-item>
            </el-form>
                <el-form :model="regForm" status-icon :rules="rules" ref="regform" :inline='true' id="regist" v-show="!show" label-position='right' label-width='90px'>
                    <el-form-item label="用户名" prop="name">
                    <el-input  v-model="regForm.name" autocomplete='off' ></el-input>
                        </el-form-item>
                    <el-form-item label='密 码' prop='password'  >
                        <el-input type='password' v-model="regForm.password" autocomplete='off' ></el-input>
                    </el-form-item>
                    <el-form-item label='确认密码' prop='checkPass' >
                        <el-input type='password' v-model="regForm.checkPass" autocomplete='off' ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="addUser()">提交</el-button>
                    </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data () {
         //自定义规则函数
        const validateName = (rule,value,callback) => {
            if(value===''){
                callback(new Error('用户名不能为空'))
            }else{
                if(this.loginForm.name!==''){
                    this.$refs.loginForm.validateField('name')
                }
                callback()
            }
        };
        const validatePass=(rule,value,callback)=>{
            if(value===''){
                callback(new Error('密码不能为空'))
            }else{
                if(this.loginForm.password!==''){
                    this.$refs.loginForm.validateField('password')
                }
                callback()
            }
        };
          const validateCP=(rule,value,callback)=>{
            if(value===''){
                callback(new Error('请再次输入密码'))
            }else if (value!==this.regForm.password) {
                callback(new Error('两次输入的密码不一致'))
            }else{
                 callback()
            }
        };
        return {
            isActive:true,
            show:true,
            loginForm:{
                name:'',
                password:''
            },
            regForm:{
                name:'',
                password:'',
                checkPass:''
            },
            //自定义规则属性
            rules:{
                name:[{validator:validateName,trigger:'blur'}],
                password:[{validator:validatePass,trigger:'blur'}],
                checkPass:[{validator:validateCP,trigger:'blur'}]
            }
        }
    },
    computed: {
       isDisable(){
           if (this.loginForm.name==''||this.loginForm.password=='') {
               return false
           }else{
               return true
           }
       }
    },
    methods: {
        //登录判断
        submitForm(){
            this.$router.push('/user')
            const name = this.loginForm.name
            const pass = this.loginForm.password
            localStorage.setItem(name,pass)
           
            this.axios.post('http://localhost:3000/api/login',
            {name,pass}
            ).then((response)=>{
                console.log(response.data)
                if (response.data.status==0) {
                    this.$router.push('/user')
                    console.log(response.data.msg);
                }else{
                    console.log(response.data.msg);
                }
            })
        },
        //添加用户
        addUser(){
            const name = this.regForm.name
            const pass = this.regForm.password
            this.axios.post('http://localhost:3000/api/addUser',
            {name,pass}
            ).then(res=>{
                 console.log(res.data)
                if (res.data.status==0) {
                    this.$router.push('/loginReg')
                    console.log(res.data.msg);
                }else{
                    console.log(res.data.msg);
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.form{
    position: relative;
    top: 65px;
    width: 450px;
    height: 470px;
    margin-left: 63%;
    border: 1px solid rgb(47, 47, 48);
    box-shadow: 0 0 5px rgb(87, 86, 86);
    
    text-align: center;
    .form-head{
        margin-top: 53px;
        letter-spacing: 3px;

        span{
            margin-right: 10px;
            border-bottom: 3px solid rgb(97, 96, 96);
            color: rgb(56, 54, 54);
            font-size: 15px;
            font-weight: 200;
            cursor: pointer;
        }
        
        .active{
            border-bottom: 3px  solid red
        }
    }
}
#login{
    margin-top: 17px;
    .el-form-item{
        width: 295px;
        margin-left: 90px;
        margin-bottom: 17px;
        .el-button{
            width: 295px;
            margin-top: 16px;
            background-color: red;
        }
        .el-link{
            float: right;
            right: 6px;
        }
    }
}
#regist{
    margin-top: 17px;
    .el-form-item{
        display: block;
        .el-input{
            width: 270px;
        }
        .el-button{
            background-color: red;
            color: black;
            letter-spacing: 4px;
        }
    }
}
</style>