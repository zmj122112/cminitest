<script setup>
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'

// 产品数据
const product = ref({
  id: 1,
  name: '月星御盾K11通用型防水浆料',
  icon: '🪣',
  features: [
    '法国A+环保认证',
    '超强抗渗',
    '长期水泡',
    '施工便捷'
  ],
  certifications: [
    { name: '法国A+', icon: '🌍' },
    { name: '绿色认证', icon: '🌱' }
  ],
  standard: 'JC/T 2090-2011 (DM型)',
  specification: '20kg/桶',
  introduction: '专为家庭厨卫设计，具有极强的渗透结晶能力，刚柔相济。\n\n月星防水以此产品致敬匠心，采用进口原材料，经过28道工序严格检测。具有超强的粘结力和柔韧性，是家庭防水的理想选择。'
})

// 从路由参数获取产品ID
onLoad((options) => {
  const productId = options.id || '1'
  product.value.id = productId
  // 这里可以添加根据ID获取产品详情的逻辑
  console.log('产品详情页面加载，产品ID:', productId)
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 咨询服务
const goToCustomerService = () => {
  uni.navigateTo({ url: '/pages/user/service' })
}

// ✅ 隐藏原生TabBar
onShow(() => {
  
})
</script>

<template>
  <view class="product-detail-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 页面标题栏 - 包含返回按钮和分享图标 -->
    <view style="background-color: #CC0010; padding: 32rpx 40rpx 48rpx; text-align: center; position: relative; z-index: 30; border-bottom-left-radius: 48rpx; border-bottom-right-radius: 48rpx;">
      <!-- 返回按钮 -->
      <view class="back-button" style="position: absolute; left: 20rpx; top: 20rpx; width: 80rpx; height: 80rpx; display: flex; align-items: center; justify-content: center; color: white; font-size: 40rpx; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%;" @click="goBack">
        ←
      </view>
      
      <!-- 分享图标 -->
      <view style="position: absolute; right: 20rpx; top: 20rpx; color: white; font-size: 40rpx; cursor: pointer; z-index: 99999;">
        🔗
      </view>
      
      <!-- 空div用于占位，确保标题栏高度足够 -->
      <view style="height: 40rpx;"></view>
    </view>

    <!-- 产品图标 -->
    <view style="display: flex; justify-content: center; align-items: center; padding: 40rpx 0; position: relative; z-index: 20; margin-top: -60rpx;">
      <view style="background: white; border-radius: 50%; padding: 32rpx; box-shadow: 0 8rpx 40rpx rgba(0,0,0,0.15); width: 240rpx; height: 240rpx; display: flex; align-items: center; justify-content: center; font-size: 120rpx;">
        {{ product.icon }}
      </view>
    </view>

    <!-- 产品名称 -->
    <view style="padding: 0 40rpx 32rpx; text-align: center;">
      <view style="font-size: 36rpx; font-weight: bold; color: #111827; margin: 0 0 16rpx 0;">{{ product.name }}</view>
    </view>

    <!-- 产品特点 -->
    <view style="padding: 0 40rpx 32rpx;">
      <view style="display: flex; flex-wrap: wrap; gap: 16rpx; justify-content: center;">
        <view v-for="(feature, index) in product.features" :key="index" style="display: flex; align-items: center; gap: 12rpx; background: #FFF0F0; color: #CC0010; padding: 12rpx 24rpx; border-radius: 20rpx; font-size: 26rpx; font-weight: 500;">
          <span style="font-size: 24rpx;">✅</span>
          {{ feature }}
        </view>
      </view>
    </view>

    <!-- 认证信息 -->
    <view style="padding: 0 40rpx 40rpx;">
      <view style="display: flex; gap: 32rpx; justify-content: center;">
        <view v-for="(cert, index) in product.certifications" :key="index" style="display: flex; flex-direction: column; align-items: center; gap: 16rpx;">
          <view style="width: 96rpx; height: 96rpx; background: #F0F9FF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 48rpx;">
            {{ cert.icon }}
          </view>
          <view style="font-size: 24rpx; color: #6b7280;">{{ cert.name }}</view>
        </view>
      </view>
    </view>

    <!-- 产品标准和规格 -->
    <view style="background: white; margin: 0 40rpx 32rpx; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <view style="display: flex; justify-content: space-between; align-items: center; padding: 20rpx 0; border-bottom: 2rpx solid #E5E7EB;">
        <view style="font-size: 28rpx; color: #6b7280;">执行标准</view>
        <view style="font-size: 28rpx; color: #111827; font-weight: 500;">{{ product.standard }}</view>
      </view>
      <view style="display: flex; justify-content: space-between; align-items: center; padding: 20rpx 0;">
        <view style="font-size: 28rpx; color: #6b7280;">包装规格</view>
        <view style="font-size: 28rpx; color: #111827; font-weight: 500;">{{ product.specification }}</view>
      </view>
    </view>

    <!-- 产品简介 -->
    <view style="background: white; margin: 0 40rpx 32rpx; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <view style="font-size: 32rpx; font-weight: bold; color: #111827; margin: 0 0 24rpx 0; padding-bottom: 16rpx; border-bottom: 2rpx solid #E5E7EB;">产品简介</view>
      <view style="color: #6b7280; line-height: 1.6; font-size: 26rpx; white-space: pre-line;">
        {{ product.introduction }}
      </view>
    </view>

    <!-- 底部操作按钮 -->
    <view style="padding: 0 40rpx 40rpx;">
      <button @click="goToCustomerService" style="width: 100%; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
        立即咨询
      </button>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.product-detail-page {
  padding-bottom: 200rpx;
}
</style>