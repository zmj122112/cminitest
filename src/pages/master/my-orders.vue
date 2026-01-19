<template>
  <view class="my-orders-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部红色区域 -->
    <view style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding-top: 40px; padding-bottom: 30px; position: relative; z-index: 0;">
      <view style="padding: 0 40rpx;">
        <view style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16rpx;">
          <view style="display: flex; align-items: center;">
            <image src="/static/logo.png" style="width: 80rpx; height: 80rpx; border-radius: 50%; background-color: white; padding: 16rpx; margin-right: 24rpx;" />
            <view>
              <view style="font-size: 36rpx; font-weight: bold; color: white;">月星防水</view>
              <view style="font-size: 24rpx; color: rgba(255,255,255,0.8);">Since 1947</view>
            </view>
          </view>
          <view style="cursor: pointer;" @click="goToDashboard()">
            <text style="color: white; font-size: 48rpx;">🏠</text>
          </view>
        </view>
        <view style="font-size: 40rpx; font-weight: bold; color: white; margin: 0;">我的订单</view>
      </view>
    </view>

    <!-- 筛选标签 -->
    <view style="margin: -20px 40rpx 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view style="display: flex; border-bottom: 2rpx solid #f0f0f0;">
        <view 
          v-for="tab in tabs" 
          :key="tab.value"
          :style="activeTab === tab.value ? tabActiveStyle : tabStyle"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </view>
      </view>
    </view>

    <!-- 订单列表 -->
    <view style="padding: 0 40rpx;">
      <view v-if="filteredWorkOrders.length > 0">
        <view 
          v-for="order in filteredWorkOrders" 
          :key="order.id" 
          style="background-color: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 32rpx; margin-bottom: 32rpx; transition: all 0.3s ease; cursor: pointer;"
          @click="viewWorkOrderDetail(order)"
        >
          <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx; padding-bottom: 16rpx; border-bottom: 2rpx solid #f0f0f0;">
            <view style="font-size: 28rpx; font-weight: 600; color: #111827;">工单编号：{{ order.id }}</view>
            <view :style="getOrderStatusStyle(order.status)">
              {{ order.statusText }}
            </view>
          </view>
          
          <view style="margin-bottom: 24rpx;">
            <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx;">
              <view style="font-size: 32rpx; font-weight: 500; color: #111827;">{{ order.customerName }}</view>
              <view style="font-size: 24rpx; color: #6b7280;">{{ order.date }} {{ order.time }}</view>
            </view>
            <view style="font-size: 24rpx; color: #6b7280; margin-bottom: 16rpx;">
              <span style="font-weight: 500; color: #111827;">地址：</span>{{ order.address }}
            </view>
            <view style="font-size: 24rpx; color: #6b7280; margin-bottom: 16rpx;">
              <span style="font-weight: 500; color: #111827;">类型：</span>{{ order.type }}
            </view>
            <view style="font-size: 24rpx; color: #6b7280; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              <span style="font-weight: 500; color: #111827;">描述：</span>{{ order.description }}
            </view>
          </view>
          
          <view style="display: flex; justify-content: flex-end;">
            <button 
              @click.stop="viewWorkOrderDetail(order)"
              style="background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 20rpx 40rpx; font-size: 24rpx; font-weight: 500;"
            >
              查看详情
            </button>
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view v-else style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 128rpx 40rpx; text-align: center; margin-bottom: 32rpx;">
        <view style="font-size: 128rpx; margin-bottom: 40rpx;">📋</view>
        <view style="font-size: 32rpx; color: #999; margin-bottom: 16rpx;">当前暂无订单</view>
        <view style="font-size: 24rpx; color: #ccc;">{{ getEmptyStateText() }}</view>
      </view>
    </view>

    <TabBar />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import TabBar from '@/components/TabBar.vue'

// 标签页数据
const tabs = [
  { label: '全部', value: 'all' },
  { label: '待接收', value: 'pending' },
  { label: '已接收', value: 'received' },
  { label: '已完成', value: 'completed' }
]

// 当前选中的标签
const activeTab = ref('all')

// 标签样式
const tabStyle = {
  flex: 1,
  textAlign: 'center',
  padding: '16rpx 0',
  fontSize: '28rpx',
  color: '#666',
  position: 'relative'
}

// 激活标签样式
const tabActiveStyle = {
  flex: 1,
  textAlign: 'center',
  padding: '16rpx 0',
  fontSize: '28rpx',
  color: '#CC0010',
  fontWeight: 'bold',
  position: 'relative'
}

// 工单数据
const workOrders = ref([
  {
    id: 'WD20260116001',
    customerName: '企业客户A',
    phone: '13800138000',
    address: '上海市浦东新区张江高科技园区博云路2号',
    type: '上门检测（免费）',
    status: 'pending',
    statusText: '待接收',
    date: '2026-01-16',
    time: '09:00-12:00',
    description: '卫生间漏水，持续时间1周，需要上门检测'
  },
  {
    id: 'WD20260115002',
    customerName: '个人客户B',
    phone: '13900139000',
    address: '上海市静安区南京西路1268号',
    type: '直接施工（已报价）',
    status: 'received',
    statusText: '已接收',
    date: '2026-01-15',
    time: '14:00-17:00',
    description: '厨房漏水，需要直接施工维修'
  },
  {
    id: 'WD20260114001',
    customerName: '个人客户C',
    phone: '13700137000',
    address: '上海市徐汇区淮海中路1000号',
    type: '上门检测（免费）',
    status: 'completed',
    statusText: '已完成',
    date: '2026-01-14',
    time: '09:00-12:00',
    description: '阳台漏水，需要上门检测'
  },
  {
    id: 'WD20260113001',
    customerName: '企业客户D',
    phone: '13600136000',
    address: '上海市长宁区中山公园路36号',
    type: '直接施工（已报价）',
    status: 'completed',
    statusText: '已完成',
    date: '2026-01-13',
    time: '14:00-17:00',
    description: '卫生间漏水，已完成施工'
  }
])

// 筛选后的工单列表
const filteredWorkOrders = computed(() => {
  if (activeTab.value === 'all') {
    return workOrders.value
  }
  return workOrders.value.filter(order => order.status === activeTab.value)
})

// 获取订单状态样式
const getOrderStatusStyle = (status) => {
  switch (status) {
    case 'pending':
      return {
        backgroundColor: '#FEF3C7',
        color: '#D97706',
        padding: '8rpx 24rpx',
        borderRadius: '16rpx',
        fontSize: '24rpx'
      }
    case 'received':
      return {
        backgroundColor: '#DBEAFE',
        color: '#2563EB',
        padding: '8rpx 24rpx',
        borderRadius: '16rpx',
        fontSize: '24rpx'
      }
    case 'completed':
      return {
        backgroundColor: '#D1FAE5',
        color: '#059669',
        padding: '8rpx 24rpx',
        borderRadius: '16rpx',
        fontSize: '24rpx'
      }
    default:
      return {
        backgroundColor: '#FEE2E2',
        color: '#DC2626',
        padding: '8rpx 24rpx',
        borderRadius: '16rpx',
        fontSize: '24rpx'
      }
  }
}

// 获取空状态文本
const getEmptyStateText = () => {
  switch (activeTab.value) {
    case 'pending':
      return '暂无待接收工单'
    case 'received':
      return '暂无进行中工单'
    case 'completed':
      return '暂无已完成工单'
    default:
      return '暂无工单记录'
  }
}

// 查看工单详情
const viewWorkOrderDetail = (order) => {
  uni.navigateTo({ url: `/pages/master/workorder-detail?id=${order.id}` })
}

// 前往师傅工作台
const goToDashboard = () => {
  uni.reLaunch({ url: '/pages/master/dashboard' })
}
</script>

<style scoped>
.my-orders-page {
  background-color: #f5f7fa;
}
</style>