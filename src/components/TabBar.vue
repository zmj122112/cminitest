<template>
  <view class="tab-bar-placeholder"></view> <view class="tab-bar">
    <view class="tab-item" @click="switchTab('/pages/index/index')">
      <image v-if="currentPath === 'pages/index/index'" src="/static/tab-home-active.png" class="tab-icon" />
      <image v-else src="/static/tab-home.png" class="tab-icon" />
      <text class="tab-text" :class="{ active: currentPath === 'pages/index/index' }">首页</text>
    </view>

    <view class="tab-item-center-wrapper" @click="switchTab('/pages/repair/estimate')">
      <view class="tab-item-center">
        <image src="/static/tab-repair-big.png" class="center-icon" />
      </view>
      <text class="tab-text center-text" :class="{ active: currentPath === 'pages/repair/estimate' }">一键报修</text>
    </view>

    <view class="tab-item" @click="switchTab('/pages/user/index')">
      <image v-if="currentPath === 'pages/user/index'" src="/static/tab-user-active.png" class="tab-icon" />
      <image v-else src="/static/tab-user.png" class="tab-icon" />
      <text class="tab-text" :class="{ active: currentPath === 'pages/user/index' }">我的</text>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'

// 获取当前页面路径，用于判断哪个 tab 高亮
const pages = getCurrentPages()
const page = pages[pages.length - 1]
// 获取当前页面的路径 (不带开头的 /)
const currentPath = computed(() => page?.route)

const switchTab = (url) => {
  uni.switchTab({ url })
}
</script>

<style scoped>
/* 底部占位高度，防止内容被 TabBar 遮住 */
.tab-bar-placeholder {
  height: 160rpx; 
  width: 100%;
}

/* TabBar 容器，固定在底部 */
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 110rpx; /* 标准高度 */
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 999;
  padding-bottom: env(safe-area-inset-bottom); /* 适配全面屏底部黑条 */
}

/* 普通 Tab 项 */
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
}

.tab-icon {
  width: 50rpx;
  height: 50rpx;
  margin-bottom: 6rpx;
}

.tab-text {
  font-size: 22rpx;
  color: #999999;
}

.tab-text.active {
  color: #E60012;
}

/* --- 中间突出部分的核心 CSS --- */
.tab-item-center-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  position: relative;
}

/* 那个突出的白色大圆底座 */
.tab-item-center {
  width: 130rpx;
  height: 130rpx;
  background: #FFFFFF; /* 背景色要和 TabBar 一致 */
  border-radius: 50%;
  position: absolute;
  top: -50rpx; /* 向上产生位移的核心 */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -4rpx 8rpx rgba(0, 0, 0, 0.08); /* 让它看起来浮起来 */
  padding: 10rpx; /* 留出白边 */
  box-sizing: border-box;
}

/* 里面的红色大图标 */
.center-icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

/* 中间文字的位置微调 */
.center-text {
  margin-bottom: 10rpx;
}
</style>