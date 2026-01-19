<script setup>
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'

// 师傅数据
const master = ref({
  id: 1,
  name: '张建国',
  avatar: '张',
  jobNumber: 'YX20250001',
  title: '金牌工长',
  rating: 4.9,
  reviewCount: 286,
  experience: '15年',
  completedOrders: 1280,
  specialties: ['屋顶补漏', '卫生间防水', '外墙防水', '擅长疑难杂症'],
  introduction: '从事防水行业15年，曾参与多个市级重点工程防水项目。经验丰富，对各种渗漏水源头判断精准，施工细致。',
  certifications: [
    '实名认证',
    '金牌工长',
    '持证上岗',
    '国企背景'
  ],
  serviceArea: '上海市·浦东新区'
})

// 从路由参数获取师傅ID
onLoad((options) => {
  const masterId = options.id || '1'
  master.value.id = masterId
  // 这里可以添加根据ID获取师傅详情的逻辑
  console.log('师傅详情页面加载，ID:', masterId)
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 预约服务
const goToRepairEstimate = () => {
  uni.setStorageSync('repairType', 'repair')
  uni.reLaunch({ url: '/pages/repair/estimate' })
}

// ✅ 隐藏原生TabBar
onShow(() => {
  
})
</script>

<template>
  <view class="master-detail-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 师傅基本信息 - 红色顶部背景 -->
    <view style="background-color: #CC0010; padding: 32rpx 40rpx 48rpx; text-align: center; position: relative; z-index: 30; border-bottom-left-radius: 48rpx; border-bottom-right-radius: 48rpx;">
      <!-- 返回按钮 -->
      <view class="back-button" style="position: absolute; left: 20rpx; top: 20rpx; width: 80rpx; height: 80rpx; display: flex; align-items: center; justify-content: center; color: white; font-size: 40rpx; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%;" @click="goBack">
        ←
      </view>
      
      <view style="width: 160rpx; height: 160rpx; border-radius: 50%; background: white; border: 4rpx solid white; margin-bottom: 16rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; color: #CC0010; font-size: 64rpx; font-weight: bold; margin: 0 auto 16rpx;">
        {{ master.avatar }}
      </view>
      
      <view style="font-size: 36rpx; font-weight: bold; color: white; margin: 0 0 8rpx 0;">{{ master.name }}</view>
      <view style="font-size: 24rpx; color: rgba(255,255,255,0.9); margin-bottom: 24rpx;">工号：{{ master.jobNumber }}</view>
      
      <!-- 经验、评分、服务数据 -->
      <view style="display: flex; justify-content: center; gap: 48rpx; margin-bottom: 16rpx;">
        <view>
          <view style="font-size: 36rpx; font-weight: bold; color: white;">{{ master.experience }}</view>
          <view style="font-size: 22rpx; color: rgba(255,255,255,0.8);">经验</view>
        </view>
        <view>
          <view style="font-size: 36rpx; font-weight: bold; color: white;">{{ master.rating }}</view>
          <view style="font-size: 22rpx; color: rgba(255,255,255,0.8);">评分</view>
        </view>
        <view>
          <view style="font-size: 36rpx; font-weight: bold; color: white;">{{ master.completedOrders }}</view>
          <view style="font-size: 22rpx; color: rgba(255,255,255,0.8);">服务</view>
        </view>
      </view>
    </view>

    <!-- 认证信息 -->
    <view style="background: white; margin: 0 40rpx 32rpx; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); position: relative; z-index: 20;">
      <view style="font-size: 32rpx; font-weight: bold; color: #111827; margin-bottom: 24rpx;">认证信息</view>
      <view style="display: flex; flex-wrap: wrap; gap: 16rpx;">
        <view v-for="(cert, index) in master.certifications" :key="index" style="background: #D1FAE5; color: #059669; font-size: 24rpx; padding: 8rpx 24rpx; border-radius: 20rpx; border: 2rpx solid #A7F3D0;">{{ cert }}</view>
        <view style="background: #BFDBFE; color: #2563EB; font-size: 24rpx; padding: 8rpx 24rpx; border-radius: 20rpx; border: 2rpx solid #93C5FD;">月星防水官方认证</view>
      </view>
    </view>

    <!-- 个人简介 -->
    <view style="background: white; margin: 0 40rpx 32rpx; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <view style="font-size: 32rpx; font-weight: bold; color: #111827; margin: 0 0 24rpx 0;">个人简介</view>
      <view style="color: #6b7280; line-height: 1.6; font-size: 26rpx;">
        {{ master.introduction }}
      </view>
    </view>

    <!-- 专长标签 -->
    <view style="background: white; margin: 0 40rpx 32rpx; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <view style="font-size: 32rpx; font-weight: bold; color: #111827; margin: 0 0 24rpx 0;">专长领域</view>
      <view style="display: flex; flex-wrap: wrap; gap: 16rpx;">
        <view v-for="(specialty, index) in master.specialties" :key="index" style="background: #FEE2E2; color: #CC0010; font-size: 26rpx; padding: 12rpx 32rpx; border-radius: 24rpx;">{{ specialty }}</view>
      </view>
    </view>

    <!-- 服务区域 -->
    <view style="background: white; margin: 0 40rpx 32rpx; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <view style="font-size: 32rpx; font-weight: bold; color: #111827; margin: 0 0 24rpx 0;">服务区域</view>
      <view style="color: #6b7280; line-height: 1.6; font-size: 26rpx;">
        {{ master.serviceArea }}
      </view>
    </view>

    <!-- 底部操作按钮 -->
    <view style="padding: 0 40rpx 40rpx;">
      <button @click="goToRepairEstimate" style="width: 100%; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
        立即预约
      </button>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.master-detail-page {
  padding-bottom: 200rpx;
}
</style>