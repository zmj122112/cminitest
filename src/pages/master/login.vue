<template>
  <view class="master-login-page" style="min-height: 100vh; background-color: #f5f7fa; display: flex; flex-direction: column;">
    <!-- 顶部红色区域 -->
    <view style="background-color: #CC0010; height: 300rpx; border-bottom-left-radius: 64rpx; border-bottom-right-radius: 64rpx; display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 80rpx;">
      <image src="/static/logo.png" style="width: 160rpx; height: 160rpx; border-radius: 50%; background-color: white; padding: 20rpx; margin-bottom: 32rpx;" />
      <view style="font-size: 40rpx; font-weight: bold; color: white; margin-bottom: 16rpx;">月星防水</view>
      <view style="font-size: 28rpx; color: rgba(255,255,255,0.8);">师傅登录</view>
    </view>

    <!-- 登录表单 -->
    <view style="flex: 1; padding: 64rpx 40rpx;">
      <view style="background-color: white; border-radius: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 48rpx;">
        <!-- 账号输入 -->
        <view style="margin-bottom: 40rpx;">
          <view style="font-size: 28rpx; color: #333; margin-bottom: 16rpx; font-weight: 500;">账号</view>
          <view style="border: 2rpx solid #e5e7eb; border-radius: 16rpx; padding: 32rpx; display: flex; align-items: center;">
            <text style="font-size: 32rpx; color: #666; margin-right: 24rpx;">👤</text>
            <input 
              v-model="form.username" 
              type="text" 
              placeholder="请输入师傅账号" 
              style="flex: 1; font-size: 28rpx; color: #333;"
              placeholder-style="color: #999;"
            />
          </view>
        </view>

        <!-- 密码输入 -->
        <view style="margin-bottom: 48rpx;">
          <view style="font-size: 28rpx; color: #333; margin-bottom: 16rpx; font-weight: 500;">密码</view>
          <view style="border: 2rpx solid #e5e7eb; border-radius: 16rpx; padding: 32rpx; display: flex; align-items: center;">
            <text style="font-size: 32rpx; color: #666; margin-right: 24rpx;">🔒</text>
            <input 
              v-model="form.password" 
              type="password" 
              placeholder="请输入密码" 
              style="flex: 1; font-size: 28rpx; color: #333;"
              placeholder-style="color: #999;"
            />
          </view>
        </view>

        <!-- 登录按钮 -->
        <button 
          @click="login" 
          style="width: 100%; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; margin-bottom: 32rpx;"
          :disabled="loading"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <!-- 忘记密码 -->
        <view style="display: flex; justify-content: flex-end;">
          <text style="font-size: 24rpx; color: #666; cursor: pointer;">忘记密码？</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 登录表单
const form = ref({
  username: '',
  password: ''
})

// 加载状态
const loading = ref(false)

// 登录方法
const login = async () => {
  // 表单验证
  if (!form.value.username) {
    uni.showToast({ title: '请输入账号', icon: 'none' })
    return
  }
  if (!form.value.password) {
    uni.showToast({ title: '请输入密码', icon: 'none' })
    return
  }

  loading.value = true

  try {
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 登录成功，存储用户信息
    const userInfo = {
      id: '1',
      username: form.value.username,
      role: 'master',
      token: 'mock-token-' + Date.now()
    }
    
    uni.setStorageSync('userInfo', userInfo)
    
    // 登录成功提示
    uni.showToast({ title: '登录成功', icon: 'success' })
    
    // 跳转到师傅工作台
      setTimeout(() => {
        uni.reLaunch({ url: '/pages/master/dashboard' })
      }, 1000)
  } catch (error) {
    uni.showToast({ title: '登录失败，请检查账号密码', icon: 'none' })
    console.error('登录失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.master-login-page {
  background-color: #f5f7fa;
}
</style>