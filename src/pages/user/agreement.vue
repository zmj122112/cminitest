<script setup>
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 用户协议内容
const userAgreement = ref('用户服务协议\n\n欢迎使用月星防水小程序（以下简称"本服务"）。本协议是您与月星防水（以下简称"我们"）之间关于使用本服务的法律协议。请您务必审慎阅读、充分理解本协议各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。\n\n一、协议的接受\n\n1.1 您通过网络页面点击确认或以其他方式选择接受本协议，即表示您与我们已达成协议并同意接受本协议的全部约定内容。\n\n1.2 若您不同意本协议的任何条款，您应立即停止注册或使用本服务。\n\n二、账户注册与管理\n\n2.1 您在使用本服务前需要注册一个账户。您应提供真实、准确、完整的个人信息，并在信息变更时及时更新。\n\n2.2 您应妥善保管账户及密码，对使用您账户进行的所有操作负全部责任。\n\n2.3 如发现账户被他人非法使用，您应立即通知我们。\n\n三、服务内容\n\n3.1 本服务提供防水工程预约、师傅查找、产品查询、订单管理等功能。\n\n3.2 我们有权根据业务需要调整服务内容，无需事先通知您。\n\n四、用户行为规范\n\n4.1 您在使用本服务时应遵守法律法规，不得利用本服务从事违法违规活动。\n\n4.2 您不得干扰本服务的正常运行，不得侵犯其他用户的合法权益。\n\n4.3 您不得发布虚假信息、垃圾信息，不得进行欺诈行为。\n\n五、知识产权\n\n5.1 本服务中包含的所有内容（包括但不限于文字、图片、音频、视频等）的知识产权归我们所有。\n\n5.2 未经我们授权，您不得复制、修改、传播本服务中的任何内容。\n\n六、隐私保护\n\n6.1 我们重视您的隐私保护，将按照隐私政策处理您的个人信息。\n\n6.2 您应了解并同意我们收集、使用您的个人信息以提供服务。\n\n七、服务变更、中断或终止\n\n7.1 我们有权根据业务需要变更、中断或终止部分或全部服务。\n\n7.2 如您违反本协议，我们有权暂停或终止向您提供服务。\n\n八、免责声明\n\n8.1 我们不保证本服务完全无瑕疵，不保证服务的不间断性和及时性。\n\n8.2 对于因网络故障、系统故障等不可抗力因素导致的服务中断或数据丢失，我们不承担责任。\n\n九、违约责任\n\n9.1 如您违反本协议，应承担相应的法律责任。\n\n9.2 如因您的行为给我们造成损失，您应承担赔偿责任。\n\n十、协议的修改\n\n10.1 我们有权根据法律法规的变更或业务需要修改本协议。\n\n10.2 修改后的协议将在本服务上公布，您继续使用本服务即视为接受修改后的协议。\n\n十一、法律适用与争议解决\n\n11.1 本协议的订立、履行、解释及争议的解决均适用中华人民共和国法律。\n\n11.2 如就本协议发生任何争议，双方应友好协商解决；协商不成的，任何一方均有权向有管辖权的人民法院提起诉讼。\n\n十二、其他条款\n\n12.1 本协议构成您与我们之间关于使用本服务的完整协议，取代之前的任何口头或书面协议。\n\n12.2 如本协议的任何条款被认定为无效或不可执行，不影响其他条款的效力。\n\n12.3 本协议的最终解释权归我们所有。')

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// ✅ 隐藏原生TabBar
onShow(() => {
  
})
</script>

<template>
  <view class="user-agreement-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view class="top-nav" style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view class="back-button" style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view class="page-title" style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 80rpx; color: white;">用户协议</view>
    </view>

    <!-- 协议内容 -->
    <view style="padding: 40rpx;">
      <view style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 40rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <view style="font-size: 36rpx; font-weight: bold; color: #333; margin-bottom: 40rpx; text-align: center;">用户服务协议</view>
        
        <view style="font-size: 26rpx; color: #666; line-height: 1.8; white-space: pre-line;">
          {{ userAgreement }}
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
.user-agreement-page {
  padding-bottom: 200rpx;
}
</style>