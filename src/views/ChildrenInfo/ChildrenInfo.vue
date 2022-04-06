<template>
  <div>
    <div class="childrenInfo">
      <div class="info">
        <div class="img">
          <img class="imgOne" :src="showPic">
          <div class="picList" >
            <img :src="pic.pic"
                 v-for="pic in picList "
                 :key="pic.id"
                 width="50px"
                 height="70px"
                 style="margin-left: 10px; cursor: pointer"
                 @click="changePic(pic.pic)">
          </div>
        </div>
        <div class="childInfo">
          <p>{{childrenInfo.cardId}}</p>
          <table>
            <tbody>
            <tr>
              <td>姓名:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.userName}}</td>
            </tr>
            <tr>
              <td>性别:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.sex === '0' ? '女' : childrenInfo.sex === '1' ? '男' : '未知'}}</td>
            </tr>
            <tr>
              <td>年龄:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.age}}</td>
            </tr>

            <tr>
              <td>儿童特征:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.childrenFeature}}</td>
            </tr>
            <tr>
              <td>联系电话:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.contactPhone}}</td>
            </tr>
            <tr>
            <tr>
              <td>丢失时间:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.lostTime | dateFormat}}</td>
            </tr>
            <tr>
              <td>丢失地点:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.lostLocation}}</td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
    <div class="comment">
      <comment >
      </comment>
    </div>
  </div>

</template>

<script>
import comment from 'bright-comment'
export default {
  name: "ChildrenInfo",
  data(){
    return{
      childrenInfo:{},
      picList:[
        {id:'1',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg'},
        {id:'2',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg'},
        {id:'3',pic:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg'},
        {id:'4',pic:'https://file.7b114.xyz/blog_avater/2022/04/04/1649052266734189.jpg'},
        {id:'5',pic:'https://file.7b114.xyz/blog_avater/2022/04/04/1649052266734189.jpg'}
      ],
      commentList:[
        {id:'1',avatar:'https://file.7b114.xyz/blog_avater/2021/11/17/jdl.jpg',userCode:'jdl'}
      ],
      showPic:this.$route.params.childrenInfo.pic
    }
  },
  methods:{
    changePic(pic){
      this.showPic = pic
    },
    doSend(){

    },
    doChidSend(){

    }
  },
  components:{
    comment
  },
  mounted() {
    this.childrenInfo = this.$route.params.childrenInfo
  }
}
</script>

<style scoped>
.childrenInfo{
  display: inline-block;
  margin-top: 20px;
  width: 65%;
  background-color: #ffffff;

}
.childrenInfo .info{
  margin-top: 10px;
  width: 100%;
  height: 400px;
}
.childrenInfo .info .img{
  float: left;
  width: 50%;
}
.childrenInfo .info .img .imgOne{
  width: 14vw;
  position: relative;
  padding: 5px;
  height: 37vh;
  border: solid 1px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}
.childrenInfo .info .childInfo{
  display: inline-block;
  font-size: 0.8vw;
  line-height: 4.1vh;
  color: #000000;
  width: 30vw;
  float: right;
}
.childrenInfo .info .childInfo p{
  text-align: center;
  width: 12vw;
  height: 4vh;
  background-color: #003580;
  color: #ffffff;
  font-size: 1vw;
  line-height: 4vh;
}
.childrenInfo .info .childInfo table{
  display: table;
  border-collapse: separate;
  box-sizing: border-box;
  text-indent: initial;
  white-space: normal;
  line-height: normal;
  font-weight: normal;
  font-size: medium;
  font-style: normal;
  color: -internal-quirk-inherit;
  text-align: start;
  border-spacing: 2px;
  border-color: grey;
  font-variant: normal;
}
.childrenInfo .info .img .picList{
  margin-top: 20px;
  margin-left: 100px;
  float: left;
  display: flex;
}
.comment{
  display: inline-block;
  margin-top: 20px;
  width: 65%;
}
</style>
