<template>
  <div>
    <el-menu
      style=""
      default-active="home"
      mode="horizontal"
      background-color="#fff"
      text-color="#333"
      active-text-color="#0084ff"
    >
      <el-menu-item index="home" style="margin-left: 300px" @click="$router.push({name:'home'})">
        <span class="tab">首页</span>
      </el-menu-item>
      <el-menu-item index="goHomeDream" style="margin-left: 20px" @click="$router.push({name:'goHomeDream'})">
        <span class="tab">回家之梦</span>
      </el-menu-item>
      <el-menu-item index="volunteer" style="margin-left: 20px" @click="$router.push({name:'volunteer'})">
        <span class="tab">我是志愿者</span>
      </el-menu-item>
      <el-menu-item index="me" style="margin-left: 20px" @click="$router.push({name:'me'})">
        <span class="tab">关于我们</span>
      </el-menu-item>
      <el-dropdown v-if="loginFlag"  trigger="click" size="mini" @command="handleCommand">
        <div>
          <img :src="userInfo.avatarImg" width="30px" height="30px" style="cursor:pointer;margin-top: 15px">
        </div>
        <el-dropdown-menu slot="dropdown">
<!--          <el-dropdown-item command="personCenter">个人中心</el-dropdown-item>-->
          <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-else style="margin-top: 15px;" size="small" round @click="dialog.dialogVisible= true">登录</el-button>
    </el-menu>
    <el-dialog
      title="登录"
      :show-close="false"
      :visible.sync="dialog.dialogVisible"
      width="30%">
      <el-form label-width="80px" :model="loginForm" :rules="rule" ref="loginform">
        <el-form-item label="账号" prop="userCode" >
          <el-input type="text" v-model="loginForm.userCode" clearable prefix-icon="" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd" >
          <el-input type="password" v-model="loginForm.userPwd" clearable placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loginForm.loading" @click="submitForm('loginform')">登录</el-button>
          <el-button @click="resetForm('loginform')">重置</el-button>&nbsp;&nbsp;&nbsp;
          <el-link type="primary" @click="dialog1.dialogVisible=true;dialog.dialogVisible=false;">注册</el-link>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="注册"
      :show-close="false"
      :visible.sync="dialog1.dialogVisible"
      width="30%">
      <el-form label-width="80px" :model="registerForm" :rules="rule1" ref="registerForm">
        <el-form-item label="头像" prop="avatarImg">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9191/common/uploadPic"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="registerForm.avatarImg" :src="registerForm.avatarImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="账号" prop="userCode" >
          <el-input v-model="registerForm.userCode" clearable placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd">
          <el-input type="password" v-model="registerForm.userPwd" clearable placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="repeatPwd">
          <el-input type="password" v-model="registerForm.repeatPwd" clearable placeholder="重复密码"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age" placeholder="年龄">
          <el-input v-model="registerForm.age" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="registerForm.sex"  label="0" name="sex" >女</el-radio>
          <el-radio v-model="registerForm.sex"  label="1" name="sex"  >男</el-radio>
          <el-radio v-model="registerForm.sex"  label="2" name="sex" >未知</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogRegister('registerForm')">注册</el-button>
          <el-button @click="registerReset('registerForm')">重置</el-button>&nbsp;&nbsp;&nbsp;
          <el-link type="primary" @click="dialog1.dialogVisible=false;dialog.dialogVisible=true;">去登陆</el-link>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改密码"
               :visible.sync="form1.dialogFormVisible"
               append-to-body
               close-on-click-modal
               width="30%"
               style="text-align: center">

      <el-form :model="form1"
               status-icon
               :rules="rules2"
               ref="changePassForm"
               label-width="100px"
               class="demo-ruleForm">

        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="form1.oldPassword" ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="form1.newPassword" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="form1.checkPassword" ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="text-align: center;padding-top: 0">
        <el-button @click="exitChangePassword('changePassForm')">退出</el-button>
        <el-button type="primary" @click="modifyPassword('changePassForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {register} from '../../api/Login/Register'
import {login,getUserByUserCode} from "../../api/Login/Login";
import {logout} from "../../api/Login/logOut"
import {setCookie,getCookie,removeCookie} from "../../utils/cookie";
import {mapState,mapMutations} from 'vuex'
import {changePwd} from '../../api/User/User'

export default {
  name: "Tab",
  data(){
    let validateNewPass = (rule , value , callback) =>{
      if (value === ''){
        callback(new Error("请输入旧密码"))
      }else if(value.length < 6){
        callback(new Error("密码不能小于6位"))
      }else if(value.length > 16){
        callback(new Error("密码不能超过16位"))
      }else
        callback()
    }
    let validatePass = (rule, value, callback) => {

      if (value === '') {
        callback(new Error('请输入密码'));
      }
      else if (value === this.form1.oldPassword){
        callback("新密码和旧密码不能一样")
      }
      else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form1.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateAttach = (rule, value, callback) => {
      if (value === undefined){
        callback(new Error("上传图片不能为空"))
      }
      callback()
    }
    let validateRepe = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.userPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      tabList:[
        {label:'首页',name:'home'},
        {label:'回家之梦',name:'second'},
        {label:'我是志愿者',name:'third'},
        {label:'关于我们',name:'fourth'},
      ],
      activeName:'home',
      dialog:{
        dialogVisible:false
      },
      dialog1:{
        dialogVisible:false
      },
      loginForm:{
        loading:false,
        userCode:'',
        userPwd:''
      },
      registerForm:{
        userCode:'',
        userPwd:'',
        repeatPwd:'',
        age:'',
        sex:'0',
        avatarImg:''
      },
      form1:{
        dialogFormVisible:false,
        oldPassword:'',
        newPassword:'',
        checkPassword:''
      },
      rules2:{
        oldPassword: [
          {required:true,validator: validateNewPass, trigger:'blur'}
        ],
        newPassword: [
          {required:true,validator: validatePass, trigger: 'blur'}
        ],
        checkPassword: [
          {required:true,validator: validatePass2, trigger: 'blur'}
        ]
      },
      rule1:{
        userCode:[
          {required:true,message:'请输入账号',trigger:'blur'},
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        userPwd:[
          {required:true,message: "请输入密码",trigger:'blur'},
          {min: 6, max: 16,message: "长度在 6 到 16 个字符",trigger:'blur'}
        ],
        repeatPwd:[
          {required:true,validator: validateRepe ,trigger:'blur'}
        ],
        age:[
          {required:true,message: "请输入年龄",trigger:'blur'}
        ],
        sex:[
          {required:true,message: "请选择性别",trigger:'blur'}
        ],
        avatarImg:[
          { required:true, validator: validateAttach, trigger: 'blur' },
        ],
      },
      rule:{
        userCode:[
          {required:true,message:'请输入账号',trigger:'blur'}
        ],
        userPwd:[
          {required:true,message:'请输入密码',trigger:'blur'}
        ]
      }
    }
  },
  computed: {
    ...mapState('User', ['userInfo','loginFlag']),
    user(){
      return JSON.parse(localStorage.getItem('userInfo'))
    }
  },
  methods:{
    exitChangePassword(formName){
      this.$refs[formName].resetFields();
      this.form1.dialogFormVisible = false
    },
    modifyPassword(formName){
      this.$refs[formName].validate((valid) =>{
        if(valid){
          let query = {
            oldPwd:this.form1.oldPassword,
            userPwd:this.form1.newPassword
          }
          changePwd(query).then(res=>{
            if(res.data.code === 200){
              console.log(res.data)
              // 退出dialog，重置表单
              this.exitChangePassword("changePassForm")
              // 删除认证
              this.$message.success("修改成功，请重新登录")
              this.logOut() // 退出登录
            }else{
              this.$message.error(res.data.msg)
            }
          })

        }else {
          return false
        }
      })
    },
    logOut(){
      logout().then(res=>{
        if(res.data.code === 200){
          localStorage.removeItem("userInfo")
          removeCookie("Authentication")
          this.$store.commit("User/CHANGELOGINFLAG",false)
          this.$store.commit("User/SETUSERINFO",null)
          this.$message.success(res.data.msg)
        }else {
          this.$message.error(res.data.msg)
        }
      })
    },
    /**
     * 头像下拉框选择
     */
    handleCommand(command){
      if(command === 'logOut'){
        this.logOut()
      }else if(command === 'changePassword'){
        this.form1.dialogFormVisible = true
      }else{
        // 进入personCenter组件
        this.$router.push({name:'personCenter'})
        let tagList = {
          id:9999,
          path: this.$route.path,
          name:'personCenter',
          label:'个人中心',
          icon:'user-solid',
          url: this.$route.fullPath
        }
        this.$store.commit('tags/ACTIVEMENU',tagList)
        this.$store.dispatch('tags/inTagsList',tagList)
      }
    },
    handleAvatarSuccess(res){
      this.registerForm.avatarImg = res.data
    },
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('轮播图只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('轮播图大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginForm.loading = true
          login(this.loginForm.userCode,this.loginForm.userPwd).then(res=>{
            if (res.data.code === 200 ){
              // 将token存入cookie，
              setCookie(this.loginForm.userCode+"Authentication",res.data.Authentication)
              getUserByUserCode(this.loginForm.userCode).then(res=>{
                if (res.data.code === 200){
                  this.$store.commit("User/SETUSERINFO",res.data.data)
                  this.$store.commit("User/CHANGELOGINFLAG",true)
                  localStorage.setItem('userInfo',JSON.stringify(res.data.data))
                  this.dialog.dialogVisible = false
                  this.loginForm.loading = false
                  this.loginFlag = true
                  this.resetForm(formName)
                  this.$message.success(res.data.msg)
                }else{
                  this.loginForm.loading = false
                  this.$message.error(res.data.msg)
                }
              })
            }else{
              this.loginForm.loading = false
              this.$message.error(res.data.msg)
            }
          })
        } else {
          this.loginForm.loading = false
          return false;
        }
      });
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    },
    dialogRegister(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let query = {
            ...this.registerForm
          }
          register(query).then(res=>{
            if (res.data.code === 200){
              this.$message.success(res.data.msg)
              this.registerReset(formName)
              this.dialog1.dialogVisible = false
            }else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          return false;
        }
      });
    },
    registerReset(formName){
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    console.log(JSON.parse(localStorage.getItem("userInfo")))
    console.log(this.userInfo)
    console.log(this.loginFlag)
  }
}
</script>

<style scoped>
.tab{
  text-align: center;
  font-size: large;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar-uploader :hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
img{
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>
