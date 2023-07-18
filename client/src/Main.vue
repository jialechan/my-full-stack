<template>
  <div class="page-container">
    <!-- 上方header -->
    <header>
      <page-header />
    </header>
    <main>
      <!-- 左边边栏导航 -->
      <div class="left">
        <page-sidebar></page-sidebar>
      </div>
      <!-- 右边主要页面 -->
      <div class="right">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import PageSidebar from '@/components/PageSidebar.vue'

const route = useRoute()
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  overflow: hidden;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cursor {
  cursor: pointer;
}
.txt-c {
  text-align: center;
}
.w100p {
  width: 100%;
}
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  > header {
    height: 54px;
    background-color: #000;
    color: #fff;
  }
  > main {
    display: flex;
    flex: 1;
    overflow: auto;
    > .left {
      height: 100%;
      background-color: #000;
      color: #fff;
    }
    > .right {
      flex: 1;
      overflow: hidden;
      background-color: #f5f7f9;
      > .main-body {
        padding: 16px 16px 30px;
        overflow: auto;
        height: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
