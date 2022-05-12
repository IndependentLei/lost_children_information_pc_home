<template>
  <div style="background-color: #fcfcfc;width: auto">
    <el-carousel :interval="4000" type="card" height="400px" >
      <el-carousel-item v-for="item in picList" :key="item.id">
        <el-image
          :src="item.pic"
          fit="fill"
          style="width: 750px;height: 400px"/>
      </el-carousel-item>
    </el-carousel>
    <div style="width: 80%;display:inline-block;">
      <el-row :gutter="20">
        <el-col :span="12">
          <div style="border-top: 2px solid #003580">
            <p style="margin:0">最新资讯</p>
            <ul class="homeUl" style="padding-left: 0">
              <li style="margin:0" v-for="article in articleList"
                  :key="article.id" @click="intoArticle(article)">
                <div>
                  <img class="homePic" :src="article.picUrl" alt="">
                  <h3 class="homeTitle">{{article.title}}</h3>
                  <h5 class="homeTime">{{article.createTime | dateFormat}}</h5>
                  <div class="homeContent">
                    {{article.content}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
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
                <div style="text-align: left;line-height: 33px;margin-left: 40px">
                  <span>儿童姓名:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.childrenName}}</span>
                  <br>
                  <span>儿童年龄:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.age}}</span>
                  <br>
                  <span>走失时间:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{childrenInfo.lostTime | dateFormat}}</span>
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

  </div>
</template>

<script>
import {homeInfo} from '../../api/Home/Home'
export default {
  name: "Home",
  data(){
    return{
      loading:false,
      picList:[],
      childrenList:[],
      articleList:[]
    }
  },
  methods:{
    infoChildrenInfo(childrenInfo){
      this.$router.push({name:'childrenInfo',params:{childrenInfo:childrenInfo}})
    },
    intoArticle(articleInfo){
      this.$router.push({name:'article',params:{articleInfo:articleInfo}})
    }
  },
  mounted() {
    this.loading = this.$loading({ text: '加载数据' })
    homeInfo().then(res=>{
      console.log(res.data)
      if (res.data.code === 200){
        this.picList = res.data.data.slideshows
        for (let i = 0; i < res.data.data.firstPic.length; i++) {
          res.data.data.childrenInfos[i].pic = res.data.data.firstPic[i]
        }
        this.childrenList = res.data.data.childrenInfos
        this.articleList = res.data.data.articles
      }else{
        this.$message("获取数据失败,请联系管理员")
      }

    })
    setTimeout(()=>{
      this.loading.close()
    },1000)
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

.homeUl{
  display: block;
  /*list-style-type: disc;*/
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  list-style: none;
}

.homeUl li{
  cursor: pointer;
  height: 18vh;
  margin: 15px 1.5vw;
  /*padding-bottom: 15px;*/
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
  border-bottom: rgba(0, 0, 0, 0.1) 1px solid;
}

.homePic{
  width: 14vw;
  height: 16vh;
  float: left;
  margin-right: 1vw;
}

.homeTitle{
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.homeTime{
  text-align: left;
  /*font-size: 1.3rem;*/
  color: rgba(0, 0, 0, 0.67);
  /*display: inline-block;*/
  margin-bottom: 1.5vh;
}
.homeContent{
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

</style>
