<template>
  <view class="construction-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
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
        <view style="font-size: 40rpx; font-weight: bold; color: white; margin: 0;">施工记录</view>
      </view>
    </view>

    <!-- 施工中订单列表 -->
    <view style="padding: 32rpx 40rpx;">
      <view style="background-color: white; border-radius: 24rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 32rpx; margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">施工中订单</view>
        <view v-if="constructionOrders.length > 0">
          <view 
            v-for="order in constructionOrders" 
            :key="order.id" 
            style="background-color: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 32rpx; margin-bottom: 32rpx; transition: all 0.3s ease;"
          >
            <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx; padding-bottom: 16rpx; border-bottom: 2rpx solid #f0f0f0;">
              <view style="font-size: 28rpx; font-weight: 600; color: #111827;">工单编号：{{ order.id }}</view>
              <view style="font-size: 24rpx; color: #2563EB; background-color: #DBEAFE; padding: 8rpx 24rpx; border-radius: 16rpx;">施工中</view>
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
            </view>
            <view style="display: flex; gap: 24rpx;">
              <button 
                @click="viewConstructionDetail(order)"
                style="flex: 1; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx; font-weight: bold;"
              >
                查看记录
              </button>
              <button 
                @click="addConstructionRecord(order)"
                style="flex: 1; background-color: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx;"
              >
                添加记录
              </button>
            </view>
          </view>
        </view>
        <view v-else style="text-align: center; padding: 64rpx 0;">
          <view style="font-size: 96rpx; margin-bottom: 32rpx;">🏗️</view>
          <view style="font-size: 28rpx; color: #999;">暂无施工中订单</view>
        </view>
      </view>

      <!-- 历史施工记录 -->
      <view style="background-color: white; border-radius: 24rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">历史施工记录</view>
        <view v-if="historyRecords.length > 0">
          <view 
            v-for="record in historyRecords" 
            :key="record.id" 
            style="background-color: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 32rpx; margin-bottom: 32rpx; transition: all 0.3s ease;"
          >
            <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx; padding-bottom: 16rpx; border-bottom: 2rpx solid #f0f0f0;">
              <view style="font-size: 28rpx; font-weight: 600; color: #111827;">工单编号：{{ record.orderId }}</view>
              <view style="font-size: 24rpx; color: #059669; background-color: #D1FAE5; padding: 8rpx 24rpx; border-radius: 16rpx;">已完成</view>
            </view>
            <view style="margin-bottom: 24rpx;">
              <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx;">
                <view style="font-size: 32rpx; font-weight: 500; color: #111827;">{{ record.customer }}</view>
                <view style="font-size: 24rpx; color: #6b7280;">{{ record.completeTime }}</view>
              </view>
              <view style="font-size: 24rpx; color: #6b7280; margin-bottom: 16rpx;">
                <span style="font-weight: 500; color: #111827;">服务类型：</span>{{ record.serviceType }}
              </view>
              <view style="font-size: 24rpx; color: #6b7280; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                <span style="font-weight: 500; color: #111827;">施工总结：</span>{{ record.summary }}
              </view>
            </view>
            <view style="display: flex; justify-content: flex-end;">
              <button 
                @click="viewConstructionDetail(record)"
                style="background-color: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 20rpx 40rpx; font-size: 24rpx;"
              >
                查看详情
              </button>
            </view>
          </view>
        </view>
        <view v-else style="text-align: center; padding: 64rpx 0;">
          <view style="font-size: 96rpx; margin-bottom: 32rpx;">📋</view>
          <view style="font-size: 28rpx; color: #999;">暂无历史记录</view>
        </view>
      </view>
    </view>
    <!-- 底部导航栏 -->
    <TabBar />
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 施工中订单
const constructionOrders = ref([
  {
    id: 'WD20260115002',
    customer: '个人客户B',
    serviceType: '直接施工（已报价）',
    appointment: '2026-01-15 下午（14:00-17:00）',
    address: '上海市静安区南京西路1268号',
    records: [
      {
        id: 'CR001',
        time: '2026-01-15 14:30',
        content: '到达现场，开始检查漏水情况',
        images: []
      },
      {
        id: 'CR002',
        time: '2026-01-15 15:00',
        content: '确认漏水位置，准备施工材料',
        images: []
      }
    ]
  }
])

// 历史施工记录
const historyRecords = ref([
  {
    id: 'HR001',
    orderId: 'WD20260114001',
    customer: '个人客户C',
    serviceType: '上门检测（免费）',
    completeTime: '2026-01-14 11:30',
    summary: '完成阳台漏水检测，发现是排水管老化导致的漏水，已提供维修方案'
  },
  {
    id: 'HR002',
    orderId: 'WD20260113001',
    customer: '企业客户D',
    serviceType: '直接施工（已报价）',
    completeTime: '2026-01-13 16:45',
    summary: '完成卫生间漏水维修，更换了老化的水管和防水卷材，测试无漏水现象'
  }
])

// 查看施工详情
const viewConstructionDetail = (order) => {
  uni.navigateTo({ url: `/pages/master/construction-detail?id=${order.id}` })
}

// 添加施工记录
const addConstructionRecord = (order) => {
  uni.navigateTo({ url: `/pages/master/construction-detail?id=${order.id}&action=add` })
}

// 前往师傅工作台
const goToDashboard = () => {
  uni.reLaunch({ url: '/pages/master/dashboard' })
}
</script>

<style scoped>
.construction-page {
  background-color: #f5f7fa;
}
</style>