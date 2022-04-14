<template>
  <div class="me">
    <el-timeline style="margin-top: 50px">
      <el-timeline-item timestamp="2021/8/12" placement="top" >
        <el-card>
          <h4>突发奇想,为丢失儿童做一个平台</h4>
          <p>2021/8/12</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2021/10/3" placement="top">
        <el-card>
          <h4>初步确定需求</h4>
          <p>2021/10/3</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2021/11/3" placement="top">
        <el-card>
          <h4>需求基本敲定</h4>
          <p>2021/11/3</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2022/2/18" placement="top">
        <el-card>
          <h4>网站成型</h4>
          <p>2022/2/18</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: "Me"
}
</script>

<style scoped>
.me{
  margin-top: 50px;
  display: inline-block;
  background-color: white;
  width: 70%;
  height: auto;
}
</style>
