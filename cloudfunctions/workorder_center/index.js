const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const workordersCollection = db.collection('workorders')
const constructionsCollection = db.collection('constructions')

exports.main = async (event, context) => {
  const { action, data } = event
  
  try {
    switch (action) {
      case 'createWorkorder':
        return await createWorkorder(data)
      case 'getWorkorderList':
        return await getWorkorderList(data)
      case 'getWorkorderDetail':
        return await getWorkorderDetail(data)
      case 'updateWorkorder':
        return await updateWorkorder(data)
      case 'acceptWorkorder':
        return await acceptWorkorder(data)
      case 'updateWorkorderStatus':
        return await updateWorkorderStatus(data)
      case 'addConstructionRecord':
        return await addConstructionRecord(data)
      case 'getConstructionRecords':
        return await getConstructionRecords(data)
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

async function createWorkorder(data) {
  const { clientId, serviceType, appointmentTime, contactName, phoneNumber, houseAddress, remark } = data
  
  const result = await workordersCollection.add({
    clientId,
    serviceType,
    status: 'pending',
    appointmentTime,
    contactName,
    phoneNumber,
    houseAddress,
    remark,
    progress: [],
    createdAt: new Date(),
    updatedAt: new Date()
  })
  
  return {
    code: 200,
    data: {
      _id: result._id,
      clientId,
      serviceType,
      status: 'pending',
      appointmentTime,
      contactName,
      phoneNumber,
      houseAddress,
      remark,
      progress: [],
      createdAt: new Date()
    }
  }
}

async function getWorkorderList(data) {
  const { clientId, masterId, status, page = 1, limit = 10 } = data
  
  let query = workordersCollection
  
  if (clientId) {
    query = query.where({ clientId })
  } else if (masterId) {
    query = query.where({ masterId })
  }
  
  if (status) {
    query = query.where({ status })
  }
  
  const skip = (page - 1) * limit
  
  const workorders = await query
    .orderBy('createdAt', 'desc')
    .skip(skip)
    .limit(limit)
    .get()
  
  const total = await query.count()
  
  return {
    code: 200,
    data: {
      workorders: workorders.data,
      total: total.total,
      page,
      limit
    }
  }
}

async function getWorkorderDetail(data) {
  const { workorderId } = data
  
  const workorder = await workordersCollection.doc(workorderId).get()
  
  if (!workorder.data) {
    return {
      code: 404,
      message: 'Workorder not found'
    }
  }
  
  return {
    code: 200,
    data: workorder.data
  }
}

async function updateWorkorder(data) {
  const { workorderId, appointmentTime, contactName, phoneNumber, houseAddress, remark } = data
  
  const result = await workordersCollection.doc(workorderId).update({
    data: {
      appointmentTime,
      contactName,
      phoneNumber,
      houseAddress,
      remark,
      updatedAt: new Date()
    }
  })
  
  return {
    code: 200,
    data: {
      success: true
    }
  }
}

async function acceptWorkorder(data) {
  const { workorderId, masterId } = data
  
  const result = await workordersCollection.doc(workorderId).update({
    data: {
      masterId,
      status: 'accepted',
      progress: db.command.push({
        type: 'accept',
        masterId,
        message: '师傅已接单',
        createdAt: new Date()
      }),
      updatedAt: new Date()
    }
  })
  
  return {
    code: 200,
    data: {
      success: true
    }
  }
}

async function updateWorkorderStatus(data) {
  const { workorderId, status, message } = data
  
  const result = await workordersCollection.doc(workorderId).update({
    data: {
      status,
      progress: db.command.push({
        type: status,
        message,
        createdAt: new Date()
      }),
      updatedAt: new Date()
    }
  })
  
  return {
    code: 200,
    data: {
      success: true
    }
  }
}

async function addConstructionRecord(data) {
  const { workorderId, masterId, date, content, images } = data
  
  const result = await constructionsCollection.add({
    workorderId,
    masterId,
    date,
    content,
    images,
    createdAt: new Date()
  })
  
  return {
    code: 200,
    data: {
      _id: result._id,
      workorderId,
      masterId,
      date,
      content,
      images,
      createdAt: new Date()
    }
  }
}

async function getConstructionRecords(data) {
  const { workorderId } = data
  
  const records = await constructionsCollection
    .where({ workorderId })
    .orderBy('createdAt', 'desc')
    .get()
  
  return {
    code: 200,
    data: records.data
  }
}