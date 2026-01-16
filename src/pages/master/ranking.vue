<template>
  <view class="ranking-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <view class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">积分排名</view>
      </view>
    </view>

    <!-- 个人排名信息 -->
    <view style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 20px; position: relative; z-index: 10;">
      <view class="personal-ranking" style="display: flex; align-items: center;">
        <view class="ranking-number" style="width: 60px; height: 60px; background-color: #E60012; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; margin-right: 20px;">
          {{ myRanking.rank }}
        </view>
        <view class="ranking-info" style="flex: 1;">
          <view class="ranking-name" style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 4px;">{{ myRanking.name }}</view>
          <view class="ranking-details" style="display: flex; gap: 20px;">
            <span class="score" style="font-size: 14px; color: #6b7280;">积分: {{ myRanking.score }}</span>
            <span class="level" style="font-size: 14px; color: #E60012;">等级: {{ myRanking.level }}</span>
          </view>
        </view>
        <view class="ranking-trend" :style="{ color: myRanking.trend > 0 ? '#10B981' : myRanking.trend < 0 ? '#EF4444' : '#6b7280' }" style="font-size: 14px; font-weight: 500;">
          {{ myRanking.trend > 0 ? '↑' : myRanking.trend < 0 ? '↓' : '→' }} {{ Math.abs(myRanking.trend) }}
        </view>
      </view>
    </view>

    <!-- 排名筛选 -->
    <view style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view class="filter-title" style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">排名筛选</view>
      <view class="filter-options" style="display: flex; gap: 12px; flex-wrap: wrap;">
        <view v-for="filter in filters" :key="filter.id" class="filter-item" @click="selectFilter(filter.id)" :class="{ active: selectedFilter === filter.id }" style="padding: 8px 20px; border-radius: 20px; font-size: 14px; cursor: pointer; transition: all 0.3s ease;" :style="{ backgroundColor: selectedFilter === filter.id ? '#E60012' : '#f9fafb', color: selectedFilter === filter.id ? 'white' : '#111827', border: `2px solid ${selectedFilter === filter.id ? '#E60012' : '#E5E7EB'}` }">
          {{ filter.name }}
        </view>
      </view>
    </view>

    <!-- 排名列表 -->
    <view style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view class="ranking-list-title" style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">排行榜</view>
      <view class="ranking-list">
        <view v-for="(ranking, index) in filteredRankings" :key="ranking.id" class="ranking-item" :class="{ 'my-ranking': ranking.id === myRanking.id }" style="display: flex; align-items: center; padding: 16px 0; border-bottom: 1px solid #E5E7EB; transition: all 0.3s ease;" :style="{ backgroundColor: ranking.id === myRanking.id ? '#FEF2F2' : 'transparent' }">
          <view class="ranking-number" :style="{ backgroundColor: getRankingColor(index + 1), color: 'white' }" style="width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: bold; margin-right: 16px;">
            {{ index + 1 }}
          </view>
          <view class="ranking-info" style="flex: 1;">
            <view class="ranking-name" style="font-size: 14px; font-weight: 500; color: #111827; margin-bottom: 4px;">{{ ranking.name }}</view>
            <view class="ranking-details" style="display: flex; gap: 20px;">
              <span class="score" style="font-size: 12px; color: #6b7280;">积分: {{ ranking.score }}</span>
              <span class="level" style="font-size: 12px; color: #E60012;">等级: {{ ranking.level }}</span>
            </view>
          </view>
          <view class="ranking-trend" :style="{ color: ranking.trend > 0 ? '#10B981' : ranking.trend < 0 ? '#EF4444' : '#6b7280' }" style="font-size: 14px; font-weight: 500;">
            {{ ranking.trend > 0 ? '↑' : ranking.trend < 0 ? '↓' : '→' }} {{ Math.abs(ranking.trend) }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 个人排名信息
const myRanking = ref({
  id: '1',
  name: '张建国',
  score: 150,
  rank: 1,
  level: '钻石师傅',
  trend: 0
})

// 排名筛选选项
const filters = ref([
  { id: 'all', name: '总榜' },
  { id: 'week', name: '周榜' },
  { id: 'month', name: '月榜' }
])

// 选中的筛选选项
const selectedFilter = ref('all')

// 排名数据
const rankings = ref([
  { id: '1', name: '张建国', score: 150, level: '钻石师傅', trend: 0 },
  { id: '2', name: '李明', score: 130, level: '金牌师傅', trend: 1 },
  { id: '3', name: '王强', score: 120, level: '金牌师傅', trend: -1 },
  { id: '4', name: '赵军', score: 100, level: '银牌师傅', trend: 2 },
  { id: '5', name: '陈师傅', score: 90, level: '银牌师傅', trend: 0 },
  { id: '6', name: '刘师傅', score: 80, level: '铜牌师傅', trend: -2 },
  { id: '7', name: '孙师傅', score: 70, level: '铜牌师傅', trend: 1 },
  { id: '8', name: '周师傅', score: 60, level: '初级师傅', trend: 0 },
  { id: '9', name: '吴师傅', score: 50, level: '初级师傅', trend: -1 },
  { id: '10', name: '郑师傅', score: 40, level: '初级师傅', trend: 1 }
])

// 过滤后的排名
const filteredRankings = computed(() => {
  // 这里可以根据筛选条件返回不同的排名数据
  // 目前返回全部数据
  return rankings.value
})

// 选择筛选选项
const selectFilter = (filterId) => {
  selectedFilter.value = filterId
}

// 获取排名颜色
const getRankingColor = (rank) => {
  switch (rank) {
    case 1:
      return '#FFD700' // 金色
    case 2:
      return '#C0C0C0' // 银色
    case 3:
      return '#CD7F32' // 铜色
    default:
      return '#E60012' // 红色
  }
}

// 前往师傅工作台
const goToDashboard = () => {
  uni.reLaunch({ url: '/pages/master/dashboard' })
}
</script>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>