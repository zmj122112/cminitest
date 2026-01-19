<template>
  <view class="construction-detail-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view style="cursor: pointer; margin-right: 32rpx;" @click="goToDashboard()">
        <text style="color: white; font-size: 48rpx;">🏠</text>
      </view>
      <view style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 160rpx; color: white;">施工详情</view>
    </view>

    <!-- 订单信息 -->
    <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); margin: 32rpx 40rpx; padding: 32rpx;">
      <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">订单信息</view>
      
      <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx; padding-bottom: 16rpx; border-bottom: 2rpx solid #f0f0f0;">
        <view style="font-size: 28rpx; font-weight: 600; color: #111827;">工单编号：{{ constructionInfo.orderId }}</view>
        <view style="font-size: 24rpx; color: #2563EB; background-color: #DBEAFE; padding: 8rpx 24rpx; border-radius: 16rpx;">施工中</view>
      </view>
      
      <view style="margin-bottom: 24rpx;">
        <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx;">
          <view style="font-size: 32rpx; font-weight: 500; color: #111827;">{{ constructionInfo.customer }}</view>
          <view style="font-size: 24rpx; color: #6b7280;">{{ constructionInfo.appointment }}</view>
        </view>
        <view style="font-size: 24rpx; color: #6b7280; margin-bottom: 16rpx;">
          <span style="font-weight: 500; color: #111827;">地址：</span>{{ constructionInfo.address }}
        </view>
        <view style="font-size: 24rpx; color: #6b7280; margin-bottom: 16rpx;">
          <span style="font-weight: 500; color: #111827;">服务类型：</span>{{ constructionInfo.serviceType }}
        </view>
      </view>
    </view>

    <!-- 施工记录 -->
    <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); margin: 0 40rpx 32rpx; padding: 32rpx;">
      <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32rpx;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333;">施工记录</view>
        <button 
          @click="showAddRecordModal = true"
          style="background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 12rpx 24rpx; font-size: 24rpx;"
        >
          添加记录
        </button>
      </view>
      
      <view v-if="constructionInfo.records.length > 0">
        <view 
          v-for="record in constructionInfo.records" 
          :key="record.id"
          style="background-color: #f9fafb; border: 2rpx solid #e5e7eb; border-radius: 16rpx; padding: 24rpx; margin-bottom: 24rpx;"
        >
          <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx;">
            <view style="font-size: 28rpx; font-weight: 600; color: #111827;">{{ record.title }}</view>
            <view style="font-size: 24rpx; color: #6b7280;">{{ record.time }}</view>
          </view>
          <view style="font-size: 26rpx; color: #666; line-height: 1.4; margin-bottom: 16rpx;">
            {{ record.content }}
          </view>
          <view v-if="record.images && record.images.length > 0" style="display: flex; gap: 16rpx; margin-top: 16rpx;">
            <view 
              v-for="(image, index) in record.images" 
              :key="index"
              style="width: 120rpx; height: 120rpx; border-radius: 8rpx; background-color: #f3f4f6; display: flex; align-items: center; justify-content: center;"
            >
              <text style="font-size: 48rpx;">📷</text>
            </view>
          </view>
        </view>
      </view>
      
      <view v-else style="text-align: center; padding: 64rpx 0;">
        <view style="font-size: 96rpx; margin-bottom: 32rpx;">📝</view>
        <view style="font-size: 28rpx; color: #999;">暂无施工记录</view>
        <view style="font-size: 24rpx; color: #ccc; margin-top: 16rpx;">点击"添加记录"开始记录施工过程</view>
      </view>
    </view>

    <!-- 施工总结 -->
    <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); margin: 0 40rpx 32rpx; padding: 32rpx;">
      <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx;">施工总结</view>
      
      <view style="margin-bottom: 32rpx;">
        <textarea 
          v-model="constructionInfo.summary"
          placeholder="请输入施工总结"
          style="width: 100%; height: 200rpx; padding: 24rpx; border: 2rpx solid #e5e7eb; border-radius: 16rpx; font-size: 28rpx; color: #333; resize: none;"
          placeholder-style="color: #999;"
        ></textarea>
      </view>
      
      <view style="display: flex; gap: 24rpx;">
        <button 
          @click="saveSummary"
          style="flex: 1; background-color: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx;"
        >
          保存总结
        </button>
        <button 
          @click="completeConstruction"
          style="flex: 1; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx; font-weight: bold;"
        >
          完成施工
        </button>
      </view>
    </view>

    <!-- 添加记录弹窗 -->
    <view v-if="showAddRecordModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); display: flex; align-items: flex-end; justify-content: center; z-index: 1000;">
      <view style="background-color: white; border-top-left-radius: 32rpx; border-top-right-radius: 32rpx; width: 100%; max-height: 80vh; padding: 32rpx; overflow-y: auto;">
        <view style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 32rpx; text-align: center;">添加施工记录</view>
        
        <view style="margin-bottom: 32rpx;">
          <view style="font-size: 28rpx; color: #333; margin-bottom: 16rpx; font-weight: 500;">记录标题</view>
          <input 
            v-model="newRecord.title"
            type="text"
            placeholder="请输入记录标题"
            style="width: 100%; padding: 24rpx; border: 2rpx solid #e5e7eb; border-radius: 16rpx; font-size: 28rpx; color: #333;"
            placeholder-style="color: #999;"
          />
        </view>
        
        <view style="margin-bottom: 32rpx;">
          <view style="font-size: 28rpx; color: #333; margin-bottom: 16rpx; font-weight: 500;">记录内容</view>
          <textarea 
            v-model="newRecord.content"
            placeholder="请输入记录内容"
            style="width: 100%; height: 200rpx; padding: 24rpx; border: 2rpx solid #e5e7eb; border-radius: 16rpx; font-size: 28rpx; color: #333; resize: none;"
            placeholder-style="color: #999;"
          ></textarea>
        </view>
        
        <view style="margin-bottom: 32rpx;">
          <view style="font-size: 28rpx; color: #333; margin-bottom: 16rpx; font-weight: 500;">添加图片（可选）</view>
          <view style="display: flex; gap: 16rpx;">
            <view 
              v-for="(image, index) in newRecord.images" 
              :key="index"
              style="width: 120rpx; height: 120rpx; border-radius: 8rpx; background-color: #f3f4f6; display: flex; align-items: center; justify-content: center;"
            >
              <text style="font-size: 48rpx;">📷</text>
            </view>
            <view 
              v-if="newRecord.images.length < 3"
              style="width: 120rpx; height: 120rpx; border-radius: 8rpx; border: 2rpx dashed #e5e7eb; display: flex; align-items: center; justify-content: center; cursor: pointer;"
              @click="addImage"
            >
              <text style="font-size: 48rpx;">+</text>
            </view>
          </view>
        </view>
        
        <view style="display: flex; gap: 24rpx;">
          <button 
            @click="showAddRecordModal = false"
            style="flex: 1; background-color: white; color: #333; border: 2rpx solid #E5E7EB; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx;"
          >
            取消
          </button>
          <button 
            @click="saveRecord"
            style="flex: 1; background-color: #CC0010; color: white; border: none; border-radius: 16rpx; padding: 24rpx; font-size: 28rpx; font-weight: bold;"
          >
            保存记录
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 施工信息
const constructionInfo = ref({
  orderId: 'WD20260115002',
  customer: '个人客户B',
  appointment: '2026-01-15 下午（14:00-17:00）',
  address: '上海市静安区南京西路1268号',
  serviceType: '直接施工（已报价）',
  summary: '',
  records: [
    {
      id: 'CR001',
      title: '到达现场',
      content: '到达客户现场，开始检查漏水情况',
      time: '2026-01-15 14:30',
      images: []
    },
    {
      id: 'CR002',
      title: '检查漏水原因',
      content: '确认是厨房水管老化导致的漏水，需要更换水管和防水卷材',
      time: '2026-01-15 15:00',
      images: []
    }
  ]
})

// 新记录
const newRecord = ref({
  title: '',
  content: '',
  images: []
})

// 弹窗状态
const showAddRecordModal = ref(false)

// 从路由参数获取订单ID
onLoad((options) => {
  const orderId = options.id || 'WD20260115002'
  constructionInfo.value.orderId = orderId
  // 这里可以添加根据ID获取施工详情的逻辑
  console.log('施工详情页面加载，订单ID:', orderId)
})

// 添加图片
const addImage = () => {
  if (newRecord.value.images.length < 3) {
    newRecord.value.images.push('')
  }
}

// 保存记录
const saveRecord = () => {
  if (!newRecord.value.title) {
    uni.showToast({ title: '请输入记录标题', icon: 'none' })
    return
  }
  if (!newRecord.value.content) {
    uni.showToast({ title: '请输入记录内容', icon: 'none' })
    return
  }
  
  const record = {
    id: 'CR' + Date.now(),
    title: newRecord.value.title,
    content: newRecord.value.content,
    time: new Date().toLocaleString('zh-CN'),
    images: newRecord.value.images
  }
  
  constructionInfo.value.records.push(record)
  showAddRecordModal.value = false
  newRecord.value = {
    title: '',
    content: '',
    images: []
  }
  uni.showToast({ title: '记录保存成功', icon: 'success' })
}

// 保存总结
const saveSummary = () => {
  uni.showToast({ title: '总结保存成功', icon: 'success' })
}

// 完成施工
const completeConstruction = () => {
  if (!constructionInfo.value.summary) {
    uni.showToast({ title: '请输入施工总结', icon: 'none' })
    return
  }
  
  uni.showModal({
    title: '完成施工',
    content: '确定要完成施工吗？',
    success: (res) => {
      if (res.confirm) {
        // 直接更新订单状态为待验收
        uni.showToast({ title: '施工完成成功', icon: 'success' })
        setTimeout(() => {
          // 返回上一页
          uni.navigateBack()
        }, 1000)
      }
    }
  })
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
.construction-detail-page {
  background-color: #f5f7fa;
}
</style>