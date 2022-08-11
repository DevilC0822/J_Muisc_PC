// 如果导出的是函数的话 形成天然闭包环境 theme状态不能在多个组件间共享
import { ref } from 'vue'
import { updateLoginStatus } from '@/service/api/login/main'
import defaultAvatar from '@/assets/img/defaultAvatar.png'

const loginStatus = ref(false)
const userInfo = ref({
  nickname: '',
  avatarUrl: defaultAvatar,
})
const updateStatus = async () => {
  const { data: res } = await updateLoginStatus()
  if ((res as any).profile) {
    loginStatus.value = true
    userInfo.value.nickname = (res as any).profile.nickname
    // userInfo.value.avatarUrl = (res as any).profile.avatarUrl
  }
}
export { loginStatus, userInfo, updateStatus }
