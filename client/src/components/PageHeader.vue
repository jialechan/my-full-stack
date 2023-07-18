<template>
  <div class="header-cont">
    <!-- 左侧标题 -->
    <div class="left">
      <h1>
        <router-link to="/">管理系统</router-link>
      </h1>
    </div>
    <!-- 右侧用户名 -->
    <div class="right flex-center">
      <template v-if="isLogin">
        <el-dropdown trigger="click" @command="handleCommand">
          <div class="flex-center cursor">
            {{ username }}
            <el-icon><caret-bottom /></el-icon>
          </div>
          <!-- 下拉菜单 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="toLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </div>
  </div>
</template>

<script setup>
import util from '@/util'
import { loginInfoApi } from '@/api/loginInfo'
import { logoutApi } from '@/api/logout'

const username = ref('')
const isLogin = computed(() => username.value !== '')

loginInfoApi().then((res) => {
  username.value = res.data.username
})

const commands = {
  toLogout: () => {
    logoutApi().then((res) => {
      if (res.code === 200) {
        localStorage.removeItem('mfs-token')
        util.gotoLoginPage()
      }
    })
  },
}
function handleCommand(command) {
  commands[command] && commands[command]()
}
</script>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header-cont {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;
  a {
    color: inherit;
    text-decoration: none;
  }
  h1 {
    margin: 0;
    font-size: 20px;
  }
  .el-dropdown {
    color: inherit;
  }
}
</style>
