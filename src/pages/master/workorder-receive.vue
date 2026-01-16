<template>
  <view class="workorder-receive-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航栏 -->
    <view style="position: fixed; top: 0; left: 0; right: 0; background-color: #CC0010; color: white; padding: 20rpx 40rpx; display: flex; align-items: center; z-index: 999;">
      <view style="font-size: 32rpx; cursor: pointer;" @click="goToDashboard">
        🏠
      </view>
      <view style="font-size: 28rpx; font-weight: bold; flex: 1; text-align: center;">工单接收</view>
      <view style="width: 32rpx;"></view>
    </view>
    <!-- 顶部红色区域 -->
    <view style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding-top: 40px; padding-bottom: 30px; position: relative; z-index: 0;">
      <view style="padding: 0 40rpx;">
        <view style="display: flex; align-items: center; margin-bottom: 16rpx;">
          <image src="/static/logo.png" style="width: 80rpx; height: 80rpx; border-radius: 50%; background-color: white; padding: 16rpx; margin-right: 24rpx;" />
          <view>
            <view style="font-size: 36rpx; font-weight: bold; color: white;">月星防水</view>
            <view style="font-size: 24rpx; color: rgba(255,255,255,0.8);">Since 1947</view>
          </view>
        </view>
        <view style="font-size: 40rpx; font-weight: bold; color: white; margin: 0;">工单接收</view>
      </view>
    </view>

    <!-- 标签页切换 -->
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

    <!-- 工单列表 -->
    <view style="padding: 0 40rpx;">
      <!-- 待接收工单 -->
      <view v-if="activeTab === 'pending'">
        <view v-if="workOrders.pending.length > 0">
          <view 
            v-for="workOrder in workOrders.pending" 
            :key="workOrder.id" 
            style="background-color: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 32rpx; margin-bottom: 32rpx; transition: all 0.3s ease;"
          >
            <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx; padding-bottom: 16rpx; border-bottom: 2rpx solid #f0f0f0;">
              <view style="font-size: 28rpx; font-weight: 600; color: #111827;">工单编号：{{ workOrder.id }}</view>
              <view style="font-size: 24rpx; color: #E60012; background-color: #fef2f2; padding: 8rpx 24rpx; border-radius: 16rpx;">{{ workOrder.type }}</view>
            </view>
            <view style="margin-bottom: 24rpx;">
              <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx;">
                <view style="font-size: 32rpx; font-weight: 500; color: #111827;">{{ workOrder.customer }}</view>
                <view style="font-size: 24rpx; color: #6b7280;">{{ workOrder.appointment }}</view>
              </view>
              <view style="display: flex; align-items: center; gap: 16rpx; margin-bottom: 16rpx;">
                <view style="font-size: 32rpx;">📍</view>
                <view style="font-size: 24rpx; color: #6b7280; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ workOrder.address }}</view>
              </view>
              <view style="font-size: 24rpx; color: #6b7280; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                <span style="font-weight: 500; color: #111827;">描述：</span>{{ workOrder.description }}
              </view>
            </view>
            <view style="display: flex; gap: 24rpx;">
              <button 
                @click="receiveWorkOrder(workOrder)"
                style="flex: 1; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx; font-weight: bold;"
              >
                接收工单
              </button>
              <button 
                @click="viewWorkOrderDetail(workOrder)"
                style="flex: 1; background-color: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx;"
              >
                查看详情
              </button>
            </view>
          </view>
        </view>
        <view v-else style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 128rpx 40rpx; text-align: center;">
          <view style="font-size: 128rpx; margin-bottom: 40rpx;">📥</view>
          <view style="font-size: 32rpx; color: #999; margin-bottom: 16rpx;">暂无待接收工单</view>
          <view style="font-size: 24rpx; color: #ccc;">请稍后刷新查看</view>
        </view>
      </view>

      <!-- 已接收工单 -->
      <view v-if="activeTab === 'received'">
        <view v-if="workOrders.received.length > 0">
          <view 
            v-for="workOrder in workOrders.received" 
            :key="workOrder.id" 
            style="background-color: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 32rpx; margin-bottom: 32rpx; transition: all 0.3s ease;"
          >
            <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx; padding-bottom: 16rpx; border-bottom: 2rpx solid #f0f0f0;">
              <view style="font-size: 28rpx; font-weight: 600; color: #111827;">工单编号：{{ workOrder.id }}</view>
              <view style="font-size: 24rpx; color: #E60012; background-color: #fef2f2; padding: 8rpx 24rpx; border-radius: 16rpx;">{{ workOrder.type }}</view>
            </view>
            <view style="margin-bottom: 24rpx;">
              <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx;">
                <view style="font-size: 32rpx; font-weight: 500; color: #111827;">{{ workOrder.customer }}</view>
                <view style="font-size: 24rpx; color: #6b7280;">{{ workOrder.appointment }}</view>
              </view>
              <view style="display: flex; align-items: center; gap: 16rpx; margin-bottom: 16rpx;">
                <view style="font-size: 32rpx;">📍</view>
                <view style="font-size: 24rpx; color: #6b7280; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ workOrder.address }}</view>
              </view>
              <view style="font-size: 24rpx; color: #6b7280; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                <span style="font-weight: 500; color: #111827;">描述：</span>{{ workOrder.description }}
              </view>
            </view>
            <view style="display: flex; gap: 16rpx;">
              <button 
                @click="navigateTo(workOrder.address)"
                style="flex: 1; background-color: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 24rpx; font-size: 24rpx;"
              >
                导航前往
              </button>
              <button 
                @click="contactCustomer(workOrder)"
                style="flex: 1; background-color: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 24rpx; font-size: 24rpx;"
              >
                联系客户
              </button>
              <button 
                @click="viewWorkOrderDetail(workOrder)"
                style="flex: 1; background-color: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 24rpx; font-size: 24rpx;"
              >
                查看详情
              </button>
            </view>
          </view>
        </view>
        <view v-else style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 128rpx 40rpx; text-align: center;">
          <view style="font-size: 128rpx; margin-bottom: 40rpx;">🔄</view>
          <view style="font-size: 32rpx; color: #999; margin-bottom: 16rpx;">暂无进行中工单</view>
          <view style="font-size: 24rpx; color: #ccc;">请先接收工单</view>
        </view>
      </view>

      <!-- 已完成工单 -->
      <view v-if="activeTab === 'completed'">
        <view v-if="workOrders.completed.length > 0">
          <view 
            v-for="workOrder in workOrders.completed" 
            :key="workOrder.id" 
            style="background-color: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 32rpx; margin-bottom: 32rpx; transition: all 0.3s ease;"
          >
            <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx; padding-bottom: 16rpx; border-bottom: 2rpx solid #f0f0f0;">
              <view style="font-size: 28rpx; font-weight: 600; color: #111827;">工单编号：{{ workOrder.id }}</view>
              <view style="font-size: 24rpx; color: #E60012; background-color: #fef2f2; padding: 8rpx 24rpx; border-radius: 16rpx;">{{ workOrder.type }}</view>
            </view>
            <view style="margin-bottom: 24rpx;">
              <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx;">
                <view style="font-size: 32rpx; font-weight: 500; color: #111827;">{{ workOrder.customer }}</view>
                <view style="font-size: 24rpx; color: #6b7280;">{{ workOrder.appointment }}</view>
              </view>
              <view style="display: flex; align-items: center; gap: 16rpx; margin-bottom: 16rpx;">
                <view style="font-size: 32rpx;">📍</view>
                <view style="font-size: 24rpx; color: #6b7280; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ workOrder.address }}</view>
              </view>
              <view style="font-size: 24rpx; color: #6b7280; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                <span style="font-weight: 500; color: #111827;">描述：</span>{{ workOrder.description }}
              </view>
            </view>
            <view style="display: flex; justify-content: flex-end;">
              <button 
                @click="viewWorkOrderDetail(workOrder)"
                style="background-color: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 24rpx 48rpx; font-size: 24rpx;"
              >
                查看详情
              </button>
            </view>
          </view>
        </view>
        <view v-else style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 128rpx 40rpx; text-align: center;">
          <view style="font-size: 128rpx; margin-bottom: 40rpx;">✅</view>
          <view style="font-size: 32rpx; color: #999; margin-bottom: 16rpx;">暂无已完成工单</view>
          <view style="font-size: 24rpx; color: #ccc;">完成服务后将显示在此</view>
        </view>
      </view>
    </view>
    <!-- 底部导航栏 -->
    <TabBar />
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 标签页状态
const activeTab = ref('pending')

// 标签页数据
const tabs = [
  { label: '待接收', value: 'pending' },
  { label: '已接收', value: 'received' },
  { label: '已完成', value: 'completed' }
]

// 标签页样式
const tabStyle = {
  flex: 1,
  textAlign: 'center',
  padding: '20rpx 0',
  fontSize: '28rpx',
  color: '#6b7280',
  cursor: 'pointer',
  borderBottom: '2rpx solid transparent'
}

const tabActiveStyle = {
  flex: 1,
  textAlign: 'center',
  padding: '20rpx 0',
  fontSize: '28rpx',
  color: '#CC0010',
  cursor: 'pointer',
  borderBottom: '2rpx solid #CC0010',
  fontWeight: 'bold'
}

// 工单列表数据
const workOrders = ref({
  pending: [
    {
      id: 'WD20260116001',
      type: '上门检测（免费）',
      customer: '企业客户A',
      appointment: '2026-01-16 上午（9:00-12:00）',
      address: '上海市浦东新区张江高科技园区博云路2号',
      description: '卫生间漏水，持续时间1周，需要上门检测'
    },
    {
      id: 'WD20260116002',
      type: '直接施工（已报价）',
      customer: '个人客户B',
      appointment: '2026-01-16 下午（14:00-17:00）',
      address: '上海市静安区南京西路1268号',
      description: '厨房漏水，需要直接施工维修'
    }
  ],
  received: [
    {
      id: 'WD20260115001',
      type: '上门检测（免费）',
      customer: '个人客户C',
      appointment: '2026-01-15 上午（9:00-12:00）',
      address: '上海市徐汇区淮海中路1000号',
      description: '阳台漏水，需要上门检测'
    }
  ],
  completed: [
    {
      id: 'WD20260114001',
      type: '直接施工（已报价）',
      customer: '企业客户D',
      appointment: '2026-01-14 下午（14:00-17:00）',
      address: '上海市长宁区中山公园路36号',
      description: '卫生间漏水，已完成施工'
    }
  ]
})

// 接收工单
const receiveWorkOrder = (workOrder) => {
  uni.showToast({ title: '工单接收成功', icon: 'success' })
  // 将工单从待接收移到已接收
  const index = workOrders.value.pending.findIndex(item => item.id === workOrder.id)
  if (index !== -1) {
    workOrders.value.pending.splice(index, 1)
    workOrders.value.received.push(workOrder)
  }
}

// 查看工单详情
const viewWorkOrderDetail = (workOrder) => {
  uni.navigateTo({ url: `/pages/master/workorder-detail?id=${workOrder.id}` })
}

// 导航前往
const navigateTo = (address) => {
  uni.showToast({ title: `导航到：${address}`, icon: 'none' })
  console.log('导航前往:', address)
}

// 联系客户
const contactCustomer = (workOrder) => {
  uni.showToast({ title: `联系客户：${workOrder.customer}`, icon: 'none' })
  console.log('联系客户:', workOrder)
}
</script>

<style scoped>
.workorder-receive-page {
  background-color: #f5f7fa;
}
</style>