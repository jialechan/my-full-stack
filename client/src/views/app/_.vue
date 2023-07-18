<template>
  <div class="main-body">
    <!--工具栏-->
    <div class="toolbar">
      <el-form :inline="true" :model="filters">
        <!-- 搜索框 -->
        <el-form-item>
          <el-input v-model="filters.title" :placeholder="'标题'"></el-input>
        </el-form-item>
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button icon="search" type="primary" @click="findPage">搜索</el-button>
        </el-form-item>
        <!-- 添加按钮 -->
        <el-form-item>
          <el-button icon="plus" type="primary">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 通用表格组件 -->
    <cm-table
      ref="tableRef"
      :get-page="userlist"
      :filters="filters"
      :columns="columns"
      :operations="operations"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    ></cm-table>
  </div>
</template>
<script setup lang="ts">
import { userlist } from '../../api/appUserList'
const tableRef = ref()
const filters = reactive({
  title: '',
})
const columns = computed(() => [
  { type: 'selection', selectable: isSelectable },
  { prop: 'id', label: 'ID', minWidth: 50 },
  { prop: 'title', label: '标题', minWidth: 120, showOverflowTooltip: true },
  { prop: 'content', label: '内容', minWidth: 120, showOverflowTooltip: true },
  { prop: 'publishTime', label: '发布时间', minwidth: 120 },
  { prop: 'createdTime', label: '创建时间', minWidth: 120 },
  { prop: 'createdBy', label: '创建人', minWidth: 120 },
])

const operations = [
  {
    type: 'edit',
    disabled: (row) => !!row.publishTime,
    show: (row) => row.createdBy === 'admin',
  },
  {
    type: 'delete',
  },
]
function isSelectable(row) {
  return row.createdBy !== 'admin'
}
//获取分页数据
function findPage() {
  tableRef.value.reload()
}
function handleEdit(row) {
  console.log('edit', row)
}
function handleDelete(ids, callback) {
  console.log('delete', ids, callback)
}
</script>
