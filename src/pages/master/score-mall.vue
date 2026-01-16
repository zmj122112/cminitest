<template>
  <view class="score-mall-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <view class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">积分商城</view>
      </view>
    </view>

    <!-- 积分信息卡片 -->
    <view style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view class="score-info" style="display: flex; justify-content: space-between; align-items: center;">
        <view class="score-left">
          <span class="score-label" style="font-size: 14px; color: #6b7280;">当前积分</span>
          <span class="score-value" style="font-size: 24px; font-weight: bold; color: #E60012; margin-left: 10px;">{{ currentScore }}</span>
        </view>
        <view class="exchange-record-btn" @click="goToExchangeRecord" style="padding: 8px 16px; background-color: #E60012; color: white; border-radius: 16px; font-size: 14px;">
          兑换记录
        </view>
      </view>
    </view>

    <!-- 商品分类 -->
    <view style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view class="category-title" style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">商品分类</view>
      <view class="category-list" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        <view v-for="category in categories" :key="category.id" class="category-item" @click="selectCategory(category.id)" style="display: flex; flex-direction: column; align-items: center; padding: 12px; border-radius: 12px; background-color: #f9fafb; border: 2px solid #E5E7EB; transition: all 0.3s ease;">
          <view class="category-icon" style="font-size: 32px; margin-bottom: 8px;">{{ category.icon }}</view>
          <view class="category-name" style="font-size: 14px; color: #111827; text-align: center;">{{ category.name }}</view>
        </view>
      </view>
    </view>

    <!-- 商品列表 -->
    <view style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view class="goods-title" style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">商品列表</view>
      <view class="goods-list" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <view v-for="good in filteredGoods" :key="good.id" class="goods-item" style="background-color: #f9fafb; border-radius: 12px; padding: 16px; border: 1px solid #E5E7EB; transition: all 0.3s ease;">
          <view class="goods-image" style="width: 100%; height: 120px; background-color: #E5E7EB; border-radius: 8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; font-size: 48px;">
            {{ good.icon }}
          </view>
          <view class="goods-name" style="font-size: 14px; font-weight: 500; color: #111827; margin-bottom: 8px; line-height: 1.4;">{{ good.name }}</view>
          <view class="goods-price" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="score-price" style="font-size: 16px; font-weight: bold; color: #E60012;">{{ good.price }}积分</span>
            <span class="stock" style="font-size: 12px; color: #6b7280;">库存: {{ good.stock }}</span>
          </view>
          <view class="goods-action" style="display: flex; justify-content: space-between; align-items: center;">
            <span class="exchange-count" style="font-size: 12px; color: #9ca3af;">已兑换{{ good.exchangeCount }}件</span>
            <button class="exchange-btn" @click="exchangeGood(good)" :disabled="currentScore < good.price || good.stock <= 0" style="padding: 6px 16px; background-color: #E60012; color: white; border: none; border-radius: 16px; font-size: 14px; cursor: pointer;">
              立即兑换
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 当前积分
const currentScore = ref(150)

// 商品分类
const categories = ref([
  { id: 'all', name: '全部', icon: '🛍️' },
  { id: 'tools', name: '工具', icon: '🔧' },
  { id: 'equipment', name: '设备', icon: '⚙️' },
  { id: 'supplies', name: '耗材', icon: '🧰' },
  { id: 'accessories', name: '配件', icon: '🔩' },
  { id: 'safety', name: '安全', icon: '🛡️' },
  { id: 'uniform', name: '工服', icon: '👕' },
  { id: 'other', name: '其他', icon: '📦' }
])

// 选中的分类
const selectedCategory = ref('all')

// 商品列表
const goods = ref([
  { id: 1, name: '专业防水胶带', price: 50, stock: 100, exchangeCount: 50, category: 'tools', icon: '🧻' },
  { id: 2, name: '防水测试仪', price: 200, stock: 20, exchangeCount: 15, category: 'equipment', icon: '🔍' },
  { id: 3, name: '防水涂料套装', price: 150, stock: 50, exchangeCount: 30, category: 'supplies', icon: '🎨' },
  { id: 4, name: '防水手套', price: 30, stock: 200, exchangeCount: 100, category: 'safety', icon: '🧤' },
  { id: 5, name: '防水工服', price: 100, stock: 30, exchangeCount: 25, category: 'uniform', icon: '👕' },
  { id: 6, name: '防水密封胶', price: 40, stock: 150, exchangeCount: 80, category: 'accessories', icon: '🌀' },
  { id: 7, name: '防水刷子', price: 20, stock: 300, exchangeCount: 150, category: 'tools', icon: '🖌️' },
  { id: 8, name: '防水检测灯', price: 80, stock: 40, exchangeCount: 20, category: 'equipment', icon: '💡' }
])

// 过滤后的商品
const filteredGoods = computed(() => {
  if (selectedCategory.value === 'all') {
    return goods.value
  }
  return goods.value.filter(good => good.category === selectedCategory.value)
})

// 选择分类
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

// 兑换商品
const exchangeGood = (good) => {
  if (currentScore.value < good.price) {
    uni.showToast({ title: '积分不足', icon: 'none' })
    return
  }
  if (good.stock <= 0) {
    uni.showToast({ title: '库存不足', icon: 'none' })
    return
  }
  
  // 模拟兑换操作
  uni.showModal({
    title: '兑换确认',
    content: `确定要兑换「${good.name}」吗？需要消耗${good.price}积分`,
    success: (res) => {
      if (res.confirm) {
        // 扣除积分
        currentScore.value -= good.price
        // 减少库存
        good.stock -= 1
        // 增加兑换次数
        good.exchangeCount += 1
        
        uni.showToast({ title: '兑换成功', icon: 'success' })
      }
    }
  })
}

// 跳转到兑换记录
const goToExchangeRecord = () => {
  uni.navigateTo({ url: '/pages/master/exchange-record' })
}

// 前往师傅工作台
const goToDashboard = () => {
  uni.reLaunch({ url: '/pages/master/dashboard' })
}
</script>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>