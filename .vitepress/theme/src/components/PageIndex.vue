<script setup lang="ts">
import {
  NAlert,
  NFlex,
  NCard,
  NTabs,
  NTabPane,
} from 'naive-ui'
import PortsView from './PortsView.vue'
import WorksView from './WorksView.vue'


</script>

<template>
  <div class="index-first-screen">
    <h1>
      你好,世界!
    </h1>
    <div  class="first-screen-footer">
      <p style="margin-bottom: 0; font-size: 22px;">
        “戴着洁白的手套可没法干革命。”
      </p>
      <p  style="text-align: right; padding-left: 10em; margin-top: 0; font-size: 16px;">
        ——弗拉基米尔·伊里奇·列宁《革命联系和白手套》
      </p>
    </div>
  </div>
  <div class="index-info-bar">
    <div class="index-info-bar-content">
      <n-flex justify="center" align="center">
        <n-card>
          Hello World!
        </n-card>
      </n-flex>
    </div>
  </div>
  <div class="index-content">
    <n-tabs animated size="large" justify-content="center">
      <n-tab-pane name="ports" tab="文章">
        <PortsView></PortsView>
      </n-tab-pane>
      <n-tab-pane name="works" tab="作品">
        <WorksView></WorksView>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped lang="scss">
.index-first-screen{
  background: url("/blhx-background_and_shouhou.jpg") center center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  position: relative;
  top : -4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: "LXGW WenKai", monospace;
  flex-direction: column;
  h1{
    font-size: 80px;
    font-weight: bolder;
    text-shadow: 1px 1px 7px rgba(68, 65, 65, 1);
    text-align: center;
    margin: 0;
  }
  .first-screen-footer {
    padding: 10px;
    background: rgba(36, 36, 36, .5);
    backdrop-filter: blur(1px);
    text-align: center;
    font-weight: 900;
  }
}
.index-info-bar{
  width: 100%;
  height: 0;
  position: relative;
  top : -4rem;
}
.index-info-bar-content{
  width: 100%;
  height: 4rem;
  margin-top: 16px;
  .n-flex{
    width: 100%;
    height: 100%;
    .n-card{
      height: 4rem;
      max-width: 720px;
    }
  }
}
.index-content{
  margin-top: 16px;
}
</style>