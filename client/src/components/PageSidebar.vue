<template>
  <div class="page-sidebar">
    <!-- 导航栏伸缩按钮 -->
    <div class="collape-bar">
      <el-icon class="cursor" @click="isCollapse = !isCollapse">
        <expand v-if="isCollapse" />
        <fold v-else />
      </el-icon>
    </div>
    <!-- 导航栏内容 -->
    <el-menu router :default-active="defaultActive" class="sidemenu" :collapse="isCollapse">
      <el-sub-menu v-for="(item, i) in treeData" :key="i" :index="item.path">
        <template #title>
          <el-icon v-if="item.icon">
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <template v-for="(child, ci) in item.children" :key="ci">
          <el-menu-item :index="child.path">
            <el-icon><component :is="child.icon"></component></el-icon>
            {{ child.name }}
          </el-menu-item>
        </template>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
const treeData = [
  {
    name: '系统',
    path: '/app',
    icon: 'menu',
    children: [
      {
        name: '系统用户',
        path: '/app/user',
        icon: 'user',
      },
    ],
  },
]

const route = useRoute()
const defaultActive = computed(function () {
  return route.path
})
const isCollapse = ref(false)
</script>

<style lang="scss">
$side-width: 200px;
.page-sidebar {
  .sidemenu.el-menu,
  .sidemenu .el-sub-menu > .el-menu {
    --el-menu-text-color: #ccc;
    --el-menu-hover-bg-color: #060251;
    --el-menu-border-color: transparent;
    --el-menu-bg-color: #000;
    .el-menu-item {
      &.is-active {
        background-color: var(--el-menu-hover-bg-color);
      }
    }
  }
  .collape-bar {
    color: #fff;
    font-size: 16px;
    line-height: 36px;
    text-align: center;
    .c-icon {
      cursor: pointer;
    }
  }
  .sidemenu.el-menu:not(.el-menu--collapse) {
    width: $side-width;
  }
}
</style>
