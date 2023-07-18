<template>
  <div class="page-container">
    <div class="page flex-center">
      <div class="sign-box">
        <el-form ref="formRef" :model="loginReq" :rules="rules" label-width="86px">
          <h3 class="title">登录</h3>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginReq.email" placeholder="请输入邮箱" prefix-icon="user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginReq.password" type="password" placeholder="请输入密码" prefix-icon="lock" @keyup.enter="doLogin"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" :loading="loading" class="w100p" @click="doLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { loginApi } from '@/api/login'
import util from '@/util'

const formRef = ref()
const loginReq = reactive({
  email: '',
  password: '',
})
const loading = ref(false)

const rules = computed(() => {
  return {
    email: [
      {
        required: true,
        message: '请输入用户名',
        trigger: ['change', 'blur'],
      },
      {
        type: 'email',
        message: '请输入合法的email格式',
        trigger: ['change', 'blur'],
      },
    ],
    password: {
      required: true,
      min: 4,
      message: '请输入至少4个字符的密码',
      trigger: ['change', 'blur'],
    },
  }
})

function doLogin() {
  formRef.value.validate((valid) => {
    if (!valid) return

    loading.value = true

    // 发送密码前需要sha256
    util.sha265(loginReq.password).then((shaPassword) => {
      const shaLoginReq = {
        email: loginReq.email,
        password: shaPassword,
      }
      loginApi(shaLoginReq)
        .then((res) => {
          // 保存token
          localStorage.setItem('mfs-token', res.data.token)
          // 成功，访问首页
          window.location.replace('/main.html')
        })
        .catch(() => {}) // 忽略错误
        .finally(() => {
          loading.value = false
        })
    })
  })
}
</script>

<style scoped>
.page {
  height: 100%;
  background-size: cover;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.sign-box {
  width: 400px;
  background: #fff;
  padding: 30px 50px 20px 30px;
  margin-top: 100px;
  border-radius: 4px;
  box-shadow: 0 0 10px #022c44;
}
.title {
  text-align: center;
  font-size: 20px;
  line-height: 30px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #000;
}
</style>
