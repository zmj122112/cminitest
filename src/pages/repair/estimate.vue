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

// 预约时间选项
const timeOptions = ref([
  '立即',
  '明天',
  '后天',
  '其他'
])

const selectedTime = ref(0)

// ✅ 使用 onShow 接收首页传过来的参数，并隐藏原生TabBar
onShow(() => {
 
  
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

    <!-- 服务类型选择 -->
    <view class="form-item" style="margin: 30rpx; background: #fff; border-radius: 24rpx; padding: 24rpx 32rpx; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);">
      <view class="form-label" style="color: #333; font-size: 28rpx; font-weight: medium; margin-bottom: 16rpx;">服务类型</view>
      <view class="service-type-list" style="display: flex; gap: 20rpx;">
        <view 
          class="service-type-item" 
          :class="{ active: currentType === 'repair' }" 
          @click="currentType = 'repair'" 
          style="flex: 1; text-align: center; padding: 20rpx 0; border: 2rpx solid #E5E7EB; border-radius: 12rpx; transition: all 0.3s; cursor: pointer; font-size: 28rpx; color: #333;"
        >
          漏水维修
        </view>
        <view 
          class="service-type-item" 
          :class="{ active: currentType === 'new' }" 
          @click="currentType = 'new'" 
          style="flex: 1; text-align: center; padding: 20rpx 0; border: 2rpx solid #E5E7EB; border-radius: 12rpx; transition: all 0.3s; cursor: pointer; font-size: 28rpx; color: #333;"
        >
          新房防水
        </view>
      </view>
    </view>

    <view class="form-container" style="background: white; margin: 0 32rpx 40rpx; border-radius: 24rpx; padding: 32rpx; box-sizing: border-box; width: calc(100% - 64rpx); box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.1);">
      <view style="margin-bottom: 40rpx;">
        <label style="display: block; margin-bottom: 16rpx; color: #333; font-size: 28rpx; font-weight: medium;">
          <text style="color: #E60012;">*</text> 预约时间
        </label>
        <picker :range="timeOptions" :value="selectedTime" @change="selectedTime = $event.detail.value; formData.appointmentTime = timeOptions[selectedTime]" style="width: 100%; padding: 24rpx 32rpx; border: 2rpx solid #E5E7EB; border-radius: 16rpx; font-size: 28rpx; background: white;">
          <view style="color: #666;">{{ timeOptions[selectedTime] }}</view>
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
        <input v-model="formData.remark" placeholder="请输入备注信息 (选填)" style="width: 100%; padding: 24rpx 32rpx; border: 2rpx solid #E5E7EB; border-radius: 16rpx; font-size: 28rpx; background: white;">
      </view>

      <button @click="submitForm" style="width: 100%; background-color: #E60012; color: white; border: none; border-radius: 16rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
        提交预约
      </button>
    </view>

    <view class="contact-info" style="background: #FFF5F5; margin: 0 32rpx 40rpx; border-radius: 12rpx; padding: 20rpx; border: 2rpx solid #FEE2E2;">
      <h3 style="color: #111827; font-weight: 700; margin-bottom: 12rpx; font-size: 16px;">如何联系我们</h3>
      <p style="color: #6b7280; line-height: 1.6; margin-bottom: 12rpx; font-size: 14px;">提交成功后，项目经理将通过企业微信与您联系，请保持手机畅通</p>
      <p style="color: #6b7280; line-height: 1.6; margin-bottom: 16rpx; font-size: 14px;">您也可以直接扫码添加我们的企业微信，更快获得服务</p>
      <view style="display: flex; align-items: center; gap: 8rpx; margin-bottom: 8rpx;">
        <text style="color: #10b981; font-size: 16px;">✅</text>
        <text style="color: #6b7280; font-size: 14px;">企业认证，安全可靠</text>
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

/* 服务类型选择样式 */
.service-type-item.active {
  border-color: #E60012;
  background-color: #FFF5F5;
  color: #E60012;
  font-weight: bold;
}
</style>