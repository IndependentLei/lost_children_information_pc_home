<template>
    <el-dialog
      :title="dialog.title"
      :show-close="false"
      :visible.sync="dialog.dialogVisible"
      width="30%">
      <el-form label-width="80px" :model="loginForm" :rules="rule" ref="form">
        <el-form-item label="账号" prop="userCode">
          <el-input v-model="loginForm.userCode"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd">
          <el-input v-model="loginForm.userPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      dialog:{
        title:'登录',
        dialogVisible:false
      },
      loginForm:{
        userCode:'',
        userPwd:''
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
  methods:{
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.dialog.dialogVisible = true
  }
}
</script>

<style scoped>

</style>
