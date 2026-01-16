<template>
  <view class="privacy-policy-page" style="min-height: 100vh; background-color: #f5f7fa;">
    <!-- 顶部导航 -->
    <view style="position: fixed; top: 0; left: 0; right: 0; background-color: #CC0010; color: white; padding: 20rpx 40rpx; display: flex; align-items: center; z-index: 999;">
      <text style="font-size: 32rpx; margin-right: 20rpx; cursor: pointer;" @click="goBack">←</text>
      <view style="font-size: 28rpx; font-weight: bold; flex: 1; text-align: center;">隐私政策</view>
      <view style="width: 32rpx;"></view> <!-- 占位，保持标题居中 -->
    </view>

    <!-- 政策内容 -->
    <view style="padding: 120rpx 40rpx 40rpx;">
      <view style="background-color: white; border-radius: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); padding: 48rpx;">
        <!-- 政策标题 -->
        <view style="text-align: center; margin-bottom: 48rpx;">
          <view style="font-size: 36rpx; font-weight: bold; color: #111827; margin-bottom: 16rpx;">月星防水隐私政策</view>
          <view style="font-size: 24rpx; color: #6b7280;">版本号：v1.0.0</view>
          <view style="font-size: 24rpx; color: #6b7280; margin-top: 8rpx;">更新日期：2023年10月1日</view>
        </view>

        <!-- 政策内容 -->
        <view style="line-height: 1.8; color: #374151;">
          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">一、引言</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">1.1 月星防水（以下简称"我们"）致力于保护用户的隐私和个人信息。本隐私政策说明了我们如何收集、使用、存储和保护您的个人信息。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">1.2 您使用我们的服务，即表示您同意我们按照本隐私政策处理您的个人信息。</p>
          </section>

          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">二、我们收集的信息</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">2.1 个人身份信息：包括您的姓名、手机号码、身份证号码等。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">2.2 服务相关信息：包括您的工单信息、施工记录、积分记录等。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">2.3 设备信息：包括您的设备型号、操作系统版本、设备标识符等。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">2.4 位置信息：在您授权的情况下，我们可能收集您的地理位置信息，用于就近派单。</p>
          </section>

          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">三、信息的使用方式</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">3.1 提供服务：用于处理您的工单、提供施工指导、发放积分等。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">3.2 通知您：向您发送工单状态变更、积分变动、活动通知等。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">3.3 改进服务：根据您的使用情况和反馈，改进我们的服务质量。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">3.4 安全保障：用于验证您的身份，防止欺诈和滥用。</p>
          </section>

          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">四、信息的共享与披露</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">4.1 我们不会向第三方出售、出租或共享您的个人信息，除非：</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx; padding-left: 40rpx;">4.1.1 获得您的明确同意；</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx; padding-left: 40rpx;">4.1.2 遵守法律法规的要求；</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx; padding-left: 40rpx;">4.1.3 保护我们的合法权益；</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx; padding-left: 40rpx;">4.1.4 与关联公司共享，用于提供一致的服务体验。</p>
          </section>

          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">五、信息的存储与保护</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">5.1 我们采取加密、访问控制、备份等技术措施，保护您的个人信息安全。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">5.2 您的个人信息将存储在我们的服务器或授权的第三方服务提供商的服务器上。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">5.3 我们会根据法律法规的要求和业务需要，确定个人信息的存储期限。</p>
          </section>

          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">六、您的权利</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">6.1 您有权访问、修改、删除您的个人信息。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">6.2 您有权拒绝我们收集和使用您的某些个人信息，但可能会影响您使用相关服务的能力。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">6.3 您有权注销您的账号，我们将删除您的个人信息，法律法规另有规定的除外。</p>
          </section>

          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">七、隐私政策的更新</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">7.1 我们可能会根据法律法规的变更或业务发展需要，更新本隐私政策。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">7.2 更新后的隐私政策将通过平台公告或其他方式通知您。</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">7.3 如您继续使用我们的服务，即表示您接受更新后的隐私政策。</p>
          </section>

          <section style="margin-bottom: 40rpx;">
            <h2 style="font-size: 28rpx; font-weight: 600; color: #111827; margin-bottom: 24rpx;">八、联系我们</h2>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">8.1 如您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">客服电话：400-123-4567</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">邮箱：service@yuexing.com</p>
            <p style="font-size: 24rpx; margin-bottom: 16rpx;">地址：上海市浦东新区张江高科技园区</p>
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
.privacy-policy-page {
  padding-bottom: 40rpx;
}
</style>