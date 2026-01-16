<script setup>
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 用户信息
const userInfo = ref({
  name: '张三',
  phone: '13800138000',
  avatar: '/static/logo.png',
  email: 'zhangsan@example.com',
  gender: '男',
  birthday: '1990-01-01'
})

// 修改信息
const editInfo = (field) => {
  console.log('修改信息:', field)
  uni.showToast({ title: '功能开发中', icon: 'none' })
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// ✅ 隐藏原生TabBar
onShow(() => {
  
})
</script>

<template>
  <view class="user-info-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view class="top-nav" style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view class="back-button" style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view class="page-title" style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 80rpx; color: white;">个人信息</view>
    </view>

    <!-- 头像区域 -->
    <view style="display: flex; flex-direction: column; align-items: center; padding: 60rpx 0;">
      <view style="width: 160rpx; height: 160rpx; border-radius: 50%; background: #E60012; border: 4rpx solid #E60012; display: flex; align-items: center; justify-content: center; color: white; font-size: 64rpx; font-weight: bold; margin-bottom: 24rpx;">
        {{ userInfo.name.charAt(0) }}
      </view>
      <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 12rpx;">{{ userInfo.name }}</view>
      <view style="font-size: 24rpx; color: #666;">点击修改头像</view>
    </view>

    <!-- 信息列表 -->
    <view style="padding: 0 40rpx;">
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 24rpx 0; border-bottom: 2rpx solid #f0f0f0;" @click="editInfo('name')">
          <div style="font-size: 28rpx; color: #333;">姓名</div>
          <div style="display: flex; align-items: center; gap: 16rpx;">
            <div style="font-size: 28rpx; color: #666;">{{ userInfo.name }}</div>
            <div style="font-size: 32rpx; color: #999;">→</div>
          </div>
        </view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 24rpx 0; border-bottom: 2rpx solid #f0f0f0;" @click="editInfo('phone')">
          <div style="font-size: 28rpx; color: #333;">手机号</div>
          <div style="display: flex; align-items: center; gap: 16rpx;">
            <div style="font-size: 28rpx; color: #666;">{{ userInfo.phone }}</div>
            <div style="font-size: 32rpx; color: #999;">→</div>
          </div>
        </view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 24rpx 0; border-bottom: 2rpx solid #f0f0f0;" @click="editInfo('email')">
          <div style="font-size: 28rpx; color: #333;">电子邮箱</div>
          <div style="display: flex; align-items: center; gap: 16rpx;">
            <div style="font-size: 28rpx; color: #666;">{{ userInfo.email }}</div>
            <div style="font-size: 32rpx; color: #999;">→</div>
          </div>
        </view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 24rpx 0; border-bottom: 2rpx solid #f0f0f0;" @click="editInfo('gender')">
          <div style="font-size: 28rpx; color: #333;">性别</div>
          <div style="display: flex; align-items: center; gap: 16rpx;">
            <div style="font-size: 28rpx; color: #666;">{{ userInfo.gender }}</div>
            <div style="font-size: 32rpx; color: #999;">→</div>
          </div>
        </view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 24rpx 0;" @click="editInfo('birthday')">
          <div style="font-size: 28rpx; color: #333;">出生日期</div>
          <div style="display: flex; align-items: center; gap: 16rpx;">
            <div style="font-size: 28rpx; color: #666;">{{ userInfo.birthday }}</div>
            <div style="font-size: 32rpx; color: #999;">→</div>
          </div>
        </view>
      </view>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.user-info-page {
  padding-bottom: 200rpx;
}
</style>