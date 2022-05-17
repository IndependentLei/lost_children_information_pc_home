<template>
  <div>
    <el-card shadow="always" class="personalCenter">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="头像" prop="avatarImg">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9191/common/uploadPic"
            :headers="{Authentication:Authentication}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.avatarImg" :src="ruleForm.avatarImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="账号" prop="userCode">
          <el-input  v-model="ruleForm.userCode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="ruleForm.sex" label="0">女</el-radio>
          <el-radio v-model="ruleForm.sex"  label="1">男</el-radio>
          <el-radio v-model="ruleForm.sex"  label="2">未知</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="release">
      <h3>已发布丢失儿童信息</h3>
      <div class="childrensInfo">
          <el-card v-for="item in childrenList"
                   :key="item.id"
                   shadow="always"

                   style="flex: none ;margin-left: 37px;width:280px;height:200px;margin-top: 20px;">
            <el-badge v-if="item.commentNum != 0" :value="item.commentNum" class="item" @click.native="infoChildrenInfo(item) ">
              <img :src="item.pic" alt="出错了" style="width: 60px;height: 60px;padding: 0 ;cursor: pointer">
            </el-badge>
            <img v-else :src="item.pic" alt="出错了" style="width: 60px;height: 60px;padding: 0 ;cursor: pointer" @click="infoChildrenInfo(item)" >
            <br>
            <div style="text-align: center;margin-left: 20px">
              <span>姓名:&nbsp;&nbsp;&nbsp;{{item.childrenName}}</span>
              <br>
              <span>年龄:&nbsp;&nbsp;&nbsp;{{item.age}}</span>
            </div>
            <div style="margin-top: 10px">
              <el-button plain @click="deleteChild(item)" type="danger">删除</el-button>
              <el-button @click="findChild(item)" plain type="success" v-show="item.find == 0">确认找到</el-button>
            </div>
          </el-card>
      </div>
      <el-pagination
        style="margin-top: 30px;margin-bottom: 30px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[6, 12, 18, 24]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </el-card>
  </div>

</template>

<script>
import {getCookie} from "../../utils/cookie";
import {exitUserInfo} from '../../api/User/user'
import {Message} from "element-ui";
import {delChildInfo, selectChildByPage, updateChildInfo} from "../../api/Childrens/Childrens";
export default {
  name: "PersonCenter",
  data(){
    var validateAttach = (rule, value, callback) => {
      if (value === undefined){
        callback(new Error("上传图片不能为空"))
      }
      callback()
    }
    var validateAge = (rule, value, callback) => {
      console.log(this.ruleForm)
      if (this.ruleForm.age === undefined){
        callback(new Error("年龄不能为空"))
      }
      if (this.ruleForm.age <= 0 && this.ruleForm.age > 150){
        callback(new Error("年纪必须在0-150之间"))
      }
      callback()
    }
    return{
      page:{
        current:1,
        size:6,
        total:null
      },
      ruleForm:{},
      childrenList:[],
      rules:{
        avatarImg:[
          { required:true, validator: validateAttach, trigger: 'blur' },
        ],
        userCode:[
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 20 , message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        age:[
          {required:true, validator: validateAge, trigger: 'blur' },
        ],
        sex:[
          {required:true, message: "性别不能为空", trigger: 'blur' },
        ]
      },

    }
  },
  methods:{
    deleteChild(child){
      if(!confirm("确认删除该儿童")){
        return
      }
      delChildInfo(child.childrenId).then(res=>{
        if (res.data.code === 200){
          this.$message.success(res.data.msg)
          this.pageUtil(this.page.current,this.page.size,this.ruleForm.userId)
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    findChild(child){
      if(!confirm("确定该儿童已经找到")){
        return
      }
      let query = {
        childrenId: child.childrenId,
        find : 1
      }
      updateChildInfo(query).then(res=>{
        if (res.data.code === 200){
          this.pageUtil(this.page.current,this.page.size,this.ruleForm.userId)
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    infoChildrenInfo(childrenInfo){
      this.$router.push({name:'childrenInfo',params:{childrenInfo:childrenInfo}})
    },
    handleSizeChange(val){
      this.pageUtil(1,val,this.ruleForm.userId)
    },
    handleCurrentChange(val){
      this.pageUtil(val,this.page.size,this.ruleForm.userId)
    },
    handleAvatarSuccess(res){
      this.ruleForm.avatarImg = res.data
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
          exitUserInfo(this.ruleForm).then(res=>{
            if(res.data.code === 200){
              Message.success("修改成功")
              localStorage.setItem("userInfo",JSON.stringify(this.ruleForm))
            }else{
              Message.error("修改失败")
            }
          })
        } else {
          return false;
        }
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    },
    Authentication(){
      return getCookie("Authentication")
    },
    pageUtil(current,size,userId){
      this.loading = this.$loading({text:'加载数据...'})
      let query = {
        startPage : current,
        pageSize : size,
        userId:userId
      }
      selectChildByPage(query).then(res=>{
        if (res.data.code === 200){
          this.page.current = res.data.data.current
          this.page.size = res.data.data.size
          this.page.total = res.data.data.total
          this.childrenList = res.data.data.list
        }
      })

      setTimeout(()=>{
        this.loading.close()
      },500)
    }
  },
  mounted() {
    this.ruleForm = JSON.parse(localStorage.getItem("userInfo"))
    this.pageUtil(1,6,this.ruleForm.userId)
  }
}
</script>

<style lang="css" scoped>
.personalCenter{
  float: left;
  margin: 40px;
  width: 30%;
  height: 100%;
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
.release{
  float: right;
  margin: 20px;
  height: 100%;
  width: 50%;
}
.release .childrensInfo{
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 0;
}
</style>
