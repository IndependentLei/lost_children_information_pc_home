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
          <p>{{childrenInfo.idCard}}</p>
          <table>
            <tbody>
            <tr>
              <td>姓名:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{childrenInfo.childrenName}}</td>
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
      <comment
        commentWidth="100%"
        placeholder="想说点什么呢"
        :commentNum="commentNum"
        :commentList="commentList"
        label="评论者"
        @doSend="doSend"
        @doChidSend="doChidSend">
      </comment>
    </div>
  </div>

</template>

<script>
import {getChildAttachById,getCommentById,sendFatherComment,sendSonComment} from '../../api/Childrens/Childrens'
import {mapState} from 'vuex'
import comment from 'bright-comment'
import {getUserByUserCode} from '../../api/User/User'
export default {
  name: "ChildrenInfo",
  data(){
    return{
      childrenInfo:{},
      loading:false,
      picList:[],
      showPic:this.$route.params.childrenInfo.pic,
      commentList:[],
      commentNum:0
    }
  },
  computed:{
    ...mapState('User',['userInfo'])
  },
  methods:{
    changePic(pic){
      this.showPic = pic
    },
    doSend(content){
      if (this.userInfo === null){
        this.$message.warning("请先登录")
        return;
      }
      if(this.userInfo.state === '1'){
        this.$message.warning("您已被禁言")
        return;
      }
      if (content === undefined || content === "") {
        this.$message.warning("评论内容不能为空");
        return;
      }
      let query = {
        childrenInfoId:this.childrenInfo.childrenId,
        commentContent:content
      }
      sendFatherComment(query).then(res=>{
        if (res.data.code === 200){
          this.$message.success(res.data.msg)
          this.getComment(this.childrenInfo.childrenId)
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    doChidSend(content,userId,fatherCommentId){
      if (this.userInfo === null){
        this.$message.warning("请先登录")
        return;
      }

      if(this.userInfo.state === '1'){
        this.$message.warning("您已被禁言")
        return;
      }

      if (content === undefined || content === "") {
        this.$message.warning("评论内容不能为空");
        return;
      }
      console.log(content,userId,fatherCommentId)
      let query = {
        fatherCommentId : fatherCommentId,
        replayId:userId,
        replayContext:content
      }
      sendSonComment(query).then(res=>{
        if (res.data.code === 200){
          this.$message.success(res.data.msg)
          this.getComment(this.childrenInfo.childrenId)
        }else{
          this.$message.error(res.data.msg)
        }
      })

    },
    getComment(id){
      getCommentById(id).then(res=>{
        if(res.data.code === 200){
          if (res.data.data === undefined){
            this.commentNum = 0
            this.commentList = []
          }else {
            this.commentNum = res.data.data.length
            this.commentList = res.data.data
          }
        }
      })
    }
  },
  components:{
    comment
  },
  mounted() {
    this.loading = this.$loading({text:'加载信息'})
    this.childrenInfo = this.$route.params.childrenInfo
    getChildAttachById(this.childrenInfo.childrenId).then(res=>{
      if (res.data.code === 200){
        this.picList = res.data.data
      }
    })
    this.getComment(this.childrenInfo.childrenId)
    setTimeout(()=>{
      this.loading.close()
    },1000)

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
  width: 40%;
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
