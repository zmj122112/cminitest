<script setup>
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'

// 用户信息
const userInfo = ref({
  name: '王师傅',
  phone: '13800138000',
  avatar: '王',
  level: '金牌师傅',
  score: 1250,
  completedOrders: 89,
  certificationStatus: '已认证'
})

// 设置选项
const settings = [
  {
    category: '账号设置',
    items: [
      { name: '个人认证', path: '/pages/master/certification', icon: '📋' },
      { name: '修改密码', path: '/pages/master/change-password', icon: '🔒' },
      { name: '绑定手机', path: '/pages/master/bind-phone', icon: '📱' }
    ]
  },
  {
    category: '积分管理',
    items: [
      { name: '积分中心', path: '/pages/master/score-center', icon: '🏆' },
      { name: '积分商城', path: '/pages/master/score-mall', icon: '🛒' },
      { name: '兑换记录', path: '/pages/master/exchange-record', icon: '📝' }
    ]
  },
  {
    category: '关于我们',
    items: [
      { name: '帮助中心', path: '/pages/master/help-center', icon: '❓' },
      { name: '关于月星', path: '/pages/master/about-us', icon: 'ℹ️' },
      { name: '隐私政策', path: '/pages/master/privacy-policy', icon: '🔐' },
      { name: '用户协议', path: '/pages/master/user-agreement', icon: '📄' }
    ]
  }
]

// 退出登录
const logout = () => {
  uni.showModal({
    title: '退出登录',
    content: '确认退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除本地存储
        uni.removeStorageSync('userRole')
        // 跳转到登录页
        uni.reLaunch({ url: '/pages/index/index' })
      }
    }
  })
}

const switchBackToClient = () => {
  uni.showModal({
    title: '切换身份',
    content: '确认切回普通用户端吗？',
    success: (res) => {
      if (res.confirm) {
        // 1. 设置回 client 角色
        uni.setStorageSync('userRole', 'client')
        // 2. 强制重启应用，刷新 TabBar
        uni.reLaunch({ url: '/pages/index/index' })
      }
    }
  })
}

// 导航到其他页面
const navigateTo = (path) => {
  uni.navigateTo({ url: path })
}
</script>

<template>
  <view class="master-profile-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 红色顶部区域 -->
    <view class="header-section" style="background: linear-gradient(135deg, #CC0010 0%, #E63946 100%); border-bottom-left-radius: 32rpx; border-bottom-right-radius: 32rpx; padding-top: 40rpx; padding-bottom: 40rpx; position: relative; z-index: 0;">
      <view class="header-content" style="padding: 0 40rpx;">
        <view class="user-info" style="display: flex; align-items: center; margin-bottom: 32rpx;">
          <view class="avatar" style="width: 120rpx; height: 120rpx; border-radius: 50%; background-color: white; padding: 4rpx; margin-right: 28rpx; display: flex; align-items: center; justify-content: center; font-size: 48rpx; color: #CC0010; font-weight: bold; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.1);">
            {{ userInfo.avatar }}
          </view>
          <view class="user-details" style="flex: 1;">
            <view class="user-name" style="color: white; font-size: 36rpx; font-weight: bold; margin-bottom: 8rpx; display: flex; align-items: center;">
              {{ userInfo.name }}
              <view class="certification-badge" style="margin-left: 16rpx; padding: 4rpx 16rpx; background-color: rgba(255,255,255,0.2); border-radius: 16rpx; font-size: 20rpx;">
                {{ userInfo.certificationStatus }}
              </view>
            </view>
            <view class="user-level" style="color: rgba(255,255,255,0.9); font-size: 24rpx;">
              {{ userInfo.level }} | 工号：9527
            </view>
          </view>
        </view>
        
        <view class="stats-container" style="display: flex; background-color: rgba(255,255,255,0.15); border-radius: 16rpx; padding: 24rpx;">
          <view class="stat-item" style="flex: 1; text-align: center; padding: 0 16rpx;">
            <view class="stat-value" style="color: white; font-size: 32rpx; font-weight: bold; margin-bottom: 4rpx;">{{ userInfo.score }}</view>
            <view class="stat-label" style="color: rgba(255,255,255,0.8); font-size: 20rpx;">积分</view>
          </view>
          <view class="stat-divider" style="width: 1rpx; background-color: rgba(255,255,255,0.2); margin: 0 16rpx;"></view>
          <view class="stat-item" style="flex: 1; text-align: center; padding: 0 16rpx;">
            <view class="stat-value" style="color: white; font-size: 32rpx; font-weight: bold; margin-bottom: 4rpx;">{{ userInfo.completedOrders }}</view>
            <view class="stat-label" style="color: rgba(255,255,255,0.8); font-size: 20rpx;">已完成工单</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 设置选项 -->
    <view class="settings-section" style="margin: 30rpx;">
      <view v-for="(category, index) in settings" :key="index" style="margin-bottom: 32rpx;">
        <view class="category-title" style="font-size: 26rpx; color: #666; margin-bottom: 16rpx; font-weight: 500;">{{ category.category }}</view>
        <view class="settings-card" style="background: white; border-radius: 20rpx; overflow: hidden; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);">
          <view v-for="(item, itemIndex) in category.items" :key="itemIndex" 
                @click="navigateTo(item.path)"
                class="setting-item" 
                style="padding: 36rpx; border-bottom: 1rpx solid #f5f5f5; display: flex; align-items: center; transition: all 0.3s ease; border-radius: 16rpx; margin: 12rpx 16rpx; background: white; box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.03);">
            <view style="margin-right: 24rpx; font-size: 48rpx; width: 60rpx; text-align: center;">{{ item.icon }}</view>
            <text class="setting-text" style="font-size: 28rpx; color: #333; flex: 1; font-weight: 500;">{{ item.name }}</text>
            <view class="setting-arrow" style="display: flex; align-items: center; color: #999;">
              <text style="font-size: 32rpx; font-weight: bold;">›</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 切换回用户端 -->
    <view style="margin: 30rpx;">
      <view @click="switchBackToClient" class="action-card" style="background: white; padding: 36rpx; border-radius: 20rpx; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05); transition: all 0.3s ease; margin-bottom: 20rpx;">
        <view style="display: flex; align-items: center;">
          <view style="font-size: 40rpx; margin-right: 24rpx;">👤</view>
          <text style="font-size: 28rpx; color: #333; font-weight: 500;">切换回用户端</text>
        </view>
        <text style="font-size: 32rpx; color: #999; font-weight: bold;">›</text>
      </view>
    </view>

    <!-- 退出登录 -->
    <view style="margin: 0 30rpx 40rpx;">
      <view @click="logout" class="logout-card" style="background: white; padding: 36rpx; border-radius: 20rpx; display: flex; justify-content: center; align-items: center; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05); transition: all 0.3s ease;">
        <view style="display: flex; align-items: center;">
          <view style="font-size: 40rpx; margin-right: 20rpx;">🚪</view>
          <text style="font-size: 28rpx; color: #CC0010; font-weight: 500;">退出登录</text>
        </view>
      </view>
    </view>

    <TabBar />
  </view>
</template>

<style scoped>
.master-profile-page {
  background-color: #f5f7fa;
}

.setting-item:active {
  background-color: #f9f9f9;
}

.action-card:active {
  background-color: #f9f9f9;
  transform: scale(0.98);
}

.logout-card:active {
  background-color: #f9f9f9;
  transform: scale(0.98);
}
</style>