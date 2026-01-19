<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    // 检查用户登录状态和权限
    this.checkUserAuth()
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    checkUserAuth() {
      // 从本地存储获取用户信息
      const userInfo = uni.getStorageSync('userInfo')
      
      if (userInfo && userInfo.token) {
        // 已登录状态
        if (userInfo.role === 'master') {
          // 师傅权限，跳转到师傅工作台
          uni.reLaunch({ url: '/pages/master/dashboard' })
        } else {
          // 客户权限，保持默认
          uni.reLaunch({ url: '/pages/index/index' })
        }
      } else {
        // 未登录状态，保持默认客户页面
        uni.reLaunch({ url: '/pages/index/index' })
      }
    }
  }
}
</script>

<style>
/*每个页面公共css */
</style>
