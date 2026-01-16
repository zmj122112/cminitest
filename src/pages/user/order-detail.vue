<script setup>
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'

// 订单数据
const order = ref({
  id: 1,
  orderNumber: 'YX20260116001',
  serviceType: '卫生间漏水',
  status: '待上门',
  createTime: '2026-01-16 10:30',
  appointmentTime: '2026-01-17 14:00-16:00',
  amount: 2000,
  address: '上海市浦东新区张江高科技园区博云路2号',
  contactName: '张三',
  contactPhone: '13800138000',
  description: '卫生间顶部漏水，需要上门检测和维修',
  master: null,
  progress: [
    {
      status: '已下单',
      time: '2026-01-16 10:30',
      description: '订单创建成功'
    },
    {
      status: '待上门',
      time: '2026-01-16 10:35',
      description: '等待师傅上门服务'
    }
  ]
})

// 从路由参数获取订单ID
onLoad((options) => {
  const orderId = options.id || '1'
  order.value.id = orderId
  // 这里可以添加根据ID获取订单详情的逻辑
  console.log('订单详情页面加载，ID:', orderId)
})

// 联系客服
const contactService = () => {
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
  <view class="order-detail-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view class="top-nav" style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view class="back-button" style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view class="page-title" style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 80rpx; color: white;">订单详情</view>
    </view>

    <!-- 订单状态 -->
    <view :style="{
      background: order.status === '已完成' ? '#D1FAE5' : order.status === '待上门' ? '#FEF3C7' : order.status === '服务中' ? '#DBEAFE' : '#FEE2E2',
      padding: '40rpx',
      margin: '40rpx',
      borderRadius: '32rpx',
      textAlign: 'center',
      boxShadow: '0 8rpx 24rpx rgba(0,0,0,0.1)'
    }">
      <view :style="{
        color: order.status === '已完成' ? '#059669' : order.status === '待上门' ? '#D97706' : order.status === '服务中' ? '#2563EB' : '#DC2626',
        fontSize: '36rpx',
        fontWeight: 'bold',
        marginBottom: '16rpx'
      }">
        {{ order.status }}
      </view>
      <view :style="{
        color: order.status === '已完成' ? '#059669' : order.status === '待上门' ? '#D97706' : order.status === '服务中' ? '#2563EB' : '#DC2626',
        fontSize: '26rpx',
        opacity: '0.8'
      }">
        {{ order.status === '待上门' ? '师傅将在预约时间上门服务' : order.status === '服务中' ? '师傅正在为您服务' : order.status === '已完成' ? '服务已完成，感谢您的信任' : '订单已取消' }}
      </view>
    </view>

    <!-- 订单信息 -->
    <view style="padding: 0 40rpx;">
      <!-- 服务信息 -->
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">服务信息</view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0; border-bottom: 2rpx solid #f0f0f0;">
          <div style="font-size: 28rpx; color: #333;">服务类型</div>
          <div style="font-size: 28rpx; color: #666;">{{ order.serviceType }}</div>
        </view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0; border-bottom: 2rpx solid #f0f0f0;">
          <div style="font-size: 28rpx; color: #333;">预约时间</div>
          <div style="font-size: 28rpx; color: #666;">{{ order.appointmentTime }}</div>
        </view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0; border-bottom: 2rpx solid #f0f0f0;">
          <div style="font-size: 28rpx; color: #333;">服务地址</div>
          <div style="font-size: 28rpx; color: #666;">{{ order.address }}</div>
        </view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0;">
          <div style="font-size: 28rpx; color: #333;">联系电话</div>
          <div style="font-size: 28rpx; color: #666;">{{ order.contactPhone }}</div>
        </view>
      </view>

      <!-- 订单详情 -->
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">订单详情</view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0; border-bottom: 2rpx solid #f0f0f0;">
          <div style="font-size: 28rpx; color: #333;">订单编号</div>
          <div style="font-size: 28rpx; color: #666;">{{ order.orderNumber }}</div>
        </view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0; border-bottom: 2rpx solid #f0f0f0;">
          <div style="font-size: 28rpx; color: #333;">下单时间</div>
          <div style="font-size: 28rpx; color: #666;">{{ order.createTime }}</div>
        </view>
        
        <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0;">
          <div style="font-size: 28rpx; color: #333;">订单金额</div>
          <div style="font-size: 32rpx; font-weight: bold; color: #CC0010;">¥{{ order.amount }}</div>
        </view>
      </view>

      <!-- 订单进度 -->
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">订单进度</view>
        
        <view v-for="(step, index) in order.progress" :key="index" style="display: flex; align-items: flex-start; gap: 24rpx; margin-bottom: 32rpx;">
          <view style="width: 48rpx; height: 48rpx; border-radius: 50%; background: #CC0010; color: white; display: flex; align-items: center; justify-content: center; font-size: 28rpx; font-weight: bold; flex-shrink: 0;">
            {{ index + 1 }}
          </view>
          <view style="flex: 1;">
            <view style="font-size: 28rpx; font-weight: bold; color: #333; margin-bottom: 8rpx;">{{ step.status }}</view>
            <view style="font-size: 26rpx; color: #666; margin-bottom: 8rpx;">{{ step.description }}</view>
            <view style="font-size: 24rpx; color: #999;">{{ step.time }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作 -->
    <view style="padding: 0 40rpx 40rpx;">
      <button @click="contactService" style="width: 100%; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; cursor: pointer;">
        联系客服
      </button>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.order-detail-page {
  padding-bottom: 200rpx;
}
</style>