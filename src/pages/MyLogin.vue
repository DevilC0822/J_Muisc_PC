<template>
  <div>
    <div v-if="loginType === 0">
      <n-card title="用户名登录">
        <n-form-item label="用户名" :rule="ruleUsername">
          <n-input v-model:value="username" />
        </n-form-item>
        <n-form-item label="密码" :rule="rulePassword">
          <n-input v-model:value="password" type="password" />
        </n-form-item>
        <template #action>
          <n-button style="margin-right: 2rem" @click="emit('closeModal')"> 取消 </n-button>
          <n-button type="primary" @click="loginIn('')"> 登录 </n-button>
          <n-button quaternary type="primary" style="margin-left: 2rem" @click="loginType = 1"
            >换个登录方式? 手机验证码登录</n-button
          >
        </template>
      </n-card>
    </div>
    <div v-if="loginType === 1">
      <n-card title="手机验证码登录">
        <n-form-item label="手机号" :rule="ruleUsername">
          <n-input v-model:value="username" />
        </n-form-item>
        <n-form-item label="验证码" :rule="ruleCaptcha" class="captcha-form">
          <n-input v-model:value="password" style="width: 80%" />
          <n-button @click="sendCaptcha"> 发送验证码 </n-button>
        </n-form-item>
        <template #action>
          <n-button style="margin-right: 2rem" @click="emit('closeModal')"> 取消 </n-button>
          <n-button type="primary" @click="verifyCaptcha"> 登录 </n-button>
          <n-button quaternary type="primary" style="margin-left: 2rem" @click="loginType = 0"
            >换个登录方式? 手机号密码登录</n-button
          >
        </template>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import loginApi from '@/service/api/login/main'
import { updateStatus } from '@/hooks/useLoginInfo'

const loginType = ref(0)

const username = ref('')
const password = ref('')
const ruleUsername = {
  trigger: ['blur'],
  validator() {
    if (username.value === '') {
      return new Error('请输入用户名或手机号')
    }
  },
}
const rulePassword = {
  trigger: ['blur'],
  validator() {
    if (password.value === '') {
      return new Error('请输入密码')
    }
  },
}
const ruleCaptcha = {
  trigger: ['blur'],
  validator() {
    if (password.value === '') {
      return new Error('请输入验证码')
    }
  },
}

const emit = defineEmits(['closeModal'])

// 手机号和用户名登录
const loginIn = async (captcha = '') => {
  if (!username.value) return window.$message.error('用户名或手机号不能为空')
  let req
  req = {
    phone: username.value,
    password: password.value,
  }
  if (captcha) {
    req = {
      phone: username.value,
      captcha,
    }
  }
  const res = await loginApi.loginPhone(req)
  if (res.code !== 200) return window.$message.error('登录失败')
  window.localStorage.setItem('token', res.token)
  window.localStorage.setItem('cookie', res.cookie)
  await updateStatus()
  emit('closeModal')
}

const sendCaptcha = async () => {
  if (username.value === '') {
    window.$message.error('手机号不能为空')
    return
  }
  const res = await loginApi.sendCaptcha({
    phone: username.value,
  })
}
const verifyCaptcha = async () => {
  if (password.value === '') {
    window.$message.error('验证码不能为空')
    return
  }
  const res = await loginApi.verifyCaptcha({
    phone: username.value,
    captcha: password.value,
  })
  console.log(res)
  if (res.code !== 200) return window.$message.error('验证码输入错误')
  await loginIn(password.value)
}
</script>

<style scoped lang="scss">
.captcha-form {
  :deep(.n-form-item-blank) {
    justify-content: space-between;
  }
}
</style>
