<script setup>
import { ref } from 'vue'
import TabBar from '@/components/TabBar.vue'

const navigateTo = (url) => {
  uni.navigateTo({
    url
  })
}

// 订单数据
const orders = ref([
  {
    id: 'WD20260117001',
    type: '卫生间漏水维修',
    customer: '张三',
    address: '上海市普陀区中江路118号',
    appointment: '明天 14:00',
    status: 'pending',
    statusText: '待处理',
    amount: '¥300'
  },
  {
    id: 'WD20260117002',
    type: '厨房漏水维修',
    customer: '李四',
    address: '上海市静安区南京西路1268号',
    appointment: '后天 09:30',
    status: 'inProgress',
    statusText: '进行中',
    amount: '¥450'
  },
  {
    id: 'WD20260117003',
    type: '阳台防水施工',
    customer: '王五',
    address: '上海市徐汇区淮海中路1000号',
    appointment: '昨天 16:00',
    status: 'completed',
    statusText: '已完成',
    amount: '¥600'
  }
])

// 订单状态分类
const orderStatus = ref([
  { value: 'all', label: '全部', count: orders.value.length },
  { value: 'pending', label: '待处理', count: orders.value.filter(o => o.status === 'pending').length },
  { value: 'accepted', label: '已接单', count: orders.value.filter(o => o.status === 'accepted').length },
  { value: 'inProgress', label: '进行中', count: orders.value.filter(o => o.status === 'inProgress').length },
  { value: 'pendingAcceptance', label: '待验收', count: orders.value.filter(o => o.status === 'pendingAcceptance').length },
  { value: 'completed', label: '已完成', count: orders.value.filter(o => o.status === 'completed').length }
])

// 当前选中的状态
const activeStatus = ref('all')

// 根据状态过滤订单
const filteredOrders = ref(orders.value)

// 搜索关键词
const searchKeyword = ref('')

// 切换订单状态
const switchStatus = (status) => {
  activeStatus.value = status
  applyFilters()
}

// 应用搜索和状态过滤
const applyFilters = () => {
  let results = orders.value
  
  // 状态过滤
  if (activeStatus.value !== 'all') {
    results = results.filter(order => order.status === activeStatus.value)
  }
  
  // 关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    results = results.filter(order => 
      order.id.toLowerCase().includes(keyword) ||
      order.customer.toLowerCase().includes(keyword) ||
      order.type.toLowerCase().includes(keyword) ||
      order.address.toLowerCase().includes(keyword)
    )
  }
  
  filteredOrders.value = results
}

// 处理搜索输入
const handleSearch = () => {
  applyFilters()
}

// 清除搜索
const clearSearch = () => {
  searchKeyword.value = ''
  applyFilters()
}

// 接单
const acceptOrder = (order) => {
  uni.showModal({
    title: '接单确认',
    content: `确认接取 ${order.customer} 的 ${order.type} 订单吗？`,
    success: (res) => {
      if (res.confirm) {
        order.status = 'accepted'
        order.statusText = '已接单'
        updateOrderStatuses()
        uni.showToast({ title: '接单成功', icon: 'success' })
      }
    }
  })
}

// 开始施工
const startConstruction = (order) => {
  uni.showModal({
    title: '开始施工',
    content: `确认开始 ${order.customer} 的 ${order.type} 施工吗？`,
    success: (res) => {
      if (res.confirm) {
        order.status = 'inProgress'
        order.statusText = '进行中'
        updateOrderStatuses()
        uni.showToast({ title: '施工开始', icon: 'success' })
      }
    }
  })
}

// 添加施工记录
const addConstructionRecord = (order) => {
  uni.navigateTo({ url: `/pages/master/construction-detail?id=${order.id}&action=add` })
}

// 申请验收
const requestAcceptance = (order) => {
  uni.showModal({
    title: '申请验收',
    content: `确认申请 ${order.customer} 的 ${order.type} 订单验收吗？`,
    success: (res) => {
      if (res.confirm) {
        order.status = 'pendingAcceptance'
        order.statusText = '待验收'
        updateOrderStatuses()
        uni.showToast({ title: '申请验收成功', icon: 'success' })
      }
    }
  })
}

// 完成订单
const completeOrder = (order) => {
  uni.showModal({
    title: '标记完成',
    content: `确认 ${order.customer} 的 ${order.type} 订单已完成验收吗？`,
    success: (res) => {
      if (res.confirm) {
        order.status = 'completed'
        order.statusText = '已完成'
        updateOrderStatuses()
        uni.showToast({ title: '订单完成', icon: 'success' })
      }
    }
  })
}

// 更新订单状态计数
const updateOrderStatuses = () => {
  orderStatus.value = [
    { value: 'all', label: '全部', count: orders.value.length },
    { value: 'pending', label: '待处理', count: orders.value.filter(o => o.status === 'pending').length },
    { value: 'accepted', label: '已接单', count: orders.value.filter(o => o.status === 'accepted').length },
    { value: 'inProgress', label: '进行中', count: orders.value.filter(o => o.status === 'inProgress').length },
    { value: 'pendingAcceptance', label: '待验收', count: orders.value.filter(o => o.status === 'pendingAcceptance').length },
    { value: 'completed', label: '已完成', count: orders.value.filter(o => o.status === 'completed').length }
  ]
  // 重新过滤订单
  switchStatus(activeStatus.value)
}
</script>

<template>
  <view class="master-work-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <view class="header" style="background-color: #CC0010; padding: 40rpx; padding-bottom: 80rpx; color: white;">
      <view style="font-size: 36rpx; font-weight: bold;">作业大厅</view>
      <view style="font-size: 24rpx; opacity: 0.8; margin-top: 10rpx;">欢迎回来，王师傅</view>
    </view>
    
    <!-- 固定头部：搜索栏和筛选 -->
    <view class="fixed-header" style="position: sticky; top: 0; z-index: 100; background-color: #f5f7fa; padding-bottom: 20rpx;">
      <!-- 搜索栏 -->
      <view class="search-bar" style="margin: -20px 40rpx 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
        <view style="display: flex; align-items: center; gap: 16rpx;">
          <view style="flex: 1; display: flex; align-items: center; background-color: #f5f7fa; border-radius: 12px; padding: 0 20rpx;">
            <text style="font-size: 28rpx; color: #999; margin-right: 12rpx;">🔍</text>
            <input 
              v-model="searchKeyword" 
              placeholder="搜索订单编号、客户、地址" 
              style="flex: 1; height: 60rpx; font-size: 24rpx;"
            />
          </view>
          <view style="display: flex; gap: 12rpx;">
            <button 
              @click="handleSearch"
              style="background-color: #CC0010; color: white; border: none; border-radius: 12px; padding: 12rpx 24rpx; font-size: 24rpx;"
            >
              搜索
            </button>
            <button 
              @click="clearSearch"
              style="background-color: #f5f7fa; color: #666; border: none; border-radius: 12px; padding: 12rpx 24rpx; font-size: 24rpx;"
            >
              清除
            </button>
          </view>
        </view>
      </view>
      
      <!-- 订单状态筛选 -->
      <view class="status-filter" style="margin: 0 40rpx 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
        <view style="display: flex; overflow-x: auto; gap: 16rpx;">
          <view 
            v-for="status in orderStatus" 
            :key="status.value"
            :style="activeStatus === status.value ? activeStatusStyle : statusStyle"
            @click="switchStatus(status.value)"
          >
            <text>{{ status.label }}</text>
            <text style="margin-left: 8rpx; font-size: 20rpx;">({{ status.count }})</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 订单列表 -->
    <view class="order-list" style="padding: 0 32rpx;">
      <view v-if="filteredOrders.length > 0">
        <view 
          v-for="order in filteredOrders" 
          :key="order.id"
          class="order-card" 
          style="background: white; border-radius: 16rpx; padding: 32rpx; margin-bottom: 20rpx; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);"
        >
          <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20rpx;">
            <view style="flex: 1;">
              <view style="font-weight: bold; font-size: 30rpx; margin-bottom: 8rpx;">{{ order.type }}</view>
              <view style="font-size: 24rpx; color: #666;">客户：{{ order.customer }}</view>
            </view>
            <view 
              :style="order.status === 'pending' ? pendingStatusStyle : 
                     order.status === 'accepted' ? acceptedStatusStyle :
                     order.status === 'inProgress' ? inProgressStatusStyle : 
                     order.status === 'pendingAcceptance' ? pendingAcceptanceStatusStyle :
                     completedStatusStyle"
            >
              {{ order.statusText }}
            </view>
          </view>
          <view style="display: flex; margin-bottom: 16rpx;">
            <view style="font-size: 24rpx; color: #999; margin-right: 32rpx;">
              📍 {{ order.address }}
            </view>
          </view>
          <view style="display: flex; justify-content: space-between; align-items: center;">
            <view style="font-size: 24rpx; color: #999;">
              ⏰ {{ order.appointment }}
            </view>
            <view style="font-size: 28rpx; font-weight: bold; color: #E60012;">
              {{ order.amount }}
            </view>
          </view>
          <view style="margin-top: 20rpx; display: flex; gap: 16rpx; justify-content: flex-end;">
            <button 
              @click="navigateTo(`/pages/master/workorder-detail?id=${order.id}`)"
              style="flex: 1; background: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 20rpx; font-size: 24rpx;"
            >
              查看详情
            </button>
            <button 
              v-if="order.status === 'pending'"
              @click="acceptOrder(order)"
              style="flex: 1; background: #E60012; color: white; border: none; border-radius: 16rpx; padding: 20rpx; font-size: 24rpx;"
            >
              接单
            </button>
            <button 
              v-else-if="order.status === 'accepted'"
              @click="startConstruction(order)"
              style="flex: 1; background: #E60012; color: white; border: none; border-radius: 16rpx; padding: 20rpx; font-size: 24rpx;"
            >
              开始施工
            </button>
            <template v-else-if="order.status === 'inProgress'">
              <button 
                @click="addConstructionRecord(order)"
                style="flex: 1; background: #E60012; color: white; border: none; border-radius: 16rpx; padding: 20rpx; font-size: 24rpx;"
              >
                添加施工记录
              </button>
              <button 
                @click="requestAcceptance(order)"
                style="flex: 1; background: #1E90FF; color: white; border: none; border-radius: 16rpx; padding: 20rpx; font-size: 24rpx;"
              >
                申请验收
              </button>
            </template>
            <button 
              v-else-if="order.status === 'pendingAcceptance'"
              @click="completeOrder(order)"
              style="flex: 1; background: #32CD32; color: white; border: none; border-radius: 16rpx; padding: 20rpx; font-size: 24rpx;"
            >
              标记完成
            </button>
          </view>
        </view>
      </view>
      <view v-else style="background: white; border-radius: 16rpx; padding: 128rpx 32rpx; margin-bottom: 20rpx; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05); text-align: center;">
        <view style="font-size: 96rpx; margin-bottom: 32rpx;">📋</view>
        <view style="font-size: 28rpx; color: #999; margin-bottom: 16rpx;">暂无订单</view>
        <view style="font-size: 24rpx; color: #ccc;">请稍后刷新查看</view>
      </view>
    </view>
    


    <TabBar />
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 样式定义
      statusStyle: {
        padding: '12rpx 24rpx',
        borderRadius: '24rpx',
        backgroundColor: '#f5f7fa',
        fontSize: '24rpx',
        whiteSpace: 'nowrap'
      },
      activeStatusStyle: {
        padding: '12rpx 24rpx',
        borderRadius: '24rpx',
        backgroundColor: '#CC0010',
        color: 'white',
        fontSize: '24rpx',
        whiteSpace: 'nowrap'
      },
      acceptedStatusStyle: {
        padding: '8rpx 16rpx',
        borderRadius: '16rpx',
        backgroundColor: '#FFF3CD',
        color: '#856404',
        fontSize: '24rpx'
      },
      pendingAcceptanceStatusStyle: {
        padding: '8rpx 16rpx',
        borderRadius: '16rpx',
        backgroundColor: '#D1ECF1',
        color: '#0C5460',
        fontSize: '24rpx'
      },
      inProgressStatusStyle: {
        padding: '8rpx 16rpx',
        borderRadius: '16rpx',
        backgroundColor: '#D1ECF1',
        color: '#0C5460',
        fontSize: '24rpx'
      },
      completedStatusStyle: {
        padding: '8rpx 16rpx',
        borderRadius: '16rpx',
        backgroundColor: '#D4EDDA',
        color: '#155724',
        fontSize: '24rpx'
      }
    }
  }
}
</script>