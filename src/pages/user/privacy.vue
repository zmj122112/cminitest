<script setup>
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 隐私政策内容
const privacyPolicy = ref('尊敬的用户：\n\n月星防水（以下简称"我们"）非常重视用户隐私保护。为了更好地保护您的个人信息，我们制定了本隐私政策。请您在使用我们的服务前，仔细阅读并理解本政策。\n\n一、我们收集的信息\n\n1. 个人信息：当您注册、预约服务或联系客服时，我们可能收集您的姓名、手机号、邮箱等个人信息。\n\n2. 使用信息：我们可能收集您使用我们服务的相关信息，如访问时间、访问页面、使用功能等。\n\n3. 设备信息：我们可能收集您的设备类型、操作系统版本、浏览器类型等信息。\n\n二、我们如何使用信息\n\n1. 提供服务：我们使用您的信息来提供、维护和改进我们的服务。\n\n2. 沟通联系：我们使用您的信息与您沟通，如预约确认、服务提醒等。\n\n3. 安全保障：我们使用您的信息来保护我们的服务和用户安全。\n\n4. 数据分析：我们使用匿名化的信息进行数据分析，以改进我们的服务。\n\n三、信息共享\n\n我们不会向第三方分享您的个人信息，除非：\n\n1. 获得您的明确同意\n2. 法律法规要求\n3. 保护我们的合法权益\n4. 与我们的关联公司共享（仅限于提供服务所需）\n\n四、信息保护\n\n我们采取多种安全措施保护您的个人信息，包括：\n\n1. 数据加密\n2. 访问控制\n3. 安全审计\n4. 定期安全评估\n\n五、您的权利\n\n您有权：\n\n1. 访问和修改您的个人信息\n2. 删除您的个人信息\n3. 限制我们使用您的信息\n4. 数据 portability\n5. 撤回您的同意\n\n六、政策更新\n\n我们可能会不时更新本隐私政策。更新后的政策将在我们的服务中公布，请注意查看。\n\n七、联系我们\n\n如果您对本隐私政策有任何疑问，请通过以下方式联系我们：\n\n- 客服热线：400-123-4567\n- 电子邮箱：privacy@yuexingwaterproof.com\n\n本隐私政策自发布之日起生效。')

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// ✅ 隐藏原生TabBar
onShow(() => {
  
})
</script>

<template>
  <view class="privacy-policy-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view class="top-nav" style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view class="back-button" style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view class="page-title" style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 80rpx; color: white;">隐私政策</view>
    </view>

    <!-- 隐私政策内容 -->
    <view style="padding: 40rpx;">
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 40rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <view style="font-size: 36rpx; font-weight: bold; color: #333; margin-bottom: 40rpx; text-align: center;">隐私政策</view>
        
        <view style="font-size: 26rpx; color: #666; line-height: 1.8; white-space: pre-line;">
          {{ privacyPolicy }}
        </view>
        
        <!-- 底部日期 -->
        <view style="margin-top: 60rpx; text-align: right; font-size: 24rpx; color: #999;">
          最后更新：2026年1月16日
        </view>
      </view>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.privacy-policy-page {
  padding-bottom: 200rpx;
}
</style>