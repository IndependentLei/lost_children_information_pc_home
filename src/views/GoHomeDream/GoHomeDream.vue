<template>
  <div class="goHomeDream">
    <el-steps :active="active" finish-status="success">
      <el-step title="请选择方式"></el-step>
      <el-step title="填写信息"></el-step>
      <el-step title="上传附件"></el-step>
    </el-steps>

    <div>
      <el-button v-if="active === 0" style="margin-top: 12px;" @click="next1">我要寻人</el-button>
      <el-button v-if="active === 0" style="margin-top: 12px;" @click="next1">帮他回家</el-button>
    </div>

    <div class="childrenInfo" v-if="active === 1">
      <el-form :model="childrenForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="childrenName" class="inputitem">
          <el-input v-model="childrenForm.childrenName" clearable class="ininput"></el-input>
        </el-form-item>

        <el-form-item label="身份证" prop="idCard" class="inputitem">
          <el-input v-model="childrenForm.idCard" clearable class="ininput"></el-input>
        </el-form-item>

        <el-form-item label="年龄" prop="age" class="inputitem">
          <el-input v-model="childrenForm.age" clearable class="ininput"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex" class="inputitem">
          <div class="ininput">
            <el-radio v-model="childrenForm.sex"  label="0" name="sex" >女</el-radio>
            <el-radio v-model="childrenForm.sex"  label="1" name="sex"  >男</el-radio>
<!--            <el-radio v-model="childrenForm.sex"  label="2" name="sex" >未知</el-radio>-->
          </div>
        </el-form-item>

        <el-form-item label="儿童特征" prop="childrenFeature" class="inputitem">
          <el-input v-model="childrenForm.childrenFeature" clearable class="ininput"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" prop="contactPhone" class="inputitem">
          <el-input v-model="childrenForm.contactPhone" clearable class="ininput"></el-input>
        </el-form-item>

        <el-form-item label="丢失地点" prop="lostLocation" class="inputitem">
          <el-input v-model="childrenForm.lostLocation" clearable class="ininput"></el-input>
        </el-form-item>
        <el-form-item label="丢失时间" prop="lostTime">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="childrenForm.lostTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="00:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button v-if="active === 1" style="margin-top: 12px;" @click="next2()">上一步</el-button>
          <el-button v-if="active === 1" style="margin-top: 12px;" @click="next2('ruleForm')">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="childrenPic" v-if="active === 2">
      <el-upload
        multiple
        :limit="5"
        :on-exceed="handleExceed"
        class="avatar-uploader"
        action="http://localhost:9191/common/uploadPic"
        :show-file-list="true"
        :on-success="handleSuccess"
        :before-upload="beforeUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <br>
      <el-button :loading="buttonLoading" plain style="margin-top: 20px;text-align: center" @click="addChildInfo">提交儿童信息</el-button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {addChildrenInfo} from '../../api/Childrens/Childrens'
export default {
  name: "GoHomeDream",
  data(){
    return{
      imageUrl:'',
      childrenInfoAttachList:[],
      active:0,
      childrenForm:{
        childrenName:'',
        idCard:'',
        age:'',
        sex:'0',
        childrenFeature:'',
        contactPhone:'',
        lostLocation:'',
        lostTime:''
      },
      buttonLoading:false,
      rules:{
        childrenName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min:18,max:18,message: '请输入正确的身份证号',trigger: 'blur'}
        ],
        age: [
          { required:true, message: '请输入年龄' ,trigger: 'blur' }
        ],
        sex: [
          { required:true,message: '请选择性别' ,trigger: 'blur' }
        ],
        childrenFeature: [
          { required:true, message: '请描述特征' ,trigger: 'blur' }
        ],
        contactPhone: [
          { required:true,message:'请输入联系电话' ,trigger: 'blur' }
        ],
        lostLocation: [
          { required:true,message:'请输入丢失地点' ,trigger: 'blur' }
        ],
        lostTime: [
          {required:true,message:'请选择丢失时间',trigger:'blur'}
        ]
      }
    }
  },
  computed:{
    ...mapState("User",['userInfo'])
  },
  methods:{
    handleExceed(){
      this.$message.warning("上传附件不能超过五个")
    },
    addChildInfo(){
      if(this.childrenInfoAttachList.length===0){
        this.$message.warning("附件不能为空")
        return 0
      }
      this.buttonLoading = true
      let query ={
        ...this.childrenForm,
        childrenInfoAttach:this.childrenInfoAttachList
      }
      addChildrenInfo(query).then(res=>{
        if(res.data.code === 200){
          this.$message.success(res.data.msg)
        }else{
          this.$message.error(res.data.msg)
        }
      }).finally(()=>{
        this.buttonLoading=false
      })
    },
    handleSuccess(res, file){
      if(res.code === 200){
        this.$message.success(res.msg)
        this.imageUrl = res.data
        // 收集数据
        this.childrenInfoAttachList.push(res.data)
      }else {
        this.$message.error("上传失败，请联系管理员")
      }
    },
    beforeUpload(file){
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    next1(){
      // TODO .... 校验是否登录
      console.log(this.userInfo)
      if (this.userInfo === null){
        this.$message.warning("请先登录")
        return;
      }
      this.active++
    },
    next2(formName){
      console.log(this.childrenForm)
      if(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.active++
          } else {
            return false;
          }
        });
      }else{
        this.active--
        this.$refs['ruleForm'].resetFields();
      }
    }
  }
}
</script>

<style scoped>
.goHomeDream{
  background-color: #ffffff;
  padding: 40px;
  margin: 40px;
  display: inline-block;
  width: 80%;
  height: auto;
}
.goHomeDream .childrenInfo{
  margin: 20px;
  width: 40%;
  display: inline-block;
}
.goHomeDream .childrenPic{
  margin: 20px;
  width: 40%;
  display: inline-block;
}

.avatar-uploader {
  display: inline-block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 220px;
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
.inputitem{
  width: 67%;
}
.ininput{
  margin-left: 75px;
}
</style>
