<template>
  <div style="background-color: #fcfcfc;width: auto">
    <el-carousel :interval="4000" type="card" height="400px" >
      <el-carousel-item v-for="item in picList" :key="item.id">
        <el-image
          :src="item.pic"
          fit="fill"
          :preview-src-list="srcList"
          style="width: 880px;height: 400px"/>
      </el-carousel-item>
    </el-carousel>
    <el-row :gutter="20">
      <el-col :span="16">

      </el-col>
      <el-col :span="8">
        <div style="border-top: 2px solid #003580;margin-left: 40px">
          <p style="margin: 0">丢失儿童</p>
          <el-card shadow="hover" style="margin-top: 10px">
            <span style="color: #003580;
            font-size: 1.3vw;
            text-align: center;
            line-height: 5vh">
              疑似丢失儿童登记处
            </span>
            <br>
            <span style="font-family: MicrosoftYaHei;
              font-size: 0.8vw;
              color: #003580;
              display: inline-block;
              margin: 1.5vh 0 5vh 0;">
              多一份守护 少一次意外
            </span>
            <br>
            <el-button size="mini" round @click="$router.push({name:'goHomeDream'})">点击进入</el-button>
          </el-card>
          <el-card style="margin-top: 20px;cursor: pointer"
                   shadow="hover"
                   v-for="childrenInfo in childrenList"
                   :key="childrenInfo.id"
                   @click.native="infoChildrenInfo(childrenInfo)" >
            <div style="display: flex">
              <img :src="childrenInfo.pic" style="width: 40%;height: 50%"/>
              <div style="text-align: left;line-height: 33px;margin-left: 20px">
                <span>儿童姓名:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.userName}}</span>
                <br>
                <span>儿童年龄:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.age}}</span>
                <br>
                <span>走失时间:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{childrenInfo.lostTime}}</span>
                <br>
                <span :title="childrenInfo.lostLocation">
                  走失地点:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.lostLocation.length > 6 ? childrenInfo.lostLocation.substr(0, 6).concat('...') : childrenInfo.lostLocation}}
                </span>
                <br>
                <span>联系电话:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.contactPhone}}</span>
              </div>
            </div>
          </el-card>
          <br>
          <router-link  style="cursor:pointer" :to="{
            name:'childrens'
          }">查看更多></router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      picList:[
        {id:'1',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg'},
        {id:'2',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg'},
        {id:'3',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg'},
        {id:'4',pic:'https://file.7b114.xyz/blog_avater/2022/04/04/1649052266734189.jpg'},
        {id:'5',pic:'https://file.7b114.xyz/blog_avater/2022/04/04/1649052266734189.jpg'}
      ],
      srcList:[],
      childrenList:[
        {id:'1',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userName:'小李',lostTime:'2021-8-9',age:1,lostLocation:'淮安市淮阴区',contactPhone:'1995239367',sex:'0',cardId:'320804199810261910'},
        {id:'2',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userName:'小李',lostTime:'2021-10-9',age:2,lostLocation:'淮安市淮阴区111111111111111111111111111111',contactPhone:'1995239367',sex:'1'},
        {id:'3',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userName:'小李',lostTime:'2021-8-23',age:34,lostLocation:'淮安市淮阴区',contactPhone:'1995239367',sex:'2'},
        {id:'4',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userName:'小李',lostTime:'2021-12-12',age:22,lostLocation:'淮安市淮阴区',contactPhone:'1995239367',sex:'0'}
      ]
    }
  },
  methods:{
    infoChildrenInfo(childrenInfo){
      this.$router.push({name:'childrenInfo',params:{childrenInfo:childrenInfo}})
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}



p{
  cursor: default;
  width: 12vw;
  height: 5vh;
  background-color: #003580;
  font-family: MicrosoftYaHei;
  font-size: 1.3vw;
  text-align: center;
  line-height: 5vh;
  color: #ffffff;
  margin-left: 1.6vw
}

</style>
