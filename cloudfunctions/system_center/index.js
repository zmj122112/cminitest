const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { action, data } = event
  
  try {
    switch (action) {
      case 'getServices':
        return await getServices()
      case 'getStatistics':
        return await getStatistics(data)
      case 'sendNotification':
        return await sendNotification(data)
      default:
        return {
          code: 400,
          message: 'Unknown action'
        }
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      code: 500,
      message: 'Internal server error'
    }
  }
}

async function getServices() {
  const services = [
    {
      id: 'repair',
      name: '漏水维修',
      description: '专业解决各种漏水问题'
    },
    {
      id: 'new',
      name: '新房防水',
      description: '新房装修防水工程'
    }
  ]
  
  return {
    code: 200,
    data: services
  }
}

async function getStatistics(data) {
  const { masterId, startDate, endDate } = data
  
  let query = db.collection('workorders')
  
  if (masterId) {
    query = query.where({ masterId })
  }
  
  if (startDate && endDate) {
    query = query.where({
      createdAt: db.command.and(
        db.command.gte(new Date(startDate)),
        db.command.lte(new Date(endDate))
      )
    })
  }
  
  const totalWorkorders = await query.count()
  
  const pendingWorkorders = await query.where({ status: 'pending' }).count()
  
  const completedWorkorders = await query.where({ status: 'completed' }).count()
  
  const statistics = {
    totalWorkorders: totalWorkorders.total,
    pendingWorkorders: pendingWorkorders.total,
    completedWorkorders: completedWorkorders.total
  }
  
  return {
    code: 200,
    data: statistics
  }
}

async function sendNotification(data) {
  const { userId, type, title, content, data: notificationData } = data
  
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: userId,
      templateId: 'YOUR_TEMPLATE_ID',
      page: 'pages/index/index',
      data: notificationData
    })
    
    return {
      code: 200,
      data: {
        success: true
      }
    }
  } catch (error) {
    console.error('Notification error:', error)
    return {
      code: 400,
      message: 'Failed to send notification'
    }
  }
}