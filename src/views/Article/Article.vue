<template>
  <div>

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

</style>
