<script setup lang="ts">
import { h, onMounted, onUnmounted, ref } from 'vue'
import type { CSSProperties , Component } from 'vue';
import { storeToRefs } from 'pinia';
import { common_store } from '../../store/common';
import {
  WeatherSunnyLow20Regular,
  WeatherMoon20Regular,
  BoxEdit20Regular,
  Image20Regular,
  Search20Regular,
  LinkSquare20Filled,
  BookInformation20Regular,
  BeakerEdit20Regular
} from '@vicons/fluent';
import {
  HomeOutlined,
  GithubFilled,
} from '@vicons/antd';
import {
  NFlex,
  NIcon,
  NAvatar,
  useMessage,
  NSwitch,
  NH3,
  NDropdown,
} from 'naive-ui';
import { useData, useRouter } from 'vitepress';

const common = storeToRefs(common_store());
const { page, frontmatter, site } = useData();
const router = useRouter();
const message = useMessage();

const showIndex = ref(true);
const scrollY = ref(0);
let inIndex = frontmatter.value.layout === 'index';
const loadingBar = ref("0%");
const hideLoadingBar = ref(false);

// 切换主题
const changeTheme = () => {
  if (common.theme.value === 'dark') {
    common.theme.value = 'light';
    document.documentElement.className = 'light';
  } else {
    common.theme.value = 'dark';
    document.documentElement.className = 'dark';
  }
};

// 自定义 NSwitch 的样式
const railStyle = ({ focused, checked }: { focused: boolean; checked: boolean }): CSSProperties => {
  return {
    background: 'var(--modal-color)',
    boxShadow: '0 0 0 0 #000'
  };
};

// 处理滚动事件
const handleScroll = () => {
  scrollY.value = window.scrollY;

  let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
  // 页面高度
  let documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  // 滚动条位置
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let bar = scrollTop/(documentHeight-windowHeight) * 100;
  loadingBar.value = `${bar}%`;
  hideLoadingBar.value = ((windowHeight + scrollTop + 2) >= documentHeight);
  if (inIndex) {
    showIndex.value = scrollY.value <= 1;
  }else{
    showIndex.value = false;
  }
};

// 路由变化后处理
router.onAfterRouteChanged = (to) => {
  inIndex = frontmatter.value.layout === 'index';
  showIndex.value = inIndex;
  handleScroll();
};

// 组件挂载和卸载时的处理
onMounted(() => {
  showIndex.value = inIndex;
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
function renderIcon(icon: Component) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}
const labData = [
  {
    label:'GitHub',
    key:'github',
    icon:renderIcon(GithubFilled)
  }
];
const handleSelect = (key: string) =>{
  switch (key){
    case 'github':
      window.location.href="https://github.com/KenRouKoro";
      break;
    default:
      break;
  }
}
</script>

<template>
  <div :class="['header-view', showIndex && 'header-view-index']">
    <n-flex style="height: 100%" justify="space-between" align="center">
      <div class="header-logo" @click="router.go('/')">
        <n-flex align="start" justify="space-between">
          <n-avatar :size="40" src="/icon.svg" color="rgba(0,0,0,0)" />
        </n-flex>
      </div>
      <div class="header-menu">
        <n-flex justify="space-around" align="center" style="height: 100%" size="medium">
          <div class="header-menu-item" @click="router.go('/')">
            <n-flex align="center" size="small">
              <n-icon size="25">
                <HomeOutlined />
              </n-icon>
              <n-h3>主页</n-h3>
            </n-flex>
          </div>
          <div class="header-menu-item" @click="router.go('/ports')">
            <n-flex align="center" size="small">
              <n-icon size="25">
                <BoxEdit20Regular />
              </n-icon>
              <n-h3>归档</n-h3>
            </n-flex>
          </div>
          <div class="header-menu-item" @click="router.go('/images')">
            <n-flex align="center" size="small">
              <n-icon size="25">
                <Image20Regular />
              </n-icon>
              <n-h3>画廊</n-h3>
            </n-flex>
          </div>
          <div class="header-menu-item" @click="router.go('/friends')">
            <n-flex align="center" size="small">
              <n-icon size="25">
                <LinkSquare20Filled />
              </n-icon>
              <n-h3>朋友</n-h3>
            </n-flex>
          </div>
          <div class="header-menu-item" @click="router.go('/about')">
            <n-flex align="center" size="small">
              <n-icon size="25">
                <BookInformation20Regular />
              </n-icon>
              <n-h3>关于</n-h3>
            </n-flex>
          </div>
          <div class="header-menu-item">
            <n-dropdown :options="labData" @select="handleSelect" :show-arrow="true" placement="bottom-start" size="huge">
              <n-flex align="center" size="small">
                <n-icon size="25">
                  <BeakerEdit20Regular />
                </n-icon>
                <n-h3>实验室</n-h3>
              </n-flex>
            </n-dropdown>
          </div>
        </n-flex>
      </div>
      <div class="header-toolbar">
        <n-flex align="center">
          <n-icon class="header-toolbar-search" size="35" @click="message.warning('没做，嘿嘿')">
            <Search20Regular />
          </n-icon>
          <n-switch
            :round="false"
            :value="common.isDark"
            :rail-style="railStyle"
            @click="changeTheme"
            style="border: 1px solid var(--border-color);"
          >
            <template #checked-icon>
              <n-icon :component="WeatherMoon20Regular"></n-icon>
            </template>
            <template #unchecked-icon>
              <n-icon :component="WeatherSunnyLow20Regular"></n-icon>
            </template>
          </n-switch>
        </n-flex>
      </div>
    </n-flex>
    <div :class="['header-loading-bar',hideLoadingBar&&'header-loading-bar-hide']"> </div>
  </div>
</template>

<style scoped lang="scss">
.header-view {
  height: calc(4rem - 1px);
  width: 100%;
  background-color: var(--card-color);
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);
  transition: background-color .3s var(--n-bezier), opacity .3s var(--n-bezier), border-bottom-color .3s var(--n-bezier);

  .n-switch{
    transition: opacity .3s var(--n-bezier);
  }
  .header-loading-bar{
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--primary-color);
    height: 4px;
    transition: opacity .3s var(--n-bezier);
    width: v-bind(loadingBar)
  }

}

.header-view-index {
  background-color: rgba(255, 255, 255, 0) !important;
  color: white !important;
  border-bottom-color: rgba(255, 255, 255, 0) !important;

  h3 {
    color: white !important;
  }
  .n-switch{
    opacity: 0.5;
  }
  .header-loading-bar{
    opacity: 0;
  }
}
.header-loading-bar-hide{
  opacity: 0;
}

.header-logo {
  padding-left: 12px;
  overflow: hidden;
  cursor: pointer;

  .n-h2 {
    margin: 14px 0 0;
  }
}

.header-toolbar {
  padding-right: 12px;
}

.header-menu {
  height: 100%;

  .n-h3 {
    margin: 8px 0 0;
  }
}

.header-toolbar-search {
  cursor: pointer;
  transition: color .3s var(--n-bezier);
}

.header-toolbar-search:hover {
  color: var(--primary-color);
}

.header-menu-item {
  transition: color .3s var(--n-bezier);
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    height: 4px;
    background: var(--primary-color);
    display: inline-block;
    position: absolute;
    width: 0;
    transition: .3s var(--n-bezier);
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    color: var(--primary-color) !important;

    .n-h3 {
      color: var(--primary-color) !important;
    }
  }
  .n-h3{
    margin-top: 2px;
  }
}
</style>
