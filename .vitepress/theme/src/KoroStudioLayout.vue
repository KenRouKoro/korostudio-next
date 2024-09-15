<script setup>
import { Content, useData } from 'vitepress'
import {
  NCard,
  darkTheme,
  lightTheme,
  NConfigProvider,
  NGlobalStyle,
  NScrollbar,
  NButton,
  NEl,
  zhCN,
  dateZhCN,
  NNotificationProvider,
  NMessageProvider
} from 'naive-ui'
import { ref } from 'vue'
import PageHeader from './components/header/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
import PageContent from './components/PageContent.vue'
import Error from './components/Error.vue'
import { common_store } from './store/common'
import { storeToRefs } from 'pinia'

const { page , frontmatter,isDark } = useData()
const common = storeToRefs(common_store());

document.documentElement.className = common.theme.value.toString();
//https://api.1314.cool/bingimg
</script>

<template>
  <n-config-provider class="content-main" :theme="common.naiveTheme.value" :locale="zhCN" :date-locale="dataZHCN">
    <n-global-style />
    <n-el>
      <n-notification-provider>
        <n-message-provider>
          <div class="main-page">
            <div id="header">
              <PageHeader></PageHeader>
            </div>
            <div id="content">
              <Error v-if="page.isNotFound"></Error>
              <PageContent v-else></PageContent>
            </div>
            <div id="page-footer">
              <PageFooter></PageFooter>
            </div>
          </div>
        </n-message-provider>
      </n-notification-provider>
    </n-el>
  </n-config-provider>

</template>

<style lang="scss">
body{
  /*background: url(https://api.1314.cool/bingimg);*/
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  position: absolute;
  width: 100%;
}
/*
body::before {
  content: "";
  position: absolute; /* 一定要用绝对定位
  width: 100%;
  height: 100%;
  backdrop-filter: blur(30px); /* 模糊半径
}
*/
#header{
  width: 100%;
  height: 4rem;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 999;
}
#content{
  width: 100%;
  min-height: calc(100vh - 4rem - 8rem);
  overflow: visible;
}
#page-footer{
  width: 100%;
  height: 8rem;
  overflow: hidden;
}
.main-page{
  width: 100%;
  z-index: 999;
  position: relative;
}
.content-main{
  transition: width .3s var(--n-bezier);
}
</style>