<template>
  <div class="article">
    <h2 class="title">{{articleInfo.title}}</h2>
    <img :src="articleInfo.picUrl" :alt="articleInfo.title" width="200" height="100">
    <div class="articleContent" >
      <div class="contentStyle">{{articleInfo.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data(){
    return{
      articleInfo:{}
    }
  },
  mounted() {
    this.articleInfo = this.$route.params.articleInfo
    console.log(this.articleInfo)
  }
}
</script>

<style scoped>
.article{
  margin: 30px;
  width: 80%;
  display: inline-block;
  height: auto;
  background-color: white;
}
.articleContent{
  text-align: left;
  margin: 10px;
}
.contentStyle{
  margin-left: 20px;
  text-indent: 1cm;
  font-family: "Lucida Calligraphy", cursive, serif, sans-serif;
  table-layout: fixed;
  word-wrap: break-all;
  word-wrap: break-word;
  overflow: hidden;

}
</style>
