<script setup lang="ts">
import {
  NGridItem,
  NGrid,
  NCard,
  NTag,
  NFlex,
} from 'naive-ui'


const go = (url:string)=>{
  window.location.href=url;
}
</script>

<template>
<div class="works-view">
  <n-grid class="works-view-content" :x-gap="16" :y-gap="16" cols="2 s:3 m:3 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item @click="go('https://github.com/KenRouKoro/FlexiPLCLITE_Recovery')">
      <n-card title="FlexiPLCLITE Recovery" size="small">
        <template #header-extra>
          <n-tag type="success" size="small">
            活跃
          </n-tag>
        </template>
        <template #footer>
          <n-flex>
            <n-tag size="small">
              嵌入式
            </n-tag>
          </n-flex>
        </template>
        <template #action>
          <n-tag size="small" type="info">
            LGPL3.0
          </n-tag>
        </template>
        级联IO模块固件
      </n-card>
    </n-grid-item>
    <n-grid-item @click="go('https://github.com/KenRouKoro/FaceCheckin')">
      <n-card title="FaceCheckin" size="small">
        <template #header-extra>
          <n-tag type="warning" size="small">
            非活跃
          </n-tag>
        </template>
        <template #footer>
          <n-flex>
            <n-tag size="small">
              Java
            </n-tag>
            <n-tag size="small">
              机器视觉
            </n-tag>
          </n-flex>
        </template>
        <template #action>
          <n-tag size="small" type="info">
            LGPL3.0
          </n-tag>
        </template>
        基于SeetaFace2的人脸识别签到系统
      </n-card>
    </n-grid-item>
    <n-grid-item @click="go('https://github.com/KenRouKoro/MachineStatus')">
      <n-card title="MachineStatus" size="small">
        <template #header-extra>
          <n-tag type="error" size="small">
            无支持
          </n-tag>
        </template>
        <template #footer>
          <n-flex>
            <n-tag size="small">
              Java
            </n-tag>
            <n-tag size="small">
              Spring
            </n-tag>
          </n-flex>
        </template>
        <template #action>
          <n-tag size="small" type="info">
            MIT
          </n-tag>
        </template>
        一个开箱即用的服务器监控系统。
      </n-card>
    </n-grid-item>
    <n-grid-item @click="go('https://github.com/KenRouKoro/ctoml4j')">
      <n-card title="CToml4J" size="small">
        <template #header-extra>
          <n-tag type="success" size="small">
            活跃
          </n-tag>
        </template>
        <template #footer>
          <n-flex>
            <n-tag size="small">
              Java
            </n-tag>
          </n-flex>
        </template>
        <template #action>
          <n-tag size="small" type="info">
            LGPL3.0
          </n-tag>
        </template>
        支持注释输出的Toml4J。
      </n-card>
    </n-grid-item>
  </n-grid>
</div>
</template>

<style lang="scss">
.works-view{
  width: 100%;
  margin-bottom: 16px;
  .works-view-content{
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
  }
  .n-card{
    width: 100%;
    height: 100%;
    .n-card-header{
      align-items: start !important;
    }
  }
  .n-card:hover{
    border-color: var(--primary-color);
  }
}

</style>