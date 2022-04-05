<template>
  <el-container>
    <el-header style="padding: 0">
      <Header></Header>
    </el-header>
    <Tab></Tab>
    <el-main style="background-color: #fcfcfc;padding-top: 0">
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../components/Header/Header";
import Tab from "../components/Tab/Tab"
export default {
  name: "mainPage",
  components:{
    Header,
    Tab
  },
  mounted() {
    this.$router.push({name:'home'})
  }
}
</script>

<style scoped>

</style>
