import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)
  const login = () => { isLogin.value = true }
  const logout = () => { isLogin.value = false }

  return { isLogin, logout, login }
})
