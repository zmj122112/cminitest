<template>
  <view class="exchange-record-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 红色顶部区域 -->
    <view class="header-section" style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding-top: 40px; padding-bottom: 30px; position: relative; z-index: 0;">
      <view class="header-content" style="padding: 0 20px;">
        <view class="brand-info" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <div style="display: flex; align-items: center;">
            <image src="/static/logo.png" class="logo-img" style="width: 40px; height: 40px; border-radius: 50%; background-color: white; padding: 2px; margin-right: 10px; object-fit: contain;" />
            <view class="brand-text">
              <view class="brand-name" style="color: white; font-size: 18px; font-weight: bold;">月星防水</view>
              <view class="brand-slogan" style="color: rgba(255,255,255,0.8); font-size: 12px;">Since 1947</view>
            </view>
          </div>
          <view style="cursor: pointer;" @click="goToDashboard()">
            <text style="color: white; font-size: 30px;">🏠</text>
          </view>
        </view>
        
        <view class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">兑换记录</view>
      </view>
    </view>

    <!-- 状态筛选 -->
    <view style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view class="filter-title" style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">状态筛选</view>
      <view class="filter-options" style="display: flex; gap: 12px; flex-wrap: wrap;">
        <view v-for="status in statuses" :key="status.id" class="filter-item" @click="selectStatus(status.id)" :class="{ active: selectedStatus === status.id }" style="padding: 8px 20px; border-radius: 20px; font-size: 14px; cursor: pointer; transition: all 0.3s ease;" :style="{ backgroundColor: selectedStatus === status.id ? '#E60012' : '#f9fafb', color: selectedStatus === status.id ? 'white' : '#111827', border: `2px solid ${selectedStatus === status.id ? '#E60012' : '#E5E7EB'}` }">
          {{ status.name }}
        </view>
      </view>
    </view>

    <!-- 兑换记录列表 -->
    <view style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view class="record-list-title" style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">兑换历史</view>
      <view class="record-list">
        <view v-for="record in filteredRecords" :key="record.id" class="record-item" style="border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; margin-bottom: 16px; transition: all 0.3s ease;">
          <view class="record-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="record-id" style="font-size: 14px; color: #6b7280;">订单号: {{ record.orderId }}</span>
            <span :class="['record-status', record.status]" :style="{ backgroundColor: getStatusColor(record.status), color: 'white' }" style="padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500;">
              {{ getStatusText(record.status) }}
            </span>
          </view>
          <view class="record-content" style="display: flex; margin-bottom: 12px;">
            <view class="record-image" style="width: 80px; height: 80px; background-color: #f9fafb; border-radius: 8px; margin-right: 16px; display: flex; align-items: center; justify-content: center; font-size: 32px;">
              {{ record.icon }}
            </view>
            <view class="record-info" style="flex: 1;">
              <view class="record-name" style="font-size: 14px; font-weight: 500; color: #111827; margin-bottom: 4px;">{{ record.name }}</view>
              <view class="record-details" style="display: flex; justify-content: space-between; align-items: center;">
                <span class="record-price" style="font-size: 16px; font-weight: bold; color: #E60012;">{{ record.price }}积分</span>
                <span class="record-time" style="font-size: 12px; color: #9ca3af;">{{ record.time }}</span>
              </view>
            </view>
          </view>
          <view class="record-footer" style="display: flex; justify-content: space-between; align-items: center;">
            <span class="record-quantity" style="font-size: 12px; color: #6b7280;">数量: {{ record.quantity }}</span>
            <button v-if="record.status === 'pending'" class="cancel-btn" @click="cancelExchange(record)" style="padding: 6px 16px; background-color: #6b7280; color: white; border: none; border-radius: 16px; font-size: 14px; cursor: pointer;">
              取消兑换
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 状态选项
const statuses = ref([
  { id: 'all', name: '全部' },
  { id: 'pending', name: '待处理' },
  { id: 'processing', name: '处理中' },
  { id: 'completed', name: '已完成' },
  { id: 'cancelled', name: '已取消' }
])

// 选中的状态
const selectedStatus = ref('all')

// 兑换记录数据
const exchangeRecords = ref([
  { id: '1', orderId: 'EX20231015001', name: '专业防水胶带', price: 50, quantity: 1, time: '2023-10-15 10:30:00', status: 'completed', icon: '🧻' },
  { id: '2', orderId: 'EX20231010002', name: '防水手套', price: 30, quantity: 2, time: '2023-10-10 14:20:00', status: 'completed', icon: '🧤' },
  { id: '3', orderId: 'EX20230928003', name: '防水工服', price: 100, quantity: 1, time: '2023-09-28 09:15:00', status: 'completed', icon: '👕' },
  { id: '4', orderId: 'EX20230920004', name: '防水密封胶', price: 40, quantity: 3, time: '2023-09-20 16:45:00', status: 'completed', icon: '🌀' },
  { id: '5', orderId: 'EX20230915005', name: '防水测试仪', price: 200, quantity: 1, time: '2023-09-15 11:20:00', status: 'completed', icon: '🔍' },
  { id: '6', orderId: 'EX20231020006', name: '防水涂料套装', price: 150, quantity: 1, time: '2023-10-20 08:45:00', status: 'pending', icon: '🎨' }
])

// 过滤后的记录
const filteredRecords = computed(() => {
  if (selectedStatus.value === 'all') {
    return exchangeRecords.value
  }
  return exchangeRecords.value.filter(record => record.status === selectedStatus.value)
})

// 选择状态
const selectStatus = (statusId) => {
  selectedStatus.value = statusId
}

// 获取状态颜色
const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return '#F59E0B' // 黄色
    case 'processing':
      return '#3B82F6' // 蓝色
    case 'completed':
      return '#10B981' // 绿色
    case 'cancelled':
      return '#6B7280' // 灰色
    default:
      return '#6B7280'
  }
}

// 获取状态文本
const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return '待处理'
    case 'processing':
      return '处理中'
    case 'completed':
      return '已完成'
    case 'cancelled':
      return '已取消'
    default:
      return '未知'
  }
}

// 取消兑换
const cancelExchange = (record) => {
  uni.showModal({
    title: '取消兑换',
    content: `确定要取消兑换「${record.name}」吗？`,
    success: (res) => {
      if (res.confirm) {
        record.status = 'cancelled'
        uni.showToast({ title: '取消成功', icon: 'success' })
      }
    }
  })
}

// 前往师傅工作台
const goToDashboard = () => {
  uni.reLaunch({ url: '/pages/master/dashboard' })
}
</script>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>