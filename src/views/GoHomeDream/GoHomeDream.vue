<template>
  <div class="goHomeDream">
    <el-steps :active="active" finish-status="success">
      <el-step title="请选择方式"></el-step>
      <el-step title="填写信息"></el-step>
      <el-step title="提交"></el-step>
    </el-steps>

    <div>
      <el-button v-if="active === 0" style="margin-top: 12px;" @click="next1">我要寻人</el-button>
      <el-button v-if="active === 0" style="margin-top: 12px;" @click="next1">帮他回家</el-button>
    </div>

    <div class="childrenInfo" v-if="active === 1">
      <el-form :model="childrenForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="childrenName">
          <el-input v-model="childrenForm.childrenName"></el-input>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input v-model="childrenForm.age"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
            <el-radio v-model="childrenForm.sex"  label="0" name="sex" >女</el-radio>
            <el-radio v-model="childrenForm.sex"  label="1" name="sex"  >男</el-radio>
            <el-radio v-model="childrenForm.sex"  label="2" name="sex" >未知</el-radio>
        </el-form-item>

        <el-form-item label="儿童特征" prop="childrenFeature">
          <el-input v-model="childrenForm.childrenFeature"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="childrenForm.contactPhone"></el-input>
        </el-form-item>

        <el-form-item label="丢失地点" prop="lostLocation">
          <el-input v-model="childrenForm.lostLocation"></el-input>
        </el-form-item>
        <el-form-item label="丢失时间" prop="data">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="childrenForm.data" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="childrenForm.time" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button v-if="active === 1" style="margin-top: 12px;" @click="next2()">上一步</el-button>
          <el-button v-if="active === 1" style="margin-top: 12px;" @click="next2('ruleForm')">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="childrenPic" v-if="active === 2">
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="pic.dialogVisible">
        <img width="100%" :src="pic.dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoHomeDream",
  data(){
    return{
      active:0,
      childrenForm:{
        childrenName:'',
        age:'',
        sex:'0',
        childrenFeature:'',
        contactPhone:'',
        lostLocation:'',
        data:'',
        time:''
      },
      rules:{
        childrenName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
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
        data: [
          { required:true,message:'请选择丢失时间' ,trigger: 'blur' }
        ],
        time:[
          { required:true,message:'请选择丢失时间' ,trigger: 'blur' }
        ],
      },
      pic:{
        dialogImageUrl:'',
        dialogVisible:false
      }
    }
  },
  methods:{
    next1(){
      // TODO .... 校验是否登录
      this.active++
    },
    next2(formName){
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
    },
    handlePictureCardPreview(file){
      console.log(file)
      this.dialogVisible = true;
    },
    handleDownload(file){

    },
    handleRemove(file){

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
</style>
