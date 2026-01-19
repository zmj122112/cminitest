// 云函数调用工具类

/**
 * 调用云函数
 * @param {string} name 云函数名称
 * @param {object} data 调用参数
 * @returns {Promise<object>} 调用结果
 */
export async function callCloudFunction(name, data) {
  return new Promise((resolve, reject) => {
    uniCloud.callFunction({
      name,
      data,
      success: (res) => {
        if (res.result.code === 200) {
          resolve(res.result.data)
        } else {
          reject(new Error(res.result.message || '调用失败'))
        }
      },
      fail: (err) => {
        reject(new Error(err.message || '网络错误'))
      }
    })
  })
}

// 用户相关云函数调用
export const userService = {
  /**
   * 用户登录
   * @param {object} data 登录参数
   * @returns {Promise<object>} 用户信息
   */
  async login(data) {
    return callCloudFunction('user_center', {
      action: 'login',
      data
    })
  },

  /**
   * 用户注册
   * @param {object} data 注册参数
   * @returns {Promise<object>} 用户信息
   */
  async register(data) {
    return callCloudFunction('user_center', {
      action: 'register',
      data
    })
  },

  /**
   * 获取用户信息
   * @param {string} userId 用户ID
   * @returns {Promise<object>} 用户信息
   */
  async getProfile(userId) {
    return callCloudFunction('user_center', {
      action: 'getProfile',
      data: { userId }
    })
  },

  /**
   * 更新用户信息
   * @param {object} data 更新参数
   * @returns {Promise<object>} 更新结果
   */
  async updateProfile(data) {
    return callCloudFunction('user_center', {
      action: 'updateProfile',
      data
    })
  },

  /**
   * 添加地址
   * @param {object} data 地址信息
   * @returns {Promise<object>} 地址信息
   */
  async addAddress(data) {
    return callCloudFunction('user_center', {
      action: 'addAddress',
      data
    })
  },

  /**
   * 获取地址列表
   * @param {string} userId 用户ID
   * @returns {Promise<array>} 地址列表
   */
  async getAddresses(userId) {
    return callCloudFunction('user_center', {
      action: 'getAddresses',
      data: { userId }
    })
  },

  /**
   * 更新地址
   * @param {object} data 地址信息
   * @returns {Promise<object>} 更新结果
   */
  async updateAddress(data) {
    return callCloudFunction('user_center', {
      action: 'updateAddress',
      data
    })
  },

  /**
   * 删除地址
   * @param {string} addressId 地址ID
   * @returns {Promise<object>} 删除结果
   */
  async deleteAddress(addressId) {
    return callCloudFunction('user_center', {
      action: 'deleteAddress',
      data: { addressId }
    })
  }
}

// 师傅相关云函数调用
export const masterService = {
  /**
   * 师傅登录
   * @param {object} data 登录参数
   * @returns {Promise<object>} 师傅信息
   */
  async login(data) {
    return callCloudFunction('master_center', {
      action: 'login',
      data
    })
  },

  /**
   * 获取师傅信息
   * @param {string} masterId 师傅ID
   * @returns {Promise<object>} 师傅信息
   */
  async getProfile(masterId) {
    return callCloudFunction('master_center', {
      action: 'getProfile',
      data: { masterId }
    })
  },

  /**
   * 更新师傅信息
   * @param {object} data 更新参数
   * @returns {Promise<object>} 更新结果
   */
  async updateProfile(data) {
    return callCloudFunction('master_center', {
      action: 'updateProfile',
      data
    })
  },

  /**
   * 获取师傅积分
   * @param {string} masterId 师傅ID
   * @returns {Promise<object>} 积分信息
   */
  async getScore(masterId) {
    return callCloudFunction('master_center', {
      action: 'getScore',
      data: { masterId }
    })
  },

  /**
   * 获取积分记录
   * @param {object} data 查询参数
   * @returns {Promise<object>} 积分记录
   */
  async getScoreRecords(data) {
    return callCloudFunction('master_center', {
      action: 'getScoreRecords',
      data
    })
  },

  /**
   * 提交认证信息
   * @param {object} data 认证信息
   * @returns {Promise<object>} 提交结果
   */
  async submitCertification(data) {
    return callCloudFunction('master_center', {
      action: 'submitCertification',
      data
    })
  }
}

// 工单相关云函数调用
export const workorderService = {
  /**
   * 创建工单
   * @param {object} data 工单信息
   * @returns {Promise<object>} 工单信息
   */
  async createWorkorder(data) {
    return callCloudFunction('workorder_center', {
      action: 'createWorkorder',
      data
    })
  },

  /**
   * 获取工单列表
   * @param {object} data 查询参数
   * @returns {Promise<object>} 工单列表
   */
  async getWorkorderList(data) {
    return callCloudFunction('workorder_center', {
      action: 'getWorkorderList',
      data
    })
  },

  /**
   * 获取工单详情
   * @param {string} workorderId 工单ID
   * @returns {Promise<object>} 工单详情
   */
  async getWorkorderDetail(workorderId) {
    return callCloudFunction('workorder_center', {
      action: 'getWorkorderDetail',
      data: { workorderId }
    })
  },

  /**
   * 更新工单
   * @param {object} data 更新参数
   * @returns {Promise<object>} 更新结果
   */
  async updateWorkorder(data) {
    return callCloudFunction('workorder_center', {
      action: 'updateWorkorder',
      data
    })
  },

  /**
   * 师傅接单
   * @param {object} data 接单参数
   * @returns {Promise<object>} 接单结果
   */
  async acceptWorkorder(data) {
    return callCloudFunction('workorder_center', {
      action: 'acceptWorkorder',
      data
    })
  },

  /**
   * 更新工单状态
   * @param {object} data 状态更新参数
   * @returns {Promise<object>} 更新结果
   */
  async updateWorkorderStatus(data) {
    return callCloudFunction('workorder_center', {
      action: 'updateWorkorderStatus',
      data
    })
  },

  /**
   * 添加施工记录
   * @param {object} data 施工记录
   * @returns {Promise<object>} 施工记录
   */
  async addConstructionRecord(data) {
    return callCloudFunction('workorder_center', {
      action: 'addConstructionRecord',
      data
    })
  },

  /**
   * 获取施工记录
   * @param {string} workorderId 工单ID
   * @returns {Promise<array>} 施工记录
   */
  async getConstructionRecords(workorderId) {
    return callCloudFunction('workorder_center', {
      action: 'getConstructionRecords',
      data: { workorderId }
    })
  }
}

// 系统相关云函数调用
export const systemService = {
  /**
   * 获取服务类型列表
   * @returns {Promise<array>} 服务类型列表
   */
  async getServices() {
    return callCloudFunction('system_center', {
      action: 'getServices'
    })
  },

  /**
   * 获取统计数据
   * @param {object} data 查询参数
   * @returns {Promise<object>} 统计数据
   */
  async getStatistics(data) {
    return callCloudFunction('system_center', {
      action: 'getStatistics',
      data
    })
  },

  /**
   * 发送通知
   * @param {object} data 通知参数
   * @returns {Promise<object>} 发送结果
   */
  async sendNotification(data) {
    return callCloudFunction('system_center', {
      action: 'sendNotification',
      data
    })
  }
}