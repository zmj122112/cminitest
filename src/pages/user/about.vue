<script setup>
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 公司信息
const companyInfo = ref({
  name: '月星防水',
  slogan: '专业防水，品质保证',
  established: '1947年',
  address: '上海市浦东新区张江高科技园区博云路2号',
  phone: '400-123-4567',
  email: 'info@yuexingwaterproof.com',
  website: 'www.yuexingwaterproof.com',
  version: 'v1.0.0'
})

// 公司简介
const companyIntro = ref('月星防水成立于1947年，是一家具有70多年历史的国有防水企业。公司专业从事防水工程、防水材料生产和销售，拥有丰富的行业经验和专业的技术团队。\n\n公司秉承"专业、创新、诚信、共赢"的经营理念，致力于为客户提供高品质的防水解决方案。我们的产品和服务涵盖住宅、商业、工业等多个领域，赢得了广大客户的信赖和好评。')

// 联系我们
const contactUs = () => {
  uni.navigateTo({ url: '/pages/user/service' })
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
  <view class="about-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view class="top-nav" style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view class="back-button" style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view class="page-title" style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 80rpx; color: white;">关于我们</view>
    </view>

    <!-- 公司Logo和名称 -->
    <view style="display: flex; flex-direction: column; align-items: center; padding: 60rpx 0; background: white;">
      <view style="width: 160rpx; height: 160rpx; border-radius: 50%; background: #E60012; border: 4rpx solid #E60012; display: flex; align-items: center; justify-content: center; color: white; font-size: 64rpx; font-weight: bold; margin-bottom: 24rpx;">
        月星
      </view>
      <view style="font-size: 36rpx; font-weight: bold; color: #333; margin-bottom: 12rpx;">{{ companyInfo.name }}</view>
      <view style="font-size: 24rpx; color: #666;">{{ companyInfo.slogan }}</view>
    </view>

    <!-- 公司信息 -->
    <view style="padding: 40rpx;">
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">公司简介</view>
        <view style="font-size: 26rpx; color: #666; line-height: 1.6; white-space: pre-line;">
          {{ companyIntro }}
        </view>
      </view>

      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">公司信息</view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0; border-bottom: 2rpx solid #f0f0f0;">
          <div style="font-size: 28rpx; color: #333;">成立时间</div>
          <div style="font-size: 28rpx; color: #666;">{{ companyInfo.established }}</div>
        </view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0; border-bottom: 2rpx solid #f0f0f0;">
          <div style="font-size: 28rpx; color: #333;">公司地址</div>
          <div style="font-size: 28rpx; color: #666;">{{ companyInfo.address }}</div>
        </view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0; border-bottom: 2rpx solid #f0f0f0;">
          <div style="font-size: 28rpx; color: #333;">联系电话</div>
          <div style="font-size: 28rpx; color: #666;">{{ companyInfo.phone }}</div>
        </view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0;">
          <div style="font-size: 28rpx; color: #333;">电子邮箱</div>
          <div style="font-size: 28rpx; color: #666;">{{ companyInfo.email }}</div>
        </view>
      </view>

      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">版本信息</view>
        <view style="display: flex; align-items: center; justify-content: space-between;">
          <div style="font-size: 28rpx; color: #333;">当前版本</div>
          <div style="font-size: 28rpx; color: #666;">{{ companyInfo.version }}</div>
        </view>
      </view>
    </view>

    <!-- 底部联系按钮 -->
    <view style="padding: 0 40rpx 40rpx;">
      <button @click="contactUs" style="width: 100%; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; cursor: pointer;">
        联系我们
      </button>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.about-page {
  padding-bottom: 200rpx;
}
</style>