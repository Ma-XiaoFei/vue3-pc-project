<script setup lang="ts">
import LayoutAside from './LayoutAside.vue';
import LayoutMain from './LayoutMain.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="220px">
        <LayoutAside />
      </el-aside>
      <div id="content-main">
        <el-main>
          <LayoutMain />
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.common-layout {
  background: #f0f0f0;

  #content-main {
    flex: 1;
    padding: 10px 10px 10px 0;
    height: 100vh;
    overflow: auto;
  }
  .el-aside {
    background: #f0f0f0;
  }
  .el-main {
    border-radius: 10px;
    background: #e8e8e8;
  }
}
</style>
