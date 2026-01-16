<script setup>
// ✅ 引入组件
import TabBar from '@/components/TabBar.vue'
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 客服联系方式
const contactMethods = ref([
  {
    id: 1,
    type: 'phone',
    name: '客服热线',
    value: '400-123-4567',
    icon: '📞',
    action: 'call'
  },
  {
    id: 2,
    type: 'wechat',
    name: '企业微信',
    value: 'yuexingwaterproof',
    icon: '💬',
    action: 'wechat'
  },
  {
    id: 3,
    type: 'email',
    name: '电子邮箱',
    value: 'service@yuexingwaterproof.com',
    icon: '📧',
    action: 'email'
  },
  {
    id: 4,
    type: 'worktime',
    name: '工作时间',
    value: '周一至周日 8:00-20:00',
    icon: '⏰',
    action: 'info'
  }
])

// 常见问题
const faqs = ref([
  {
    id: 1,
    question: '如何预约上门服务？',
    answer: '您可以通过小程序首页的"漏水维修"或"新房防水"入口，填写预约信息后提交，我们会尽快安排师傅上门服务。'
  },
  {
    id: 2,
    question: '服务范围包括哪些区域？',
    answer: '我们的服务范围覆盖上海市全境，包括浦东新区、静安区、徐汇区、长宁区、普陀区、虹口区、杨浦区、黄浦区、嘉定区、闵行区、宝山区、松江区、青浦区、奉贤区、金山区、崇明区等。'
  },
  {
    id: 3,
    question: '维修后有质保期吗？',
    answer: '是的，我们提供专业的质保服务，不同类型的维修有不同的质保期，一般为1-5年，具体以实际维修方案为准。'
  }
])

// 联系客服
const contactService = (method) => {
  console.log('联系客服:', method)
  switch (method.type) {
    case 'phone':
      uni.makePhoneCall({ phoneNumber: method.value })
      break
    case 'wechat':
      uni.showToast({ title: '请搜索企业微信: ' + method.value, icon: 'none' })
      break
    case 'email':
      uni.showToast({ title: '请发送邮件至: ' + method.value, icon: 'none' })
      break
    default:
      uni.showToast({ title: '功能开发中', icon: 'none' })
  }
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

onMounted(() => {
  console.log('联系客服页面加载')
})

// ✅ 隐藏原生TabBar
onShow(() => {
  
})
</script>

<template>
  <view class="contact-service-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view class="top-nav" style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view class="back-button" style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view class="page-title" style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 80rpx; color: white;">联系客服</view>
    </view>

    <!-- 客服联系方式 -->
    <view style="padding: 32rpx;">
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">联系方式</view>
        
        <view v-for="method in contactMethods" :key="method.id" 
             style="display: flex; align-items: center; justify-content: space-between; padding: 24rpx 0; border-bottom: 2rpx solid #f0f0f0;"
             @click="contactService(method)"
             @touchstart="$event.currentTarget.style.backgroundColor = '#f9fafb'"
             @touchend="$event.currentTarget.style.backgroundColor = 'transparent'"
        >
          <div style="display: flex; align-items: center; gap: 24rpx;">
            <div style="font-size: 48rpx;">{{ method.icon }}</div>
            <div>
              <div style="font-size: 28rpx; font-weight: medium; color: #333;">{{ method.name }}</div>
              <div style="font-size: 24rpx; color: #666;">{{ method.value }}</div>
            </div>
          </div>
          <div style="font-size: 32rpx; color: #999;">→</div>
        </view>
      </view>

      <!-- 常见问题 -->
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">常见问题</view>
        
        <view v-for="faq in faqs" :key="faq.id" style="margin-bottom: 32rpx;">
          <div style="font-size: 28rpx; font-weight: medium; color: #333; margin-bottom: 16rpx;">{{ faq.question }}</div>
          <div style="font-size: 24rpx; color: #666; line-height: 1.5;">{{ faq.answer }}</div>
        </view>
      </view>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.contact-service-page {
  padding-bottom: 200rpx;
}
</style>
