<template>
  <div class="volunteer">
    <el-button plain @click="become" style="margin: 50px">成为志愿者</el-button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getRoleTypeByUserId,exitRoleByUserId} from "../../api/User/User";

export default {
  name: "Volunteer",
  data(){
    return{
      roleType:'-1'
    }
  },
  computed:{
    ...mapState('User',['userInfo'])
  },
  methods:{
    become(){
      if (this.userInfo === null){
        this.$message.warning("请登录")
        return 0
      }
      if (this.roleType === '3'){
        this.$message.warning("您已经是志愿者了")
        return 0
      }
      if(!confirm("确定要成为一名志愿者？")){
        return 0
      }
      let query = {
        userId:this.userInfo.userId,
        roleType:'3'
      }
      exitRoleByUserId(query).then(res=>{
        if (res.data.code === 200){
          this.$message.success("恭喜您，成为志愿者")
          getRoleTypeByUserId(this.userInfo.userId).then(res=>{
            if (res.data.code === 200){
              if(res.data.data.roleType === "3"){
                this.roleType = res.data.data.roleType
              }
            }else {
              this.$message.error(res.data.msg)
            }
          })
        }else{
          this.$message.error("失败,请联系管理员")
        }
      })
    }
  },
  mounted() {
    if (this.userInfo === null){
      this.$message.warning("您还没有登录,请登录之后在操作")
      return 0
    }
    getRoleTypeByUserId(this.userInfo.userId).then(res=>{
      if (res.data.code === 200){
        if(res.data.data.roleType === "3"){
          this.roleType = res.data.data.roleType
          this.$message.success("您已经是志愿者了")
        }
      }else {
        this.$message.error(res.data.msg)
      }
    })

  }
}
</script>

<style scoped>
.volunteer{
  margin: 100px;
  display: inline-block;
  width: 70%;
  height: auto;
  background-color: white;
}
</style>
