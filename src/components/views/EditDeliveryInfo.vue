<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { reactive } from 'vue'
import { onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

// do not use same name with ref
const form = reactive({
  orderStatus: '',
  shippedTime: '',
  deliveredTime: '',
  orderName: '',
  expressComany: ''
})

const clickEditButton = () => {
    isEditing.value = !isEditing.value
}
const getOrderIdByOrderName = async (orderName) => {
    try {
        const response = await axios.get('http://localhost:8080/api/order/byOrderName/' + orderName)
        console.log('Get order successfully', response)
        return response.data.data.orderId
    } catch (error) {
        console.log('Failed to get order by orderName', error)
    }
}
const clickSaveButton = async () => {
    try {
        const orderId = await getOrderIdByOrderName(passedDeliveryId)
        const response = await axios.put('http://localhost:8080/api/order/' + orderId, {
            totalAmount: form.totalAmount,
            orderStatus: form.orderStatus,
            paymentMethod: form.paymentMethod,
            createTime: form.createTime,
            goodName: form.goodName,
            goodQuantity: form.goodCount
        })
        console.log('Save successfully', response)
        ElMessageBox.alert('保存成功', '提示', {
          confirmButtonText: 'OK',
          callback: (action) => {
            isEditing.value = !isEditing.value
            backButtonPressed()
          },
          })
    } catch (error) {
        console.log('Failed to save order info', error);
        
    }
}

const passedDeliveryId = route.query.deliveryId || ''

const options = [
  {
    value: 'UnPaid',
    label: '待付款',
  },
  {
    value: 'NotDispatched',
    label: '待发货',
  },
  {
    value: 'Delivering',
    label: '派送中',
  },
  {
    value: 'Delivered',
    label: '已送达',
  },
  {
    value: 'Done',
    label: '已完成',
  },
]

const isEditing = ref(false)

const backButtonPressed = () => {
    router.push({
        path: '/index',
        query: {
        status: '3-4',
        userName: 'admin'
        }
    })
}

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/delivery/byDeliveryId/' + passedDeliveryId)
        console.log('Get delivery info successfully', response)
        const deliveryInfo = response.data.data
        form.orderStatus = deliveryInfo.order.orderStatus
        form.shippedTime = deliveryInfo.shippedTime
        form.deliveredTime = deliveryInfo.deliveredTime
        form.orderName = deliveryInfo.order.orderName
    } catch (error) {
        console.log('Failed to get delivery info', error)
    }

})

const companyOptions = ref([])
const setCompanyOptions = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/user/allCompany')
        console.log(response);
        
    } catch (error) {
        console.log('Failed to get all company', error);
    }
}
</script>


<template>
  <div style="max-width: 800px; margin: auto; padding: 24px">
    <el-card shadow="hover">
      <template #header>
        <div style="font-size: 20px; font-weight: bold; text-align: center">
          修改物流信息
        </div>
      </template>

      <div style="margin-bottom: 12px; font-size: 16px">
        <strong>物流号：</strong>{{ passedDeliveryId }}
      </div>

      <el-form :model="form" label-width="100px" label-position="top">
        <el-form-item label="订单号">
          <el-input v-model="form.orderName" disabled />
        </el-form-item>

        <el-form-item label="承运公司">
          <el-select
            v-model="form.expressComany"
            placeholder="请选择承运公司"
            style="width: 100%"
            :disabled="!isEditing"
          >
            <el-option
              v-for="item in companyOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="订单状态">
          <el-select
            v-model="form.orderStatus"
            placeholder="请选择订单状态"
            style="width: 100%"
            :disabled="!isEditing"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="发货日期">
          <el-date-picker
            v-model="form.shippedTime"
            type="date"
            placeholder="请选择发货日期"
            style="width: 100%"
            :disabled="!isEditing"
          />
        </el-form-item>

        <el-form-item label="签收日期">
          <el-date-picker
            v-model="form.deliveredTime"
            type="date"
            placeholder="请选择签收日期"
            style="width: 100%"
            :disabled="!isEditing"
          />
        </el-form-item>

        <el-form-item>
          <div style="display: flex; justify-content: center; gap: 12px">
            <el-button type="primary" @click="isEditing ? clickSaveButton() : clickEditButton()">
              {{ isEditing ? '保存' : '修改' }}
            </el-button>
            <el-button type="danger" @click="backButtonPressed">返回</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
