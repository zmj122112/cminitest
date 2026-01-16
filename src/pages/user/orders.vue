<script setup>
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 订单状态
const orderStatuses = ref([
  '全部',
  '待上门',
  '服务中',
  '待验收',
  '已完成',
  '已取消'
])

// 当前选中的状态
const selectedStatus = ref('全部')

// 订单列表数据
const orders = ref([
  {
    id: 1,
    orderNumber: 'YX20260116001',
    serviceType: '卫生间漏水',
    status: '待上门',
    createTime: '2026-01-16 10:30',
    amount: 2000,
    address: '上海市浦东新区张江高科技园区'
  },
  {
    id: 2,
    orderNumber: 'YX20260115002',
    serviceType: '屋顶补漏',
    status: '服务中',
    createTime: '2026-01-15 14:20',
    amount: 3500,
    address: '上海市静安区南京西路'
  },
  {
    id: 3,
    orderNumber: 'YX20260114003',
    serviceType: '阳台防水',
    status: '已完成',
    createTime: '2026-01-14 09:15',
    amount: 1800,
    address: '上海市徐汇区淮海中路'
  }
])

// 切换订单状态
const switchStatus = (status) => {
  selectedStatus.value = status
  console.log('切换订单状态:', status)
  // 这里可以添加状态筛选逻辑
}

// 跳转到订单详情
const goToOrderDetail = (orderId) => {
  console.log('跳转到订单详情，ID:', orderId)
  uni.navigateTo({ url: `/pages/user/order-detail?id=${orderId}` })
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
  <view class="orders-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view class="top-nav" style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view class="back-button" style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view class="page-title" style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 80rpx; color: white;">全部订单</view>
    </view>

    <!-- 订单状态筛选 -->
    <view style="background: white; padding: 24rpx 0; border-bottom: 2rpx solid #f0f0f0; position: sticky; top: 120rpx; z-index: 90;">
      <view style="display: flex; overflow-x: auto; white-space: nowrap; padding: 0 40rpx; gap: 24rpx;">
        <div 
          v-for="status in orderStatuses" 
          :key="status" 
          @click="switchStatus(status)"
          :style="{
            padding: '12rpx 32rpx',
            borderRadius: '40rpx',
            fontSize: '28rpx',
            fontWeight: selectedStatus === status ? 'bold' : 'normal',
            color: selectedStatus === status ? '#CC0010' : '#6b7280',
            backgroundColor: selectedStatus === status ? '#FFF0F0' : '#f3f4f6',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: selectedStatus === status ? '2rpx solid #CC0010' : '2rpx solid #e5e7eb',
            display: 'inline-block'
          }"
        >
          {{ status }}
        </div>
      </view>
    </view>

    <!-- 订单列表 -->
    <view style="padding: 32rpx 40rpx;">
      <view v-for="order in orders" :key="order.id" 
           style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; margin-bottom: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); cursor: pointer;"
           @click="goToOrderDetail(order.id)"
           @touchstart="$event.currentTarget.style.boxShadow = '0 12rpx 40rpx rgba(0,0,0,0.15)'"
           @touchend="$event.currentTarget.style.boxShadow = '0 8rpx 24rpx rgba(0,0,0,0.1)'"
      >
        <!-- 订单头部 -->
        <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx;">
          <view style="font-size: 32rpx; font-weight: bold; color: #333;">{{ order.serviceType }}</view>
          <view :style="{
            background: order.status === '已完成' ? '#D1FAE5' : order.status === '待上门' ? '#FEF3C7' : order.status === '服务中' ? '#DBEAFE' : '#FEE2E2',
            color: order.status === '已完成' ? '#059669' : order.status === '待上门' ? '#D97706' : order.status === '服务中' ? '#2563EB' : '#DC2626',
            padding: '8rpx 20rpx',
            borderRadius: '20rpx',
            fontSize: '24rpx',
            fontWeight: 'medium'
          }">
            {{ order.status }}
          </view>
        </view>
        
        <!-- 订单信息 -->
        <view style="display: flex; flex-direction: column; gap: 16rpx; margin-bottom: 24rpx;">
          <view style="display: flex; align-items: center; gap: 16rpx;">
            <view style="font-size: 26rpx; color: #666; width: 120rpx;">订单编号</view>
            <view style="font-size: 26rpx; color: #333; flex: 1;">{{ order.orderNumber }}</view>
          </view>
          <view style="display: flex; align-items: center; gap: 16rpx;">
            <view style="font-size: 26rpx; color: #666; width: 120rpx;">下单时间</view>
            <view style="font-size: 26rpx; color: #333; flex: 1;">{{ order.createTime }}</view>
          </view>
          <view style="display: flex; align-items: center; gap: 16rpx;">
            <view style="font-size: 26rpx; color: #666; width: 120rpx;">服务地址</view>
            <view style="font-size: 26rpx; color: #333; flex: 1;">{{ order.address }}</view>
          </view>
        </view>
        
        <!-- 订单底部 -->
        <view style="display: flex; justify-content: space-between; align-items: center; padding-top: 24rpx; border-top: 2rpx solid #f0f0f0;">
          <view style="font-size: 32rpx; font-weight: bold; color: #CC0010;">¥{{ order.amount }}</view>
          <view style="font-size: 32rpx; color: #999;">→</view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view v-if="orders.length === 0" style="background: white; border-radius: 32rpx; padding: 80rpx 40rpx; text-align: center; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <view style="font-size: 96rpx; margin-bottom: 32rpx;">📋</view>
        <view style="font-size: 32rpx; color: #6b7280; margin-bottom: 16rpx;">暂无订单</view>
        <view style="font-size: 28rpx; color: #9ca3af;">您还没有相关订单记录</view>
      </view>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.orders-page {
  padding-bottom: 200rpx;
}
</style>