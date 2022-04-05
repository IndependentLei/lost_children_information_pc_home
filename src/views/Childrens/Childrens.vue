<template>
  <div class="childrens">
    <p>丢失儿童</p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display:flex;">
      <el-form-item style="margin-left: 10px">
        <el-input v-model="formInline.childrenName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="formInline.age" placeholder="年龄"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="formInline.lostLocation" placeholder="丢失地点"></el-input>
      </el-form-item>
      <el-form-item >
        <el-select v-model="formInline.sex" placeholder="性别">
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
      <el-card v-for="item in childrenList" :key="item.id" shadow="hover" style="flex: none ;margin-left: 37px;margin-top: 20px">
        <img :src="item.pic" alt="出错了" style="width: 120px;height: 120px;padding: 0">
        <br>
        <div style="text-align: left;margin-left: 20px">
          <span>姓名:&nbsp;&nbsp;&nbsp;{{item.userName}}</span>
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
      childrenList:[
        {id:'1',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userName:'小李',lostTime:'2021-8-9',age:1,lostLocation:'淮安市淮阴区',contactPhone:'1995239367'},
        {id:'2',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userName:'小李',lostTime:'2021-10-9',age:2,lostLocation:'淮安市淮阴区111111111111111111111111111111',contactPhone:'1995239367'},
        {id:'3',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userName:'小李',lostTime:'2021-8-23',age:34,lostLocation:'淮安市淮阴区',contactPhone:'1995239367'},
        {id:'4',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userName:'小李',lostTime:'2021-12-12',age:22,lostLocation:'淮安市淮阴区',contactPhone:'1995239367'},
        {id:'5',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userName:'小李',lostTime:'2021-12-12',age:22,lostLocation:'淮安市淮阴区',contactPhone:'1995239367'},
        {id:'6',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userName:'小李',lostTime:'2021-12-12',age:22,lostLocation:'淮安市淮阴区',contactPhone:'1995239367'},
        {id:'7',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userName:'小李',lostTime:'2021-12-12',age:22,lostLocation:'淮安市淮阴区',contactPhone:'1995239367'},
        {id:'8',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userName:'小李',lostTime:'2021-12-12',age:22,lostLocation:'淮安市淮阴区',contactPhone:'1995239367'},
        {id:'9',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userName:'小李',lostTime:'2021-12-12',age:22,lostLocation:'淮安市淮阴区',contactPhone:'1995239367'}
      ],
      page:{
        current:'',
        size:'',
        total:''
      }
    }
  },
  methods:{
    handleCurrentChange(){

    },
    handleSizeChange(val){

    },
    onSubmit(){

    }
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
