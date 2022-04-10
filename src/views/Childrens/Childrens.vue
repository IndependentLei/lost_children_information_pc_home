<template>
  <div class="childrens">
    <p>丢失儿童</p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display:flex;">
      <el-form-item style="margin-left: 10px">
        <el-input v-model="formInline.childrenName" clearable placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="formInline.age" clearable placeholder="年龄"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="formInline.lostLocation" clearable placeholder="丢失地点"></el-input>
      </el-form-item>
      <el-form-item >
        <el-select v-model="formInline.sex" placeholder="性别" clearable>
          <el-option label="女" value="0"></el-option>
          <el-option label="男" value="1"></el-option>
          <el-option label="未知" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="timeSelect"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="childrensInfo">
      <el-card v-for="item in childrenList"
               :key="item.id"
               shadow="always"

               @click.native="infoChildrenInfo(item)"
               style="flex: none ;margin-left: 37px;margin-top: 20px;cursor: pointer">
        <img :src="item.pic" alt="出错了" style="width: 120px;height: 120px;padding: 0">
        <br>
        <div style="text-align: left;margin-left: 20px">
          <span>姓名:&nbsp;&nbsp;&nbsp;{{item.childrenName}}</span>
          <br>
          <span>年龄:&nbsp;&nbsp;&nbsp;{{item.age}}</span>
        </div>
      </el-card>
    </div>
    <el-pagination
      style="margin: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[15, 30, 45, 60]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
import {selectChildByPage} from '../../api/Childrens/Childrens'
export default {
  name: "Childrens",
  data(){
    return{
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      formInline:{
        childrenName:'',
        lostLocation:'',
        age:'',
        sex:'',
      },
      timeSelect:[],
      childrenList:[],
      page:{
        current:'',
        size:'',
        total:''
      },
      loading:false
    }
  },
  methods:{
    infoChildrenInfo(childrenInfo){
      this.$router.push({name:'childrenInfo',params:{childrenInfo:childrenInfo}})
    },
    handleCurrentChange(val){
      this.pageUtil(val,this.page.size)
    },
    handleSizeChange(val){
      this.pageUtil(1,val)
    },
    onSubmit(){
      this.pageUtil(1,this.page.size)
    },
    pageUtil(current,size){
      this.loading = this.$loading({text:'加载数据...'})
      let query = {
        startPage : current,
        pageSize : size,
        ...this.formInline,
        startTime:this.timeSelect === null ? '' : this.timeSelect[0],
        endTime:this.timeSelect === null ? '' : this.timeSelect[1]
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
      },1200)
    }
  },
  mounted() {
    this.pageUtil(1,15)
  }
}
</script>

<style scoped>

.childrens{
  margin-top: 50px;
  margin-left: 230px;
  background-color: white;
  width: 75%;
  height: auto;
  text-align: center;
}
.childrens p{
  text-align: center;
  font-family: MicrosoftYaHei;
  font-size: 30px;
  color: rgba(0, 53, 128, 0.9);
}
.childrens .childrensInfo{
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 90%;
  padding: 0;
}


</style>
