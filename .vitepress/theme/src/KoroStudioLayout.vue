<script setup>
import { Content, useData, useRouter } from 'vitepress'
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
  NMessageProvider,
  NSpin
} from 'naive-ui'
import { onMounted, ref } from 'vue'
import PageHeader from './components/header/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
import PageContent from './components/PageContent.vue'
import Error from './components/Error.vue'
import { common_store } from './store/common'
import { storeToRefs } from 'pinia'

const { page , frontmatter,isDark } = useData()
const common = storeToRefs(common_store());
const showLoading = ref(false)
const showFirst = ref(false);

document.documentElement.className = common.theme.value.toString();
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const router = useRouter();
//https://api.1314.cool/bingimg
//路由事件
router.onBeforeRouteChange = async (to) => {
  if (to === router.route.path) {
    return;
  }
  showLoading.value = true;
  setTimeout(() => {
    showLoading.value = false;
  }, 500)
  await sleep(400);
}

onMounted(()=>{
  setTimeout(()=>{showFirst.value = true},20);
})

</script>

<template>
  <n-config-provider class="content-main" :theme="common.naiveTheme.value" :locale="zhCN" :date-locale="dataZHCN">
    <n-global-style />
    <n-el>
      <n-notification-provider>
        <n-message-provider>
          <div :class="['first-loading',showFirst&&'first-loading-show']">
            <div class="first-loading-content">

            </div>
          </div>
          <div class="main-page">
            <div :class="['page-loading-fa',showLoading&&'page-loading-show']">
              <div id="page-loading">
                <n-spin size="large" />
                <p>
                  Tips：这其实是个定长动画，因为VitePress还没更新onAfterPageLoad方法。
                </p>
              </div>
            </div>
            <div id="page-header">
              <PageHeader></PageHeader>
            </div>
            <div id="page-content">
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
#page-header{
  width: 100%;
  height: 4rem;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 999;
}
#page-content{
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
  z-index: 100;
  position: relative;
}
.first-loading{
  position: sticky;
  top: 0;
  height: 0;
  opacity: 1;
  z-index: 1000;
  transition: opacity 1s var(--n-bezier);
  .first-loading-content{
    background-color: var(--card-color);
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  }
}
.first-loading-show{
  opacity: 0;
}
#page-loading{
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  background: var(--card-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.page-loading-fa{
  position: sticky;
  top: 0;
  height: 0;
  opacity: 0;
  z-index: 900;
  transition: opacity .5s var(--n-bezier);
}
.page-loading-show{
  opacity: 1;
}
.content-main{
  transition: width .3s var(--n-bezier);
}
</style>