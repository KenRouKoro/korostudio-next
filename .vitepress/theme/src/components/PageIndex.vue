<script setup lang="ts">
import {
  NAlert,
  NFlex,
  NCard,
  NTabs,
  NTabPane,
} from 'naive-ui'
import PortsView from './PortsView.vue'


</script>

<template>
  <div class="index-first-screen">

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
    <PortsView></PortsView>
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
  .n-flex{
    width: 100%;
    height: 100%;
    .n-card{
      height: 3.5rem;
      max-width: 720px;
    }
  }
}
</style>