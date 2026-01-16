<script setup>
// ✅ 引入组件
import TabBar from '@/components/TabBar.vue'
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 反馈类型
const feedbackTypes = ref([
  '服务质量',
  '产品问题',
  '技术支持',
  '建议反馈',
  '其他问题'
])

// 表单数据
const formData = ref({
  type: '服务质量',
  content: '',
  contact: ''
})

// 提交反馈
const submitFeedback = () => {
  if (!formData.value.content) {
    return uni.showToast({ title: '请输入反馈内容', icon: 'none' })
  }
  
  console.log('提交反馈:', formData.value)
  uni.showToast({ 
    title: '反馈提交成功，我们会尽快处理', 
    icon: 'success',
    duration: 2000
  })
  
  // 清空表单
  formData.value = {
    type: '服务质量',
    content: '',
    contact: ''
  }
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

onMounted(() => {
  console.log('问题反馈页面加载')
})

// ✅ 隐藏原生TabBar
onShow(() => {
  
})
</script>

<template>
  <view class="feedback-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view class="top-nav" style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view class="back-button" style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view class="page-title" style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 80rpx; color: white;">问题反馈</view>
    </view>

    <!-- 反馈表单 -->
    <view style="padding: 32rpx;">
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <!-- 反馈类型 -->
        <view style="margin-bottom: 32rpx;">
          <label style="display: block; margin-bottom: 16rpx; color: #333; font-size: 28rpx; font-weight: medium;">反馈类型</label>
          <picker :range="feedbackTypes" :value="feedbackTypes.indexOf(formData.type)" @change="formData.type = feedbackTypes[$event.detail.value]" style="width: 100%; padding: 24rpx 32rpx; border: 2rpx solid #E5E7EB; border-radius: 16rpx; font-size: 28rpx; background: white;">
            <view style="color: #666;">{{ formData.type }}</view>
          </picker>
        </view>

        <!-- 反馈内容 -->
        <view style="margin-bottom: 32rpx;">
          <label style="display: block; margin-bottom: 16rpx; color: #333; font-size: 28rpx; font-weight: medium;">反馈内容</label>
          <textarea v-model="formData.content" placeholder="请详细描述您的问题或建议" style="width: 100%; height: 320rpx; padding: 24rpx 32rpx; border: 2rpx solid #E5E7EB; border-radius: 16rpx; font-size: 28rpx; background: white; resize: none;"></textarea>
        </view>

        <!-- 联系方式 -->
        <view style="margin-bottom: 48rpx;">
          <label style="display: block; margin-bottom: 16rpx; color: #333; font-size: 28rpx; font-weight: medium;">联系方式（选填）</label>
          <input v-model="formData.contact" placeholder="请留下您的联系电话或微信" style="width: 100%; padding: 24rpx 32rpx; border: 2rpx solid #E5E7EB; border-radius: 16rpx; font-size: 28rpx; background: white;">
        </view>

        <!-- 提交按钮 -->
        <button @click="submitFeedback" style="width: 100%; background-color: #E60012; color: white; border: none; border-radius: 16rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
          提交反馈
        </button>
      </view>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.feedback-page {
  padding-bottom: 200rpx;
}
</style>
