<script setup>
// ✅ 引入组件
import TabBar from '@/components/TabBar.vue'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 表单数据
const formData = ref({
  appointmentTime: '',
  contactName: '',
  phoneNumber: '',
  houseAddress: '',
  remark: ''
})

const currentType = ref('repair')

// ✅ 使用 onShow 接收首页传过来的参数，并隐藏原生TabBar
onShow(() => {
  uni.hideTabBar()
  
  // 检查是否有首页传来的参数
  const type = uni.getStorageSync('repairType')
  if (type) {
    currentType.value = type
    // 用完即焚，清除缓存
    uni.removeStorageSync('repairType')
  }
})

// 提交表单
const submitForm = () => {
  // 表单验证
  if (!formData.value.appointmentTime) {
    return uni.showToast({ title: '请选择预约时间', icon: 'none' })
  }
  if (!formData.value.contactName) {
    return uni.showToast({ title: '请输入联系人姓名', icon: 'none' })
  }
  if (!formData.value.phoneNumber) {
    return uni.showToast({ title: '请输入联系电话', icon: 'none' })
  }
  if (!formData.value.houseAddress) {
    return uni.showToast({ title: '请输入房屋地址', icon: 'none' })
  }
  
  // 提交成功
  uni.showToast({
    title: '预约提交成功！',
    icon: 'success',
    duration: 2000
  })
  
  // 清空表单
  formData.value = {
    appointmentTime: '',
    contactName: '',
    phoneNumber: '',
    houseAddress: '',
    remark: ''
  }
}
</script>

<template>
  <view class="repair-estimate-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <view class="top-nav" style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; justify-content: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view class="page-title" style="font-size: 36rpx; font-weight: bold; color: white;">预约上门</view>
    </view>

    <view class="tabs" style="display: flex; background: #fff; padding: 20rpx; border-radius: 100rpx; margin: 30rpx; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);">
      <view class="tab-item" :class="{ active: currentType === 'repair' }" @click="currentType = 'repair'" style="flex: 1; text-align: center; padding: 32rpx 0; font-size: 28rpx; border-radius: 80rpx; color: #666; transition: all 0.3s;">房屋漏水</view>
      <view class="tab-item" :class="{ active: currentType === 'new' }" @click="currentType = 'new'" style="flex: 1; text-align: center; padding: 32rpx 0; font-size: 28rpx; border-radius: 80rpx; color: #666; transition: all 0.3s;">新房防水</view>
    </view>

    <view class="form-container" style="background: white; margin: 0 32rpx 40rpx; border-radius: 24rpx; padding: 48rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.1);">
      <view style="margin-bottom: 40rpx;">
        <label style="display: block; margin-bottom: 16rpx; color: #333; font-size: 28rpx; font-weight: medium;">
          <text style="color: #E60012;">*</text> 预约时间
        </label>
        <picker mode="date" :value="formData.appointmentTime" @change="formData.appointmentTime = $event.detail.value" style="width: 100%; padding: 24rpx 32rpx; border: 2rpx solid #E5E7EB; border-radius: 16rpx; font-size: 28rpx; background: white;">
          <view style="color: #666;">{{ formData.appointmentTime || '请选择预约时间' }}</view>
        </picker>
      </view>

      <view style="margin-bottom: 40rpx;">
        <label style="display: block; margin-bottom: 16rpx; color: #333; font-size: 28rpx; font-weight: medium;">
          <text style="color: #E60012;">*</text> 联系人
        </label>
        <input v-model="formData.contactName" type="text" placeholder="请输入联系人姓名" style="width: 100%; padding: 24rpx 32rpx; border: 2rpx solid #E5E7EB; border-radius: 16rpx; font-size: 28rpx; background: white;">
      </view>

      <view style="margin-bottom: 40rpx;">
        <label style="display: block; margin-bottom: 16rpx; color: #333; font-size: 28rpx; font-weight: medium;">
          <text style="color: #E60012;">*</text> 联系电话
        </label>
        <input v-model="formData.phoneNumber" type="tel" placeholder="请输入联系电话" style="width: 100%; padding: 24rpx 32rpx; border: 2rpx solid #E5E7EB; border-radius: 16rpx; font-size: 28rpx; background: white;">
      </view>

      <view style="margin-bottom: 40rpx;">
        <label style="display: block; margin-bottom: 16rpx; color: #333; font-size: 28rpx; font-weight: medium;">
          <text style="color: #E60012;">*</text> 房屋地址
        </label>
        <input v-model="formData.houseAddress" type="text" placeholder="请输入房屋地址" style="width: 100%; padding: 24rpx 32rpx; border: 2rpx solid #E5E7EB; border-radius: 16rpx; font-size: 28rpx; background: white;">
      </view>

      <view style="margin-bottom: 48rpx;">
        <label style="display: block; margin-bottom: 16rpx; color: #333; font-size: 28rpx; font-weight: medium;">备注</label>
        <textarea v-model="formData.remark" placeholder="请输入备注信息 (选填)" style="width: 100%; height: 160rpx; padding: 24rpx 32rpx; border: 2rpx solid #E5E7EB; border-radius: 16rpx; font-size: 28rpx; background: white; resize: none;"></textarea>
      </view>

      <button @click="submitForm" style="width: 100%; background-color: #E60012; color: white; border: none; border-radius: 16rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
        提交预约
      </button>
    </view>

    <view class="contact-info" style="background: #FFF5F5; margin: 0 32rpx 40rpx; border-radius: 24rpx; padding: 40rpx; border: 2rpx solid #FEE2E2;">
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
.repair-estimate-page {
  /* padding-bottom 已在行内样式设置 */
}
.tabs { display: flex; background: #fff; padding: 20rpx; border-radius: 100rpx; margin: 30rpx; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1); }
.tab-item { flex: 1; text-align: center; padding: 32rpx 0; font-size: 28rpx; border-radius: 80rpx; color: #666; transition: all 0.3s; }
.tab-item.active { background: #E60012; color: #fff; font-weight: bold; box-shadow: 0 4rpx 10rpx rgba(230, 0, 18, 0.3); }
</style>