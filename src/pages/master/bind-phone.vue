<template>
  <view class="bind-phone-page" style="min-height: 100vh; background-color: #f5f7fa; display: flex; flex-direction: column;">
    <!-- 红色顶部区域 -->
    <view style="background-color: #CC0010; height: 300rpx; border-bottom-left-radius: 64rpx; border-bottom-right-radius: 64rpx; display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 80rpx;">
      <image src="/static/logo.png" style="width: 160rpx; height: 160rpx; border-radius: 50%; background-color: white; padding: 20rpx; margin-bottom: 32rpx;" />
      <view style="font-size: 40rpx; font-weight: bold; color: white; margin-bottom: 16rpx;">月星防水</view>
      <view style="font-size: 28rpx; color: rgba(255,255,255,0.8);">绑定手机</view>
    </view>

    <!-- 绑定表单 -->
    <view style="flex: 1; padding: 64rpx 40rpx;">
      <view style="background-color: white; border-radius: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 48rpx;">
        <!-- 手机号码输入 -->
        <view style="margin-bottom: 40rpx;">
          <view style="font-size: 28rpx; color: #333; margin-bottom: 16rpx; font-weight: 500;">手机号码</view>
          <view style="border: 2rpx solid #e5e7eb; border-radius: 16rpx; padding: 32rpx; display: flex; align-items: center;">
            <text style="font-size: 32rpx; color: #666; margin-right: 24rpx;">📱</text>
            <input 
              v-model="form.phone" 
              type="tel" 
              placeholder="请输入手机号码" 
              style="flex: 1; font-size: 28rpx; color: #333;"
              placeholder-style="color: #999;"
            />
          </view>
        </view>

        <!-- 验证码输入 -->
        <view style="margin-bottom: 48rpx;">
          <view style="font-size: 28rpx; color: #333; margin-bottom: 16rpx; font-weight: 500;">验证码</view>
          <view style="border: 2rpx solid #e5e7eb; border-radius: 16rpx; padding: 32rpx; display: flex; align-items: center;">
            <text style="font-size: 32rpx; color: #666; margin-right: 24rpx;">🔑</text>
            <input 
              v-model="form.code" 
              type="number" 
              placeholder="请输入验证码" 
              style="flex: 1; font-size: 28rpx; color: #333;"
              placeholder-style="color: #999;"
            />
            <button 
              @click="getCode" 
              :disabled="counting" 
              style="padding: 16rpx 32rpx; background-color: #E60012; color: white; border: none; border-radius: 12rpx; font-size: 24rpx; cursor: pointer;"
            >
              {{ counting ? `${countdown}s` : '获取验证码' }}
            </button>
          </view>
        </view>

        <!-- 绑定按钮 -->
        <button 
          @click="bindPhone" 
          :disabled="loading"
          style="width: 100%; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; margin-bottom: 32rpx; cursor: pointer;"
        >
          {{ loading ? '绑定中...' : '确认绑定' }}
        </button>

        <!-- 提示信息 -->
        <view style="text-align: center;">
          <text style="font-size: 24rpx; color: #666;">
            绑定手机后可以接收工单通知和积分变动提醒
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 绑定表单
const form = ref({
  phone: '',
  code: ''
})

// 加载状态
const loading = ref(false)

// 倒计时状态
const counting = ref(false)
const countdown = ref(60)
let countdownTimer = null

// 获取验证码
const getCode = () => {
  // 验证手机号
  if (!form.value.phone) {
    uni.showToast({ title: '请输入手机号码', icon: 'none' })
    return
  }
  
  if (!/^1[3-9]\d{9}$/.test(form.value.phone)) {
    uni.showToast({ title: '请输入正确的手机号码', icon: 'none' })
    return
  }
  
  // 开始倒计时
  counting.value = true
  countdown.value = 60
  
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer)
      counting.value = false
    }
  }, 1000)
  
  // 模拟发送验证码
  uni.showToast({ title: '验证码已发送', icon: 'success' })
  console.log('发送验证码到:', form.value.phone)
}

// 绑定手机
const bindPhone = async () => {
  // 表单验证
  if (!form.value.phone) {
    uni.showToast({ title: '请输入手机号码', icon: 'none' })
    return
  }
  
  if (!/^1[3-9]\d{9}$/.test(form.value.phone)) {
    uni.showToast({ title: '请输入正确的手机号码', icon: 'none' })
    return
  }
  
  if (!form.value.code) {
    uni.showToast({ title: '请输入验证码', icon: 'none' })
    return
  }
  
  loading.value = true
  
  try {
    // 模拟绑定请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 绑定成功
    uni.showToast({ title: '绑定成功', icon: 'success' })
    
    // 存储绑定信息
    uni.setStorageSync('phone', form.value.phone)
    
    // 返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } catch (error) {
    uni.showToast({ title: '绑定失败，请重试', icon: 'none' })
    console.error('绑定失败:', error)
  } finally {
    loading.value = false
  }
}

// 页面卸载时清除定时器
import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style scoped>
.bind-phone-page {
  background-color: #f5f7fa;
}
</style>