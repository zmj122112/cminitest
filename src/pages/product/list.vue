<script setup>
// ✅ 引入组件
import TabBar from '@/components/TabBar.vue'
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 产品分类
const categories = ref([
  '全部',
  '防水涂料',
  '卷材维修',
  '瓷砖胶',
  '美缝剂',
  '堵漏王'
])

// 当前选中的分类
const selectedCategory = ref('全部')

// 产品列表数据
const products = ref([
  {
    id: 1,
    name: '月星御盾K11通用型防水浆料',
    category: '防水涂料',
    specification: '20kg/桶',
    icon: '🪣',
    isHot: true
  },
  {
    id: 2,
    name: '高弹柔韧性丙烯酸防水涂料',
    category: '防水涂料',
    specification: '18kg/桶',
    icon: '💧',
    isHot: true
  },
  {
    id: 3,
    name: '水不漏（速凝型）',
    category: '建材维修',
    specification: '5kg/袋',
    icon: '🧱',
    isHot: true
  }
])

// 搜索关键词
const searchKeyword = ref('')

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 跳转到产品详情
const goToProductDetail = (productId) => {
  console.log('跳转到产品详情，ID:', productId)
  uni.navigateTo({ url: `/pages/product/detail?id=${productId}` })
}

// 搜索产品
const searchProducts = () => {
  console.log('搜索产品:', searchKeyword.value)
  // 这里可以添加搜索逻辑
}

// 切换分类
const switchCategory = (category) => {
  selectedCategory.value = category
  console.log('切换分类:', category)
  // 这里可以添加分类筛选逻辑
}

onMounted(() => {
  console.log('产品列表页面加载')
})

// ✅ 隐藏原生TabBar
onShow(() => {
  
})
</script>

<template>
  <view class="product-list-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 页面标题栏 -->
    <view style="background-color: #CC0010; border-bottom-left-radius: 48rpx; border-bottom-right-radius: 48rpx; padding: 32rpx 40rpx 48rpx; text-align: center; position: relative;">
      <view class="back-button" style="position: absolute; left: 20rpx; top: 20rpx; width: 80rpx; height: 80rpx; display: flex; align-items: center; justify-content: center; color: white; font-size: 40rpx; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%;" @click="goBack">
        ←
      </view>
      <view style="color: white; font-size: 36rpx; font-weight: 700; margin: 0;">找产品</view>
    </view>

    <!-- 搜索栏 -->
    <view style="padding: 32rpx;">
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 40rpx; padding: 16rpx 32rpx; display: flex; align-items: center; gap: 16rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <view style="color: #6b7280; font-size: 32rpx;">🔍</view>
        <input 
          v-model="searchKeyword" 
          type="text" 
          placeholder="搜索产品" 
          style="flex: 1; border: none; outline: none; font-size: 28rpx; color: #111827;"
          @keyup.enter="searchProducts"
        >
        <button 
          @click="searchProducts" 
          style="background: #CC0010; color: white; border: none; padding: 12rpx 32rpx; border-radius: 24rpx; font-size: 28rpx; font-weight: 500; cursor: pointer;"
        >
          搜索
        </button>
      </view>
    </view>

    <!-- 分类标签 -->
    <view style="padding: 0 32rpx 32rpx; overflow-x: auto; white-space: nowrap;">
      <div style="display: flex; gap: 24rpx; padding-bottom: 16rpx;">
        <div 
          v-for="category in categories" 
          :key="category" 
          @click="switchCategory(category)"
          :style="{
            padding: '12rpx 32rpx',
            borderRadius: '40rpx',
            fontSize: '28rpx',
            fontWeight: selectedCategory === category ? 'bold' : 'normal',
            color: selectedCategory === category ? '#CC0010' : '#6b7280',
            backgroundColor: selectedCategory === category ? '#FFF0F0' : '#f3f4f6',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: selectedCategory === category ? '2rpx solid #CC0010' : '2rpx solid #e5e7eb'
          }"
        >
          {{ category }}
        </div>
      </div>
    </view>

    <!-- 优化后的横幅 -->
    <view style="padding: 0 32rpx 32rpx;">
      <div style="background: linear-gradient(135deg, #CC0010 0%, #FF4D4F 100%); border-radius: 32rpx; padding: 40rpx; display: flex; align-items: center; gap: 32rpx; color: white; box-shadow: 0 12rpx 40rpx rgba(0,0,0,0.15);">
        <div style="font-size: 96rpx;">🛡️</div>
        <div style="flex: 1;">
          <div style="font-size: 32rpx; font-weight: bold; margin-bottom: 8rpx;">专业防水解决方案</div>
          <div style="font-size: 24rpx; opacity: 0.9;">国企品质 · 安全可靠 · 环保健康</div>
        </div>
        <div style="background: rgba(255,255,255,0.2); border-radius: 24rpx; padding: 16rpx 32rpx; font-size: 24rpx; font-weight: 500;">
          立即了解
        </div>
      </div>
    </view>

    <!-- 产品列表 -->
    <view style="padding: 0 32rpx;">
      <div style="font-size: 28rpx; color: #6b7280; margin-bottom: 24rpx;">当前有 {{ products.length }} 个产品</div>
      
      <!-- 产品列表项 -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32rpx; margin-bottom: 32rpx;">
        <div 
          v-for="product in products" 
          :key="product.id" 
          @click="goToProductDetail(product.id)"
          style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; align-items: center; position: relative;"
          @touchstart="$event.currentTarget.style.boxShadow = '0 12rpx 40rpx rgba(0,0,0,0.15)'"
          @touchend="$event.currentTarget.style.boxShadow = '0 8rpx 24rpx rgba(0,0,0,0.1)'"
        >
          <!-- 热销标签 -->
          <div v-if="product.isHot" style="position: absolute; top: 24rpx; right: 24rpx; background: #CC0010; color: white; font-size: 20rpx; padding: 4rpx 16rpx; border-radius: 20rpx; z-index: 10;">热销</div>
          
          <!-- 产品图标 -->
          <div style="position: relative; margin-bottom: 24rpx; width: 160rpx; height: 160rpx; display: flex; align-items: center; justify-content: center; font-size: 80rpx;">
            {{ product.icon }}
          </div>
          
          <!-- 产品名称 -->
          <div style="font-weight: 500; font-size: 28rpx; color: #111827; margin-bottom: 8rpx; text-align: center; line-height: 1.4;">{{ product.name }}</div>
          
          <!-- 产品分类 -->
          <div style="font-size: 24rpx; color: #6b7280; margin-bottom: 4rpx;">{{ product.category }}</div>
          
          <!-- 产品规格 -->
          <div style="font-size: 24rpx; color: #9ca3af;">规格：{{ product.specification }}</div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="products.length === 0" style="background: white; border-radius: 32rpx; padding: 80rpx 40rpx; text-align: center; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <div style="font-size: 96rpx; margin-bottom: 32rpx;">📦</div>
        <div style="font-size: 32rpx; color: #6b7280; margin-bottom: 16rpx;">暂无产品信息</div>
        <div style="font-size: 28rpx; color: #9ca3af;">请尝试其他搜索条件</div>
      </div>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.product-list-page {
  padding-bottom: 200rpx;
}
</style>
