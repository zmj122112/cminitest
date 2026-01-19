<script setup>
import { ref } from 'vue'
import TabBar from '@/components/TabBar.vue'

// 认证状态
const certificationStatus = ref('pending') // pending, reviewing, approved, rejected

// 认证信息
const certificationInfo = ref({
  name: '',
  phone: '',
  idCard: '',
  workYears: '',
  skills: '',
  company: ''
})

// 上传的文件
const uploadedFiles = ref({
  idCardFront: null,
  idCardBack: null,
  workPermit: null,
  qualification: null
})

// 提交认证
const submitCertification = () => {
  // 简单验证
  if (!certificationInfo.value.name || !certificationInfo.value.phone || !certificationInfo.value.idCard) {
    uni.showToast({
      title: '请填写必填信息',
      icon: 'none'
    })
    return
  }
  
  // 检查文件上传
  if (!uploadedFiles.value.idCardFront || !uploadedFiles.value.idCardBack || !uploadedFiles.value.workPermit) {
    uni.showToast({
      title: '请上传必要证件',
      icon: 'none'
    })
    return
  }
  
  // 模拟提交
  uni.showModal({
    title: '提交认证',
    content: '确认提交认证信息吗？提交后将进入审核状态。',
    success: (res) => {
      if (res.confirm) {
        certificationStatus.value = 'reviewing'
        uni.showToast({
          title: '提交成功，等待审核',
          icon: 'success'
        })
      }
    }
  })
}

// 上传文件
const uploadFile = (type) => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      uploadedFiles.value[type] = res.tempFilePaths[0]
      uni.showToast({
        title: '上传成功',
        icon: 'success'
      })
    }
  })
}

// 重新提交认证
const reSubmitCertification = () => {
  certificationStatus.value = 'pending'
  uni.showToast({
    title: '已重置认证状态',
    icon: 'success'
  })
}
</script>

<template>
  <view class="certification-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 200rpx;">
    <view class="header" style="background-color: #CC0010; padding: 40rpx; color: white;">
      <view style="font-size: 36rpx; font-weight: bold;">个人认证</view>
      <view style="font-size: 24rpx; opacity: 0.8; margin-top: 10rpx;">完善个人信息，提升服务可信度</view>
    </view>
    
    <!-- 认证状态 -->
    <view class="status-section" style="margin: 20rpx 32rpx; background-color: white; border-radius: 16rpx; padding: 32rpx; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);">
      <view style="font-size: 28rpx; font-weight: bold; margin-bottom: 20rpx;">认证状态</view>
      
      <view v-if="certificationStatus === 'pending'" style="padding: 32rpx; background-color: #FFF3CD; border-radius: 12rpx; text-align: center;">
        <view style="font-size: 64rpx; margin-bottom: 20rpx;">📋</view>
        <view style="font-size: 28rpx; color: #856404; margin-bottom: 12rpx;">待提交认证</view>
        <view style="font-size: 24rpx; color: #856404;">请填写并提交认证信息</view>
      </view>
      
      <view v-else-if="certificationStatus === 'reviewing'" style="padding: 32rpx; background-color: #D1ECF1; border-radius: 12rpx; text-align: center;">
        <view style="font-size: 64rpx; margin-bottom: 20rpx;">⏳</view>
        <view style="font-size: 28rpx; color: #0C5460; margin-bottom: 12rpx;">审核中</view>
        <view style="font-size: 24rpx; color: #0C5460;">您的认证信息正在审核，请耐心等待</view>
      </view>
      
      <view v-else-if="certificationStatus === 'approved'" style="padding: 32rpx; background-color: #D4EDDA; border-radius: 12rpx; text-align: center;">
        <view style="font-size: 64rpx; margin-bottom: 20rpx;">✅</view>
        <view style="font-size: 28rpx; color: #155724; margin-bottom: 12rpx;">认证通过</view>
        <view style="font-size: 24rpx; color: #155724;">您已成功通过认证，可以开始接单</view>
      </view>
      
      <view v-else-if="certificationStatus === 'rejected'" style="padding: 32rpx; background-color: #F8D7DA; border-radius: 12rpx; text-align: center;">
        <view style="font-size: 64rpx; margin-bottom: 20rpx;">❌</view>
        <view style="font-size: 28rpx; color: #721C24; margin-bottom: 12rpx;">认证失败</view>
        <view style="font-size: 24rpx; color: #721C24; margin-bottom: 20rpx;">请检查信息后重新提交</view>
        <button 
          @click="reSubmitCertification"
          style="background-color: #CC0010; color: white; border: none; border-radius: 12rpx; padding: 16rpx 48rpx; font-size: 24rpx;"
        >
          重新提交
        </button>
      </view>
    </view>
    
    <!-- 认证表单 -->
    <view v-if="certificationStatus === 'pending'" class="form-section" style="margin: 20rpx 32rpx; background-color: white; border-radius: 16rpx; padding: 32rpx; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);">
      <view style="font-size: 28rpx; font-weight: bold; margin-bottom: 20rpx;">个人信息</view>
      
      <view class="form-item" style="margin-bottom: 32rpx;">
        <view style="font-size: 24rpx; color: #666; margin-bottom: 12rpx;">姓名 <text style="color: #CC0010;">*</text></view>
        <input 
          v-model="certificationInfo.name" 
          placeholder="请输入真实姓名" 
          style="width: 100%; height: 80rpx; border: 2rpx solid #e5e7eb; border-radius: 12rpx; padding: 0 24rpx; font-size: 24rpx;"
        />
      </view>
      
      <view class="form-item" style="margin-bottom: 32rpx;">
        <view style="font-size: 24rpx; color: #666; margin-bottom: 12rpx;">手机号 <text style="color: #CC0010;">*</text></view>
        <input 
          v-model="certificationInfo.phone" 
          placeholder="请输入手机号码" 
          style="width: 100%; height: 80rpx; border: 2rpx solid #e5e7eb; border-radius: 12rpx; padding: 0 24rpx; font-size: 24rpx;"
        />
      </view>
      
      <view class="form-item" style="margin-bottom: 32rpx;">
        <view style="font-size: 24rpx; color: #666; margin-bottom: 12rpx;">身份证号 <text style="color: #CC0010;">*</text></view>
        <input 
          v-model="certificationInfo.idCard" 
          placeholder="请输入身份证号码" 
          style="width: 100%; height: 80rpx; border: 2rpx solid #e5e7eb; border-radius: 12rpx; padding: 0 24rpx; font-size: 24rpx;"
        />
      </view>
      
      <view class="form-item" style="margin-bottom: 32rpx;">
        <view style="font-size: 24rpx; color: #666; margin-bottom: 12rpx;">从业年限</view>
        <input 
          v-model="certificationInfo.workYears" 
          placeholder="请输入从业年限" 
          style="width: 100%; height: 80rpx; border: 2rpx solid #e5e7eb; border-radius: 12rpx; padding: 0 24rpx; font-size: 24rpx;"
        />
      </view>
      
      <view class="form-item" style="margin-bottom: 32rpx;">
        <view style="font-size: 24rpx; color: #666; margin-bottom: 12rpx;">专业技能</view>
        <input 
          v-model="certificationInfo.skills" 
          placeholder="请输入专业技能，如：卫生间防水、屋顶防水等" 
          style="width: 100%; height: 80rpx; border: 2rpx solid #e5e7eb; border-radius: 12rpx; padding: 0 24rpx; font-size: 24rpx;"
        />
      </view>
      
      <view class="form-item" style="margin-bottom: 32rpx;">
        <view style="font-size: 24rpx; color: #666; margin-bottom: 12rpx;">所属公司</view>
        <input 
          v-model="certificationInfo.company" 
          placeholder="请输入所属公司名称" 
          style="width: 100%; height: 80rpx; border: 2rpx solid #e5e7eb; border-radius: 12rpx; padding: 0 24rpx; font-size: 24rpx;"
        />
      </view>
    </view>
    
    <!-- 证件上传 -->
    <view v-if="certificationStatus === 'pending'" class="upload-section" style="margin: 20rpx 32rpx; background-color: white; border-radius: 16rpx; padding: 32rpx; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);">
      <view style="font-size: 28rpx; font-weight: bold; margin-bottom: 20rpx;">证件上传</view>
      
      <view class="upload-item" style="margin-bottom: 32rpx;">
        <view style="font-size: 24rpx; color: #666; margin-bottom: 12rpx;">身份证正面 <text style="color: #CC0010;">*</text></view>
        <view class="upload-area" style="display: flex; gap: 20rpx;">
          <view 
            v-if="uploadedFiles.idCardFront"
            style="width: 200rpx; height: 140rpx; border-radius: 8rpx; overflow: hidden;"
          >
            <image :src="uploadedFiles.idCardFront" style="width: 100%; height: 100%; object-fit: cover;" />
          </view>
          <view 
            v-else
            @click="uploadFile('idCardFront')"
            style="width: 200rpx; height: 140rpx; border: 2rpx dashed #e5e7eb; border-radius: 8rpx; display: flex; align-items: center; justify-content: center; background-color: #f9fafb;"
          >
            <view style="text-align: center;">
              <view style="font-size: 48rpx; margin-bottom: 8rpx;">📷</view>
              <view style="font-size: 20rpx; color: #999;">上传</view>
            </view>
          </view>
        </view>
        <view style="font-size: 20rpx; color: #999; margin-top: 8rpx;">请上传清晰的身份证正面照片</view>
      </view>
      
      <view class="upload-item" style="margin-bottom: 32rpx;">
        <view style="font-size: 24rpx; color: #666; margin-bottom: 12rpx;">身份证反面 <text style="color: #CC0010;">*</text></view>
        <view class="upload-area" style="display: flex; gap: 20rpx;">
          <view 
            v-if="uploadedFiles.idCardBack"
            style="width: 200rpx; height: 140rpx; border-radius: 8rpx; overflow: hidden;"
          >
            <image :src="uploadedFiles.idCardBack" style="width: 100%; height: 100%; object-fit: cover;" />
          </view>
          <view 
            v-else
            @click="uploadFile('idCardBack')"
            style="width: 200rpx; height: 140rpx; border: 2rpx dashed #e5e7eb; border-radius: 8rpx; display: flex; align-items: center; justify-content: center; background-color: #f9fafb;"
          >
            <view style="text-align: center;">
              <view style="font-size: 48rpx; margin-bottom: 8rpx;">📷</view>
              <view style="font-size: 20rpx; color: #999;">上传</view>
            </view>
          </view>
        </view>
        <view style="font-size: 20rpx; color: #999; margin-top: 8rpx;">请上传清晰的身份证反面照片</view>
      </view>
      
      <view class="upload-item" style="margin-bottom: 32rpx;">
        <view style="font-size: 24rpx; color: #666; margin-bottom: 12rpx;">工作证 <text style="color: #CC0010;">*</text></view>
        <view class="upload-area" style="display: flex; gap: 20rpx;">
          <view 
            v-if="uploadedFiles.workPermit"
            style="width: 200rpx; height: 140rpx; border-radius: 8rpx; overflow: hidden;"
          >
            <image :src="uploadedFiles.workPermit" style="width: 100%; height: 100%; object-fit: cover;" />
          </view>
          <view 
            v-else
            @click="uploadFile('workPermit')"
            style="width: 200rpx; height: 140rpx; border: 2rpx dashed #e5e7eb; border-radius: 8rpx; display: flex; align-items: center; justify-content: center; background-color: #f9fafb;"
          >
            <view style="text-align: center;">
              <view style="font-size: 48rpx; margin-bottom: 8rpx;">📷</view>
              <view style="font-size: 20rpx; color: #999;">上传</view>
            </view>
          </view>
        </view>
        <view style="font-size: 20rpx; color: #999; margin-top: 8rpx;">请上传工作证或相关证明文件</view>
      </view>
      
      <view class="upload-item" style="margin-bottom: 32rpx;">
        <view style="font-size: 24rpx; color: #666; margin-bottom: 12rpx;">资质证书</view>
        <view class="upload-area" style="display: flex; gap: 20rpx;">
          <view 
            v-if="uploadedFiles.qualification"
            style="width: 200rpx; height: 140rpx; border-radius: 8rpx; overflow: hidden;"
          >
            <image :src="uploadedFiles.qualification" style="width: 100%; height: 100%; object-fit: cover;" />
          </view>
          <view 
            v-else
            @click="uploadFile('qualification')"
            style="width: 200rpx; height: 140rpx; border: 2rpx dashed #e5e7eb; border-radius: 8rpx; display: flex; align-items: center; justify-content: center; background-color: #f9fafb;"
          >
            <view style="text-align: center;">
              <view style="font-size: 48rpx; margin-bottom: 8rpx;">📷</view>
              <view style="font-size: 20rpx; color: #999;">上传</view>
            </view>
          </view>
        </view>
        <view style="font-size: 20rpx; color: #999; margin-top: 8rpx;">请上传相关资质证书（可选）</view>
      </view>
    </view>
    
    <!-- 提交按钮 -->
    <view v-if="certificationStatus === 'pending'" class="submit-section" style="margin: 20rpx 32rpx 40rpx;">
      <button 
        @click="submitCertification"
        style="width: 100%; background-color: #CC0010; color: white; border: none; border-radius: 12rpx; padding: 24rpx; font-size: 28rpx; font-weight: bold;"
      >
        提交认证
      </button>
    </view>
    
    <TabBar />
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 样式定义
    }
  }
}
</script>