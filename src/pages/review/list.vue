<script setup>
// ✅ 引入组件
import TabBar from '@/components/TabBar.vue'
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 客户评价数据
const customerReviews = ref([
  {
    id: 1, 
    name: '张先生', 
    avatar: '张', 
    content: '师傅很专业，服务态度好，维修后没有再出现漏水问题，非常满意！', 
    rating: 5, 
    project: '卫生间维修', 
    date: '2025-12-20',
    tags: ['专业', '态度好', '效果佳']
  },
  {
    id: 2, 
    name: '李女士', 
    avatar: '李', 
    content: '国企背景果然不一样，服务规范，价格透明，维修质量高，推荐！', 
    rating: 5, 
    project: '屋顶补漏', 
    date: '2025-12-18',
    tags: ['规范', '透明', '推荐']
  },
  {
    id: 3, 
    name: '王先生', 
    avatar: '王', 
    content: '师傅上门很及时，检测仔细，维修工艺精湛，解决了困扰我多年的漏水问题。', 
    rating: 5, 
    project: '阳台防水', 
    date: '2025-12-15',
    tags: ['及时', '仔细', '精湛']
  },
  {
    id: 4, 
    name: '赵女士', 
    avatar: '赵', 
    content: '服务很好，价格合理，维修后效果不错，值得信赖。', 
    rating: 4, 
    project: '厨房漏水', 
    date: '2025-12-10',
    tags: ['服务好', '价格合理', '信赖']
  },
  {
    id: 5, 
    name: '刘先生', 
    avatar: '刘', 
    content: '师傅技术专业，工作认真负责，维修后还主动清理现场，非常贴心。', 
    rating: 5, 
    project: '外墙防水', 
    date: '2025-12-05',
    tags: ['专业', '认真', '贴心']
  }
])

// 搜索关键词
const searchKeyword = ref('')

// 过滤后的评价
const filteredReviews = ref([...customerReviews.value])

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 跳转到评价详情
const goToReviewDetail = (reviewId) => {
  console.log('跳转到评价详情，ID:', reviewId)
  uni.navigateTo({ url: `/pages/review/detail?id=${reviewId}` })
}

// 搜索评价
const searchReviews = () => {
  console.log('搜索评价:', searchKeyword.value)
  // 这里可以添加搜索逻辑
  if (searchKeyword.value) {
    filteredReviews.value = customerReviews.value.filter(review => 
      review.content.includes(searchKeyword.value) || 
      review.name.includes(searchKeyword.value) ||
      review.project.includes(searchKeyword.value)
    )
  } else {
    filteredReviews.value = [...customerReviews.value]
  }
}

onMounted(() => {
  console.log('客户评价列表页面加载')
})

// ✅ 隐藏原生TabBar
onShow(() => {
  
})
</script>

<template>
  <view class="customer-review-list-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 页面标题栏 -->
    <view style="background-color: #CC0010; border-bottom-left-radius: 48rpx; border-bottom-right-radius: 48rpx; padding: 32rpx 40rpx 48rpx; text-align: center; position: relative;">
      <view class="back-button" style="position: absolute; left: 20rpx; top: 20rpx; width: 80rpx; height: 80rpx; display: flex; align-items: center; justify-content: center; color: white; font-size: 40rpx; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%;" @click="goBack">
        ←
      </view>
      <view style="color: white; font-size: 36rpx; font-weight: 700; margin: 0;">客户评价</view>
    </view>

    <!-- 搜索栏 -->
    <view style="padding: 32rpx;">
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 40rpx; padding: 16rpx 32rpx; display: flex; align-items: center; gap: 16rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <view style="color: #6b7280; font-size: 32rpx;">🔍</view>
        <input 
          v-model="searchKeyword" 
          type="text" 
          placeholder="搜索客户评价" 
          style="flex: 1; border: none; outline: none; font-size: 28rpx; color: #111827;"
          @keyup.enter="searchReviews"
        >
        <button 
          @click="searchReviews" 
          style="background: #CC0010; color: white; border: none; padding: 12rpx 32rpx; border-radius: 24rpx; font-size: 28rpx; font-weight: 500; cursor: pointer;"
        >
          搜索
        </button>
      </view>
    </view>

    <!-- 评价统计 -->
    <view style="padding: 0 32rpx 32rpx;">
      <div style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 32rpx;">
          <div>
            <div style="font-size: 64rpx; font-weight: bold; color: #CC0010;">4.9</div>
            <div style="display: flex; align-items: center; gap: 8rpx; margin-top: 8rpx;">
              <text style="color: #F59E0B; font-size: 32rpx;">⭐⭐⭐⭐⭐</text>
            </div>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12rpx;">
              <div style="font-size: 28rpx; color: #6b7280;">5星</div>
              <div style="font-size: 28rpx; color: #111827;">80%</div>
            </div>
            <div style="height: 16rpx; background: #f3f4f6; border-radius: 8rpx; overflow: hidden;">
              <div style="height: 100%; width: 80%; background: #CC0010; border-radius: 8rpx;"></div>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin: 12rpx 0;">
              <div style="font-size: 28rpx; color: #6b7280;">4星</div>
              <div style="font-size: 28rpx; color: #111827;">20%</div>
            </div>
            <div style="height: 16rpx; background: #f3f4f6; border-radius: 8rpx; overflow: hidden;">
              <div style="height: 100%; width: 20%; background: #F59E0B; border-radius: 8rpx;"></div>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 12rpx;">
              <div style="font-size: 28rpx; color: #6b7280;">3星及以下</div>
              <div style="font-size: 28rpx; color: #111827;">0%</div>
            </div>
            <div style="height: 16rpx; background: #f3f4f6; border-radius: 8rpx; overflow: hidden;">
              <div style="height: 100%; width: 0%; background: #10B981; border-radius: 8rpx;"></div>
            </div>
          </div>
        </div>
      </div>
    </view>

    <!-- 客户评价列表 -->
    <view style="padding: 0 32rpx;">
      <div style="font-size: 28rpx; color: #6b7280; margin-bottom: 24rpx;">共 {{ filteredReviews.length }} 条客户评价</div>
      
      <!-- 评价列表项 -->
      <div style="display: grid; grid-template-columns: 1fr; gap: 32rpx; margin-bottom: 32rpx;">
        <div 
          v-for="review in filteredReviews" 
          :key="review.id" 
          @click="goToReviewDetail(review.id)"
          style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease;"
          @touchstart="$event.currentTarget.style.boxShadow = '0 12rpx 40rpx rgba(0,0,0,0.15)'"
          @touchend="$event.currentTarget.style.boxShadow = '0 8rpx 24rpx rgba(0,0,0,0.1)'"
        >
          <!-- 评价头部 -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24rpx;">
            <div style="display: flex; align-items: center; gap: 24rpx;">
              <div style="width: 80rpx; height: 80rpx; background: #CC0010; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 36rpx; font-weight: bold;">{{ review.avatar }}</div>
              <div>
                <div style="font-weight: bold; font-size: 28rpx;">{{ review.name }}</div>
                <div style="font-size: 24rpx; color: #6b7280;">{{ review.project }} | {{ review.date }}</div>
              </div>
            </div>
            <text style="color: #F59E0B; font-size: 32rpx;">{{ '⭐'.repeat(review.rating) }}</text>
          </div>
          
          <!-- 评价标签 -->
          <div style="display: flex; flex-wrap: wrap; gap: 12rpx; margin-bottom: 24rpx;">
            <div v-for="(tag, index) in review.tags" :key="index" style="background: #FFF0F0; color: #CC0010; font-size: 24rpx; padding: 4rpx 16rpx; border-radius: 24rpx;">{{ tag }}</div>
          </div>
          
          <!-- 评价内容 -->
          <div style="font-size: 28rpx; color: #6b7280; line-height: 1.6; margin-bottom: 24rpx;">{{ review.content }}</div>
          
          <!-- 评价底部 -->
          <div style="display: flex; justify-content: flex-end;">
            <div style="font-size: 24rpx; color: #9ca3af;">查看详情 →</div>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="filteredReviews.length === 0" style="background: white; border-radius: 32rpx; padding: 80rpx 40rpx; text-align: center; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <div style="font-size: 96rpx; margin-bottom: 32rpx;">💬</div>
        <div style="font-size: 32rpx; color: #6b7280; margin-bottom: 16rpx;">暂无客户评价</div>
        <div style="font-size: 28rpx; color: #9ca3af;">请尝试其他搜索条件</div>
      </div>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.customer-review-list-page {
  padding-bottom: 200rpx;
}
</style>
