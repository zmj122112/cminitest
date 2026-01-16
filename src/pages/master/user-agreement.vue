<template>
  <view class="user-agreement-page" style="min-height: 100vh; background-color: #f5f7fa;">
    <!-- 顶部导航 -->
    <view style="position: fixed; top: 0; left: 0; right: 0; background-color: #CC0010; color: white; padding: 20rpx 40rpx; display: flex; align-items: center; z-index: 999;">
      <text style="font-size: 32rpx; margin-right: 20rpx; cursor: pointer;" @click="goBack">←</text>
      <view style="font-size: 28rpx; font-weight: bold; flex: 1; text-align: center;">用户协议</view>
      <view style="width: 32rpx;"></view> <!-- 占位，保持标题居中 -->
    </view>

    <!-- 协议内容 -->
    <view style="padding: 120rpx 40rpx 40rpx;">
      <view style="background-color: white; border-radius: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 48rpx;">
        <!-- 协议标题 -->
        <view style="text-align: center; margin-bottom: 48rpx;">
          <view style="font-size: 36rpx; font-weight: bold; color: #111827; margin-bottom: 16rpx;">月星防水师傅端用户协议</view>
          <view style="font-size: 24rpx; color: #6b7280;">版本号：v1.0.0</view>
          <view style="font-size: 24rpx; color: #6b7280; margin-top: 8rpx;">更新日期：2023年10月1日</view>
        </view>

        <!-- 协议内容 -->
        <view style="line-height: 1.8; color: #374151;">
          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">一、总则</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">1.1 本协议是您与月星防水（以下简称"我们"）之间关于使用月星防水师傅端（以下简称"本平台"）服务所订立的协议。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">1.2 您通过网络页面点击确认或以其他方式选择接受本协议，即表示您与我们已达成协议并同意接受本协议的全部约定内容。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">1.3 如您不同意本协议的任何约定，您应立即停止注册或使用本平台服务。</p>
          </section>

          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">二、注册与账号管理</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">2.1 您必须是具备完全民事行为能力的自然人，方可注册成为本平台用户。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">2.2 您应提供真实、准确、完整的个人信息，并在信息变更时及时更新。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">2.3 您应妥善保管账号及密码，对使用您账号进行的所有操作负全部责任。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">2.4 如发现账号被他人非法使用，您应立即通知我们。</p>
          </section>

          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">三、服务内容</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">3.1 本平台为您提供工单接收、施工记录、完工确认、积分管理等服务。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">3.2 我们有权根据业务发展需要调整服务内容，无需事先通知您。</p>
          </section>

          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">四、用户义务</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">4.1 您应遵守国家法律法规及本协议的约定。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">4.2 您应按照平台规则提供服务，确保服务质量。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">4.3 您应保护客户隐私，不得泄露客户信息。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">4.4 您应如实记录施工过程，上传真实的施工照片。</p>
          </section>

          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">五、违约责任</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">5.1 如您违反本协议约定，我们有权采取警告、暂停服务、封号等措施。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">5.2 如因您的行为给我们或第三方造成损失，您应承担相应的赔偿责任。</p>
          </section>

          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">六、协议修改</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">6.1 我们有权根据法律法规变更或业务发展需要修改本协议。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">6.2 修改后的协议将通过平台公告或其他方式通知您。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">6.3 如您继续使用本平台服务，即表示您接受修改后的协议。</p>
          </section>

          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">七、其他约定</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">7.1 本协议的订立、履行、解释及争议解决均适用中华人民共和国法律。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">7.2 如就本协议发生任何争议，双方应协商解决；协商不成的，任何一方均有权向有管辖权的人民法院提起诉讼。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">7.3 本协议自您注册或使用本平台服务之日起生效。</p>
          </section>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}
</script>

<style scoped>
.user-agreement-page {
  padding-bottom: 40rpx;
}
</style>