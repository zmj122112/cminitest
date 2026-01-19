<template>
  <view class="tab-bar-placeholder"></view>
  <view class="tab-bar">
    
    <block v-if="userRole === 'client'">
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
    </block>

    <block v-if="userRole === 'master'">
      <view class="tab-item" @click="reLaunch('/pages/master/work')">
        <image v-if="currentPath === 'pages/master/work'" src="/static/tab-repair-big.png" class="tab-icon" />
        <image v-else src="/static/tab-repair-big.png" class="tab-icon" style="filter: grayscale(100%);" />
        <text class="tab-text" :class="{ active: currentPath === 'pages/master/work' }">作业大厅</text>
      </view>

      <view class="tab-item" @click="reLaunch('/pages/master/profile')">
        <image v-if="currentPath === 'pages/master/profile'" src="/static/tab-user-active.png" class="tab-icon" />
        <image v-else src="/static/tab-user.png" class="tab-icon" />
        <text class="tab-text" :class="{ active: currentPath === 'pages/master/profile' }">师傅中心</text>
      </view>
    </block>

  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 默认角色为 client
const userRole = ref('client')
const currentPath = ref('')

onMounted(() => {
  // 从缓存读取角色
  const role = uni.getStorageSync('userRole')
  if (role) {
    userRole.value = role
  }
  
  // 获取当前页面路径
  const pages = getCurrentPages()
  if (pages.length > 0) {
    const page = pages[pages.length - 1]
    if (page && page.route) {
      currentPath.value = page.route
    }
  }
})

const switchTab = (url) => {
  uni.reLaunch({ url })
}

const reLaunch = (url) => {
  uni.reLaunch({ url })
}
</script>

<style scoped>
/* 保持原有 CSS 不变 */
.tab-bar-placeholder { height: 160rpx; width: 100%; }
.tab-bar { position: fixed; bottom: 0; left: 0; right: 0; height: 110rpx; background: #FFFFFF; display: flex; align-items: center; justify-content: space-around; box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05); z-index: 999; padding-bottom: env(safe-area-inset-bottom); }
.tab-item { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; flex: 1; }
.tab-icon { width: 50rpx; height: 50rpx; margin-bottom: 6rpx; }
.tab-text { font-size: 22rpx; color: #999999; }
.tab-text.active { color: #E60012; }
.tab-item-center-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; position: relative; }
.tab-item-center { width: 130rpx; height: 130rpx; background: #FFFFFF; border-radius: 50%; position: absolute; top: -50rpx; display: flex; align-items: center; justify-content: center; box-shadow: 0 -4rpx 8rpx rgba(0, 0, 0, 0.08); padding: 10rpx; box-sizing: border-box; }
.center-icon { width: 100%; height: 100%; border-radius: 50%; }
.center-text { margin-bottom: 10rpx; }
</style>