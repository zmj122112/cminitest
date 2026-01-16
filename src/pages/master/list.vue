<script setup>
// ✅ 引入组件
import TabBar from '@/components/TabBar.vue'
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 师傅列表数据
const masters = ref([
  {
    id: 1,
    name: '张建国',
    avatar: '张',
    jobNumber: 'YX20250001',
    title: '金牌工长',
    rating: 4.9,
    experience: '15年',
    serviceCount: 1280,
    region: '上海市·浦东新区',
    certifications: ['实名认证', '金牌工长', '持证上岗', '国企背景', '擅长疑难杂症']
  },
  {
    id: 2,
    name: '李强',
    avatar: '李',
    jobNumber: 'YX20250002',
    title: '高级技师',
    rating: 4.8,
    experience: '8年',
    serviceCount: 860,
    region: '上海市·浦东新区',
    certifications: ['实名认证', '高级技师', '持证上岗', '国企背景']
  },
  {
    id: 3,
    name: '王磊',
    avatar: '王',
    jobNumber: 'YX20250003',
    title: '资深师傅',
    rating: 4.7,
    experience: '10年',
    serviceCount: 980,
    region: '上海市·浦东新区',
    certifications: ['实名认证', '资深师傅', '持证上岗', '国企背景']
  }
])

// 搜索关键词
const searchKeyword = ref('')

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 跳转到师傅详情
const goToMasterDetail = (masterId) => {
  console.log('跳转到师傅详情，ID:', masterId)
  uni.navigateTo({ url: `/pages/master/detail?id=${masterId}` })
}

// 搜索师傅
const searchMasters = () => {
  console.log('搜索师傅:', searchKeyword.value)
  // 这里可以添加搜索逻辑
}

onMounted(() => {
  console.log('师傅列表页面加载')
})

// ✅ 隐藏原生TabBar
onShow(() => {
  
})
</script>

<template>
  <view class="master-list-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 页面标题栏 -->
    <view style="background-color: #CC0010; border-bottom-left-radius: 48rpx; border-bottom-right-radius: 48rpx; padding: 32rpx 40rpx 48rpx; text-align: center; position: relative;">
      <view class="back-button" style="position: absolute; left: 20rpx; top: 20rpx; width: 80rpx; height: 80rpx; display: flex; align-items: center; justify-content: center; color: white; font-size: 40rpx; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%;" @click="goBack">
        ←
      </view>
      <view style="color: white; font-size: 36rpx; font-weight: 700; margin: 0;">找师傅</view>
    </view>

    <!-- 搜索栏 -->
    <view style="padding: 32rpx;">
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 40rpx; padding: 16rpx 32rpx; display: flex; align-items: center; gap: 16rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <view style="color: #6b7280; font-size: 32rpx;">🔍</view>
        <input 
          v-model="searchKeyword" 
          type="text" 
          placeholder="请输入姓名或工号查询" 
          style="flex: 1; border: none; outline: none; font-size: 28rpx; color: #111827;"
          @keyup.enter="searchMasters"
        >
        <button 
          @click="searchMasters" 
          style="background: #CC0010; color: white; border: none; padding: 12rpx 32rpx; border-radius: 24rpx; font-size: 28rpx; font-weight: 500; cursor: pointer;"
        >
          搜索
        </button>
      </view>
    </view>

    <!-- 师傅列表 -->
    <view style="padding: 0 32rpx;">
      <view style="font-size: 28rpx; color: #6b7280; margin-bottom: 24rpx;">查询结果：({{ masters.length }}条信息)</view>
      
      <!-- 师傅列表项 -->
      <view v-for="master in masters" :key="master.id" 
           style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; margin-bottom: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease;" 
           @click="goToMasterDetail(master.id)"
           @touchstart="$event.currentTarget.style.boxShadow = '0 12rpx 40rpx rgba(0,0,0,0.15)'"
           @touchend="$event.currentTarget.style.boxShadow = '0 8rpx 24rpx rgba(0,0,0,0.1)'">
        <!-- 师傅基本信息 -->
        <view style="display: flex; gap: 32rpx; margin-bottom: 24rpx;">
          <view style="width: 120rpx; height: 120rpx; border-radius: 50%; background: #CC0010; border: 4rpx solid #CC0010; display: flex; align-items: center; justify-content: center; color: white; font-size: 48rpx; font-weight: bold;">{{ master.avatar }}</view>
          <view style="flex: 1;">
            <view style="display: flex; align-items: center; gap: 16rpx; margin-bottom: 8rpx;">
              <view style="font-weight: 500; font-size: 32rpx; color: #111827;">{{ master.name }}</view>
              <view style="background: #CC0010; color: white; font-size: 24rpx; padding: 4rpx 16rpx; border-radius: 20rpx;">{{ master.title }}</view>
            </view>
            <view style="font-size: 28rpx; color: #6b7280; margin-bottom: 16rpx;">工号：{{ master.jobNumber }}</view>
            <view style="display: flex; gap: 32rpx;">
              <view style="font-size: 24rpx; color: #9ca3af;">所在区域：{{ master.region }}</view>
              <view style="font-size: 24rpx; color: #9ca3af;">从业年限：{{ master.experience }}</view>
            </view>
          </view>
          <view style="display: flex; align-items: center; gap: 16rpx;">
            <view style="display: flex; align-items: center; gap: 8rpx;">
              <span style="font-size: 28rpx; color: #CC0010; font-weight: 500;">{{ master.rating }}</span>
              <span style="font-size: 24rpx; color: #6b7280;">评分</span>
            </view>
          </view>
        </view>
        
        <!-- 认证标签 -->
        <view style="display: flex; flex-wrap: wrap; gap: 16rpx;">
          <view v-for="(cert, index) in master.certifications" :key="index" 
               :style="{
                 background: cert === '金牌工长' ? '#FEE2E2' : '#DBEAFE',
                 color: cert === '金牌工长' ? '#CC0010' : '#3B82F6',
                 fontSize: '24rpx',
                 padding: '4rpx 16rpx',
                 borderRadius: '24rpx',
                 border: '2rpx solid ' + (cert === '金牌工长' ? '#FECACA' : '#BFDBFE')
               }">
            {{ cert }}
          </view>
          <view style="background: #D1FAE5; color: #059669; font-size: 24rpx; padding: 4rpx 16rpx; border-radius: 24rpx; border: 2rpx solid #A7F3D0;">
            月星防水官方认证
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view v-if="masters.length === 0" style="background: white; border-radius: 32rpx; padding: 80rpx 40rpx; text-align: center; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <view style="font-size: 96rpx; margin-bottom: 32rpx;">👷</view>
        <view style="font-size: 32rpx; color: #6b7280; margin-bottom: 16rpx;">暂无师傅信息</view>
        <view style="font-size: 28rpx; color: #9ca3af;">请尝试其他搜索条件</view>
      </view>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.master-list-page {
  padding-bottom: 200rpx;
}
</style>
