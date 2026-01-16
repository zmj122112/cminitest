<script setup>
// ✅ 引入组件
import TabBar from '@/components/TabBar.vue'
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 地址列表数据
const addresses = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    address: '上海市浦东新区张江高科技园区博云路2号',
    isDefault: true,
    isSelected: true
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    address: '上海市静安区南京西路1268号',
    isDefault: false,
    isSelected: false
  }
])

// 新增地址
const addAddress = () => {
  console.log('新增地址')
  uni.showToast({ title: '功能开发中', icon: 'none' })
}

// 编辑地址
const editAddress = (addressId) => {
  console.log('编辑地址:', addressId)
  uni.showToast({ title: '功能开发中', icon: 'none' })
}

// 删除地址
const deleteAddress = (addressId) => {
  console.log('删除地址:', addressId)
  uni.showToast({ title: '功能开发中', icon: 'none' })
}

// 设置默认地址
const setDefaultAddress = (addressId) => {
  console.log('设置默认地址:', addressId)
  addresses.value.forEach(addr => {
    addr.isDefault = addr.id === addressId
  })
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

onMounted(() => {
  console.log('地址管理页面加载')
})

// ✅ 隐藏原生TabBar
onShow(() => {
  
})
</script>

<template>
  <view class="address-management-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <!-- 顶部导航 -->
    <view class="top-nav" style="background-color: #CC0010; padding: 32rpx 40rpx; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <view class="back-button" style="cursor: pointer; margin-right: 32rpx;" @click="goBack()">
        <text style="color: white; font-size: 48rpx;">←</text>
      </view>
      <view class="page-title" style="font-size: 36rpx; font-weight: bold; flex: 1; text-align: center; margin-right: 80rpx; color: white;">地址管理</view>
    </view>

    <!-- 地址列表 -->
    <view style="padding: 32rpx;">
      <view v-for="address in addresses" :key="address.id" 
           style="background: white; border: 2rpx solid #E5E7EB; border-radius: 32rpx; padding: 32rpx; margin-bottom: 32rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);">
        <!-- 地址头部 -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24rpx;">
          <div style="display: flex; align-items: center; gap: 24rpx;">
            <div style="font-size: 32rpx; font-weight: bold; color: #333;">{{ address.name }}</div>
            <div style="font-size: 28rpx; color: #666;">{{ address.phone }}</div>
            <div v-if="address.isDefault" style="background: #E60012; color: white; font-size: 24rpx; padding: 4rpx 16rpx; border-radius: 20rpx;">默认</div>
          </div>
          <div style="display: flex; gap: 24rpx;">
            <button @click="editAddress(address.id)" style="background: #f3f4f6; color: #666; border: none; padding: 12rpx 24rpx; border-radius: 16rpx; font-size: 24rpx;">编辑</button>
            <button @click="deleteAddress(address.id)" style="background: #FEE2E2; color: #E60012; border: none; padding: 12rpx 24rpx; border-radius: 16rpx; font-size: 24rpx;">删除</button>
          </div>
        </div>
        
        <!-- 地址内容 -->
        <div style="font-size: 28rpx; color: #666; line-height: 1.5; margin-bottom: 24rpx;">{{ address.address }}</div>
        
        <!-- 地址操作 -->
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 16rpx;">
            <input 
              type="radio" 
              :checked="address.isSelected" 
              style="width: 32rpx; height: 32rpx;"
            >
            <label style="font-size: 28rpx; color: #666;">选择地址</label>
          </div>
          <button v-if="!address.isDefault" @click="setDefaultAddress(address.id)" style="background: #E60012; color: white; border: none; padding: 12rpx 24rpx; border-radius: 16rpx; font-size: 24rpx;">设为默认</button>
        </div>
      </view>
      
      <!-- 新增地址按钮 -->
      <button @click="addAddress" style="width: 100%; background: white; color: #E60012; border: 2rpx solid #E60012; border-radius: 32rpx; padding: 32rpx; font-size: 32rpx; font-weight: bold; cursor: pointer;">
        + 新增地址
      </button>
    </view>
    
    <TabBar />
  </view>
</template>

<style scoped>
.address-management-page {
  padding-bottom: 200rpx;
}
</style>
