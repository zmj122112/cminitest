<template>
  <view class="master-profile-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航栏 -->
    <view style="position: fixed; top: 0; left: 0; right: 0; background-color: #CC0010; color: white; padding: 20rpx 40rpx; display: flex; align-items: center; z-index: 999;">
      <view style="font-size: 32rpx; cursor: pointer;" @click="goToDashboard">
        🏠
      </view>
      <view style="font-size: 28rpx; font-weight: bold; flex: 1; text-align: center;">师傅中心</view>
      <view style="width: 32rpx;"></view>
    </view>
    
    <!-- 顶部红色区域 -->
    <view style="background-color: #CC0010; border-bottom-left-radius: 64rpx; border-bottom-right-radius: 64rpx; padding: 140rpx 40rpx 48rpx;">48rpx; display: flex; flex-direction: column; align-items: center; gap: 32rpx;">
      <image :src="masterInfo.avatar" alt="师傅头像" style="width: 160rpx; height: 160rpx; border-radius: 50%; object-fit: cover; border: 4rpx solid white; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);"></image>
      <view style="display: flex; flex-direction: column; align-items: center; gap: 8rpx;">
        <view style="font-size: 36rpx; font-weight: 600; color: white;">{{ masterInfo.name }}</view>
        <view style="font-size: 28rpx; color: rgba(255, 255, 255, 0.8);">师傅 ID: {{ masterInfo.id }}</view>
      </view>
      <view style="display: flex; gap: 32rpx;">
        <view style="display: flex; flex-direction: column; align-items: center;">
          <view style="font-size: 32rpx; font-weight: bold; color: white;">{{ stats.totalOrders }}</view>
          <view style="font-size: 24rpx; color: rgba(255, 255, 255, 0.8);">总订单</view>
        </view>
        <view style="display: flex; flex-direction: column; align-items: center;">
          <view style="font-size: 32rpx; font-weight: bold; color: white;">{{ stats.completedOrders }}</view>
          <view style="font-size: 24rpx; color: rgba(255, 255, 255, 0.8);">已完成</view>
        </view>
        <view style="display: flex; flex-direction: column; align-items: center;">
          <view style="font-size: 32rpx; font-weight: bold; color: white;">{{ stats.rating }}</view>
          <view style="font-size: 24rpx; color: rgba(255, 255, 255, 0.8);">评分</view>
        </view>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view style="padding: 32rpx 40rpx;">
      <view style="background-color: white; border-radius: 24rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 32rpx; margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">工作管理</view>
        <view style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24rpx;">
          <view 
            v-for="item in workItems" 
            :key="item.name"
            style="display: flex; align-items: center; gap: 24rpx; cursor: pointer; padding: 24rpx; border-radius: 16rpx; border: 2rpx solid #f0f0f0;"
            @click="navigateTo(item.path)"
            @touchstart="$event.currentTarget.style.backgroundColor = '#f9fafb'"
            @touchend="$event.currentTarget.style.backgroundColor = 'transparent'"
          >
            <view style="font-size: 48rpx;">{{ item.icon }}</view>
            <view style="font-size: 28rpx; color: #333; font-weight: 500;">{{ item.name }}</view>
            <view style="margin-left: auto; font-size: 32rpx; color: #999;">›</view>
          </view>
        </view>
      </view>

      <view style="background-color: white; border-radius: 24rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 32rpx; margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">个人管理</view>
        <view style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24rpx;">
          <view 
            v-for="item in personalItems" 
            :key="item.name"
            style="display: flex; align-items: center; gap: 24rpx; cursor: pointer; padding: 24rpx; border-radius: 16rpx; border: 2rpx solid #f0f0f0;"
            @click="navigateTo(item.path)"
            @touchstart="$event.currentTarget.style.backgroundColor = '#f9fafb'"
            @touchend="$event.currentTarget.style.backgroundColor = 'transparent'"
          >
            <view style="font-size: 48rpx;">{{ item.icon }}</view>
            <view style="font-size: 28rpx; color: #333; font-weight: 500;">{{ item.name }}</view>
            <view style="margin-left: auto; font-size: 32rpx; color: #999;">›</view>
          </view>
        </view>
      </view>

      <view style="background-color: white; border-radius: 24rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">其他</view>
        <view style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24rpx;">
          <view 
            v-for="item in otherItems" 
            :key="item.name"
            style="display: flex; align-items: center; gap: 24rpx; cursor: pointer; padding: 24rpx; border-radius: 16rpx; border: 2rpx solid #f0f0f0;"
            @click="navigateTo(item.path)"
            @touchstart="$event.currentTarget.style.backgroundColor = '#f9fafb'"
            @touchend="$event.currentTarget.style.backgroundColor = 'transparent'"
          >
            <view style="font-size: 48rpx;">{{ item.icon }}</view>
            <view style="font-size: 28rpx; color: #333; font-weight: 500;">{{ item.name }}</view>
            <view style="margin-left: auto; font-size: 32rpx; color: #999;">›</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view style="padding: 0 40rpx 64rpx;">
      <button 
        @click="logout"
        style="width: 100%; background-color: white; color: #E60012; border: 2rpx solid #E60012; border-radius: 16rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; cursor: pointer;"
      >
        退出登录
      </button>
    </view>
    <!-- 底部导航栏 -->
    <TabBar />
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 师傅信息
const masterInfo = ref({
  id: '1001',
  name: '王师傅',
  avatar: '/static/logo.png',
  phone: '13800138000',
  experience: '5年',
  specialty: '卫生间防水、屋顶补漏'
})

// 统计信息
const stats = ref({
  totalOrders: 128,
  completedOrders: 125,
  rating: 4.9
})

// 工作管理菜单
const workItems = [
  { name: '工单接收', icon: '📥', path: '/pages/master/workorder-receive' },
  { name: '我的订单', icon: '📋', path: '/pages/master/my-orders' },
  { name: '施工记录', icon: '📝', path: '/pages/master/construction' },
  { name: '完工确认', icon: '✅', path: '/pages/master/completion' }
]

// 个人管理菜单
const personalItems = [
  { name: '个人信息', icon: '👤', path: '/pages/master/profile' },
  { name: '账户安全', icon: '🔒', path: '/pages/master/profile' },
  { name: '收入管理', icon: '💰', path: '/pages/master/profile' },
  { name: '技能认证', icon: '📄', path: '/pages/master/profile' }
]

// 其他菜单
const otherItems = [
  { name: '帮助中心', icon: '❓', path: '/pages/master/help-center' },
  { name: '积分中心', icon: '⭐', path: '/pages/master/score-center' },
  { name: '关于我们', icon: 'ℹ️', path: '/pages/user/about' },
  { name: '联系客服', icon: '📞', path: '/pages/user/service' }
]

// 导航方法
const navigateTo = (url) => {
  uni.navigateTo({ url })
}

// 导航回工作台
const goToDashboard = () => {
  uni.reLaunch({ url: '/pages/master/dashboard' })
}

// 退出登录
const logout = () => {
  uni.showModal({
    title: '退出登录',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除用户信息
        uni.removeStorageSync('userInfo')
        uni.showToast({ title: '已退出登录', icon: 'success' })
        // 跳转到客户端首页
        setTimeout(() => {
          uni.reLaunch({ url: '/pages/index/index' })
        }, 1000)
      }
    }
  })
}</script>

<style scoped>
.master-profile-page {
  background-color: #f5f7fa;
}
</style>