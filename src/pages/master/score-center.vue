<template>
  <view class="score-center-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <view class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">积分中心</view>
      </view>
    </view>

    <!-- 积分概览卡片 - 浮动白色卡片 -->
    <view style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view class="score-overview" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <!-- 当前积分 -->
        <view class="score-info" style="text-align: left;">
          <view class="score-label" style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">当前积分</view>
          <view class="score-value" style="font-size: 36px; font-weight: bold; color: #E60012; margin-bottom: 4px;">{{ scoreInfo.currentScore }}</view>
          <view class="score-subtitle" style="font-size: 12px; color: #9ca3af;">累计获得积分：{{ scoreInfo.totalScore }}</view>
        </view>
        <!-- 当前排名 -->
        <view class="ranking-info" style="text-align: right;">
          <view class="ranking-label" style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">当前排名</view>
          <view class="ranking-value" style="display: flex; align-items: baseline; justify-content: flex-end; margin-bottom: 4px;">
            <span class="ranking-number" style="font-size: 32px; font-weight: bold; color: #E60012;">{{ scoreInfo.ranking }}</span>
            <span class="ranking-text" style="font-size: 16px; color: #6b7280; margin-left: 2px;">名</span>
          </view>
          <view class="ranking-subtitle" style="font-size: 12px; color: #9ca3af;">{{ scoreInfo.level }}</view>
        </view>
      </view>
    </view>

    <!-- 积分等级进度条卡片 - 浮动白色卡片 -->
    <view style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view class="level-progress-section">
        <view class="level-info" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="current-level" style="font-size: 16px; font-weight: 600; color: #E60012;">{{ currentLevelInfo.currentLevel.name }}</span>
          <span class="progress-text" style="font-size: 13px; color: #6b7280;">距离{{ currentLevelInfo.nextLevel.name }}还差{{ currentLevelInfo.nextScore - scoreInfo.currentScore }}分</span>
        </view>
        <view class="progress-bar" style="height: 8px; background-color: #E5E7EB; border-radius: 4px; overflow: hidden; margin-bottom: 8px;">
          <view class="progress-fill" :style="{ width: currentLevelInfo.progress + '%', backgroundColor: '#d4af37' }" style="height: 100%; transition: width 0.3s ease;"></view>
        </view>
        <view class="level-range" style="display: flex; justify-content: space-between; font-size: 12px; color: #9ca3af;">
          <span>{{ currentLevelInfo.currentLevel.minScore }}分</span>
          <span>{{ currentLevelInfo.currentLevel.maxScore === Infinity ? '∞' : currentLevelInfo.currentLevel.maxScore }}分</span>
        </view>
      </view>
    </view>

    <!-- 操作按钮组卡片 - 浮动白色卡片 -->
    <view style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px 12px; position: relative; z-index: 10; overflow: hidden;">
      <view class="score-actions" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
        <view class="action-button" @click="goToScoreMall" style="flex: 1; height: 40px; font-size: 14px; border-radius: 20px; background-color: #E60012; border-color: #E60012; padding: 0 8px; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;">
          <text style="margin-right: 4px;">🛒</text>
          积分商城
        </view>
        <view class="action-button" @click="goToExchangeRecord" style="flex: 1; height: 40px; font-size: 14px; border-radius: 20px; background-color: #E60012; border-color: #E60012; padding: 0 8px; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;">
          <text style="margin-right: 4px;">📄</text>
          兑换记录
        </view>
        <view class="action-button" @click="goToRanking" style="flex: 1; height: 40px; font-size: 14px; border-radius: 20px; background-color: #E60012; border-color: #E60012; padding: 0 8px; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;">
          <text style="margin-right: 4px;">⭐</text>
          积分排名
        </view>
      </view>
    </view>

    <!-- 积分规则 -->
    <view style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view 
        class="card-header" 
        style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; cursor: pointer;"
        @click="toggleRules"
      >
        <span style="font-size: 18px; font-weight: 600; color: #111827;">积分规则</span>
        <view style="transition: transform 0.3s ease;">
          <text :style="{ transform: rulesExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }" style="font-size: 20px; color: #606266; transition: transform 0.3s ease;">›</text>
        </view>
      </view>
      
      <view 
        class="rules-container" 
        v-show="rulesExpanded"
        style="padding: 0; overflow: hidden; transition: all 0.3s ease; max-height: 1000px; opacity: 1; visibility: visible; margin-bottom: 0; transform: translateY(0);"
      >
        <view 
          v-for="(rules, type) in groupedRules" 
          :key="type" 
          class="rule-group" 
          style="margin-bottom: 24px;"
        >
          <view class="group-title" style="font-size: 16px; font-weight: 500; color: #E60012; margin-bottom: 12px;">
            {{ type }}
          </view>
          <view class="rules-list" style="display: flex; flex-direction: column; gap: 8px;">
            <view 
              v-for="rule in rules" 
              :key="rule.id" 
              class="rule-item" 
              style="background-color: #f9fafb; border: 1px solid #E5E7EB; border-radius: 12px; padding: 12px; transition: all 0.3s ease;"
            >
              <view class="rule-content" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span class="rule-action" style="font-size: 14px; color: #111827; flex: 1;">{{ rule.description }}</span>
                <span 
                  class="rule-score" 
                  :style="rule.score.startsWith('+') ? 'font-size: 14px; font-weight: 600; color: #10B981;' : 'font-size: 14px; font-weight: 600; color: #EF4444;'"
                >
                  {{ rule.score }}
                </span>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 积分流水 -->
    <view style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view class="card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="font-size: 18px; font-weight: 600; color: #111827;">积分流水</span>
      </view>
      
      <view class="history-container" style="padding: 0;">
        <view 
          v-for="item in scoreHistory" 
          :key="item.id" 
          class="history-item" 
          style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #E5E7EB;"
        >
          <view class="history-left" style="flex: 1;">
            <div class="history-time" style="font-size: 12px; color: #9ca3af; margin-bottom: 2px;">{{ item.time }}</div>
            <div class="history-type" style="font-size: 12px; color: #E60012; font-weight: 500;">{{ item.type }}</div>
          </view>
          <view class="history-center" style="flex: 2; margin: 0 20px;">
            <div class="history-action" style="font-size: 14px; color: #111827; margin-bottom: 2px;">{{ item.action }}</div>
            <div class="history-order-id" style="font-size: 12px; color: #6b7280;">工单：{{ item.orderId }}</div>
          </view>
          <view class="history-right" style="flex: 1; text-align: right;">
            <span 
              class="history-score" 
              :style="item.score.startsWith('+') ? 'font-size: 16px; font-weight: 600; color: #10B981;' : 'font-size: 16px; font-weight: 600; color: #EF4444;'"
            >
              {{ item.score }}
            </span>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 积分信息
const scoreInfo = ref({
  currentScore: 150,
  totalScore: 200,
  ranking: 1,
  level: '钻石师傅'
})

// 积分等级配置
const levelConfig = [
  { name: '初级师傅', minScore: 0, maxScore: 99 },
  { name: '铜牌师傅', minScore: 100, maxScore: 199 },
  { name: '银牌师傅', minScore: 200, maxScore: 299 },
  { name: '金牌师傅', minScore: 300, maxScore: 499 },
  { name: '钻石师傅', minScore: 500, maxScore: Infinity }
]

// 计算当前等级的进度
const currentLevelInfo = computed(() => {
  const level = levelConfig.find(l => scoreInfo.value.currentScore >= l.minScore && scoreInfo.value.currentScore <= l.maxScore)
  const nextLevel = levelConfig[levelConfig.indexOf(level) + 1] || level
  const progress = level.maxScore === Infinity ? 100 : ((scoreInfo.value.currentScore - level.minScore) / (level.maxScore - level.minScore)) * 100
  return {
    currentLevel: level,
    nextLevel: nextLevel,
    progress: Math.min(100, Number(progress.toFixed(1))),
    nextScore: nextLevel.minScore
  }
})

// 积分规则，按类型分组
const scoreRules = ref([
  { id: 1, type: '接单', action: '接单', score: '+30', description: '成功接受派单' },
  { id: 2, type: '接单', action: '派单后不接单', score: '-10', description: '派单后拒绝接单' },
  { id: 3, type: '施工拍照', action: '施工前拍照', score: '+10', description: '上传施工前照片' },
  { id: 4, type: '施工拍照', action: '不拍', score: '-5', description: '未上传施工前照片' },
  { id: 5, type: '施工拍照', action: '施工中拍照', score: '+10', description: '上传施工中照片' },
  { id: 6, type: '施工拍照', action: '不拍', score: '-5', description: '未上传施工中照片' },
  { id: 7, type: '施工拍照', action: '完工后拍照', score: '+10', description: '上传完工后照片' },
  { id: 8, type: '施工拍照', action: '不拍', score: '-5', description: '未上传完工后照片' },
  { id: 9, type: '评价', action: '好评', score: '+30', description: '获得客户好评' },
  { id: 10, type: '评价', action: '中评', score: '+10', description: '获得客户中评' },
  { id: 11, type: '评价', action: '差评', score: '-30', description: '获得客户差评' }
])

// 积分规则分组
const groupedRules = computed(() => {
  const groups = {}
  scoreRules.value.forEach(rule => {
    if (!groups[rule.type]) {
      groups[rule.type] = []
    }
    groups[rule.type].push(rule)
  })
  return groups
})

// 积分流水
const scoreHistory = ref([
  { id: 1, type: '接单', action: '接单', score: '+30', time: '2023-10-15 10:30:00', orderId: 'WO001' },
  { id: 2, type: '施工拍照', action: '施工前拍照', score: '+10', time: '2023-10-16 09:15:00', orderId: 'WO001' },
  { id: 3, type: '施工拍照', action: '施工中拍照', score: '+10', time: '2023-10-16 14:20:00', orderId: 'WO001' },
  { id: 4, type: '施工拍照', action: '完工后拍照', score: '+10', time: '2023-10-17 11:45:00', orderId: 'WO001' },
  { id: 5, type: '评价', action: '好评', score: '+30', time: '2023-10-18 16:20:00', orderId: 'WO001' },
  { id: 6, type: '接单', action: '接单', score: '+30', time: '2023-10-19 08:45:00', orderId: 'WO002' },
  { id: 7, type: '施工拍照', action: '施工前拍照', score: '+10', time: '2023-10-19 10:30:00', orderId: 'WO002' }
])

// 跳转到积分商城
const goToScoreMall = () => {
  uni.navigateTo({ url: '/pages/master/score-mall' })
}

// 跳转到积分排名
const goToRanking = () => {
  uni.navigateTo({ url: '/pages/master/ranking' })
}

// 跳转到兑换记录
const goToExchangeRecord = () => {
  uni.navigateTo({ url: '/pages/master/exchange-record' })
}

// 积分规则展开/折叠状态
const rulesExpanded = ref(false)

// 切换积分规则展开/折叠状态
const toggleRules = () => {
  rulesExpanded.value = !rulesExpanded.value
}

// 前往师傅工作台
const goToDashboard = () => {
  uni.reLaunch({ url: '/pages/master/dashboard' })
}
</script>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>