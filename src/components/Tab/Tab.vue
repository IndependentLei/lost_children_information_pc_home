<template>
  <el-menu
    style=""
    default-active="home"
    mode="horizontal"
    @select="handleSelect"
    background-color="#fff"
    text-color="#333"
    active-text-color="#0084ff"
  >
    <el-menu-item index="home" style="margin-left: 300px" @click="$router.push({name:'home'})">
      <span class="tab">首页</span>
    </el-menu-item>
    <el-menu-item index="goHomeDream" style="margin-left: 20px" @click="$router.push({name:'goHomeDream'})">
      <span class="tab">回家之梦</span>
    </el-menu-item>
    <el-menu-item index="volunteer" style="margin-left: 20px" @click="$router.push({name:'volunteer'})">
      <span class="tab">我是志愿者</span>
    </el-menu-item>
    <el-menu-item index="me" style="margin-left: 20px" @click="$router.push({name:'me'})">
      <span class="tab">关于我们</span>
    </el-menu-item>
    <el-button style="margin-top: 15px;" size="small" round>登录</el-button>
  </el-menu>
</template>

<script>
export default {
  name: "Tab",
  data(){
    return{
      tabList:[
        {label:'首页',name:'home'},
        {label:'回家之梦',name:'second'},
        {label:'我是志愿者',name:'third'},
        {label:'关于我们',name:'fourth'},
      ],
      activeName:'home'
    }
  },
  methods:{
    handleSelect(){

    }
  }
}
</script>

<style scoped>
.tab{
  text-align: center;
  font-size: large;
}
</style>
