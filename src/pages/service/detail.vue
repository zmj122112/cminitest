<script setup>
// ✅ 引入组件
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'

// 服务类型数据
const serviceTypes = {
  'bathroom': {
    id: 'bathroom',
    name: '卫生间漏水',
    icon: '💧',
    description: '专业解决卫生间漏水问题，包括地面、墙面、管道等漏水情况',
    features: ['专业检测', '快速修复', '质保服务', '环保材料'],
    process: [
      { step: 1, title: '上门检测', description: '专业师傅上门进行漏水点检测' },
      { step: 2, title: '方案制定', description: '根据检测结果制定维修方案' },
      { step: 3, title: '专业施工', description: '按照标准工艺流程进行维修' },
      { step: 4, title: '防水测试', description: '进行防水测试确保修复效果' },
      { step: 5, title: '质保服务', description: '提供专业质保服务' }
    ],
    faqs: [
      { question: '卫生间漏水需要多长时间修复？', answer: '一般情况下，简单的漏水问题1-2天可以完成修复，复杂情况可能需要3-5天。' },
      { question: '修复后会影响正常使用吗？', answer: '修复过程中会尽量减少对正常使用的影响，修复完成后24小时内避免积水即可。' },
      { question: '提供多长时间的质保？', answer: '我们提供1-5年的质保服务，具体根据维修范围和材料而定。' }
    ]
  },
  'kitchen': {
    id: 'kitchen',
    name: '厨房漏水',
    icon: '🍳',
    description: '专业解决厨房漏水问题，包括水槽、管道、墙面等漏水情况',
    features: ['专业检测', '快速修复', '质保服务', '环保材料'],
    process: [
      { step: 1, title: '上门检测', description: '专业师傅上门进行漏水点检测' },
      { step: 2, title: '方案制定', description: '根据检测结果制定维修方案' },
      { step: 3, title: '专业施工', description: '按照标准工艺流程进行维修' },
      { step: 4, title: '防水测试', description: '进行防水测试确保修复效果' },
      { step: 5, title: '质保服务', description: '提供专业质保服务' }
    ],
    faqs: [
      { question: '厨房漏水需要多长时间修复？', answer: '一般情况下，简单的漏水问题1-2天可以完成修复，复杂情况可能需要3-5天。' },
      { question: '修复后会影响正常使用吗？', answer: '修复过程中会尽量减少对正常使用的影响，修复完成后24小时内避免积水即可。' },
      { question: '提供多长时间的质保？', answer: '我们提供1-5年的质保服务，具体根据维修范围和材料而定。' }
    ]
  },
  'roof': {
    id: 'roof',
    name: '屋顶补漏',
    icon: '🏠',
    description: '专业解决屋顶漏水问题，包括屋面、天沟、天窗等漏水情况',
    features: ['专业检测', '快速修复', '质保服务', '环保材料'],
    process: [
      { step: 1, title: '上门检测', description: '专业师傅上门进行漏水点检测' },
      { step: 2, title: '方案制定', description: '根据检测结果制定维修方案' },
      { step: 3, title: '专业施工', description: '按照标准工艺流程进行维修' },
      { step: 4, title: '防水测试', description: '进行防水测试确保修复效果' },
      { step: 5, title: '质保服务', description: '提供专业质保服务' }
    ],
    faqs: [
      { question: '屋顶补漏需要多长时间？', answer: '一般情况下，简单的补漏1-2天可以完成，大面积维修可能需要3-5天。' },
      { question: '补漏后能管多长时间？', answer: '使用优质材料和专业工艺，一般可以保证3-10年不漏水。' },
      { question: '雨天可以施工吗？', answer: '雨天不适合施工，需要选择晴天进行维修。' }
    ]
  },
  'balcony': {
    id: 'balcony',
    name: '阳台漏水',
    icon: '☀️',
    description: '专业解决阳台漏水问题，包括地面、墙面、窗户等漏水情况',
    features: ['专业检测', '快速修复', '质保服务', '环保材料'],
    process: [
      { step: 1, title: '上门检测', description: '专业师傅上门进行漏水点检测' },
      { step: 2, title: '方案制定', description: '根据检测结果制定维修方案' },
      { step: 3, title: '专业施工', description: '按照标准工艺流程进行维修' },
      { step: 4, title: '防水测试', description: '进行防水测试确保修复效果' },
      { step: 5, title: '质保服务', description: '提供专业质保服务' }
    ],
    faqs: [
      { question: '阳台漏水需要多长时间修复？', answer: '一般情况下，简单的漏水问题1-2天可以完成修复，复杂情况可能需要3-5天。' },
      { question: '修复后会影响正常使用吗？', answer: '修复过程中会尽量减少对正常使用的影响，修复完成后24小时内避免积水即可。' },
      { question: '提供多长时间的质保？', answer: '我们提供1-5年的质保服务，具体根据维修范围和材料而定。' }
    ]
  },
  'exterior': {
    id: 'exterior',
    name: '外墙防水',
    icon: '🏢',
    description: '专业解决外墙漏水问题，包括墙面、窗户、空调洞等漏水情况',
    features: ['专业检测', '快速修复', '质保服务', '环保材料'],
    process: [
      { step: 1, title: '上门检测', description: '专业师傅上门进行漏水点检测' },
      { step: 2, title: '方案制定', description: '根据检测结果制定维修方案' },
      { step: 3, title: '专业施工', description: '按照标准工艺流程进行维修' },
      { step: 4, title: '防水测试', description: '进行防水测试确保修复效果' },
      { step: 5, title: '质保服务', description: '提供专业质保服务' }
    ],
    faqs: [
      { question: '外墙防水需要多长时间？', answer: '一般情况下，简单的防水处理1-3天可以完成，大面积施工可能需要5-7天。' },
      { question: '施工会影响邻居吗？', answer: '我们会尽量减少施工对邻居的影响，选择合适的时间进行施工。' },
      { question: '提供多长时间的质保？', answer: '我们提供3-10年的质保服务，具体根据施工范围和材料而定。' }
    ]
  },
  'other': {
    id: 'other',
    name: '其他修缮',
    icon: '🔨',
    description: '专业解决其他防水修缮问题，包括地下室、车库、露台等防水情况',
    features: ['专业检测', '快速修复', '质保服务', '环保材料'],
    process: [
      { step: 1, title: '上门检测', description: '专业师傅上门进行漏水点检测' },
      { step: 2, title: '方案制定', description: '根据检测结果制定维修方案' },
      { step: 3, title: '专业施工', description: '按照标准工艺流程进行维修' },
      { step: 4, title: '防水测试', description: '进行防水测试确保修复效果' },
      { step: 5, title: '质保服务', description: '提供专业质保服务' }
    ],
    faqs: [
      { question: '其他修缮需要多长时间？', answer: '根据具体情况而定，一般1-5天可以完成。' },
      { question: '如何收费？', answer: '我们会根据实际情况进行报价，确保价格合理透明。' },
      { question: '提供多长时间的质保？', answer: '我们提供1-5年的质保服务，具体根据维修范围和材料而定。' }
    ]
  }
}

// 当前服务类型
const currentService = ref(serviceTypes['bathroom'])

// 从路由参数获取服务类型
onLoad((options) => {
  const type = options.type || 'bathroom'
  if (serviceTypes[type]) {
    currentService.value = serviceTypes[type]
  }
})

// 预约服务
const goToRepairEstimate = () => {
  uni.setStorageSync('repairType', 'repair')
  uni.reLaunch({ url: '/pages/repair/estimate' })
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// ✅ 隐藏原生TabBar
onShow(() => {
  
})
</script>

<template>
  <view class="service-detail-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view class="top-nav" style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view class="back-button" style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view class="page-title" style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 80rpx; color: white;">{{ currentService.name }}</view>
    </view>

    <!-- 服务详情卡片 -->
    <view class="service-card" style="background: white; margin: 30rpx 40rpx; border-radius: 24rpx; padding: 40rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.08);">
      <!-- 服务图标和名称 -->
      <view class="service-header" style="display: flex; align-items: center; margin-bottom: 32rpx;">
        <view class="service-icon" style="font-size: 64rpx; margin-right: 24rpx;">{{ currentService.icon }}</view>
        <view class="service-info">
          <view class="service-name" style="font-size: 36rpx; font-weight: bold; color: #333; margin-bottom: 8rpx;">{{ currentService.name }}</view>
          <view class="service-description" style="font-size: 24rpx; color: #666; line-height: 1.5;">{{ currentService.description }}</view>
        </view>
      </view>

      <!-- 服务特色 -->
      <view class="service-features" style="margin-bottom: 32rpx;">
        <view class="section-title" style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 24rpx;">服务特色</view>
        <view class="features-list" style="display: flex; flex-wrap: wrap; gap: 16rpx;">
          <view v-for="(feature, index) in currentService.features" :key="index" class="feature-tag" style="background: #FFF0F0; color: #E60012; font-size: 24rpx; padding: 12rpx 20rpx; border-radius: 16rpx;">{{ feature }}</view>
        </view>
      </view>

      <!-- 服务流程 -->
      <view class="service-process" style="margin-bottom: 32rpx;">
        <view class="section-title" style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 24rpx;">服务流程</view>
        <view class="process-list" style="display: flex; flex-direction: column; gap: 20rpx;">
          <view v-for="(item, index) in currentService.process" :key="item.step" class="process-item" style="display: flex; gap: 20rpx; padding: 20rpx; background: #f9fafb; border-radius: 16rpx;">
            <view class="process-step" style="width: 48rpx; height: 48rpx; background: #E60012; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24rpx; font-weight: bold;">{{ item.step }}</view>
            <view class="process-content" style="flex: 1;">
              <view class="process-title" style="font-size: 28rpx; font-weight: bold; color: #333; margin-bottom: 8rpx;">{{ item.title }}</view>
              <view class="process-description" style="font-size: 24rpx; color: #666;">{{ item.description }}</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 常见问题 -->
      <view class="service-faqs" style="margin-bottom: 40rpx;">
        <view class="section-title" style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 24rpx;">常见问题</view>
        <view class="faqs-list" style="display: flex; flex-direction: column; gap: 20rpx;">
          <view v-for="(faq, index) in currentService.faqs" :key="index" class="faq-item" style="background: #f9fafb; border-radius: 16rpx; overflow: hidden;">
            <view class="faq-question" style="padding: 20rpx; font-size: 26rpx; font-weight: medium; color: #333; border-bottom: 2rpx solid #e5e7eb;">{{ faq.question }}</view>
            <view class="faq-answer" style="padding: 20rpx; font-size: 24rpx; color: #666; line-height: 1.5;">{{ faq.answer }}</view>
          </view>
        </view>
      </view>

      <!-- 预约按钮 -->
      <button @click="goToRepairEstimate" style="width: 100%; background-color: #E60012; color: white; border: none; border-radius: 16rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
        立即预约
      </button>
    </view>

    <!-- 联系信息 -->
    <view class="contact-info" style="background: #FFF5F5; margin: 0 40rpx 40rpx; border-radius: 24rpx; padding: 40rpx; border: 2rpx solid #FEE2E2;">
      <text style="color: #111827; font-weight: 700; margin-bottom: 24rpx; font-size: 32rpx; display: block;">如何联系我们</text>
      <text style="color: #6b7280; line-height: 1.6; margin-bottom: 24rpx; font-size: 28rpx; display: block;">提交成功后，项目经理将通过企业微信与您联系，请保持手机畅通</text>
      <text style="color: #6b7280; line-height: 1.6; margin-bottom: 32rpx; font-size: 28rpx; display: block;">您也可以直接扫码添加我们的企业微信，更快获得服务</text>
      <view style="display: flex; align-items: center; gap: 16rpx; margin-bottom: 16rpx;">
        <text style="color: #10b981; font-size: 32rpx;">✅</text>
        <text style="color: #6b7280; font-size: 28rpx;">企业认证，安全可靠</text>
      </view>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
/* 保持你的CSS不变 */
.service-detail-page {
  /* padding-bottom 已在行内样式设置 */
}
</style>
