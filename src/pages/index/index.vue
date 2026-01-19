<script setup>
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 轮播图数据
const carouselItems = [
  { 
    id: 1, 
    image: '/static/images/waterproof-1.png', 
    title: '月星防水 始于1954', 
    subtitle: '70年国企担当 专业坚守',
    link: ''
  },
  { 
    id: 2, 
    image: '/static/images/waterproof-2.png', 
    title: '标准化工艺 · 拒绝复漏', 
    subtitle: '9大施工流程，ISO质量认证',
    link: ''
  },
  { 
    id: 3, 
    image: '/static/images/waterproof-3.jpg', 
    title: '万千工程案例 · 见证实力', 
    subtitle: '服务上海2000+小区，真实记录',
    link: ''
  }
]

// 核心服务数据
const coreServices = [
  { id: 'bathroom', title: '卫生间漏水', icon: '💧' },
  { id: 'kitchen', title: '厨房漏水', icon: '🍳' },
  { id: 'roof', title: '屋顶补漏', icon: '🏠' },
  { id: 'balcony', title: '阳台漏水', icon: '☀️' },
  { id: 'exterior', title: '外墙防水', icon: '🏢' },
  { id: 'other', title: '其他修缮', icon: '🔨' }
]

// 客户评价
const customerReviews = [
  { id: 1, name: '张先生', content: '师傅很专业，服务态度好。', rating: 5, project: '卫生间维修' },
  { id: 2, name: '李女士', content: '国企背景果然不一样，推荐！', rating: 5, project: '屋顶补漏' }
]

// 漏水维修
const goToRepairEstimate = () => {
  uni.setStorageSync('repairType', 'repair')
  uni.reLaunch({ url: '/pages/repair/estimate' })
}

// 新房防水
const goToAppointment = () => {
  uni.setStorageSync('repairType', 'new')
  uni.reLaunch({ url: '/pages/repair/estimate' })
}

onShow(() => {
 
})
</script>

<template>
  <view class="page-container" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    
    <view class="header-section" style="background-color: #CC0010; border-bottom-left-radius: 48rpx; border-bottom-right-radius: 48rpx; padding-top: 20rpx; padding-bottom: 120rpx; position: relative; z-index: 0;">
      <view class="header-content" style="padding: 0 40rpx;">
        <view class="top-bar" style="display: flex; justify-content: space-between; align-items: center;">
          <view class="brand-info" style="display: flex; align-items: center;">
            <image src="/static/logo.png" class="logo-img" style="width: 64rpx; height: 64rpx; border-radius: 50%; background-color: white; padding: 4rpx; margin-right: 16rpx; object-fit: contain;" />
            <view class="brand-text">
              <view class="brand-name" style="color: white; font-size: 34rpx; font-weight: bold;">月星防水</view>
              <view class="brand-slogan" style="color: rgba(255,255,255,0.85); font-size: 22rpx;">源自 1947 · 国企品质</view>
            </view>
          </view>
          
          <view class="location-tag" style="display: flex; align-items: center; background: rgba(0,0,0,0.1); padding: 6rpx 16rpx; border-radius: 30rpx;">
              <text style="font-size: 24rpx; color: white; margin-right: 4rpx;">📍</text>
              <text style="font-size: 24rpx; color: white;">上海</text>
          </view>
        </view>
      </view>
    </view>

    <view class="banner-container" style="margin-top: -100rpx; margin-left: 32rpx; margin-right: 32rpx; position: relative; z-index: 10; border-radius: 32rpx; overflow: hidden; box-shadow: 0 16rpx 32rpx rgba(0,0,0,0.15);">
      <view class="carousel" style="width: 100%; height: 420rpx; position: relative; overflow: hidden;">
        <swiper :autoplay="true" :interval="3000" :duration="500" :circular="true" indicator-dots="true" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" style="width: 100%; height: 100%;">
          <swiper-item v-for="(item, index) in carouselItems" :key="item.id">
            <view style="width: 100%; height: 100%; position: relative;">
              <image :src="item.image" style="width: 100%; height: 100%; object-fit: cover; display: block; background-color: #eee;" />
              <view style="position: absolute; bottom: 0; left: 0; right: 0; padding: 60rpx 32rpx 32rpx; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); color: white;">
                <text style="font-size: 38rpx; font-weight: bold; margin: 0 0 8rpx 0; display: block;">{{ item.title }}</text>
                <text style="font-size: 26rpx; margin: 0; opacity: 0.95; display: block;">{{ item.subtitle }}</text>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>

    <view class="nav-capsule" style="margin-top: 40rpx; background: white; margin-left: 40rpx; margin-right: 40rpx; border-radius: 40rpx; padding: 40rpx; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.08); position: relative; z-index: 10;">
      <view class="nav-item" @click="goToRepairEstimate" style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <view class="nav-icon" style="font-size: 52rpx; margin-bottom: 12rpx;">💧</view>
        <view class="nav-title text-red" style="font-size: 34rpx; font-weight: bold; color: #E60012;">漏水维修</view>
        <view class="nav-desc" style="font-size: 24rpx; color: #999;">上门检测/快速止漏</view>
      </view>
      <view class="divider" style="width: 2rpx; height: 80rpx; background-color: #eee; margin: 0 20rpx;"></view>
      <view class="nav-item" @click="goToAppointment" style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <view class="nav-icon" style="font-size: 52rpx; margin-bottom: 12rpx;">🏠</view>
        <view class="nav-title text-gold" style="font-size: 34rpx; font-weight: bold; color: #F59E0B;">新房防水</view>
        <view class="nav-desc" style="font-size: 24rpx; color: #999;">全屋防水/十年质保</view>
      </view>
    </view>

    <view class="section-card" style="margin-top: 30rpx; background: white; margin-left: 40rpx; margin-right: 40rpx; border-radius: 40rpx; padding: 40rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.08); position: relative; z-index: 10;">
      <view class="section-title" style="font-size: 34rpx; font-weight: bold; color: #333; margin: 0 0 30rpx 0; border-left: 8rpx solid #E60012; padding-left: 20rpx;">核心服务</view>
      <view class="service-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40rpx;">
        <view v-for="service in coreServices" :key="service.id" class="service-item" style="display: flex; flex-direction: column; align-items: center; cursor: pointer;" @click="uni.navigateTo({ url: `/pages/service/detail?type=${service.id}` })">
          <view class="service-icon-bg" style="width: 96rpx; height: 96rpx; background-color: #FFF0F0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 44rpx; margin-bottom: 16rpx;">{{ service.icon }}</view>
          <text class="service-name" style="font-size: 26rpx; color: #333;">{{ service.title }}</text>
        </view>
      </view>
    </view>

    <view style="margin: 30rpx 40rpx 0; display: grid; grid-template-columns: 1fr 1fr; gap: 32rpx;">
      <view style="background: #F9FAFB; border: 2rpx solid #E5E7EB; border-radius: 40rpx; padding: 32rpx; cursor: pointer; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05); position: relative; z-index: 10;" 
           @click="uni.navigateTo({ url: '/pages/master/list' })">
        <view style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20rpx;">
          <view style="font-size: 32rpx; font-weight: bold; color: #374151;">找师傅</view>
          <view style="width: 72rpx; height: 72rpx; background: #FEE2E2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 36rpx;">👷</view>
        </view>
        <view style="color: #6B7280; font-size: 24rpx;">金牌工长，经验丰富</view>
      </view>
      
      <view style="background: #F9FAFB; border: 2rpx solid #E5E7EB; border-radius: 40rpx; padding: 32rpx; cursor: pointer; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05); position: relative; z-index: 10;" 
           @click="uni.navigateTo({ url: '/pages/product/list' })">
        <view style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20rpx;">
          <view style="font-size: 32rpx; font-weight: bold; color: #374151;">找产品</view>
          <view style="width: 72rpx; height: 72rpx; background: #DBEAFE; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 36rpx;">🧱</view>
        </view>
        <view style="color: #6B7280; font-size: 24rpx;">国标材料，环保安全</view>
      </view>
    </view>

    <view class="section-card" style="margin-top: 30rpx; background: white; margin-left: 40rpx; margin-right: 40rpx; border-radius: 40rpx; padding: 40rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.08); position: relative; z-index: 10; cursor: pointer;" 
         @click="uni.navigateTo({ url: '/pages/review/list' })">
      <view class="section-title" style="font-size: 34rpx; font-weight: bold; color: #333; margin: 0 0 30rpx 0; border-left: 8rpx solid #E60012; padding-left: 20rpx;">客户评价</view>
      <view class="review-list" style="display: flex; flex-direction: column; gap: 20rpx;">
        <view v-for="review in customerReviews" :key="review.id" class="review-item" style="border-bottom: 2rpx solid #f0f0f0; padding-bottom: 20rpx;">
          <view class="review-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10rpx;">
            <view class="reviewer-name" style="font-weight: bold; font-size: 28rpx;">{{ review.name }}</view>
            <view style="color: #F59E0B; font-size: 24rpx;">⭐⭐⭐⭐⭐</view>
          </view>
          <view class="review-content" style="font-size: 26rpx; color: #666;">{{ review.content }}</view>
        </view>
      </view>
      <view style="text-align: right; margin-top: 20rpx; font-size: 24rpx; color: #E60012;">查看更多评价 →</view>
    </view>

    <TabBar />

  </view>
</template>

<style scoped>
/* 保持其他样式 */
</style>