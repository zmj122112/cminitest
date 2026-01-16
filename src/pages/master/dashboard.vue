<template>
  <view class="master-dashboard-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航栏 -->
    <view style="position: fixed; top: 0; left: 0; right: 0; background-color: #CC0010; color: white; padding: 20rpx 40rpx; display: flex; align-items: center; z-index: 999;">
      <view style="font-size: 32rpx; cursor: pointer;" @click="goToDashboard">
        🏠
      </view>
      <view style="font-size: 28rpx; font-weight: bold; flex: 1; text-align: center;">师傅工作台</view>
      <view style="width: 32rpx;"></view>
    </view>
    
    <!-- 顶部红色区域 -->
    <view style="background-color: #CC0010; border-bottom-left-radius: 64rpx; border-bottom-right-radius: 64rpx; padding: 140rpx 40rpx 48rpx;">
      <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32rpx;">
        <view>
          <view style="font-size: 36rpx; font-weight: bold; color: white; margin-bottom: 8rpx;">您好，{{ masterInfo.name }}</view>
          <view style="font-size: 24rpx; color: rgba(255,255,255,0.8);">师傅ID: {{ masterInfo.id }}</view>
        </view>
        <image :src="masterInfo.avatar" style="width: 120rpx; height: 120rpx; border-radius: 50%; background-color: white; padding: 16rpx;" />
      </view>

      <!-- 统计信息 -->
      <view style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24rpx; margin-top: 32rpx;">
        <view style="background-color: rgba(255,255,255,0.2); border-radius: 16rpx; padding: 24rpx; text-align: center;">
          <view style="font-size: 32rpx; font-weight: bold; color: white; margin-bottom: 8rpx;">{{ stats.totalOrders }}</view>
          <view style="font-size: 24rpx; color: rgba(255,255,255,0.8);">总订单</view>
        </view>
        <view style="background-color: rgba(255,255,255,0.2); border-radius: 16rpx; padding: 24rpx; text-align: center;">
          <view style="font-size: 32rpx; font-weight: bold; color: white; margin-bottom: 8rpx;">{{ stats.pendingOrders }}</view>
          <view style="font-size: 24rpx; color: rgba(255,255,255,0.8);">待处理</view>
        </view>
        <view style="background-color: rgba(255,255,255,0.2); border-radius: 16rpx; padding: 24rpx; text-align: center;">
          <view style="font-size: 32rpx; font-weight: bold; color: white; margin-bottom: 8rpx;">¥{{ stats.totalIncome }}</view>
          <view style="font-size: 24rpx; color: rgba(255,255,255,0.8);">总收入</view>
        </view>
      </view>
    </view>

    <!-- 快捷操作 -->
    <view style="padding: 32rpx 40rpx;">
      <view style="background-color: white; border-radius: 24rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 32rpx; margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">快捷操作</view>
        <view style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24rpx;">
          <view 
            v-for="action in quickActions" 
            :key="action.name"
            style="display: flex; flex-direction: column; align-items: center; padding: 24rpx; background-color: #f9fafb; border-radius: 16rpx; cursor: pointer;"
            @click="handleQuickAction(action.path)"
            @touchstart="$event.currentTarget.style.backgroundColor = '#f3f4f6'"
            @touchend="$event.currentTarget.style.backgroundColor = '#f9fafb'"
          >
            <view style="font-size: 48rpx; margin-bottom: 16rpx;">{{ action.icon }}</view>
            <view style="font-size: 24rpx; color: #333; text-align: center;">{{ action.name }}</view>
          </view>
        </view>
      </view>

      <!-- 最近订单 -->
      <view style="background-color: white; border-radius: 24rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 32rpx;">
        <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32rpx;">
          <view style="font-size: 32rpx; font-weight: bold; color: #333;">最近订单</view>
          <view style="font-size: 24rpx; color: #666; cursor: pointer;" @click="navigateTo('/pages/master/my-orders')">
            查看全部 ›
          </view>
        </view>
        <view v-if="recentOrders.length > 0">
          <view 
            v-for="order in recentOrders" 
            :key="order.id"
            style="display: flex; flex-direction: column; padding: 24rpx 0; border-bottom: 2rpx solid #f0f0f0;"
            @click="navigateTo(`/pages/master/workorder-detail?id=${order.id}`)"
          >
            <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx;">
              <view style="font-size: 28rpx; font-weight: 500; color: #333;">{{ order.customer }}</view>
              <view :style="getOrderStatusStyle(order.status)">
                {{ order.statusText }}
              </view>
            </view>
            <view style="display: flex; justify-content: space-between; align-items: center; font-size: 24rpx; color: #666;">
              <view>{{ order.serviceType }}</view>
              <view>{{ order.createTime }}</view>
            </view>
          </view>
        </view>
        <view v-else style="text-align: center; padding: 64rpx 0;">
          <view style="font-size: 96rpx; margin-bottom: 32rpx;">📋</view>
          <view style="font-size: 28rpx; color: #999;">暂无订单</view>
        </view>
      </view>
    </view>
    <!-- 底部导航栏 -->
    <TabBar />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 师傅信息
const masterInfo = ref({
  id: '1001',
  name: '王师傅',
  avatar: '/static/logo.png'
})

// 统计信息
const stats = ref({
  totalOrders: 128,
  pendingOrders: 5,
  totalIncome: 25800
})

// 快捷操作
const quickActions = [
  { name: '工单接收', icon: '📥', path: '/pages/master/workorder-receive' },
  { name: '我的订单', icon: '📋', path: '/pages/master/my-orders' },
  { name: '施工记录', icon: '📝', path: '/pages/master/construction' },
  { name: '完工确认', icon: '✅', path: '/pages/master/completion' }
]

// 最近订单
const recentOrders = ref([
  {
    id: 'WD20260116001',
    customer: '张三',
    serviceType: '卫生间漏水维修',
    status: 'pending',
    statusText: '待接收',
    createTime: '2026-01-16 10:30'
  },
  {
    id: 'WD20260115002',
    customer: '李四',
    serviceType: '屋顶补漏',
    status: 'in-progress',
    statusText: '服务中',
    createTime: '2026-01-15 14:20'
  },
  {
    id: 'WD20260114003',
    customer: '王五',
    serviceType: '阳台防水',
    status: 'completed',
    statusText: '已完成',
    createTime: '2026-01-14 09:15'
  }
])

// 获取订单状态样式
const getOrderStatusStyle = (status) => {
  switch (status) {
    case 'pending':
      return {
        backgroundColor: '#FEF3C7',
        color: '#D97706',
        padding: '8rpx 16rpx',
        borderRadius: '16rpx',
        fontSize: '24rpx'
      }
    case 'in-progress':
      return {
        backgroundColor: '#DBEAFE',
        color: '#2563EB',
        padding: '8rpx 16rpx',
        borderRadius: '16rpx',
        fontSize: '24rpx'
      }
    case 'completed':
      return {
        backgroundColor: '#D1FAE5',
        color: '#059669',
        padding: '8rpx 16rpx',
        borderRadius: '16rpx',
        fontSize: '24rpx'
      }
    default:
      return {
        backgroundColor: '#FEE2E2',
        color: '#DC2626',
        padding: '8rpx 16rpx',
        borderRadius: '16rpx',
        fontSize: '24rpx'
      }
  }
}

// 处理快捷操作
const handleQuickAction = (path) => {
  navigateTo(path)
}

// 导航方法
const navigateTo = (url) => {
  uni.navigateTo({ url })
}

// 导航回工作台
const goToDashboard = () => {
  uni.reLaunch({ url: '/pages/master/dashboard' })
}

// 页面加载
onMounted(() => {
  console.log('师傅工作台页面加载')
  // 这里可以添加获取师傅信息和订单数据的逻辑
})
</script>

<style scoped>
.master-dashboard-page {
  background-color: #f5f7fa;
}
</style>