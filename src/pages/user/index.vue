<script setup>
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 用户信息
const userInfo = ref({
  name: '张三',
  phone: '13800138000',
  avatar: '/static/logo.png' 
})

// 核心订单状态
const orderStats = [
  { name: '待上门', icon: '⏰', type: 'pending-visit' },
  { name: '服务中', icon: '🛠️', type: 'in-progress' },
  { name: '待验收', icon: '📝', type: 'pending-inspection' },
  { name: '已完成', icon: '✅', type: 'completed' }
]

// 功能菜单：✅ 新增了切换身份按钮
const tools = [
  { name: '我是师傅 (切换端)', icon: '👷', action: 'switchRole' }, // 测试入口
  { name: '地址管理', icon: '📍', path: '/pages/user/address' },
  { name: '联系客服', icon: '🎧', path: '/pages/user/service' },
  { name: '设置', icon: '⚙️', path: '/pages/user/settings' }
]

const handleToolClick = (tool) => {
  // ✅ 切换身份的核心逻辑
  if (tool.action === 'switchRole') {
    uni.showModal({
      title: '身份切换',
      content: '是否进入师傅工作台？',
      success: (res) => {
        if (res.confirm) {
          // 1. 写入缓存：角色变更为 master
          uni.setStorageSync('userRole', 'master')
          // 2. 必须使用 reLaunch 重启，确保 TabBar 重新读取缓存
          uni.reLaunch({ url: '/pages/master/work' })
        }
      }
    })
    return
  }

  if (tool.path) {
    uni.navigateTo({ url: tool.path })
  } else {
    uni.showToast({ title: '功能开发中', icon: 'none' })
  }
}

// ... 保持原有其他函数 ...
const viewAllOrders = () => uni.navigateTo({ url: '/pages/user/orders' })
const viewOrdersByStatus = (status) => uni.navigateTo({ url: `/pages/user/orders?status=${status}` })
const logout = () => uni.showToast({ title: '已退出登录', icon: 'success' })
</script>

<template>
  <view class="user-center-page" style="background-color: #f3f4f6; min-height: 100vh; padding-bottom: 200rpx;">
    <view style="background-color: #CC0010; border-bottom-left-radius: 64rpx; border-bottom-right-radius: 64rpx; padding: 80rpx 40rpx 48rpx; display: flex; flex-direction: column; align-items: center; gap: 32rpx;">
      <view style="display: flex; align-items: center; gap: 24rpx;">
        <image :src="userInfo.avatar" alt="用户头像" style="width: 120rpx; height: 120rpx; border-radius: 50%; object-fit: cover; border: 4rpx solid white; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);"></image>
        <view style="display: flex; flex-direction: column; gap: 8rpx;">
          <view style="font-size: 36rpx; font-weight: 600; color: white;">{{ userInfo.name }}</view>
          <view style="font-size: 28rpx; color: rgba(255, 255, 255, 0.8);">{{ userInfo.phone }}</view>
        </view>
      </view>
    </view>

    <view style="margin: 32rpx 40rpx; background-color: white; border-radius: 24rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);">
      <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: 600; color: #111827;">我的订单</view>
        <view @click="viewAllOrders" style="font-size: 28rpx; color: #6b7280; cursor: pointer; display: flex; align-items: center; gap: 8rpx;">
          全部订单 <text style="font-size: 32rpx;">›</text>
        </view>
      </view>
      <view style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16rpx;">
        <view v-for="stat in orderStats" :key="stat.name" style="text-align: center; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 16rpx 0;" @click="viewOrdersByStatus(stat.type)">
          <view style="font-size: 48rpx; margin-bottom: 8rpx;">{{ stat.icon }}</view>
          <view style="font-size: 24rpx; color: #6b7280;">{{ stat.name }}</view>
        </view>
      </view>
    </view>

    <view style="margin: 0 40rpx 32rpx; background-color: white; border-radius: 24rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);">
      <view style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32rpx;">
        <view 
          v-for="tool in tools" 
          :key="tool.name" 
          style="display: flex; align-items: center; gap: 24rpx; cursor: pointer; padding: 24rpx; border-radius: 16rpx; border: 2rpx solid #f0f0f0;"
          @click="handleToolClick(tool)" 
        >
          <view style="font-size: 40rpx; width: 48rpx; text-align: center;">{{ tool.icon }}</view>
          <view style="font-size: 28rpx; color: #111827; font-weight: 500;">{{ tool.name }}</view>
          <view style="margin-left: auto; font-size: 32rpx; color: #d1d5db;">›</view>
        </view>
      </view>
    </view>

    <view style="padding: 0 40rpx 48rpx;">
      <button type="button" style="width: 100%; background-color: white; border: 2rpx solid #e5e7eb; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx; color: #6b7280; cursor: pointer;" @click="logout">退出登录</button>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
/* 保持你的CSS不变 */
</style>