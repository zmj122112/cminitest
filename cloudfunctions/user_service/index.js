const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const usersCollection = db.collection('sys_users')
const scoreRecordsCollection = db.collection('scoreRecords')

exports.main = async (event, context) => {
  const { action, data } = event
  
  try {
    switch (action) {
      case 'login':
        return await login(data)
      case 'updateProfile':
        return await updateProfile(data)
      case 'applyMaster':
        return await applyMaster(data)
      case 'getParams':
        return await getParams(data)
      case 'getProfile':
        return await getProfile(data)
      case 'getScore':
        return await getScore(data)
      case 'getScoreRecords':
        return await getScoreRecords(data)
      case 'submitCertification':
        return await submitCertification(data)
      default:
        return {
          code: -1,
          msg: 'Unknown action'
        }
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      code: -1,
      msg: 'Internal server error'
    }
  }
}

async function login(data) {
  const { openid, nickName, avatarUrl } = data
  
  let user = await usersCollection.where({ openid }).get()
  
  if (user.data.length === 0) {
    const result = await usersCollection.add({
      openid,
      nickName: nickName || '微信用户',
      avatarUrl,
      role: 'client',
      master_info: {},
      createdAt: new Date(),
      updatedAt: new Date()
    })
    
    return {
      code: 0,
      msg: 'success',
      data: {
        _id: result._id,
        openid,
        nickName: nickName || '微信用户',
        avatarUrl,
        role: 'client',
        master_info: {}
      }
    }
  }
  
  return {
    code: 0,
    msg: 'success',
    data: user.data[0]
  }
}

async function updateProfile(data) {
  const { userId, nickName, avatarUrl, phoneNumber } = data
  
  await usersCollection.doc(userId).update({
    data: {
      nickName,
      avatarUrl,
      phoneNumber,
      updatedAt: new Date()
    }
  })
  
  return {
    code: 0,
    msg: 'success',
    data: {
      success: true
    }
  }
}

async function applyMaster(data) {
  const { userId, name, phone } = data
  
  await usersCollection.doc(userId).update({
    data: {
      role: 'pending_master',
      master_info: {
        name,
        phoneNumber: phone,
        certification: {},
        score: 0,
        status: 'pending'
      },
      updatedAt: new Date()
    }
  })
  
  return {
    code: 0,
    msg: 'success',
    data: {
      success: true,
      message: '申请已提交，等待审核'
    }
  }
}

async function getParams(data) {
  return {
    code: 0,
    msg: 'success',
    data: {
      master_roles: ['pending_master', 'master'],
      certification_required: true
    }
  }
}

async function getProfile(data) {
  const { userId } = data
  
  const user = await usersCollection.doc(userId).get()
  
  if (!user.data) {
    return {
      code: -1,
      msg: 'User not found'
    }
  }
  
  return {
    code: 0,
    msg: 'success',
    data: user.data
  }
}

async function getScore(data) {
  const { userId } = data
  
  const user = await usersCollection.doc(userId).get()
  
  if (!user.data) {
    return {
      code: -1,
      msg: 'User not found'
    }
  }
  
  return {
    code: 0,
    msg: 'success',
    data: {
      score: user.data.master_info?.score || 0
    }
  }
}

async function getScoreRecords(data) {
  const { userId, page = 1, limit = 10 } = data
  
  const skip = (page - 1) * limit
  
  const records = await scoreRecordsCollection
    .where({ masterId: userId })
    .orderBy('createdAt', 'desc')
    .skip(skip)
    .limit(limit)
    .get()
  
  const total = await scoreRecordsCollection.where({ masterId: userId }).count()
  
  return {
    code: 0,
    msg: 'success',
    data: {
      records: records.data,
      total: total.total,
      page,
      limit
    }
  }
}

async function submitCertification(data) {
  const { userId, certification } = data
  
  await usersCollection.doc(userId).update({
    data: {
      master_info: {
        ...(await usersCollection.doc(userId).get()).data.master_info,
        certification,
        status: 'pending'
      },
      updatedAt: new Date()
    }
  })
  
  return {
    code: 0,
    msg: 'success',
    data: {
      success: true
    }
  }
}