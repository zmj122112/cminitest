<script setup>
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 安全选项
const securityOptions = ref([
  {
    id: 1,
    title: '修改密码',
    icon: '🔑',
    description: '修改登录密码',
    action: 'changePassword'
  },
  {
    id: 2,
    title: '手机绑定',
    icon: '📱',
    description: '绑定或更换手机号',
    action: 'bindPhone'
  },
  {
    id: 3,
    title: '邮箱绑定',
    icon: '📧',
    description: '绑定或更换邮箱',
    action: 'bindEmail'
  },
  {
    id: 4,
    title: '登录设备管理',
    icon: '💻',
    description: '查看和管理登录设备',
    action: 'deviceManagement'
  },
  {
    id: 5,
    title: '安全设置',
    icon: '🛡️',
    description: '设置安全验证方式',
    action: 'securitySettings'
  }
])

// 执行安全操作
const performAction = (action) => {
  console.log('执行安全操作:', action)
  uni.showToast({ title: '功能开发中', icon: 'none' })
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
  <view class="security-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view class="top-nav" style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view class="back-button" style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view class="page-title" style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 80rpx; color: white;">账户安全</view>
    </view>

    <!-- 安全提示 -->
    <view style="background: #FFF5F5; margin: 32rpx 40rpx; border-radius: 24rpx; padding: 32rpx; border: 2rpx solid #FEE2E2;">
      <view style="display: flex; align-items: flex-start; gap: 20rpx;">
        <div style="font-size: 40rpx;">⚠️</div>
        <div style="flex: 1;">
          <div style="font-size: 28rpx; font-weight: bold; color: #CC0010; margin-bottom: 12rpx;">安全提示</div>
          <div style="font-size: 24rpx; color: #666; line-height: 1.5;">
            请定期修改密码，不要使用简单密码，确保账户安全。如发现异常登录，请及时联系客服。
          </div>
        </div>
      </view>
    </view>

    <!-- 安全选项列表 -->
    <view style="padding: 0 40rpx;">
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <view v-for="option in securityOptions" :key="option.id" 
             style="display: flex; align-items: center; justify-content: space-between; padding: 28rpx 0; border-bottom: 2rpx solid #f0f0f0;"
             @click="performAction(option.action)"
             @touchstart="$event.currentTarget.style.backgroundColor = '#f9fafb'"
             @touchend="$event.currentTarget.style.backgroundColor = 'transparent'"
        >
          <div style="display: flex; align-items: center; gap: 24rpx;">
            <div style="font-size: 48rpx;">{{ option.icon }}</div>
            <div>
              <div style="font-size: 28rpx; color: #333; margin-bottom: 4rpx;">{{ option.title }}</div>
              <div style="font-size: 24rpx; color: #666;">{{ option.description }}</div>
            </div>
          </div>
          <div style="font-size: 32rpx; color: #999;">→</div>
        </view>
      </view>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.security-page {
  padding-bottom: 200rpx;
}
</style>