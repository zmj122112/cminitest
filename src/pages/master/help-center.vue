<template>
  <view class="help-center-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 红色顶部区域 -->
    <view class="header-section" style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding-top: 40px; padding-bottom: 30px; position: relative; z-index: 0;">
      <view class="header-content" style="padding: 0 20px;">
        <view class="brand-info" style="display: flex; align-items: center; margin-bottom: 16px;">
          <image src="/static/logo.png" class="logo-img" style="width: 40px; height: 40px; border-radius: 50%; background-color: white; padding: 2px; margin-right: 10px; object-fit: contain;" />
          <view class="brand-text">
            <view class="brand-name" style="color: white; font-size: 18px; font-weight: bold;">月星防水</view>
            <view class="brand-slogan" style="color: rgba(255,255,255,0.8); font-size: 12px;">Since 1947</view>
          </view>
        </view>
        
        <view class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">帮助中心</view>
      </view>
    </view>

    <!-- 搜索框 -->
    <view style="margin: 0 20px 20px; padding-top: 20px;">
      <view class="search-box" style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 12px 20px; display: flex; align-items: center;">
        <text style="font-size: 20px; color: #9ca3af; margin-right: 12px;">🔍</text>
        <input type="text" v-model="searchKeyword" placeholder="搜索问题" style="flex: 1; font-size: 14px; color: #111827; border: none; outline: none;" placeholder-style="color: #9ca3af;" />
      </view>
    </view>

    <!-- 常见问题分类 -->
    <view style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view class="category-title" style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">常见问题</view>
      <view class="category-list" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
        <view v-for="category in categories" :key="category.id" class="category-item" @click="selectCategory(category.id)" style="padding: 16px; border-radius: 12px; background-color: #f9fafb; border: 2px solid #E5E7EB; transition: all 0.3s ease; display: flex; flex-direction: column; align-items: center;">
          <view class="category-icon" style="font-size: 32px; margin-bottom: 8px;">{{ category.icon }}</view>
          <view class="category-name" style="font-size: 14px; color: #111827; text-align: center; font-weight: 500;">{{ category.name }}</view>
        </view>
      </view>
    </view>

    <!-- 问题列表 -->
    <view style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view class="faq-list-title" style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">热门问题</view>
      <view class="faq-list">
        <view v-for="faq in filteredFAQs" :key="faq.id" class="faq-item" style="border-bottom: 1px solid #E5E7EB; padding: 16px 0;">
          <view class="faq-question" @click="toggleFAQ(faq.id)" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
            <span class="question-text" style="font-size: 14px; font-weight: 500; color: #111827; flex: 1; margin-right: 16px;">{{ faq.question }}</span>
            <span class="expand-icon" :style="{ transform: expandedFAQs.includes(faq.id) ? 'rotate(180deg)' : 'rotate(0deg)' }" style="font-size: 16px; color: #6b7280; transition: transform 0.3s ease;">▼</span>
          </view>
          <view v-show="expandedFAQs.includes(faq.id)" class="faq-answer" style="margin-top: 12px; padding-left: 0; animation: slideDown 0.3s ease;">
            <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">{{ faq.answer }}</p>
          </view>
        </view>
      </view>
    </view>

    <!-- 联系客服 -->
    <view style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <view class="contact-title" style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">联系客服</view>
      <view class="contact-info" style="display: flex; flex-direction: column; gap: 16px;">
        <view class="contact-item" style="display: flex; align-items: center;">
          <span class="contact-icon" style="font-size: 24px; margin-right: 16px;">📞</span>
          <div class="contact-details">
            <span class="contact-label" style="font-size: 14px; color: #6b7280; margin-bottom: 4px; display: block;">客服电话</span>
            <span class="contact-value" style="font-size: 16px; font-weight: 500; color: #111827;">400-123-4567</span>
          </div>
        </view>
        <view class="contact-item" style="display: flex; align-items: center;">
          <span class="contact-icon" style="font-size: 24px; margin-right: 16px;">💬</span>
          <div class="contact-details">
            <span class="contact-label" style="font-size: 14px; color: #6b7280; margin-bottom: 4px; display: block;">在线客服</span>
            <span class="contact-value" style="font-size: 16px; font-weight: 500; color: #E60012;">点击咨询</span>
          </div>
        </view>
        <view class="contact-item" style="display: flex; align-items: center;">
          <span class="contact-icon" style="font-size: 24px; margin-right: 16px;">🕐</span>
          <div class="contact-details">
            <span class="contact-label" style="font-size: 14px; color: #6b7280; margin-bottom: 4px; display: block;">服务时间</span>
            <span class="contact-value" style="font-size: 16px; font-weight: 500; color: #111827;">9:00-18:00</span>
          </div>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 搜索关键词
const searchKeyword = ref('')

// 问题分类
const categories = ref([
  { id: 'account', name: '账号问题', icon: '👤' },
  { id: 'order', name: '订单问题', icon: '📋' },
  { id: 'score', name: '积分问题', icon: '⭐' },
  { id: 'construction', name: '施工问题', icon: '🔨' },
  { id: 'equipment', name: '设备问题', icon: '⚙️' },
  { id: 'other', name: '其他问题', icon: '❓' }
])

// 选中的分类
const selectedCategory = ref('all')

// 常见问题
const faqs = ref([
  { id: '1', question: '如何绑定手机号？', answer: '进入个人中心，点击"绑定手机"，按照提示输入手机号码和验证码即可完成绑定。', category: 'account' },
  { id: '2', question: '如何修改密码？', answer: '进入个人中心，点击"修改密码"，输入原密码和新密码即可完成修改。', category: 'account' },
  { id: '3', question: '积分如何获取？', answer: '积分可以通过接单、施工拍照、获得好评等方式获取，具体规则请查看积分中心的积分规则说明。', category: 'score' },
  { id: '4', question: '积分有效期是多久？', answer: '积分有效期为1年，从获取之日起计算。', category: 'score' },
  { id: '5', question: '如何接收工单？', answer: '在工单接收页面，您可以看到系统派发的工单，点击"接受"即可接单。', category: 'order' },
  { id: '6', question: '施工记录如何上传？', answer: '在施工记录页面，选择对应的工单，点击"上传照片"，按照施工前、施工中、施工后的顺序上传照片即可。', category: 'construction' },
  { id: '7', question: '如何确认完工？', answer: '在完工确认页面，选择已完成的工单，点击"确认完工"，上传完工照片并填写完工说明即可。', category: 'construction' },
  { id: '8', question: '设备出现故障怎么办？', answer: '如果设备出现故障，请联系客服进行维修或更换，客服电话：400-123-4567。', category: 'equipment' }
])

// 展开的问题
const expandedFAQs = ref([])

// 过滤后的问题
const filteredFAQs = computed(() => {
  let result = faqs.value
  
  // 按分类过滤
  if (selectedCategory.value !== 'all') {
    result = result.filter(faq => faq.category === selectedCategory.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(faq => 
      faq.question.toLowerCase().includes(keyword) || 
      faq.answer.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

// 选择分类
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId === selectedCategory.value ? 'all' : categoryId
}

// 切换问题展开/折叠
const toggleFAQ = (faqId) => {
  if (expandedFAQs.value.includes(faqId)) {
    expandedFAQs.value = expandedFAQs.value.filter(id => id !== faqId)
  } else {
    expandedFAQs.value.push(faqId)
  }
}
</script>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>