<template>
  <view class="completion-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
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
        <view style="font-size: 40rpx; font-weight: bold; color: white; margin: 0;">完工确认</view>
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

    <!-- 订单列表 -->
    <view style="padding: 0 40rpx;">
      <!-- 待确认订单 -->
      <view v-if="activeTab === 'pending'">
        <view v-if="pendingOrders.length > 0">
          <view 
            v-for="order in pendingOrders" 
            :key="order.id" 
            style="background-color: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 32rpx; margin-bottom: 32rpx; transition: all 0.3s ease;"
          >
            <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx; padding-bottom: 16rpx; border-bottom: 2rpx solid #f0f0f0;">
              <view style="font-size: 28rpx; font-weight: 600; color: #111827;">工单编号：{{ order.id }}</view>
              <view style="font-size: 24rpx; color: #F59E0B; background-color: #FEF3C7; padding: 8rpx 24rpx; border-radius: 16rpx;">待确认</view>
            </view>
            <view style="margin-bottom: 24rpx;">
              <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx;">
                <view style="font-size: 32rpx; font-weight: 500; color: #111827;">{{ order.customer }}</view>
                <view style="font-size: 24rpx; color: #6b7280;">{{ order.appointment }}</view>
              </view>
              <view style="font-size: 24rpx; color: #6b7280; margin-bottom: 16rpx;">
                <span style="font-weight: 500; color: #111827;">地址：</span>{{ order.address }}
              </view>
              <view style="font-size: 24rpx; color: #6b7280; margin-bottom: 16rpx;">
                <span style="font-weight: 500; color: #111827;">服务类型：</span>{{ order.serviceType }}
              </view>
              <view style="font-size: 24rpx; color: #6b7280; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                <span style="font-weight: 500; color: #111827;">施工内容：</span>{{ order.constructionContent }}
              </view>
            </view>
            <view style="display: flex; gap: 24rpx;">
              <button 
                @click="confirmCompletion(order)"
                style="flex: 1; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx; font-weight: bold;"
              >
                确认完成
              </button>
              <button 
                @click="viewOrderDetail(order)"
                style="flex: 1; background-color: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx;"
              >
                查看详情
              </button>
            </view>
          </view>
        </view>
        <view v-else style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 128rpx 40rpx; text-align: center;">
          <view style="font-size: 128rpx; margin-bottom: 40rpx;">⏳</view>
          <view style="font-size: 32rpx; color: #999; margin-bottom: 16rpx;">暂无待确认订单</view>
          <view style="font-size: 24rpx; color: #ccc;">完成施工后将显示在此</view>
        </view>
      </view>

      <!-- 已确认订单 -->
      <view v-if="activeTab === 'completed'">
        <view v-if="completedOrders.length > 0">
          <view 
            v-for="order in completedOrders" 
            :key="order.id" 
            style="background-color: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 32rpx; margin-bottom: 32rpx; transition: all 0.3s ease;"
          >
            <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx; padding-bottom: 16rpx; border-bottom: 2rpx solid #f0f0f0;">
              <view style="font-size: 28rpx; font-weight: 600; color: #111827;">工单编号：{{ order.id }}</view>
              <view style="font-size: 24rpx; color: #10B981; background-color: #D1FAE5; padding: 8rpx 24rpx; border-radius: 16rpx;">已完成</view>
            </view>
            <view style="margin-bottom: 24rpx;">
              <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx;">
                <view style="font-size: 32rpx; font-weight: 500; color: #111827;">{{ order.customer }}</view>
                <view style="font-size: 24rpx; color: #6b7280;">{{ order.completionTime }}</view>
              </view>
              <view style="font-size: 24rpx; color: #6b7280; margin-bottom: 16rpx;">
                <span style="font-weight: 500; color: #111827;">服务类型：</span>{{ order.serviceType }}
              </view>
              <view style="font-size: 24rpx; color: #6b7280; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                <span style="font-weight: 500; color: #111827;">施工内容：</span>{{ order.constructionContent }}
              </view>
            </view>
            <view style="display: flex; justify-content: flex-end;">
              <button 
                @click="viewOrderDetail(order)"
                style="background-color: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 20rpx 40rpx; font-size: 24rpx;"
              >
                查看详情
              </button>
            </view>
          </view>
        </view>
        <view v-else style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 128rpx 40rpx; text-align: center;">
          <view style="font-size: 128rpx; margin-bottom: 40rpx;">✅</view>
          <view style="font-size: 32rpx; color: #999; margin-bottom: 16rpx;">暂无已完成订单</view>
          <view style="font-size: 24rpx; color: #ccc;">确认完成后将显示在此</view>
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
  { label: '待确认', value: 'pending' },
  { label: '已确认', value: 'completed' }
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

// 待确认订单
const pendingOrders = ref([
  {
    id: 'WD20260116002',
    customer: '个人客户B',
    serviceType: '直接施工（已报价）',
    appointment: '2026-01-15 下午（14:00-17:00）',
    address: '上海市静安区南京西路1268号',
    constructionContent: '完成厨房漏水维修，更换了老化的水管和防水卷材，测试无漏水现象'
  }
])

// 已确认订单
const completedOrders = ref([
  {
    id: 'WD20260114001',
    customer: '个人客户C',
    serviceType: '上门检测（免费）',
    completionTime: '2026-01-14 11:30',
    constructionContent: '完成阳台漏水检测，发现是排水管老化导致的漏水，已提供维修方案'
  },
  {
    id: 'WD20260113001',
    customer: '企业客户D',
    serviceType: '直接施工（已报价）',
    completionTime: '2026-01-13 16:45',
    constructionContent: '完成卫生间漏水维修，更换了老化的水管和防水卷材，测试无漏水现象'
  }
])

// 确认完成
const confirmCompletion = (order) => {
  uni.showToast({ title: '确认完成成功', icon: 'success' })
  // 将订单从待确认移到已确认
  const index = pendingOrders.value.findIndex(item => item.id === order.id)
  if (index !== -1) {
    const completedOrder = {
      ...order,
      completionTime: new Date().toLocaleString('zh-CN')
    }
    pendingOrders.value.splice(index, 1)
    completedOrders.value.unshift(completedOrder)
  }
}

// 查看订单详情
const viewOrderDetail = (order) => {
  uni.navigateTo({ url: `/pages/master/workorder-detail?id=${order.id}` })
}

// 前往师傅工作台
const goToDashboard = () => {
  uni.reLaunch({ url: '/pages/master/dashboard' })
}
</script>

<style scoped>
.completion-page {
  background-color: #f5f7fa;
}
</style>