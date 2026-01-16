<script setup>
// ✅ 引入组件
import TabBar from '@/components/TabBar.vue'
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 设置选项
const settings = ref([
  {
    id: 1,
    title: '关于我们',
    icon: 'ℹ️',
    action: 'about'
  },
  {
    id: 2,
    title: '用户协议',
    icon: '📄',
    action: 'agreement'
  },
  {
    id: 3,
    title: '隐私政策',
    icon: '🔐',
    action: 'privacy'
  },
  {
    id: 4,
    title: '清理缓存',
    icon: '🗑️',
    action: 'cache'
  },
  {
    id: 5,
    title: '检查更新',
    icon: '🔄',
    action: 'update'
  },
  {
    id: 6,
    title: '师傅登录',
    icon: '👷',
    action: 'master-login'
  }
])

// 执行设置操作
const performAction = (action) => {
  console.log('执行操作:', action)
  
  switch (action) {
    case 'about':
    case 'agreement':
    case 'privacy':
    case 'notification':
    case 'update':
      uni.showToast({ title: '功能开发中', icon: 'none' })
      break
    case 'cache':
      uni.showToast({ title: '缓存已清理', icon: 'success' })
      break
    case 'master-login':
      uni.navigateTo({ url: '/pages/master/login' })
      break
    default:
      uni.showToast({ title: '功能开发中', icon: 'none' })
  }
}

// 退出登录
const logout = () => {
  console.log('退出登录')
  uni.showToast({ title: '已退出登录', icon: 'success' })
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

onMounted(() => {
  console.log('设置页面加载')
})

// ✅ 隐藏原生TabBar
onShow(() => {
  
})
</script>

<template>
  <view class="settings-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view class="top-nav" style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view class="back-button" style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view class="page-title" style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 80rpx; color: white;">设置</view>
    </view>

    <!-- 设置列表 -->
    <view style="padding: 32rpx;">
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); margin-bottom: 32rpx;">
        <view v-for="setting in settings" :key="setting.id" 
             style="display: flex; align-items: center; justify-content: space-between; padding: 32rpx 0; border-bottom: 2rpx solid #f0f0f0;"
             @click="performAction(setting.action)"
             @touchstart="$event.currentTarget.style.backgroundColor = '#f9fafb'"
             @touchend="$event.currentTarget.style.backgroundColor = 'transparent'"
        >
          <div style="display: flex; align-items: center; gap: 24rpx;">
            <div style="font-size: 48rpx;">{{ setting.icon }}</div>
            <div style="font-size: 28rpx; color: #333;">{{ setting.title }}</div>
          </div>
          <div style="font-size: 32rpx; color: #999;">→</div>
        </view>
      </view>

      <!-- 退出登录按钮 -->
      <button @click="logout" style="width: 100%; background: white; color: #E60012; border: 2rpx solid #E60012; border-radius: 32rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; cursor: pointer;">
        退出登录
      </button>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.settings-page {
  padding-bottom: 200rpx;
}
</style>
