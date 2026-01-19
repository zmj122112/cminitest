<template>
  <view class="about-us-page" style="min-height: 100vh; background-color: #f5f7fa;">
    <!-- 顶部导航 -->
    <view style="position: fixed; top: 0; left: 0; right: 0; background-color: #CC0010; color: white; padding: 20rpx 40rpx; display: flex; align-items: center; z-index: 999;">
      <text style="font-size: 32rpx; margin-right: 20rpx; cursor: pointer;" @click="goBack">←</text>
      <view style="font-size: 28rpx; font-weight: bold; flex: 1; text-align: center;">关于我们</view>
      <view style="width: 32rpx;"></view> <!-- 占位，保持标题居中 -->
    </view>

    <!-- 公司信息 -->
    <view style="padding: 120rpx 40rpx 40rpx;">
      <!-- 公司简介 -->
      <view style="background-color: white; border-radius: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 48rpx; margin-bottom: 24rpx;">
        <view style="text-align: center; margin-bottom: 32rpx;">
          <image src="/static/logo.png" style="width: 160rpx; height: 160rpx; border-radius: 50%; background-color: #f5f7fa; padding: 20rpx; margin-bottom: 24rpx;" />
          <view style="font-size: 36rpx; font-weight: bold; color: #111827; margin-bottom: 16rpx;">月星防水</view>
          <view style="font-size: 24rpx; color: #6b7280;">Since 1947</view>
        </view>
        
        <view style="line-height: 1.8; color: #374151;">
          <p style="font-size: 24rpx; margin-bottom: 16rpx;">
            月星防水成立于1947年，是国内领先的防水系统解决方案提供商。经过70多年的发展，我们已成为集研发、生产、销售、施工、服务于一体的综合性防水企业。
          </p>
          <p style="font-size: 24rpx; margin-bottom: 16rpx;">
            我们拥有一支专业的施工队伍，配备先进的施工设备和检测仪器，为客户提供高质量的防水服务。同时，我们建立了完善的师傅管理体系，通过积分激励机制，不断提升服务质量。
          </p>
          <p style="font-size: 24rpx; margin-bottom: 16rpx;">
            月星防水秉承"诚信、创新、专业、服务"的企业精神，致力于为客户创造安全、舒适的生活环境。
          </p>
        </view>
      </view>

      <!-- 发展历程 -->
      <view style="background-color: white; border-radius: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 48rpx; margin-bottom: 24rpx;">
        <view style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 32rpx;">发展历程</view>
        <view class="timeline">
          <view v-for="(event, index) in developmentEvents" :key="index" class="timeline-item" style="display: flex; margin-bottom: 32rpx;">
            <view class="timeline-dot" style="width: 20rpx; height: 20rpx; background-color: #E60012; border-radius: 50%; margin-right: 24rpx; margin-top: 8rpx;"></view>
            <view class="timeline-content" style="flex: 1;">
              <view class="event-year" style="font-size: 24rpx; font-weight: 600; color: #111827; margin-bottom: 8rpx;">{{ event.year }}</view>
              <view class="event-description" style="font-size: 22rpx; color: #6b7280; line-height: 1.6;">{{ event.description }}</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 企业文化 -->
      <view style="background-color: white; border-radius: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 48rpx; margin-bottom: 24rpx;">
        <view style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 32rpx;">企业文化</view>
        <view class="culture-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 24rpx;">
          <view v-for="(item, index) in corporateCulture" :key="index" class="culture-item" style="background-color: #f9fafb; border-radius: 16rpx; padding: 24rpx;">
            <view class="culture-title" style="font-size: 24rpx; font-weight: 600; color: #E60012; margin-bottom: 12rpx;">{{ item.title }}</view>
            <view class="culture-content" style="font-size: 22rpx; color: #6b7280; line-height: 1.6;">{{ item.content }}</view>
          </view>
        </view>
      </view>

      <!-- 联系我们 -->
      <view style="background-color: white; border-radius: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 48rpx;">
        <view style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 32rpx;">联系我们</view>
        <view class="contact-info" style="display: flex; flex-direction: column; gap: 24rpx;">
          <view class="contact-item" style="display: flex; align-items: center;">
            <text class="contact-icon" style="font-size: 28rpx; margin-right: 24rpx;">📍</text>
            <div class="contact-details">
              <span class="contact-label" style="font-size: 22rpx; color: #6b7280; display: block; margin-bottom: 4rpx;">公司地址</span>
              <span class="contact-value" style="font-size: 24rpx; color: #111827;">上海市浦东新区张江高科技园区博云路2号</span>
            </div>
          </view>
          <view class="contact-item" style="display: flex; align-items: center;">
            <text class="contact-icon" style="font-size: 28rpx; margin-right: 24rpx;">📞</text>
            <div class="contact-details">
              <span class="contact-label" style="font-size: 22rpx; color: #6b7280; display: block; margin-bottom: 4rpx;">联系电话</span>
              <span class="contact-value" style="font-size: 24rpx; color: #111827;">400-123-4567</span>
            </div>
          </view>
          <view class="contact-item" style="display: flex; align-items: center;">
            <text class="contact-icon" style="font-size: 28rpx; margin-right: 24rpx;">✉️</text>
            <div class="contact-details">
              <span class="contact-label" style="font-size: 22rpx; color: #6b7280; display: block; margin-bottom: 4rpx;">电子邮箱</span>
              <span class="contact-value" style="font-size: 24rpx; color: #111827;">info@yuexing.com</span>
            </div>
          </view>
          <view class="contact-item" style="display: flex; align-items: center;">
            <text class="contact-icon" style="font-size: 28rpx; margin-right: 24rpx;">🕐</text>
            <div class="contact-details">
              <span class="contact-label" style="font-size: 22rpx; color: #6b7280; display: block; margin-bottom: 4rpx;">工作时间</span>
              <span class="contact-value" style="font-size: 24rpx; color: #111827;">周一至周日 9:00-18:00</span>
            </div>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 发展历程事件
const developmentEvents = ref([
  { year: '1947年', description: '月星防水成立，开始从事防水工程业务' },
  { year: '1985年', description: '引入现代化生产设备，开始自主生产防水材料' },
  { year: '2000年', description: '建立全国营销网络，业务拓展至全国' },
  { year: '2010年', description: '成立专业施工队伍，提供一站式防水服务' },
  { year: '2015年', description: '推出师傅管理系统，提升服务质量' },
  { year: '2020年', description: '开发小程序平台，实现数字化管理' },
  { year: '2023年', description: '推出积分激励机制，进一步提升师傅积极性' }
])

// 企业文化
const corporateCulture = ref([
  { title: '企业使命', content: '为客户创造安全、舒适的生活环境' },
  { title: '企业愿景', content: '成为国内领先的防水系统解决方案提供商' },
  { title: '核心价值观', content: '诚信、创新、专业、服务' },
  { title: '企业精神', content: '团结拼搏、追求卓越' }
])

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}
</script>

<style scoped>
.about-us-page {
  padding-bottom: 40rpx;
}
</style>