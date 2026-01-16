<template>
  <view class="change-password-page" style="min-height: 100vh; background-color: #f5f7fa; display: flex; flex-direction: column;">
    <!-- 红色顶部区域 -->
    <view style="background-color: #CC0010; height: 300rpx; border-bottom-left-radius: 64rpx; border-bottom-right-radius: 64rpx; display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 80rpx;">
      <image src="/static/logo.png" style="width: 160rpx; height: 160rpx; border-radius: 50%; background-color: white; padding: 20rpx; margin-bottom: 32rpx;" />
      <view style="font-size: 40rpx; font-weight: bold; color: white; margin-bottom: 16rpx;">月星防水</view>
      <view style="font-size: 28rpx; color: rgba(255,255,255,0.8);">修改密码</view>
    </view>

    <!-- 修改密码表单 -->
    <view style="flex: 1; padding: 64rpx 40rpx;">
      <view style="background-color: white; border-radius: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 48rpx;">
        <!-- 原密码输入 -->
        <view style="margin-bottom: 40rpx;">
          <view style="font-size: 28rpx; color: #333; margin-bottom: 16rpx; font-weight: 500;">原密码</view>
          <view style="border: 2rpx solid #e5e7eb; border-radius: 16rpx; padding: 32rpx; display: flex; align-items: center;">
            <text style="font-size: 32rpx; color: #666; margin-right: 24rpx;">🔒</text>
            <input 
              v-model="form.oldPassword" 
              type="password" 
              placeholder="请输入原密码" 
              style="flex: 1; font-size: 28rpx; color: #333;"
              placeholder-style="color: #999;"
            />
          </view>
        </view>

        <!-- 新密码输入 -->
        <view style="margin-bottom: 40rpx;">
          <view style="font-size: 28rpx; color: #333; margin-bottom: 16rpx; font-weight: 500;">新密码</view>
          <view style="border: 2rpx solid #e5e7eb; border-radius: 16rpx; padding: 32rpx; display: flex; align-items: center;">
            <text style="font-size: 32rpx; color: #666; margin-right: 24rpx;">🔒</text>
            <input 
              v-model="form.newPassword" 
              type="password" 
              placeholder="请输入新密码" 
              style="flex: 1; font-size: 28rpx; color: #333;"
              placeholder-style="color: #999;"
            />
          </view>
        </view>

        <!-- 确认新密码输入 -->
        <view style="margin-bottom: 48rpx;">
          <view style="font-size: 28rpx; color: #333; margin-bottom: 16rpx; font-weight: 500;">确认新密码</view>
          <view style="border: 2rpx solid #e5e7eb; border-radius: 16rpx; padding: 32rpx; display: flex; align-items: center;">
            <text style="font-size: 32rpx; color: #666; margin-right: 24rpx;">🔒</text>
            <input 
              v-model="form.confirmPassword" 
              type="password" 
              placeholder="请再次输入新密码" 
              style="flex: 1; font-size: 28rpx; color: #333;"
              placeholder-style="color: #999;"
            />
          </view>
        </view>

        <!-- 修改按钮 -->
        <button 
          @click="changePassword" 
          :disabled="loading"
          style="width: 100%; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; margin-bottom: 32rpx; cursor: pointer;"
        >
          {{ loading ? '修改中...' : '确认修改' }}
        </button>

        <!-- 密码规则提示 -->
        <view style="background-color: #f9fafb; border-radius: 16rpx; padding: 24rpx;">
          <text style="font-size: 24rpx; color: #666; line-height: 1.6;">
            密码规则：\n
            1. 密码长度至少6位\n
            2. 建议包含字母、数字和特殊字符\n
            3. 请勿使用与账号相关的密码
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 修改密码表单
const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 加载状态
const loading = ref(false)

// 修改密码
const changePassword = async () => {
  // 表单验证
  if (!form.value.oldPassword) {
    uni.showToast({ title: '请输入原密码', icon: 'none' })
    return
  }
  
  if (!form.value.newPassword) {
    uni.showToast({ title: '请输入新密码', icon: 'none' })
    return
  }
  
  if (form.value.newPassword.length < 6) {
    uni.showToast({ title: '新密码长度至少6位', icon: 'none' })
    return
  }
  
  if (form.value.newPassword !== form.value.confirmPassword) {
    uni.showToast({ title: '两次输入的密码不一致', icon: 'none' })
    return
  }
  
  loading.value = true
  
  try {
    // 模拟修改密码请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 修改成功
    uni.showToast({ title: '密码修改成功', icon: 'success' })
    
    // 清空表单
    form.value = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    
    // 返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } catch (error) {
    uni.showToast({ title: '修改失败，请重试', icon: 'none' })
    console.error('修改密码失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.change-password-page {
  background-color: #f5f7fa;
}
</style>