import { createRouter, createWebHistory } from 'vue-router'
import Hello from '@/components/Hello.vue'
import Index from '@/components/Index.vue'
import EditInfo from '@/components/views/EditInfo.vue'
import EditOrderInfo from '@/components/views/EditOrderInfo.vue'
import Orders4SpecificUserVue from '../views/Orders4SpecificUser.vue'
import CreateProductVue from '../views/CreateProduct.vue'
import EditProductInfoVue from '../views/EditProductInfo.vue'
import EditDeliveryInfoVue from '../views/EditDeliveryInfo.vue'
import CreateUser from '../views/CreateUser.vue'
import CreateOrder from '../views/CreateOrder.vue'
import CreateDelivery from '../views/CreateDelivery.vue'

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    props: true // 允许通过 props 传参
  },
  {
    path: '/editUserInfo',
    name: 'EditUserInfo',
    component: EditInfo,
    props: true
  },
  {
    path: '/editOrderInfo',
    name: 'EditOrderInfo',
    component: EditOrderInfo,
    props: true
  },
  {
    path: '/orders4SpecificUser',
    name: 'Orders4SpecificUser',
    component: Orders4SpecificUserVue,
    props: true
  },
  {
    path: '/createProduct',
    name: 'CreateProduct',
    component: CreateProductVue
  },
  {
    path: '/editProduct',
    name: 'EditProduct',
    component: EditProductInfoVue,
    props: true
  },
  {
    path: '/editDelivery',
    name: 'EditDelivery',
    component: EditDeliveryInfoVue,
    props: true
  },
  {
    path: '/createUser',
    name: 'CreateUser',
    component: CreateUser
  },
  {
    path: '/createOrder',
    name: 'CreateOrder',
    component: CreateOrder
  },
  {
    path: '/createDelivery',
    name: 'CreateDelivery',
    component: CreateDelivery
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
