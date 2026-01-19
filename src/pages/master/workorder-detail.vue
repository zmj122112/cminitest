<template>
  <view class="workorder-detail-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view style="cursor: pointer; margin-right: 32rpx;" @click="goToDashboard()">
        <text style="color: white; font-size: 48rpx;">🏠</text>
      </view>
      <view style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 160rpx; color: white;">工单详情</view>
    </view>

    <!-- 订单状态 -->
    <view :style="getOrderStatusStyle(order.status)" style="margin: 32rpx 40rpx; border-radius: 16rpx; padding: 32rpx; text-align: center;">
      <view :style="getOrderStatusTextStyle(order.status)" style="font-size: 36rpx; font-weight: bold; margin-bottom: 16rpx;">
        {{ order.statusText }}
      </view>
      <view :style="getOrderStatusDescStyle(order.status)" style="font-size: 26rpx; opacity: 0.8;">
        {{ getOrderStatusDescription(order.status) }}
      </view>
    </view>

    <!-- 订单信息 -->
    <view style="padding: 0 40rpx;">
      <!-- 基本信息 -->
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 32rpx; margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">基本信息</view>
        
        <view style="display: flex; flex-direction: column; gap: 20rpx;">
          <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0; border-bottom: 2rpx solid #f0f0f0;">
            <div style="font-size: 28rpx; color: #333;">工单编号</div>
            <div style="font-size: 28rpx; color: #666;">{{ order.id }}</div>
          </view>
          
          <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0; border-bottom: 2rpx solid #f0f0f0;">
            <div style="font-size: 28rpx; color: #333;">客户名称</div>
            <div style="font-size: 28rpx; color: #666;">{{ order.customer }}</div>
          </view>
          
          <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0; border-bottom: 2rpx solid #f0f0f0;">
            <div style="font-size: 28rpx; color: #333;">联系电话</div>
            <div style="font-size: 28rpx; color: #666;">{{ order.phone }}</div>
          </view>
          
          <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0; border-bottom: 2rpx solid #f0f0f0;">
            <div style="font-size: 28rpx; color: #333;">预约时间</div>
            <div style="font-size: 28rpx; color: #666;">{{ order.appointment }}</div>
          </view>
          
          <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx 0;">
            <div style="font-size: 28rpx; color: #333;">服务类型</div>
            <div style="font-size: 28rpx; color: #666;">{{ order.serviceType }}</div>
          </view>
        </view>
      </view>

      <!-- 服务地址 -->
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 32rpx; margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">服务地址</view>
        <view style="display: flex; align-items: flex-start; gap: 24rpx;">
          <view style="font-size: 32rpx; margin-top: 4rpx;">📍</view>
          <view style="font-size: 28rpx; color: #333; flex: 1; line-height: 1.4;">
            {{ order.address }}
          </view>
        </view>
      </view>

      <!-- 服务描述 -->
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 32rpx; margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">服务描述</view>
        <view style="font-size: 28rpx; color: #333; line-height: 1.4;">
          {{ order.description }}
        </view>
      </view>

      <!-- 订单进度 -->
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 32rpx; margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">订单进度</view>
        
        <view style="display: flex; flex-direction: column; gap: 32rpx;">
          <view 
            v-for="(step, index) in order.progress" 
            :key="index"
            style="display: flex; align-items: flex-start; gap: 24rpx;"
          >
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
    </view>

    <!-- 底部操作 -->
    <view style="padding: 0 40rpx 40rpx;">
      <view style="display: flex; gap: 24rpx;">
        <button 
          @click="navigateTo(order.address)"
          style="flex: 1; background-color: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx;"
        >
          导航前往
        </button>
        <button 
          @click="contactCustomer(order)"
          style="flex: 1; background-color: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx;"
        >
          联系客户
        </button>
        <button 
          v-if="order.status === 'pending'"
          @click="receiveOrder(order)"
          style="flex: 1; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx; font-weight: bold;"
        >
          接收订单
        </button>
        <button 
          v-else-if="order.status === 'received'"
          @click="completeOrder(order)"
          style="flex: 1; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx; font-weight: bold;"
        >
          完成服务
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 订单数据
const order = ref({
  id: 'WD20260116001',
  customer: '企业客户A',
  phone: '13800138000',
  serviceType: '上门检测（免费）',
  status: 'pending',
  statusText: '待接收',
  appointment: '2026-01-16 上午（9:00-12:00）',
  address: '上海市浦东新区张江高科技园区博云路2号',
  description: '卫生间漏水，持续时间1周，需要上门检测',
  progress: [
    {
      status: '订单创建',
      description: '客户提交订单',
      time: '2026-01-16 10:00'
    },
    {
      status: '待接收',
      description: '等待师傅接收订单',
      time: '2026-01-16 10:05'
    }
  ]
})

// 从路由参数获取订单ID
onLoad((options) => {
  const orderId = options.id || 'WD20260116001'
  order.value.id = orderId
  // 这里可以添加根据ID获取订单详情的逻辑
  console.log('订单详情页面加载，ID:', orderId)
})

// 获取订单状态样式
const getOrderStatusStyle = (status) => {
  switch (status) {
    case 'pending':
      return {
        backgroundColor: '#FEF3C7',
        color: '#D97706'
      }
    case 'received':
      return {
        backgroundColor: '#DBEAFE',
        color: '#2563EB'
      }
    case 'inService':
      return {
        backgroundColor: '#DBEAFE',
        color: '#2563EB'
      }
    case 'completed':
      return {
        backgroundColor: '#FEF3C7',
        color: '#D97706'
      }
    case 'accepted':
      return {
        backgroundColor: '#D1FAE5',
        color: '#059669'
      }
    case 'cancelled':
      return {
        backgroundColor: '#FEE2E2',
        color: '#DC2626'
      }
    default:
      return {
        backgroundColor: '#FEE2E2',
        color: '#DC2626'
      }
  }
}

// 获取订单状态文本样式
const getOrderStatusTextStyle = (status) => {
  switch (status) {
    case 'pending':
      return {
        color: '#D97706'
      }
    case 'received':
      return {
        color: '#2563EB'
      }
    case 'inService':
      return {
        color: '#2563EB'
      }
    case 'completed':
      return {
        color: '#D97706'
      }
    case 'accepted':
      return {
        color: '#059669'
      }
    case 'cancelled':
      return {
        color: '#DC2626'
      }
    default:
      return {
        color: '#DC2626'
      }
  }
}

// 获取订单状态描述样式
const getOrderStatusDescStyle = (status) => {
  switch (status) {
    case 'pending':
      return {
        color: '#D97706'
      }
    case 'received':
      return {
        color: '#2563EB'
      }
    case 'inService':
      return {
        color: '#2563EB'
      }
    case 'completed':
      return {
        color: '#D97706'
      }
    case 'accepted':
      return {
        color: '#059669'
      }
    case 'cancelled':
      return {
        color: '#DC2626'
      }
    default:
      return {
        color: '#DC2626'
      }
    }
}

// 获取订单状态描述
const getOrderStatusDescription = (status) => {
  switch (status) {
    case 'pending':
      return '等待师傅接收订单'
    case 'received':
      return '师傅已接收订单，准备上门服务'
    case 'inService':
      return '师傅正在服务中'
    case 'completed':
      return '服务已完成，等待客户验收'
    case 'accepted':
      return '客户已验收，订单完成'
    case 'cancelled':
      return '订单已取消'
    default:
      return '订单状态未知'
  }
}

// 接收订单
const receiveOrder = (order) => {
  uni.showToast({ title: '订单接收成功', icon: 'success' })
  // 更新订单状态
  order.status = 'received'
  order.statusText = '已接收'
  order.progress.push({
    status: '订单接收',
    description: '师傅已接收订单',
    time: new Date().toLocaleString('zh-CN')
  })
}

// 完成订单
const completeOrder = (order) => {
  uni.showToast({ title: '订单完成成功', icon: 'success' })
  // 更新订单状态
  order.status = 'completed'
  order.statusText = '已完成'
  order.progress.push({
    status: '服务完成',
    description: '师傅已完成服务',
    time: new Date().toLocaleString('zh-CN')
  })
}

// 导航前往
const navigateTo = (address) => {
  uni.showToast({ title: `导航到：${address}`, icon: 'none' })
  console.log('导航前往:', address)
}

// 联系客户
const contactCustomer = (order) => {
  uni.showToast({ title: `联系客户：${order.customer}`, icon: 'none' })
  console.log('联系客户:', order)
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 前往师傅工作台
const goToDashboard = () => {
  uni.reLaunch({ url: '/pages/master/dashboard' })
}
</script>

<style scoped>
.workorder-detail-page {
  background-color: #f5f7fa;
}
</style>